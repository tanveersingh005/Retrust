import React from 'react';

const ProductCard = ({ product, onTagClick }) => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 p-4 flex flex-col items-center group cursor-pointer">
    <img
      src={product.img}
      alt={product.name}
      className="w-32 h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-200"
    />
    <h3 className="font-semibold text-base text-gray-900 mb-1 text-center">{product.name}</h3>
    <div className="flex flex-wrap gap-1 mb-1">
      {product.tags && product.tags.map(tag => (
        <span
          key={tag}
          className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 font-medium cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors duration-150"
          onClick={e => { e.stopPropagation(); onTagClick && onTagClick(tag); }}
        >
          {tag}
        </span>
      ))}
    </div>
    <div className="flex items-center gap-2 mb-1">
      <span className={`text-xs px-2 py-1 rounded font-medium ${product.condition === 'Excellent' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{product.condition}</span>
      <span className="text-xs text-gray-400">({product.confidence} confidence)</span>
    </div>
    <span className="text-xs text-gray-500">CO₂ saved: {product.co2Saved}</span>
  </div>
);

export default ProductCard; 