import React, { useState } from 'react';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // For demo, just clear the form
    setForm({ name: '', email: '', subject: '', message: '' });
    alert('Thank you for contacting us!');
  };

  return (
    <>
      <div className="bg-[#f7faf7] min-h-screen w-full pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Contact Us</h1>
          <p className="text-gray-600 mb-8">We're here to help! Reach out with any questions or feedback.</p>
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="mb-5">
              <label className="block text-gray-800 mb-1">Your Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg border border-[#d3e7d3] bg-white focus:outline-none focus:ring-2 focus:ring-[#b7e4c7] text-base"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block text-gray-800 mb-1">Your Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-[#d3e7d3] bg-white focus:outline-none focus:ring-2 focus:ring-[#b7e4c7] text-base"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block text-gray-800 mb-1">Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Enter the subject"
                className="w-full px-4 py-2 rounded-lg border border-[#d3e7d3] bg-white focus:outline-none focus:ring-2 focus:ring-[#b7e4c7] text-base"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-800 mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Enter your message"
                className="w-full px-4 py-2 rounded-lg border border-[#d3e7d3] bg-white focus:outline-none focus:ring-2 focus:ring-[#b7e4c7] text-base min-h-[100px]"
                required
              />
            </div>
            <button type="submit" className="px-6 py-2 rounded-full bg-[#b7e4c7] text-gray-900 font-semibold hover:bg-[#95d5b2] transition-colors">Submit</button>
          </form>
          <div className="mt-10">
            <h2 className="font-bold text-lg mb-2">Contact Information</h2>
            <div className="mb-1">Email: <span className="text-gray-700">support@retrustplus.com</span></div>
            <div className="mb-1">Phone: <span className="text-gray-700">+91 7719538411</span></div>
            <div>Address: <span className="text-gray-700">Indian Institute Of Information Technology Kota</span></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage; 