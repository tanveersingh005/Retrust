import React from 'react';
import { Link } from 'react-router-dom';

const bgImage = './assets/hero-bg.jpg'; // Place your image in src/assets/ and use this path

const HeroBanner = () => (
  <section className="relative flex flex-col items-center justify-center text-center py-16 md:py-24 rounded-3xl shadow-lg overflow-hidden animate-fade-in-up min-h-[400px] md:min-h-[520px] z-10">
    {/* Background image */}
    <img
      src={bgImage}
      alt="Eco background"
      className="absolute inset-0 w-full h-full object-cover object-center z-0"
    />
    {/* Overlay gradient for readability */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#e6f0ee]/50 via-white/50 to-[#e6f0ee]/50 z-10" />
    {/* Decorative shapes */}
    <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#b2dfdb] rounded-full opacity-30 blur-2xl z-20" />
    <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-[#81c784] rounded-full opacity-20 blur-2xl z-20" />
    {/* Content */}
    <div className="z-30 relative">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight drop-shadow-lg">ReTrust+</h1>
      <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto font-medium">Shop refurbished, return your items, and earn impact credits.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/shop">
          <button className="px-8 py-3 rounded-full bg-[#2e7d32] text-white font-bold text-lg shadow-lg hover:bg-[#256427] transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2e7d32]/50">Shop Refurbished</button>
        </Link>
        <Link to="/return">
          <button className="px-8 py-3 rounded-full bg-white border-2 border-[#2e7d32] text-[#2e7d32] font-bold text-lg shadow-lg hover:bg-[#2e7d32] hover:text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2e7d32]/50">Return Product</button>
        </Link>
      </div>
    </div>
  </section>
);

export default HeroBanner; 