import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/useAuth';
import { Leaf, ShieldCheck, ShoppingCart, Plus, Minus } from 'lucide-react';

const ProductCard = ({ product, onTagClick, onSignInClick }) => {
  const { cart, addToCart, updateQty, removeFromCart } = useCart();
  const { user } = useAuth();
  const cartItem = cart.find(item => item.id === product.id || item.name === product.name);

  const handleAction = (e, callback) => {
    e.stopPropagation();
    if (!user) {
      onSignInClick();
    } else {
      callback();
    }
  };

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-5 flex flex-col justify-between overflow-hidden relative">
      {/* Save CO₂ badge on top left */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/30 shadow-sm">
        <Leaf className="w-3.5 h-3.5 shrink-0" />
        <span>{product.co2Saved} saved</span>
      </div>

      {/* Main content */}
      <div className="w-full">
        {/* Product image with background bubble */}
        <div className="relative aspect-square w-full bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden mb-5 flex items-center justify-center border border-slate-100/50 dark:border-slate-850">
          <img
            src={product.img}
            alt={product.name}
            className="w-40 h-40 object-contain group-hover:scale-110 transition-all duration-500"
          />
        </div>

        {/* Categories tags */}
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {product.tags && product.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 text-slate-500 dark:text-slate-400 font-semibold cursor-pointer hover:bg-teal-50 dark:hover:bg-teal-950/25 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-150 transition-colors"
              onClick={e => { e.stopPropagation(); onTagClick && onTagClick(tag); }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-250 truncate">
          {product.name}
        </h3>

        {/* Condition & Confidence Indicators */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            product.condition === 'Excellent'
              ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30'
              : 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/30'
          }`}>
            {product.condition}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-505 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
            <span>{product.confidence} confidence</span>
          </div>
        </div>
      </div>

      {/* Pricing and Action block */}
      <div className="pt-4 border-t border-slate-100/80 dark:border-slate-800 flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-slate-400 dark:text-slate-505 text-[10px] uppercase font-semibold tracking-wider">Credits</span>
          <span className="text-slate-800 dark:text-white font-bold text-lg leading-tight">
            {product.price} <span className="text-sm font-semibold text-teal-600">cr</span>
          </span>
        </div>

        {/* Interactive Add to Cart buttons */}
        <div>
          {cartItem ? (
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-1.5 rounded-xl shadow-inner">
              <button
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all"
                onClick={(e) => handleAction(e, () => {
                  if (cartItem.qty > 1) {
                    updateQty(cartItem.id || cartItem.name, cartItem.qty - 1);
                  } else {
                    removeFromCart(cartItem.id || cartItem.name);
                  }
                })}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-slate-800 dark:text-white text-sm w-5 text-center">{cartItem.qty}</span>
              <button
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all"
                onClick={(e) => handleAction(e, () => updateQty(cartItem.id || cartItem.name, cartItem.qty + 1))}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              className="p-3 bg-teal-650 hover:bg-teal-700 active:scale-95 text-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              onClick={(e) => handleAction(e, () => addToCart({ ...product, id: product.id || product.name }))}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-xs font-semibold px-0.5">Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;