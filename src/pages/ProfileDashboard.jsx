import React, { useState, useEffect } from "react";
import { useAuth } from '../context/useAuth';
import { UserIcon, ArrowPathIcon, BellIcon } from "@heroicons/react/24/outline";
import { HiOutlineHome } from "react-icons/hi2";
import { TbRecycle } from "react-icons/tb";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EwasteDetailPage from '../pages/EwasteDetailPage'; // (to be created)

const sidebarItems = [
  {
    name: "Overview",
    icon: <HiOutlineHome className="w-5 h-5 mr-2" />,
    path: "/profile",
  },
  {
    name: "Edit Profile",
    icon: <UserIcon className="w-5 h-5 mr-2" />,
    path: "/profile/edit",
  },
  {
    name: "My Credits",
    icon: <ArrowPathIcon className="w-5 h-5 mr-2" />,
    path: "/profile/credits",
  },
  {
    name: "E-Waste",
    icon: <TbRecycle className="w-5 h-5 mr-2" />,
    path: "/profile/ewaste",
  },
  {
    name: "Notifications",
    icon: <BellIcon className="w-5 h-5 mr-2" />, // We'll add badge logic below
    path: "/profile/notifications",
  },
  {
    name: "Order History",
    icon: <ArrowPathIcon className="w-5 h-5 mr-2" />,
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

  const handleSave = e => { e.preventDefault(); updateProfile(form); };

  return (
    <>
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
      <form className="max-w-xl flex flex-col gap-6">
        <div className="flex items-center gap-6 mb-2">
          <img src={avatarPreview || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} alt="Avatar Preview" className="w-20 h-20 rounded-full object-cover border-4 border-[#e3eae3]" />
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e6f4ea] file:text-gray-700 hover:file:bg-[#cde9d6]" />
          </label>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-800">Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 text-base" autoComplete="off" />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-800">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 text-base" autoComplete="off" />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-800">Phone Number</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 text-base" autoComplete="off" />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-800">Address</label>
          <input name="address" value={form.address} onChange={handleChange} className="w-full px-4 py-2 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 text-base" autoComplete="off" />
        </div>
        <div className="flex justify-cnter ">
          <button type="submit" onClick={handleSave} className="px-8 py-3 rounded-xl bg-[#2196f3] text-white font-semibold hover:bg-[#1769aa] transition-colors">Save Changes</button>
        </div>
      </form>
    </div>
    </>
  );
};

const MyCreditsSection = () => {
  const { user } = useAuth();
  // Total Credits Card
  // Only use user.credits for display
  // const credits = user?.credits || 0;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Credits</h1>
      {/* Total Credits Card */}
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-[#f2f6fc] rounded-2xl shadow p-6 flex items-center gap-4 w-full max-w-md">
          <div className="bg-green-200 rounded-full p-4">
            <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M12 6v6l4 2" /></svg>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-gray-900">{user?.credits || 0}</div>
            <div className="text-gray-600 font-medium">Total Credits</div>
          </div>
        </div>
      </div>
      {/* Credit History and Redeemed Credits */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Credit History */}
        <div>
          <h2 className="text-xl font-bold mb-2">Credit History</h2>
          <div className="overflow-x-auto rounded-2xl shadow bg-white border border-gray-100">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-600 bg-gray-50">
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">CO₂ Impact</th>
                  <th className="px-4 py-3">Credits</th>
                </tr>
              </thead>
              <tbody>
                {(user.creditHistory || []).map((row, i) => (
                  <tr key={i} className="hover:bg-green-50">
                    <td className="px-4 py-3">{row.item}</td>
                    <td className="px-4 py-3 text-blue-600">{row.date}</td>
                    <td className="px-4 py-3">{row.co2Impact}</td>
                    <td className="px-4 py-3 font-bold text-green-600">{row.credits > 0 ? '+' : ''}{row.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Redeemed Credits */}
        <div>
          <h2 className="text-xl font-bold mb-2">Redeemed Credits</h2>
          <div className="overflow-x-auto rounded-2xl shadow bg-white border border-gray-100">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-600 bg-gray-50">
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Credits</th>
                </tr>
              </thead>
              <tbody>
                {(user.redeemedCredits || []).map((row, i) => (
                  <tr key={i} className="hover:bg-yellow-50">
                    <td className="px-4 py-3">{row.item}</td>
                    <td className="px-4 py-3 text-blue-600">{row.date}</td>
                    <td className="px-4 py-3 font-bold text-yellow-600">{row.credits > 0 ? '+' : ''}{row.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const OverviewSection = () => {
  const { user } = useAuth();
  // Level logic (reuse from ImpactDashboard)
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
    <div className="flex flex-col md:flex-row gap-10">
      {/* Left: Main content */}
      <div className="flex-1">
        {/* User Card */}
        <div className="flex items-center gap-6 mb-8">
          <img
            src={user?.avatar || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-[#e3eae3]"
          />
          <div>
            <div className="text-2xl font-bold text-gray-900">{user?.name}</div>
            <div className="text-gray-600 text-sm mb-1">Member since 2025</div>
            <div className="text-gray-700 text-base">{user?.email}</div>
          </div>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-xl p-5 flex flex-col items-center border border-[#e3eae3]">
            <div className="text-2xl font-extrabold text-gray-900 mb-1">
              {co2} kg
            </div>
            <div className="text-gray-600 text-sm">CO₂ Saved</div>
          </div>
          <div className="bg-white rounded-xl p-5 flex flex-col items-center border border-[#e3eae3]">
            <div className="text-2xl font-extrabold text-gray-900 mb-1">
              {credits}
            </div>
            <div className="text-gray-600 text-sm">Credits Earned</div>
          </div>
          <div className="bg-white rounded-xl p-5 flex flex-col items-center border border-[#e3eae3]">
            <div className="text-2xl font-extrabold text-gray-900 mb-1">{returned}</div>
            <div className="text-gray-600 text-sm">Items Returned</div>
          </div>
          <div className="bg-white rounded-xl p-5 flex flex-col items-center border border-[#e3eae3]">
            <div className="text-2xl font-extrabold text-gray-900 mb-1">
              {label}
            </div>
            <div className="text-gray-600 text-sm">Eco-Level</div>
          </div>
        </div>
        {/* Quick Actions */}
        <div className="mb-10">
          <div className="font-bold text-lg mb-4">Quick Actions</div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Credits Wallet */}
            <div>
              <div className="text-gray-700 font-semibold">Credits Wallet</div>
              <div className="font-bold">View your credits</div>
              <div className="text-gray-500 text-sm mb-2">
                Check your balance and transaction history.
              </div>
              <button
                onClick={() => (window.location.href = "/profile/credits")}
                className="px-4 py-2 rounded-full bg-[#e6f4ea] text-gray-900 font-semibold hover:bg-[#cde9d6] transition-colors flex items-center gap-2"
              >
                View Wallet <span>&rarr;</span>
              </button>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="./assets/image2.png"
                alt="Wallet"
                className="rounded-xl w-28 h-28 object-cover bg-[#f9f6f2]"
              />
            </div>
            {/* Eco-Impact Dashboard */}
            <div>
              <div className="text-gray-700 font-semibold">
                Eco-Impact Dashboard
              </div>
              <div className="font-bold">Track your impact</div>
              <div className="text-gray-500 text-sm mb-2">
                See your environmental contributions.
              </div>
              <button
                onClick={() => (window.location.href = "/impact")}
                className="px-4 py-2 rounded-full bg-[#e6f4ea] text-gray-900 font-semibold hover:bg-[#cde9d6] transition-colors flex items-center gap-2"
              >
                View Dashboard <span>&rarr;</span>
              </button>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="./assets/globe.jpg"
                alt="Globe"
                className="rounded-xl w-28 h-25 object-cover bg-[#f9f6f2]"
              />
            </div>
            {/* Settings */}
            <div>
              <div className="text-gray-700 font-semibold">Settings</div>
              <div className="font-bold">Manage your account</div>
              <div className="text-gray-500 text-sm mb-2">
                Update your profile and preferences.
              </div>
              <button
                onClick={() => (window.location.href = "/profile/edit")}
                className="px-4 py-2 rounded-full bg-[#e6f4ea] text-gray-900 font-semibold hover:bg-[#cde9d6] transition-colors flex items-center gap-2"
              >
                Go to Settings <span>&rarr;</span>
              </button>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="./assets/image.png"
                alt="Plant"
                className="rounded-xl w-28 h-26 object-cover bg-[#f9f6f2]"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Right: Images */}
      {/* <div className="hidden md:flex flex-col gap-8 justify-center min-w-[220px]">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Wallet"
          className="rounded-xl w-40 h-28 object-cover bg-[#f9f6f2]"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616494.png"
          alt="Globe"
          className="rounded-xl w-40 h-28 object-cover bg-[#f9f6f2]"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="Plant"
          className="rounded-xl w-40 h-28 object-cover bg-[#f9f6f2]"
        />
      </div> */}
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
      await fetchUser(token); // Refresh user data/notifications
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
      await fetchUser(token); // Update credits and notifications
      toast.success('Credits redeemed!');
    } catch {
      toast.error('Failed to redeem credits.');
    }
  };

  const filtered = returns.filter(r =>
    (statusFilter === 'All' || r.status === statusFilter) &&
    r.item.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  return (
    <div>
      <ToastContainer position="top-center" autoClose={2500} theme="colored" />
      <h1 className="text-3xl font-bold mb-8">E-Waste Tracking</h1>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <div className="flex gap-2">
          {['All', 'In Transit', 'Recycled'].map(s => (
            <button
              key={s}
              className={`px-4 py-2 rounded-full font-semibold border transition-colors ${statusFilter === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search by item name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 text-base w-full md:w-64"
        />
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="px-4 py-2 rounded-full border border-gray-300 text-base bg-white"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
      {loading ? <div>Loading...</div> : (
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white rounded-3xl border border-[#e3eae3] shadow-2xl">
            <thead>
              <tr className="text-left text-gray-700 bg-[#f7faf7]">
                <th className="px-6 py-4 text-base font-bold">Image</th>
                <th className="px-6 py-4 text-base font-bold">Item</th>
                <th className="px-6 py-4 text-base font-bold">Date</th>
                <th className="px-6 py-4 text-base font-bold">Status</th>
                <th className="px-6 py-4 text-base font-bold">Credits Earned</th>
                <th className="px-6 py-4 text-base font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => (
                <tr key={i} className="border-t hover:bg-blue-50/30 transition">
                  <td className="px-6 py-4">
                    <img
                      src={row.images && row.images.length > 0 ? row.images[0] : 'https://cdn-icons-png.flaticon.com/512/1829/1829586.png'}
                      alt={row.item}
                      className="w-16 h-16 object-cover rounded-2xl border shadow bg-gray-50"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-lg">{row.item}</td>
                  <td className="px-6 py-4 text-green-700 font-medium">{new Date(row.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-4 py-1 rounded-full font-semibold text-xs shadow-sm border ${row.status === 'Recycled' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>{row.status}</span>
                  </td>
                  <td className="px-6 py-4 text-green-700 font-bold text-lg">{row.credits}</td>
                  <td className="px-6 py-4 flex flex-wrap gap-2 items-center min-w-[220px]">
                    <select
                      value={row.status}
                      onChange={e => handleStatusUpdate(row._id, e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white shadow focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="In Transit">In Transit</option>
                      <option value="Recycled">Recycled</option>
                    </select>
                    <button
                      className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition-colors text-sm shadow"
                      onClick={() => navigate(`/ewaste/${row._id}`)}
                    >
                      View Details
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-colors text-sm shadow"
                      onClick={() => handleDelete(row._id)}
                    >
                      Delete
                    </button>
                    {row.status === 'Recycled' && !user.creditHistory?.some(h => h.item === row.item && h.credits === row.credits) && (
                      <button
                        className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition-colors text-sm shadow"
                        onClick={() => handleRedeem(row._id)}
                      >
                        Redeem Credits
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const ReturnsSection = () => {
  const { token } = useAuth();
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
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
    <div>
      <h1 className="text-3xl font-bold mb-8">My Returns</h1>
      {loading ? <div>Loading...</div> : (
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white rounded-2xl border border-[#e3eae3] shadow">
            <thead>
              <tr className="text-left text-gray-700 bg-[#f7faf7]">
                <th className="px-6 py-3">Item</th>
                <th className="px-6 py-3">Condition</th>
                <th className="px-6 py-3">CO₂ Saved</th>
                <th className="px-6 py-3">Credits</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {returns.map((row, i) => (
                <tr key={i} className="border-t">
                  <td className="px-6 py-4">{row.item}</td>
                  <td className="px-6 py-4">{row.condition}</td>
                  <td className="px-6 py-4">{row.co2Saved} kg</td>
                  <td className="px-6 py-4">{row.credits}</td>
                  <td className="px-6 py-4">
                    <span className={`px-4 py-1 rounded-full font-semibold ${row.status === 'Recycled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{row.status}</span>
                  </td>
                  <td className="px-6 py-4">{new Date(row.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const NotificationsSection = () => {
  const { user, updateProfile } = useAuth();
  useEffect(() => {
    // Mark all notifications as read when viewing
    if (user?.notifications?.some(n => !n.read)) {
      const updated = user.notifications.map(n => ({ ...n, read: true }));
      updateProfile({ notifications: updated });
    }
    // eslint-disable-next-line
  }, []);
  const sorted = [...(user.notifications || [])].sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>
      <div className="text-gray-700">
        {sorted.length > 0 ? (
          <ul className="space-y-2">
            {sorted.map((n, i) => (
              <li key={i} className={`p-3 rounded flex items-center gap-3 ${n.read ? 'bg-gray-100' : 'bg-blue-50'}`}>
                <BellIcon className="w-5 h-5 text-blue-400" />
                <span className="font-medium">{n.message}</span>
                <span className="ml-2 text-xs text-gray-500">{new Date(n.date).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div>No notifications yet.</div>
        )}
      </div>
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
    <div>
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      {loading ? (
        <div className="text-gray-600 text-lg text-center py-20">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-600 text-lg text-center py-20">No orders yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow bg-white border border-gray-100">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-600 bg-gray-50">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Images</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-3 text-blue-600">{new Date(order.date).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <ul className="list-disc ml-4">
                      {order.items.map((item, idx) => (
                        <li key={idx}>{item.name} x{item.qty}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 font-bold">{order.total} credits</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full font-semibold text-xs shadow-sm border ${order.status === 'Delivered' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>{order.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 flex-wrap">
                      {order.images && order.images.length > 0 ? order.images.map((img, idx) => (
                        <img key={idx} src={img} alt="item" className="w-10 h-10 object-cover rounded border" />
                      )) : <span className="text-gray-400">-</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    <div className="bg-[#f7faf7] min-h-screen flex flex-col md:flex-row pt-8 pb-8">
      {/* Sidebar */}
      <aside
        className="w-full md:w-72 bg-white md:bg-transparent flex flex-col items-center md:items-start px-4 md:px-10 pt-8 md:pt-16 border-b md:border-b-0 md:border-r border-gray-200 md:h-auto md:sticky md:top-0 overflow-y-auto max-h-[60vh] md:max-h-none"
        style={{ minHeight: '0', flex: 'none' }}
      >
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-10 w-full">
          <img
            src={user?.avatar || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
            alt={user?.name}
            className="w-20 h-20 md:w-14 md:h-14 rounded-full object-cover mb-2"
          />
          <span className="font-semibold text-lg text-gray-900 text-center md:text-left w-full break-words">
            {user?.name}
          </span>
        </div>
        <nav className="w-full flex flex-col gap-1">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center w-full px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-[#e9eef2] text-gray-900"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              {item.name}
              {item.name === 'Notifications' && unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500 rounded-full">{unreadCount}</span>
              )}
            </button>
          ))}
        </nav>
        {/* Divider and Sign Out button at the bottom */}
        <div className="w-full flex-1"></div>
        <div className="w-full mt-6 mb-2 border-t border-gray-200 pt-4 flex flex-col items-center">
          <button
            className="w-full px-4 py-2 rounded-lg text-base font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
            onClick={signOut}
          >
            Sign Out
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 px-2 md:px-8 pt-20">
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
