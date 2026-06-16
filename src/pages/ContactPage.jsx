import React, { useState } from 'react';
import Footer from '../components/Footer';
import { User, Mail, FileText, MessageSquare, Send, Phone, MapPin, Sparkles } from 'lucide-react';

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
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen w-full pt-28 pb-16 relative overflow-hidden transition-colors duration-300">
        {/* Decorative blur orbs */}
        <div className="absolute top-20 -right-32 w-80 h-80 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 -left-32 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto px-6 sm:px-8 relative z-10">
          {/* Page Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/30 text-teal-700 dark:text-teal-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              <Sparkles className="w-4 h-4" />
              Get In Touch
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
              Contact <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-slate-505 dark:text-slate-400 text-base md:text-lg">We're here to help! Reach out with any questions or feedback.</p>
          </div>

          {/* Form Card */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm p-8 mb-10">
            {/* Name Field */}
            <div className="mb-5">
              <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2">Your Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-4 h-4 text-slate-450 dark:text-slate-500" />
                </div>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 focus:outline-none text-base text-slate-800 dark:text-slate-205 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-5">
              <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2">Your Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-slate-450 dark:text-slate-500" />
                </div>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 focus:outline-none text-base text-slate-800 dark:text-slate-205 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Subject Field */}
            <div className="mb-5">
              <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2">Subject</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FileText className="w-4 h-4 text-slate-455 dark:text-slate-500" />
                </div>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Enter the subject"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 focus:outline-none text-base text-slate-800 dark:text-slate-205 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="mb-6">
              <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2">Message</label>
              <div className="relative">
                <div className="absolute top-3.5 left-0 pl-4 pointer-events-none">
                  <MessageSquare className="w-4 h-4 text-slate-455 dark:text-slate-500" />
                </div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 focus:outline-none text-base text-slate-800 dark:text-slate-205 placeholder-slate-400 dark:placeholder-slate-500 min-h-[120px] transition-all duration-200 resize-y"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold shadow-md hover:shadow-xl hover:shadow-teal-400/30 hover:-translate-y-0.5 transition-all duration-300 text-base cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>

          {/* Contact Information */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm p-8">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mb-3 shadow-lg shadow-teal-500/20">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email</div>
                <div className="text-slate-700 dark:text-slate-300 text-xs md:text-sm font-medium break-all">support@retrustplus.com</div>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mb-3 shadow-lg shadow-teal-500/20">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone</div>
                <div className="text-slate-700 dark:text-slate-300 text-xs md:text-sm font-medium whitespace-nowrap">+91 7719538411</div>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mb-3 shadow-lg shadow-teal-500/20">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Address</div>
                <div className="text-slate-700 dark:text-slate-300 text-xs md:text-sm font-medium">IIIT Kota, Rajasthan, India</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;