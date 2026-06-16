import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import LoadingSpinner from './LoadingSpinner';

const productTypes = ['Select Type', 'Clothing', 'Electronics', 'Accessories', 'Furniture'];
const categories = ['Select Category', 'Jacket', 'T-Shirt', 'Shoes', 'Watch', 'Bag', 'Other'];
const conditions = ['Select Condition', 'Excellent', 'Good', 'Fair', 'Poor'];

const ReturnForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    productType: '',
    category: '',
    condition: '',
    location: '',
    description: '',
    images: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImages = imgs => {
    setForm({ ...form, images: imgs });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-xl p-8 max-w-2xl mx-auto w-full animate-fade-in-up space-y-6 relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500" />
      
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">List Your Recycle Item</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 leading-normal">
          Provide accurate details and upload product images to help our team verify and grade your return.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider mb-2">Product Type</label>
          <div className="relative">
            <select
              name="productType"
              value={form.productType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500 focus:bg-white dark:focus:bg-slate-900 text-sm transition-all appearance-none cursor-pointer"
            >
              {productTypes.map(opt => <option key={opt} className="dark:bg-slate-900 dark:text-white">{opt}</option>)}
            </select>
            <span className="absolute right-4 top-3.5 pointer-events-none text-slate-400 dark:text-slate-500 text-xs">▼</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider mb-2">Category</label>
          <div className="relative">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500 focus:bg-white dark:focus:bg-slate-900 text-sm transition-all appearance-none cursor-pointer"
            >
              {categories.map(opt => <option key={opt} className="dark:bg-slate-900 dark:text-white">{opt}</option>)}
            </select>
            <span className="absolute right-4 top-3.5 pointer-events-none text-slate-400 dark:text-slate-500 text-xs">▼</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider mb-2">Estimated Condition</label>
          <div className="relative">
            <select
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500 focus:bg-white dark:focus:bg-slate-900 text-sm transition-all appearance-none cursor-pointer"
            >
              {conditions.map(opt => <option key={opt} className="dark:bg-slate-900 dark:text-white">{opt}</option>)}
            </select>
            <span className="absolute right-4 top-3.5 pointer-events-none text-slate-400 dark:text-slate-500 text-xs">▼</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider mb-2">Location / Pin Code</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Jaipur, Rajasthan"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500 focus:bg-white dark:focus:bg-slate-900 text-sm transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider mb-2">Detailed Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Please describe any defects, scratches, or wear-and-tear..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500 focus:bg-white dark:focus:bg-slate-900 text-sm transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider mb-3">Product Images</label>
        <ImageUploader images={form.images} setImages={handleImages} loading={loading} setLoading={setLoading} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-2xl bg-teal-650 hover:bg-teal-700 active:scale-95 text-white font-bold text-sm shadow-lg shadow-teal-700/10 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Listing
      </button>

      {loading && (
        <div className="flex flex-col items-center mt-4">
          <LoadingSpinner inline size="sm" />
          <span className="mt-3 text-teal-800 dark:text-teal-400 font-bold text-xs animate-pulse">Uploading product photos...</span>
        </div>
      )}
    </form>
  );
};

export default ReturnForm;