import React from 'react';

const products = [
  {
    name: 'Refurbished Laptop',
    desc: 'High-performance laptop, like new',
    img: './assets/laptop.jpg',
    condition: 'Excellent',
    badgeColor: 'bg-green-100 text-green-700',
  },
  {
    name: 'Refurbished Smartwatch',
    desc: 'Latest smartwatch, fully restored',
    img: './assets/watch.jpg',
    condition: 'Good',
    badgeColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    name: 'Refurbished Headphones',
    desc: 'Premium headphones, excellent condition',
    img: './assets/headphones.jpg',
    condition: 'Excellent',
    badgeColor: 'bg-green-100 text-green-700',
  },
];

const FeaturedProductsSection = () => (
  <section className="my-16 animate-fade-in-up delay-300">
    <h2 className="text-2xl font-bold mb-8 text-center">Featured Refurbished Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <div key={product.name} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition-transform duration-200 hover:-translate-y-2 hover:shadow-xl">
          <img src={product.img} alt={product.name} className="w-32 h-32 object-cover rounded-lg mb-4 shadow" />
          <h4 className="font-semibold mb-1 text-lg text-gray-900">{product.name}</h4>
          <p className="text-gray-500 text-sm mb-2 text-center">{product.desc}</p>
          <span className={`inline-block ${product.badgeColor} text-xs px-2 py-1 rounded mb-1`}>{product.condition}</span>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturedProductsSection; 