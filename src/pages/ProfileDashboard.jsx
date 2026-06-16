import React, { useState, useEffect } from "react";
import { useAuth } from '../context/useAuth';
import { Home, User, Coins, Recycle, Bell, ShoppingBag, LogOut, ArrowRight, Trash2, Mail, Phone, MapPin } from "lucide-react";
import { useNavigate, useLocation, Routes, Route, Link } from "react-router-dom";
import Footer from "../components/Footer";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EwasteDetailPage from '../pages/EwasteDetailPage';

const sidebarItems = [
  {
    name: "Overview",
    icon: Home,
    path: "/profile",
  },
  {
    name: "Edit Profile",
    icon: User,
    path: "/profile/edit",
  },
  {
    name: "My Credits",
    icon: Coins,
    path: "/profile/credits",
  },
  {
    name: "E-Waste",
    icon: Recycle,
    path: "/profile/ewaste",
  },
  {
    name: "Notifications",
    icon: Bell,
    path: "/profile/notifications",
  },
  {
    name: "Order History",
    icon: ShoppingBag,
    path: "/profile/orders",
  },
];

const EditProfileSection = () => {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    avatar: user?.avatar || '',
  });
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setForm(f => ({ ...f, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = e => {
    e.preventDefault();
    updateProfile(form);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Edit Profile</h1>
        <p className="text-slate-400 text-xs mt-1">Manage your identity settings and physical coordinates.</p>
      </div>

      <form onSubmit={handleSave} className="max-w-2xl bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <img
            src={avatarPreview || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
            alt="Avatar Preview"
            className="w-20 h-20 rounded-full object-cover border-4 border-slate-100 shadow-sm shrink-0"
          />
          <div className="space-y-2 text-center sm:text-left">
            <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Choose Profile Avatar</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition duration-150 cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-teal-500 focus:bg-white text-sm transition-all"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-teal-500 focus:bg-white text-sm transition-all"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-teal-500 focus:bg-white text-sm transition-all"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Postal Address</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-teal-500 focus:bg-white text-sm transition-all"
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold text-sm shadow-md transition duration-200 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

const MyCreditsSection = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Eco Credits Wallet</h1>
        <p className="text-slate-400 text-xs mt-1">Track your recycle balance and transactions history.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm max-w-md flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-inner shrink-0">
          <Coins className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Wallet Balance</span>
          <span className="text-3xl font-black text-slate-800 tracking-tight mt-1 block">
            {user?.credits || 0} <span className="text-xs font-bold text-teal-600">credits</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Earn Log</h2>
          {user.creditHistory && user.creditHistory.length > 0 ? (
            <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {user.creditHistory.map((row, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition duration-150">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-800 text-sm">{row.item}</span>
                      <span className="text-[10px] text-slate-400 block">{new Date(row.date).toLocaleDateString()}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-600">+{row.credits} cr</span>
                      <span className="text-[10px] text-slate-400 block font-medium">Offset {row.co2Impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-10 border border-dashed border-slate-200 rounded-3xl text-center text-slate-400 text-xs">
              No recycle earnings recorded yet.
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Redeem Log</h2>
          {user.redeemedCredits && user.redeemedCredits.length > 0 ? (
            <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {user.redeemedCredits.map((row, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition duration-150">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-800 text-sm">{row.item}</span>
                      <span className="text-[10px] text-slate-400 block">{new Date(row.date).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-600">{row.credits} cr</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-10 border border-dashed border-slate-200 rounded-3xl text-center text-slate-400 text-xs">
              No vouchers redeemed yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OverviewSection = () => {
  const { user } = useAuth();
  
  const getLevelInfo = (co2, credits, returned) => {
    if (co2 === 0 && credits === 0 && returned === 0) {
      return { level: 1, label: 'Newbie' };
    } else if (co2 < 50) {
      return { level: 2, label: 'Eco-Starter' };
    } else if (co2 < 100) {
      return { level: 3, label: 'Eco-Advancer' };
    } else if (co2 < 200) {
      return { level: 4, label: 'Eco-Champion' };
    } else {
      return { level: 5, label: 'Eco-Legend' };
    }
  };

  const co2 = user?.CO2_saved || 0;
  const credits = user?.credits || 0;
  const returned = user?.productsReturned || 0;
  const { label } = getLevelInfo(co2, credits, returned);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="bg-white rounded-3xl border border-slate-200/60 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <img
          src={user?.avatar || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
          alt={user?.name}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-slate-100 shadow-sm shrink-0"
        />
        <div className="text-center sm:text-left space-y-1 flex-1">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">{user?.name}</h2>
          <span className="text-xs font-bold text-teal-600 block">Eco-Member Rank: {label}</span>
          <p className="text-slate-400 text-xs leading-normal mt-2">{user?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/60 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">CO₂ Saved</span>
          <span className="text-lg font-black text-slate-800 block mt-2">{co2} kg</span>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Eco Credits</span>
          <span className="text-lg font-black text-slate-800 block mt-2">{credits} cr</span>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Recycles</span>
          <span className="text-lg font-black text-slate-800 block mt-2">{returned} items</span>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Grade Level</span>
          <span className="text-lg font-black text-slate-800 block mt-2">{label}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Platform Hub</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200/60 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition">
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Credits</span>
              <h4 className="font-extrabold text-slate-800 text-base">Credits Wallet</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Check balance statements and view historical recycle incentives.
              </p>
            </div>
            <Link
              to="/profile/credits"
              className="mt-6 flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700 transition"
            >
              <span>Open Wallet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/60 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition">
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Impact</span>
              <h4 className="font-extrabold text-slate-800 text-base">Carbon Dashboard</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                View detailed environmental offset calculations and timelines.
              </p>
            </div>
            <Link
              to="/impact"
              className="mt-6 flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700 transition"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/60 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition">
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Settings</span>
              <h4 className="font-extrabold text-slate-800 text-base">Account Settings</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Modify contact coordinates, phone numbers, and profile avatars.
              </p>
            </div>
            <Link
              to="/profile/edit"
              className="mt-6 flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700 transition"
            >
              <span>Manage Settings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const EWasteSection = () => {
  const { token, fetchUser, user } = useAuth();
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/returns`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReturns(res.data);
      } catch {
        setReturns([]);
      }
      setLoading(false);
    };
    fetchReturns();
  }, [token]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/returns/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReturns(returns => returns.map(r => r._id === id ? { ...r, status: newStatus } : r));
      await fetchUser(token);
      toast.success(`Status updated to '${newStatus}'`);
    } catch {
      toast.error('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this return?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/returns/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReturns(returns => returns.filter(r => r._id !== id));
      toast.success('Return deleted successfully.');
    } catch {
      toast.error('Failed to delete return.');
    }
  };

  const handleRedeem = async (id) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/returns/${id}/redeem`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchUser(token);
      toast.success('Credits redeemed!');
    } catch {
      toast.error('Failed to redeem credits.');
    }
  };

  const filtered = returns.filter(r =>
    (statusFilter === 'All' || r.status === statusFilter) &&
    r.item.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      <ToastContainer position="top-center" autoClose={2500} theme="colored" />
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">E-Waste Recycling Hub</h1>
        <p className="text-slate-400 text-xs mt-1">Track and manage your recycle requests in real time.</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm">
        <div className="flex gap-2">
          {['All', 'In Transit', 'Recycled'].map(s => (
            <button
              key={s}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition duration-200 border cursor-pointer ${
                statusFilter === s
                  ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/10'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-350'
              }`}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <input
            type="text"
            placeholder="Search recycling log..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-250 bg-slate-50 focus:outline-none focus:border-teal-500 focus:bg-white text-xs w-full sm:w-56"
          />
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-250 bg-slate-50 focus:outline-none focus:border-teal-500 focus:bg-white text-xs cursor-pointer appearance-none pr-8 relative"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-sm font-semibold">Searching logs...</div>
      ) : sorted.length > 0 ? (
        <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead>
                <tr className="bg-slate-50/50 text-left text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Submission Date</th>
                  <th className="px-6 py-4">Verify Status</th>
                  <th className="px-6 py-4">Value</th>
                  <th className="px-6 py-4 text-right">Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {sorted.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/40 transition">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <img
                        src={row.images && row.images.length > 0 ? row.images[0] : 'https://cdn-icons-png.flaticon.com/512/1829/1829586.png'}
                        alt={row.item}
                        className="w-12 h-12 object-contain rounded-xl border border-slate-100 bg-slate-50 shrink-0"
                      />
                      <span className="font-bold text-slate-800">{row.item}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(row.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase border tracking-wider ${
                        row.status === 'Recycled'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {row.credits} cr
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        <select
                          value={row.status}
                          onChange={e => handleStatusUpdate(row._id, e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none shadow-sm cursor-pointer"
                        >
                          <option value="In Transit">In Transit</option>
                          <option value="Recycled">Recycled</option>
                        </select>
                        <button
                          className="px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-100 text-teal-700 hover:bg-teal-100 text-xs font-bold transition cursor-pointer"
                          onClick={() => navigate(`/ewaste/${row._id}`)}
                        >
                          Details
                        </button>
                        <button
                          className="p-1.5 rounded-lg border border-slate-100 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 transition cursor-pointer"
                          onClick={() => handleDelete(row._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {row.status === 'Recycled' && !user.creditHistory?.some(h => h.item === row.item && h.credits === row.credits) && (
                          <button
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
                            onClick={() => handleRedeem(row._id)}
                          >
                            Redeem
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-12 border border-dashed border-slate-200 rounded-3xl text-center text-slate-400 text-sm font-medium">
          No recycling items in this filter criteria.
        </div>
      )}
    </div>
  );
};

const ReturnsSection = () => {
  const { token } = useAuth();
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const res = await axios.get('/api/returns', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReturns(res.data);
      } catch {
        setReturns([]);
      }
      setLoading(false);
    };
    fetchReturns();
  }, [token]);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Recycle Actions</h1>
        <p className="text-slate-400 text-xs mt-1">Review your recycled entries statistics.</p>
      </div>

      {loading ? (
        <div className="text-center py-10 text-slate-400 text-sm font-semibold">Loading log...</div>
      ) : returns.length > 0 ? (
        <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead>
                <tr className="bg-slate-50/50 text-left text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Condition</th>
                  <th className="px-6 py-4">CO₂ Prevented</th>
                  <th className="px-6 py-4">Credits</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {returns.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/40 transition">
                    <td className="px-6 py-4 font-bold text-slate-800">{row.item}</td>
                    <td className="px-6 py-4 text-slate-500">{row.condition}</td>
                    <td className="px-6 py-4 text-emerald-600 font-semibold">{row.co2Saved} kg</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{row.credits}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase border tracking-wider ${
                        row.status === 'Recycled'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(row.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-12 border border-dashed border-slate-200 rounded-3xl text-center text-slate-400 text-sm font-medium">
          No recycling listings saved.
        </div>
      )}
    </div>
  );
};

const NotificationsSection = () => {
  const { user, updateProfile } = useAuth();

  useEffect(() => {
    if (user?.notifications?.some(n => !n.read)) {
      const updated = user.notifications.map(n => ({ ...n, read: true }));
      updateProfile({ notifications: updated });
    }
  }, []);

  const sorted = [...(user.notifications || [])].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Inbox Notifications</h1>
        <p className="text-slate-400 text-xs mt-1">Updates on your recycle drop-offs and platform achievements.</p>
      </div>

      {sorted.length > 0 ? (
        <div className="space-y-3">
          {sorted.map((n, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border flex items-start gap-4 transition ${
                n.read
                  ? 'bg-white border-slate-200/60 shadow-sm'
                  : 'bg-teal-50/40 border-teal-100/60 shadow-md shadow-teal-500/5'
              }`}
            >
              <div className={`p-2 rounded-xl shrink-0 ${n.read ? 'bg-slate-50 text-slate-400' : 'bg-teal-50 text-teal-600'}`}>
                <Bell className="w-4 h-4" />
              </div>
              <div className="space-y-1 flex-1">
                <p className={`text-xs sm:text-sm font-medium ${n.read ? 'text-slate-600' : 'text-slate-900 font-bold'}`}>
                  {n.message}
                </p>
                <span className="text-[10px] text-slate-400 block">
                  {new Date(n.date).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 border border-dashed border-slate-200 rounded-3xl text-center text-slate-400 text-sm font-medium">
          Your notifications inbox is currently clean.
        </div>
      )}
    </div>
  );
};

const OrderHistorySection = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
      } catch {
        setOrders([]);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [token]);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Order Transactions</h1>
        <p className="text-slate-400 text-xs mt-1">Review items purchased using your earned credits.</p>
      </div>

      {loading ? (
        <div className="text-center py-10 text-slate-400 text-sm font-semibold">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="p-12 border border-dashed border-slate-200 rounded-3xl text-center text-slate-400 text-sm font-medium">
          You haven't placed any circular shop orders yet.
        </div>
      ) : (
        <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead>
                <tr className="bg-slate-50/50 text-left text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Transaction Date</th>
                  <th className="px-6 py-4">Items Purchased</th>
                  <th className="px-6 py-4">Order Value</th>
                  <th className="px-6 py-4">Fulfillment</th>
                  <th className="px-6 py-4 text-right">Gallery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order, i) => (
                  <tr key={i} className="hover:bg-slate-50/40 transition">
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(order.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <ul className="list-disc ml-4 space-y-0.5 text-xs font-semibold text-slate-700">
                        {order.items.map((item, idx) => (
                          <li key={idx}>{item.name} <span className="text-slate-400">x{item.qty}</span></li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {order.total} cr
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase border tracking-wider ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-1.5 flex-wrap justify-end">
                        {order.images && order.images.length > 0 ? order.images.map((img, idx) => (
                          <img key={idx} src={img} alt="item" className="w-8 h-8 object-contain rounded border border-slate-100 bg-slate-50" />
                        )) : <span className="text-slate-400">-</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const unreadCount = user?.notifications?.filter(n => !n.read).length || 0;

  return (
    <>
    <div className="bg-slate-50 min-h-screen flex flex-col md:flex-row pt-24 pb-8">
      <aside
        className="w-full md:w-72 bg-white border-b md:border-b-0 md:border-r border-slate-200/80 flex flex-col items-stretch px-6 py-8 md:pt-12 md:h-auto shrink-0 md:sticky md:top-0 overflow-y-auto max-h-[60vh] md:max-h-none"
        style={{ minHeight: '0', flex: 'none' }}
      >
        <div className="flex flex-col items-center md:items-start mb-8 w-full border-b border-slate-100 pb-6">
          <img
            src={user?.avatar || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
            alt={user?.name}
            className="w-16 h-16 rounded-full object-cover mb-3 shadow-sm"
          />
          <span className="font-extrabold text-base text-slate-800 tracking-tight text-center md:text-left w-full break-words">
            {user?.name}
          </span>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-0.5">Verified Eco Member</span>
        </div>

        <nav className="w-full flex flex-col gap-1">
          {sidebarItems.map((item) => {
            const IconComp = item.icon;
            const isActive = location.pathname === item.path || (item.path === '/profile' && location.pathname === '/profile/');
            return (
              <button
                key={item.name}
                className={`flex items-center w-full px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-teal-50 text-teal-700 shadow-sm border-l-4 border-teal-500 pl-3"
                    : "text-slate-600 hover:bg-slate-100 border-l-4 border-transparent"
                }`}
                onClick={() => navigate(item.path)}
              >
                <IconComp className="w-4.5 h-4.5 mr-2 shrink-0" />
                <span className="flex-1 text-left">{item.name}</span>
                {item.name === 'Notifications' && unreadCount > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-rose-500 rounded-full shrink-0 shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="w-full mt-auto pt-8 flex flex-col items-stretch">
          <button
            className="w-full px-4 py-3 rounded-2xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition duration-200 cursor-pointer flex items-center justify-center gap-2"
            onClick={signOut}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-grow px-6 sm:px-8 md:px-12 py-8 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<OverviewSection />} />
          <Route path="/edit" element={<EditProfileSection />} />
          <Route path="/credits" element={<MyCreditsSection />} />
          <Route path="/ewaste" element={<EWasteSection />} />
          <Route path="/ewaste/:id" element={<EwasteDetailPage />} />
          <Route path="/notifications" element={<NotificationsSection />} />
          <Route path="/returns" element={<ReturnsSection />} />
          <Route path="/orders" element={<OrderHistorySection />} />
        </Routes>
      </main>
    </div>
    <Footer />
    </>
  );
};

export default ProfileDashboard;
