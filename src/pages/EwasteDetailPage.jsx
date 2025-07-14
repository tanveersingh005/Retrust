import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';
import PacmanLoader from 'react-spinners/PacmanLoader';
import PartnerMap from '../components/PartnerMap';
import PartnerCard from '../components/PartnerCard';

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
      <PacmanLoader color="#15803d" size={32} speedMultiplier={4} />
    </div>
  );
  if (!product) return <div className="p-8 text-center text-red-600">Product not found.</div>;

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
    <div className="min-h-screen bg-[#f7faf7] flex flex-col items-center pt-16 pb-8">
      <button
        className="mb-8 px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
        onClick={() => navigate(-1)}
      >
        &larr; Back to E-Waste Tracking
      </button>
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full border border-[#e0e7ef] flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-8 text-center w-full">Product Return Details</h1>
        <div className="flex flex-col md:flex-row items-center gap-8 w-full mb-8">
          <div className="flex-shrink-0 flex items-center justify-center">
            {(product.images && product.images.length > 0) ? (
              <img
                src={product.images[0]}
                alt="Product"
                className="w-32 h-32 object-cover rounded-2xl border bg-gray-50 shadow"
              />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/1829/1829586.png"
                alt="No product"
                className="w-32 h-32 object-cover rounded-2xl border bg-gray-50 shadow"
              />
            )}
          </div>
          <div className="flex-1 flex flex-col gap-2 text-lg">
            <div><span className="font-semibold">Item:</span> {product.item}</div>
            <div><span className="font-semibold">Date:</span> {new Date(product.createdAt).toLocaleDateString()}</div>
            <div className="flex items-center gap-2"><span className="font-semibold">Status:</span> <span className={`px-3 py-1 rounded-full font-semibold text-xs ${product.status === 'Recycled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{product.status}</span></div>
            <div><span className="font-semibold">Credits Earned:</span> {product.credits}</div>
            <div><span className="font-semibold">Condition:</span> {product.condition || 'N/A'}</div>
            <div><span className="font-semibold">CO₂ Saved:</span> {product.co2Saved || 'N/A'} kg</div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center mt-4">
          {product.status === 'Recycled' && !user.creditHistory?.some(h => h.item === product.item && h.credits === product.credits) && (
            <button
              className="flex-1 px-6 py-3 rounded-lg bg-green-600 text-white font-bold shadow hover:bg-green-700 transition-colors text-lg"
              onClick={handleRedeem}
            >
              Redeem Credits
            </button>
          )}
          <button
            className="flex-1 px-6 py-3 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition-colors text-lg"
            onClick={handleOpenModal}
          >
            Explore Nearby Centers
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl font-bold z-50"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Nearby Recycling Centers</h2>
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter your location"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white mb-4 focus:outline-none focus:ring-2 focus:ring-[#2196f3]/30 text-base"
            />
            <PartnerMap partners={partners} onMarkerDrag={handleMarkerDrag} markerPos={markerPos} />
            {markerAddress && (
              <div className="mb-4 text-center text-gray-700 font-medium">Selected Address: {markerAddress}</div>
            )}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-2">Local Partners</h3>
              {loadingPartners && <div className="text-blue-600 font-semibold mb-4">Searching for centers...</div>}
              {partners.length === 0 && !loadingPartners && (
                <>
                  <div className="text-gray-500 mb-4">No partners found nearby. Here are some trusted centers you can contact:</div>
                  {HARDCODED_PARTNERS.map((partner, idx) => (
                    <PartnerCard key={idx} partner={partner} onSchedule={() => alert(`Schedule requested for ${partner.name}`)} />
                  ))}
                </>
              )}
              {partners.map((partner, idx) => (
                <PartnerCard key={idx} partner={partner} onSchedule={() => alert(`Schedule requested for ${partner.name}`)} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EwasteDetailPage; 