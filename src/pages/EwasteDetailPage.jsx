import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';
import PacmanLoader from 'react-spinners/PacmanLoader';
import PartnerMap from '../components/PartnerMap';
import PartnerCard from '../components/PartnerCard';
import { ArrowLeft, Leaf, ShieldCheck, Coins, RefreshCw } from 'lucide-react';

const EwasteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token, fetchUser, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState('');
  const [partners, setPartners] = useState([]);
  const [loadingPartners, setLoadingPartners] = useState(false);
  const [markerPos, setMarkerPos] = useState([51.505, -0.09]);
  const [markerAddress, setMarkerAddress] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/returns/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProduct(res.data);
      } catch { /* ignore error */ }
      setLoading(false);
    };
    fetchProduct();
  }, [id, token]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <PacmanLoader color="#0d9488" size={12} speedMultiplier={2} />
    </div>
  );
  if (!product) return <div className="p-8 text-center text-rose-600 font-semibold text-sm bg-rose-50 rounded-2xl max-w-sm mx-auto">Product details not found.</div>;

  const handleRedeem = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/returns/${id}/redeem`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchUser(token);
      toast.success('Credits redeemed!');
    } catch { /* ignore error */ }
  };

  const fetchPartners = async (coords) => {
    setLoadingPartners(true);
    try {
      const apiKey = 'c0f7d1e2cf144f5cbd055917d59d338e'; // Replace with your real key
      const lat = coords[0];
      const lon = coords[1];
      const radius = 5000;
      const url = `https://api.geoapify.com/v2/places?categories=service.recycling,shop.electronics&filter=circle:${lon},${lat},${radius}&limit=10&apiKey=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      setPartners(
        (data.features || []).map((item) => ({
          name: item.properties.name || item.properties.categories[0],
          type: item.properties.categories.join(', '),
          lat: item.geometry.coordinates[1],
          lon: item.geometry.coordinates[0],
          address: item.properties.address_line1 || '',
          city: item.properties.city || '',
        }))
      );
    } catch { /* ignore error */ }
    setLoadingPartners(false);
  };

  const reverseGeocode = async (coords) => {
    try {
      const apiKey = 'c0f7d1e2cf144f5cbd055917d59d338e';
      const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${coords[0]}&lon=${coords[1]}&apiKey=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.features && data.features[0]) {
        setMarkerAddress(data.features[0].properties.formatted);
      } else {
        setMarkerAddress('');
      }
    } catch { /* ignore error */ }
  };

  const geocodeLocation = async (query) => {
    try {
      const apiKey = 'c0f7d1e2cf144f5cbd055917d59d338e';
      const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&limit=1&apiKey=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.features && data.features[0]) {
        const coords = [data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]];
        setMarkerPos(coords);
        fetchPartners(coords);
        reverseGeocode(coords);
      }
    } catch { /* ignore error */ }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    if (e.target.value.length > 3) {
      geocodeLocation(e.target.value);
    } else {
      setPartners([]);
      setMarkerAddress('');
    }
  };

  const handleMarkerDrag = (coords) => {
    setMarkerPos(coords);
    fetchPartners(coords);
    reverseGeocode(coords);
  };

  const handleOpenModal = () => {
    setShowModal(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];
          setMarkerPos(coords);
          fetchPartners(coords);
          reverseGeocode(coords);
        },
        () => {
          fetchPartners(markerPos);
          reverseGeocode(markerPos);
        }
      );
    } else {
      fetchPartners(markerPos);
      reverseGeocode(markerPos);
    }
  };

  const HARDCODED_PARTNERS = [
    { name: 'EcoTech Recyclers', type: 'Electronics, Small Appliances' },
    { name: 'Renew Threads', type: 'Clothing, Textiles' },
    { name: 'ReHome Refurbishers', type: 'Furniture, Large Items' },
    { name: 'GreenLeaf Recycling', type: 'Bulk Pickup Available' },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up transition-colors duration-300">
      <button
        className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-350 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all shadow-sm"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4 text-slate-500 dark:text-slate-400" />
        <span>Back to Tracking</span>
      </button>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Product Image */}
        <div className="w-full md:w-48 aspect-square rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 flex items-center justify-center shrink-0">
          {(product.images && product.images.length > 0) ? (
            <img
              src={product.images[0]}
              alt="Product"
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/1829/1829586.png"
              alt="No product"
              className="w-24 h-24 object-contain opacity-50"
            />
          )}
        </div>

        {/* Product details */}
        <div className="flex-1 space-y-4 w-full">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-2">
              {product.item}
            </h2>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase border tracking-wider ${
                product.status === 'Recycled'
                  ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30'
                  : 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/30'
              }`}>
                {product.status}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Submitted on {new Date(product.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl p-3 flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 shrink-0">
                <Coins className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block leading-none">Incentives Value</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block">{product.credits} cr</span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl p-3 flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 shrink-0">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block leading-none">Carbon Offset</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block">{product.co2Saved || 0} kg</span>
              </div>
            </div>

            <div className="col-span-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl p-3 flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block leading-none">Graded Condition</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block">{product.condition || 'Excellent'}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-100 dark:border-slate-805">
            {product.status === 'Recycled' && !user.creditHistory?.some(h => h.item === product.item && h.credits === product.credits) && (
              <button
                className="flex-1 py-3 bg-emerald-650 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
                onClick={handleRedeem}
              >
                🪙 Redeem Credits
              </button>
            )}
            <button
              className="flex-1 py-3 bg-teal-650 hover:bg-teal-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
              onClick={handleOpenModal}
            >
              📍 Explore Centers
            </button>
          </div>
        </div>
      </div>

      {/* Map modal popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          />

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto z-10 space-y-6 animate-fade-in">
            <button
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-850 transition duration-200 text-lg"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>

            <div className="text-center">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Nearby Recycling Partners</h2>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Submit your recycled device to a local center to finalize verification.</p>
            </div>

            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter pin code or city..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:border-teal-500 focus:bg-white dark:focus:bg-slate-900 text-sm transition-all"
            />

            <PartnerMap partners={partners} onMarkerDrag={handleMarkerDrag} markerPos={markerPos} />

            {markerAddress && (
              <div className="text-xs text-center font-semibold text-slate-655 dark:text-slate-350 bg-slate-50 dark:bg-slate-955 border border-slate-200/50 dark:border-slate-800/80 rounded-xl p-3">
                Selected Address: {markerAddress}
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">Local Partners</h3>
              {loadingPartners && <div className="text-teal-600 dark:text-teal-400 font-semibold text-xs animate-pulse">Searching map entries...</div>}
              
              <div className="space-y-3">
                {partners.length === 0 && !loadingPartners ? (
                  <>
                    <p className="text-slate-400 dark:text-slate-500 text-xs">No partners found nearby. Trusted drop-off contact coordinates:</p>
                    {HARDCODED_PARTNERS.map((partner, idx) => (
                      <PartnerCard key={idx} partner={partner} onSchedule={() => alert(`Schedule requested for ${partner.name}`)} />
                    ))}
                  </>
                ) : (
                  partners.map((partner, idx) => (
                    <PartnerCard key={idx} partner={partner} onSchedule={() => alert(`Schedule requested for ${partner.name}`)} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EwasteDetailPage;