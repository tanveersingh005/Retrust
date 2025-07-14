import React, { useState, useMemo } from 'react';
import ShopFilters from '../components/ShopFilters';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const allProducts = [
  {
    name: 'Recycled Cotton T-Shirt',
    img: './assets/tshirt.jpg',
    condition: 'Excellent',
    confidence: '95%',
    co2Saved: 5,
    price: 20,
    category: 'Clothing',
    tags: ['Eco', 'Popular'],
  },
  {
    name: 'Vintage Leather Jacket',
    img: './assets/jacket.jpg',
    condition: 'Good',
    confidence: '88%',
    co2Saved: 10,
    price: 60,
    category: 'Clothing',
    tags: ['Premium'],
  },
  {
    name: 'Upcycled Denim Jeans',
    img: './assets/jeans.jpg',
    condition: 'Excellent',
    confidence: '92%',
    co2Saved: 7,
    price: 35,
    category: 'Clothing',
    tags: ['Eco', 'Budget'],
  },
  {
    name: 'Refurbished Smartwatch',
    img: './assets/watch.jpg',
    condition: 'Good',
    confidence: '85%',
    co2Saved: 3,
    price: 80,
    category: 'Electronics',
    tags: ['Popular'],
  },
  {
    name: 'Pre-owned Designer Handbag',
    img: './assets/handbag.jpg',
    condition: 'Excellent',
    confidence: '90%',
    co2Saved: 4,
    price: 120,
    category: 'Accessories',
    tags: ['Premium'],
  },
  {
    name: 'Sustainable Running Shoes',
    img: './assets/shoes.jpg',
    condition: 'Good',
    confidence: '82%',
    co2Saved: 6,
    price: 50,
    category: 'Clothing',
    tags: ['Eco'],
  },
  {
    name: 'Second-hand Gaming Console',
    img: './assets/console.jpg',
    condition: 'Excellent',
    confidence: '94%',
    co2Saved: 12,
    price: 200,
    category: 'Electronics',
    tags: ['Popular', 'Premium'],
  },
  {
    name: 'Eco-friendly Yoga Mat',
    img: './assets/yoga.jpg',
    condition: 'Good',
    confidence: '80%',
    co2Saved: 2,
    price: 15,
    category: 'Accessories',
    tags: ['Budget'],
  },
  {
    name: 'Used Camera Lens',
    img: './assets/lens.jpg',
    condition: 'Excellent',
    confidence: '91%',
    co2Saved: 3,
    price: 90,
    category: 'Electronics',
    tags: ['Premium'],
  },
  {
    name: 'Reclaimed Wood Furniture',
    img: './assets/furniture.jpg',
    condition: 'Good',
    confidence: '87%',
    co2Saved: 15,
    price: 300,
    category: 'Furniture',
    tags: ['Eco'],
  },
  {
    name: 'Solar Power Bank',
    img: './assets/solar-power-bank.jpg',
    condition: 'Excellent',
    confidence: '97%',
    co2Saved: 8,
    price: 45,
    category: 'Electronics',
    tags: ['Eco', 'Popular'],
  },
  {
    name: 'Organic Cotton Backpack',
    img: './assets/backpack.jpg',
    condition: 'Good',
    confidence: '89%',
    co2Saved: 6,
    price: 40,
    category: 'Accessories',
    tags: ['Eco', 'Budget'],
  },
  {
    name: 'LED Desk Lamp',
    img: './assets/led-lamp.jpg',
    condition: 'Good',
    confidence: '90%',
    co2Saved: 2,
    price: 25,
    category: 'Electronics',
    tags: ['Eco'],
  },
  {
    name: 'Recycled Glass Water Bottle',
    img: './assets/glass-bottle.jpg',
    condition: 'Excellent',
    confidence: '96%',
    co2Saved: 2,
    price: 12,
    category: 'Accessories',
    tags: ['Eco', 'Popular'],
  },
  {
    name: 'Compostable Phone Case',
    img: './assets/phone-case.jpg',
    condition: 'Excellent',
    confidence: '98%',
    co2Saved: 2,
    price: 18,
    category: 'Accessories',
    tags: ['Eco', 'Popular'],
  },
  {
    name: 'Refurbished Bluetooth Speaker',
    img: './assets/bluetooth-speaker.jpg',
    condition: 'Good',
    confidence: '87%',
    co2Saved: 4,
    price: 55,
    category: 'Electronics',
    tags: ['Popular', 'Budget'],
  },
  {
    name: 'Eco-Friendly Lunch Box',
    img: './assets/lunch-box.jpg',
    condition: 'Excellent',
    confidence: '95%',
    co2Saved: 3,
    price: 22,
    category: 'Accessories',
    tags: ['Eco', 'Budget'],
  },
  {
    name: 'Recycled Paper Notebook',
    img: './assets/notebook.jpg',
    condition: 'Excellent',
    confidence: '99%',
    co2Saved: 1,
    price: 6,
    category: 'Accessories',
    tags: ['Eco', 'Popular', 'Budget'],
  },
  {
    name: 'Upcycled Wool Blanket',
    img: './assets/blanket.jpg',
    condition: 'Good',
    confidence: '92%',
    co2Saved: 7,
    price: 38,
    category: 'Home',
    tags: ['Eco', 'Premium'],
  },
];

const ShopPage = ({ onSignInClick }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [condition, setCondition] = useState('All');
  const [co2Sort, setCo2Sort] = useState('None');
  const [priceSort, setPriceSort] = useState('None');
  const [tag, setTag] = useState('All');

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || p.category === category;
      const matchesCondition = condition === 'All' || p.condition === condition;
      const matchesTag = tag === 'All' || (p.tags && p.tags.includes(tag));
      return matchesSearch && matchesCategory && matchesCondition && matchesTag;
    });
    if (co2Sort === 'High to Low') filtered = filtered.slice().sort((a, b) => b.co2Saved - a.co2Saved);
    if (co2Sort === 'Low to High') filtered = filtered.slice().sort((a, b) => a.co2Saved - b.co2Saved);
    if (priceSort === 'Low to High') filtered = filtered.slice().sort((a, b) => a.price - b.price);
    if (priceSort === 'High to Low') filtered = filtered.slice().sort((a, b) => b.price - a.price);
    return filtered;
  }, [search, category, condition, co2Sort, priceSort, tag]);

  return (
    <>
    <div className="bg-[#f7faf7] min-h-screen w-full pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <ShopFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          condition={condition}
          setCondition={setCondition}
          co2Sort={co2Sort}
          setCo2Sort={setCo2Sort}
          priceSort={priceSort}
          setPriceSort={setPriceSort}
          tag={tag}
          setTag={setTag}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} onTagClick={setTag} onSignInClick={onSignInClick} />
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ShopPage; 