import React from 'react';
import Footer from '../components/Footer';

const values = [
  {
    icon: (
      <svg className="w-7 h-7 text-green-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M12 6v6l4 2" /></svg>
    ),
    title: 'Sustainability',
    desc: 'We are committed to minimizing environmental impact through circular retail practices.'
  },
  {
    icon: (
      <svg className="w-7 h-7 text-green-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
    ),
    title: 'Trust',
    desc: 'We ensure a secure and transparent platform for all transactions.'
  },
  {
    icon: (
      <svg className="w-7 h-7 text-green-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
    ),
    title: 'Community',
    desc: 'We foster a community of conscious consumers and sellers.'
  },
];

const team = [
  {
    img: './src/assets/team1.jpg',
    name: 'Tushar Jain',
    // role: 'CEO',
  },
  {
    img: './src/assets/team2.jpg',
    name: 'Akshat Jangra',
    // role: 'Head of Sustainability',
  },
  {
    img: './src/assets/team3.jpg',
    name: 'Tanveer Singh',
    // role: 'CTO',
  },
  {
    img: './src/assets/team4.jpg',
    name: 'Bhoomika Bhatia',
    // role: 'CTO',
  },
];

const impact = [
  { label: 'Items Rehomed', value: '10,000+' },
  { label: 'Waste Reduced', value: '50 Tons' },
  { label: 'Community Members', value: '5,000+' },
];

const AboutPage = () => (

  <>
    <div className="bg-[#f7faf7] min-h-screen w-full pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">About ReTrust+</h1>
        <p className="text-gray-700 text-base md:text-lg mb-10 max-w-3xl">ReTrust+ is a sustainable commerce platform dedicated to promoting circular retail. Our mission is to reduce waste and extend the life cycle of products by facilitating the buying and selling of pre-owned items. We envision a future where sustainable consumption is the norm, and every product finds a new home.</p>
        <h2 className="text-xl font-bold mb-4">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {values.map((v, idx) => (
            <div key={idx} className="bg-[#f1f6f2] rounded-xl p-6 flex flex-col items-start border border-[#e3eae3]">
              <div className="mb-3">{v.icon}</div>
              <div className="font-semibold text-lg mb-1 text-gray-900">{v.title}</div>
              <div className="text-gray-600 text-sm">{v.desc}</div>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-4">Our Team</h2>
        <div className="flex flex-col md:flex-row gap-28 mb-12 items-left justify-center">
          {team.map((member, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full object-cover mb-3 border-4 border-[#e3eae3]" />
              <div className="font-semibold text-gray-900">{member.name}</div>
              <div className="text-gray-500 text-sm">{member.role}</div>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-4">Our Technology</h2>
        <p className="text-gray-700 text-base mb-10 max-w-3xl">Our platform utilizes advanced technology to ensure a seamless and secure experience. We employ robust authentication and verification processes to build trust between buyers and sellers. Our smart matching algorithms connect users with products that align with their preferences and values.</p>
        <h2 className="text-xl font-bold mb-4">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {impact.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 flex flex-col items-center border border-[#e3eae3]">
              <div className="text-2xl font-extrabold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default AboutPage; 