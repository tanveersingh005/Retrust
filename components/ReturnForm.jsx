import React, { useState } from 'react';
import ImageUploader from './ImageUploader';

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
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto w-full animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">List Your Item</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
          <select name="productType" value={form.productType} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none">
            {productTypes.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none">
            {categories.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Condition Guess</label>
          <select name="condition" value={form.condition} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none">
            {conditions.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input name="location" value={form.location} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none" placeholder="Enter Location" />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none" rows={3} placeholder="Describe your item" />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Product Images</label>
        <ImageUploader images={form.images} setImages={handleImages} />
      </div>
      <button type="submit" className="w-full py-3 rounded-lg bg-primary text-gray-700 font-medium text-lg shadow hover:bg-primary-dark transition-colors duration-200">Submit</button>
    </form>
  );
};

export default ReturnForm; 