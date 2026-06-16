import React from 'react';
import Footer from '../components/Footer';
import { Clock, Shield, Users, Package, Trash2, UserCheck, Cpu, Sparkles } from 'lucide-react';

const values = [
  {
    icon: <Clock className="w-6 h-6 text-white" />,
    title: 'Sustainability',
    desc: 'We are committed to minimizing environmental impact through circular retail practices.'
  },
  {
    icon: <Shield className="w-6 h-6 text-white" />,
    title: 'Trust',
    desc: 'We ensure a secure and transparent platform for all transactions.'
  },
  {
    icon: <Users className="w-6 h-6 text-white" />,
    title: 'Community',
    desc: 'We foster a community of conscious consumers and sellers.'
  },
];

const team = [
  {
    img: './assets/team1.jpg',
    name: 'Tushar Jain',
    // role: 'CEO',
  },
  {
    img: './assets/team2.jpg',
    name: 'Akshat Jangra',
    // role: 'Head of Sustainability',
  },
  {
    img: './assets/team3.jpg',
    name: 'Tanveer Singh',
    // role: 'CTO',
  },
  {
    img: './assets/team4.jpg',
    name: 'Bhoomika Bhatia',
    // role: 'CTO',
  },
];

const impact = [
  { label: 'Items Rehomed', value: '10,000+', icon: <Package className="w-7 h-7 text-white" /> },
  { label: 'Waste Reduced', value: '50 Tons', icon: <Trash2 className="w-7 h-7 text-white" /> },
  { label: 'Community Members', value: '5,000+', icon: <UserCheck className="w-7 h-7 text-white" /> },
];

const AboutPage = () => (

  <>
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen w-full pt-28 pb-16 relative overflow-hidden transition-colors duration-300">
      {/* Decorative blur orbs */}
      <div className="absolute top-20 -left-32 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 -right-32 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Page Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/30 text-teal-700 dark:text-teal-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            Our Story
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            About <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">ReTrust+</span>
          </h1>
          <p className="text-slate-650 dark:text-slate-400 text-base md:text-lg max-w-3xl leading-relaxed">ReTrust+ is a sustainable commerce platform dedicated to promoting circular retail. Our mission is to reduce waste and extend the life cycle of products by facilitating the buying and selling of pre-owned items. We envision a future where sustainable consumption is the norm, and every product finds a new home.</p>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/30 text-teal-700 dark:text-teal-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            Our Values
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mb-4 shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform duration-300">
                  {v.icon}
                </div>
                <div className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{v.title}</div>
                <div className="text-slate-505 dark:text-slate-400 text-sm leading-relaxed">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/30 text-teal-700 dark:text-teal-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            Our Team
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight">Meet the People Behind ReTrust+</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="group flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="absolute -inset-1 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                  <div className="relative p-1 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full">
                    <img src={member.img} alt={member.name} className="w-28 h-28 rounded-full object-cover border-3 border-white dark:border-slate-900" />
                  </div>
                </div>
                <div className="font-bold text-slate-900 dark:text-white text-center">{member.name}</div>
                <div className="text-slate-400 dark:text-slate-500 text-sm">{member.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Technology */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/30 text-teal-700 dark:text-teal-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            Technology
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">Built for the Future</h2>
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/20">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <p className="text-slate-650 dark:text-slate-400 text-base leading-relaxed">Our platform utilizes advanced technology to ensure a seamless and secure experience. We employ robust authentication and verification processes to build trust between buyers and sellers. Our smart matching algorithms connect users with products that align with their preferences and values.</p>
            </div>
          </div>
        </div>

        {/* Our Impact */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/30 text-teal-700 dark:text-teal-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            Our Impact
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">Making a Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impact.map((stat) => (
              <div key={stat.label} className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm p-8 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mb-4 shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <span className="text-3xl font-extrabold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-1">{stat.value}</span>
                <div className="text-slate-505 dark:text-slate-400 text-base font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default AboutPage;