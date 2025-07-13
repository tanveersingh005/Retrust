import React from 'react';

const categories = ['All', 'Clothing', 'Electronics', 'Accessories', 'Furniture'];
const conditions = ['All', 'Excellent', 'Good'];
const co2Sorts = ['None', 'High to Low', 'Low to High'];
const priceSorts = ['None', 'Low to High', 'High to Low'];
const tags = ['All', 'Eco', 'Premium', 'Budget', 'Popular'];

const ShopFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  condition,
  setCondition,
  co2Sort,
  setCo2Sort,
  priceSort,
  setPriceSort,
  tag,
  setTag,
}) => (
  <div className="w-full flex flex-col md:flex-row items-center gap-4 mb-8">
    <input
      type="text"
      placeholder="Search for products"
      value={search}
      onChange={e => setSearch(e.target.value)}
      className="flex-1 px-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-base"
    />
    <div className="flex flex-wrap gap-2 md:gap-4 w-full md:w-auto justify-start md:justify-end">
      <select value={category} onChange={e => setCategory(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm text-base focus:outline-none">
        {categories.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <select value={condition} onChange={e => setCondition(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm text-base focus:outline-none">
        {conditions.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <select value={co2Sort} onChange={e => setCo2Sort(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm text-base focus:outline-none">
        {co2Sorts.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <select value={priceSort} onChange={e => setPriceSort(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm text-base focus:outline-none">
        {priceSorts.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <select value={tag} onChange={e => setTag(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm text-base focus:outline-none">
        {tags.map(opt => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  </div>
);

export default ShopFilters; 