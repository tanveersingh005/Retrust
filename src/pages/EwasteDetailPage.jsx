import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';

const EwasteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token, fetchUser, user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/returns/${id}`);
        setProduct(res.data);
      } catch {
        setProduct(null);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!product) return <div className="p-8 text-center text-red-600">Product not found.</div>;

  const handleRedeem = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/returns/${id}/redeem`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchUser(token);
      toast.success('Credits redeemed!');
    } catch {
      toast.error('Failed to redeem credits.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f7faf7] flex flex-col items-center pt-16 pb-8">
      <button
        className="mb-8 px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
        onClick={() => navigate(-1)}
      >
        &larr; Back to E-Waste Tracking
      </button>
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full border border-[#e0e7ef]">
        <h1 className="text-2xl font-bold mb-6">Product Return Details</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          {(product.images && product.images.length > 0) ? (
            product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Product ${idx+1}`}
                className="w-28 h-28 object-cover rounded-xl border bg-gray-50"
              />
            ))
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/1829/1829586.png"
              alt="No product"
              className="w-28 h-28 object-cover rounded-xl border bg-gray-50"
            />
          )}
        </div>
        <div className="mb-2"><span className="font-semibold">Item:</span> {product.item}</div>
        <div className="mb-2"><span className="font-semibold">Date:</span> {new Date(product.createdAt).toLocaleDateString()}</div>
        <div className="mb-2"><span className="font-semibold">Status:</span> <span className={`px-3 py-1 rounded-full font-semibold text-xs ${product.status === 'Recycled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{product.status}</span></div>
        <div className="mb-2"><span className="font-semibold">Credits Earned:</span> {product.credits}</div>
        <div className="mb-2"><span className="font-semibold">Condition:</span> {product.condition || 'N/A'}</div>
        <div className="mb-2"><span className="font-semibold">CO₂ Saved:</span> {product.co2Saved || 'N/A'} kg</div>
        {/* Add more fields as needed */}
        {product.status === 'Recycled' && !user.creditHistory?.some(h => h.item === product.item && h.credits === product.credits) && (
          <button
            className="mt-6 px-6 py-3 rounded-lg bg-green-600 text-white font-bold shadow hover:bg-green-700 transition-colors text-lg"
            onClick={handleRedeem}
          >
            Redeem Credits
          </button>
        )}
        <button
          className="mt-4 px-6 py-3 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition-colors text-lg"
          onClick={() => navigate('/partner-locator')}
        >
          Explore Nearby Centers
        </button>
      </div>
    </div>
  );
};

export default EwasteDetailPage; 