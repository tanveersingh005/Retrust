import React from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Tag as TagIcon, Leaf, Sparkles } from 'lucide-react';

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
  <div className="w-full space-y-6 mb-10">
    {/* Upper Section: Search + Filters controls */}
    <div className="flex flex-col md:flex-row items-stretch gap-4">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search for premium refurbished items..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 text-sm transition-all text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
        />
      </div>

      {/* Select Filter Drops */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3">
        {/* Condition Filter */}
        <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl px-3 py-2.5 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <select
            value={condition}
            onChange={e => setCondition(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none pr-6 cursor-pointer appearance-none"
          >
            {conditions.map(opt => <option key={opt} value={opt} className="dark:bg-slate-900 dark:text-slate-350">Cond: {opt}</option>)}
          </select>
          <span className="absolute right-3 pointer-events-none text-slate-400 text-[10px]">▼</span>
        </div>

        {/* CO2 Sort */}
        <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl px-3 py-2.5 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <Leaf className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
          <select
            value={co2Sort}
            onChange={e => setCo2Sort(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none pr-6 cursor-pointer appearance-none"
          >
            {co2Sorts.map(opt => <option key={opt} value={opt} className="dark:bg-slate-900 dark:text-slate-350">CO₂: {opt}</option>)}
          </select>
          <span className="absolute right-3 pointer-events-none text-slate-400 text-[10px]">▼</span>
        </div>

        {/* Price Sort */}
        <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl px-3 py-2.5 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <ArrowUpDown className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <select
            value={priceSort}
            onChange={e => setPriceSort(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none pr-6 cursor-pointer appearance-none"
          >
            {priceSorts.map(opt => <option key={opt} value={opt} className="dark:bg-slate-900 dark:text-slate-350">Price: {opt}</option>)}
          </select>
          <span className="absolute right-3 pointer-events-none text-slate-400 text-[10px]">▼</span>
        </div>

        {/* Tag Filter */}
        <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl px-3 py-2.5 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <TagIcon className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <select
            value={tag}
            onChange={e => setTag(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none pr-6 cursor-pointer appearance-none"
          >
            {tags.map(opt => <option key={opt} value={opt} className="dark:bg-slate-900 dark:text-slate-350">Tag: {opt}</option>)}
          </select>
          <span className="absolute right-3 pointer-events-none text-slate-400 text-[10px]">▼</span>
        </div>
      </div>
    </div>

    {/* Lower Section: Category Pill Capsules */}
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap mr-2">Categories:</span>
      <div className="flex items-center gap-2">
        {categories.map((cat) => {
          const isActive = category === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 border whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/10'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

export default ShopFilters;