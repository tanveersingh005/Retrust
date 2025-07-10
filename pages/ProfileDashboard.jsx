import React, { useState } from "react";
import { useAuth } from '../context/useAuth';
import { UserIcon, ArrowPathIcon, BellIcon } from "@heroicons/react/24/outline";
import { HiOutlineHome } from "react-icons/hi2";
import { TbRecycle } from "react-icons/tb";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";

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
    icon: <BellIcon className="w-5 h-5 mr-2" />,
    path: "/profile/notifications",
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
          <img src={avatarPreview} alt="Avatar Preview" className="w-20 h-20 rounded-full object-cover border-4 border-[#e3eae3]" />
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

const MyCreditsSection = () => (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Credits</h1>
      {/* Total Credits Card */}
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-[#f2f6fc] rounded-2xl shadow p-6 flex items-center gap-4 w-full max-w-md">
          <div className="bg-green-200 rounded-full p-4">
            <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M12 6v6l4 2" /></svg>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-gray-900">150</div>
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
                <tr className="hover:bg-green-50">
                  <td className="px-4 py-3">Recycled Denim Jeans</td>
                  <td className="px-4 py-3 text-blue-600">July 15, 2024</td>
                  <td className="px-4 py-3">Saved 5kg CO₂</td>
                  <td className="px-4 py-3 font-bold text-green-600">+50</td>
                </tr>
                <tr className="hover:bg-green-50">
                  <td className="px-4 py-3">Sold Vintage Leather Jacket</td>
                  <td className="px-4 py-3 text-blue-600">June 20, 2024</td>
                  <td className="px-4 py-3">Saved 10kg CO₂</td>
                  <td className="px-4 py-3 font-bold text-green-600">+100</td>
                </tr>
                <tr className="hover:bg-red-50">
                  <td className="px-4 py-3">Purchased Upcycled T-Shirt</td>
                  <td className="px-4 py-3 text-blue-600">May 5, 2024</td>
                  <td className="px-4 py-3">Reduced 2kg CO₂</td>
                  <td className="px-4 py-3 font-bold text-red-500">-20</td>
                </tr>
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
                <tr className="hover:bg-yellow-50">
                  <td className="px-4 py-3">Discount on Sustainable Sneakers</td>
                  <td className="px-4 py-3 text-blue-600">August 1, 2024</td>
                  <td className="px-4 py-3 font-bold text-yellow-600">-30</td>
                </tr>
                <tr className="hover:bg-yellow-50">
                  <td className="px-4 py-3">Donation to Environmental Charity</td>
                  <td className="px-4 py-3 text-blue-600">July 20, 2024</td>
                  <td className="px-4 py-3 font-bold text-yellow-600">-120</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

const OverviewSection = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col md:flex-row gap-10">
      {/* Left: Main content */}
      <div className="flex-1">
        {/* User Card */}
        <div className="flex items-center gap-6 mb-8">
          <img
            src={user?.avatar}
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
              250 kg
            </div>
            <div className="text-gray-600 text-sm">CO₂ Saved</div>
          </div>
          <div className="bg-white rounded-xl p-5 flex flex-col items-center border border-[#e3eae3]">
            <div className="text-2xl font-extrabold text-gray-900 mb-1">
              150
            </div>
            <div className="text-gray-600 text-sm">Credits Earned</div>
          </div>
          <div className="bg-white rounded-xl p-5 flex flex-col items-center border border-[#e3eae3]">
            <div className="text-2xl font-extrabold text-gray-900 mb-1">30</div>
            <div className="text-gray-600 text-sm">Items Returned</div>
          </div>
          <div className="bg-white rounded-xl p-5 flex flex-col items-center border border-[#e3eae3]">
            <div className="text-2xl font-extrabold text-gray-900 mb-1">
              Eco-Champion
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
                src="./src/assets/image2.png"
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
                src="./src/assets/globe.jpg"
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
                src="./src/assets/image.png"
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

const EWasteSection = () => (
    <div>
      <h1 className="text-3xl font-bold mb-8">E-Waste Tracking</h1>
      <h2 className="text-lg font-semibold mb-4">Past E-Waste Returns</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white rounded-2xl border border-[#e3eae3] shadow">
          <thead>
            <tr className="text-left text-gray-700 bg-[#f7faf7]">
              <th className="px-6 py-3">Item</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Credits Earned</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-6 py-4">Old Laptop</td>
              <td className="px-6 py-4 text-green-700 font-medium">2023-08-15</td>
              <td className="px-6 py-4">
                <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full font-semibold">Recycled</span>
              </td>
              <td className="px-6 py-4 text-green-700 font-bold">+$15</td>
            </tr>
            <tr className="border-t">
              <td className="px-6 py-4">Broken Smartphone</td>
              <td className="px-6 py-4 text-green-700 font-medium">2023-05-22</td>
              <td className="px-6 py-4">
                <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full font-semibold">In Transit</span>
              </td>
              <td className="px-6 py-4 text-green-700 font-bold">+$5</td>
            </tr>
            <tr className="border-t">
              <td className="px-6 py-4">Tablet</td>
              <td className="px-6 py-4 text-green-700 font-medium">2023-02-10</td>
              <td className="px-6 py-4">
                <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full font-semibold">Recycled</span>
              </td>
              <td className="px-6 py-4 text-green-700 font-bold">+$10</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="mt-2 mb-8 px-6 py-3 rounded-full bg-green-500 text-white font-bold shadow hover:bg-green-600 transition-colors">
        Initiate New E-Waste Return
      </button>
      <div>
        <h3 className="font-bold text-lg mb-2">Responsible E-Waste Disposal Tips</h3>
        <p className="text-gray-700 max-w-2xl">
          Proper e-waste disposal is crucial for environmental sustainability. Always recycle electronics through certified programs to prevent hazardous materials from polluting the environment. Consider donating or reselling functional devices to extend their lifespan. For non-functional items, explore manufacturer take-back programs or local recycling events. Remember to erase personal data from devices before disposal to protect your privacy.
        </p>
      </div>
    </div>
  );

const NotificationsSection = () => (
  <div>
    <h1 className="text-3xl font-bold mb-8">Notifications</h1>
    <div className="text-gray-700">
      You have no new notifications. (Coming soon!)
    </div>
  </div>
);

const ProfileDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
    <div className="bg-[#f7faf7] min-h-screen flex pt-8 pb-8">
      {/* Sidebar */}
      <aside className="w-72 bg-transparent flex flex-col items-start px-10 pt-16">
        <div className="flex flex-col items-start mb-10">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-14 h-14 rounded-full object-cover mb-2"
          />
          <span className="font-semibold text-lg text-gray-900">
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
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 px-8 pt-20">
        <Routes>
          <Route path="/" element={<OverviewSection />} />
          <Route path="/edit" element={<EditProfileSection />} />
          <Route path="/credits" element={<MyCreditsSection />} />
          <Route path="/ewaste" element={<EWasteSection />} />
          <Route path="/notifications" element={<NotificationsSection />} />
        </Routes>
      </main>
      
    </div>
    <Footer />
    </>
  );
};

export default ProfileDashboard;
