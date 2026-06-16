import React, { useState } from 'react';
import Footer from '../components/Footer';
import ReturnForm from '../components/ReturnForm';
import ImageUploader from '../components/ImageUploader';
import MLPredictionCard from '../components/MLPredictionCard';
import ImpactSection from '../components/ImpactSection';
import axios from 'axios';
import { useAuth } from '../context/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PartnerMap from '../components/PartnerMap';
import PartnerCard from '../components/PartnerCard';

const API_URL = import.meta.env.VITE_API_URL;

const ReturnProductPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [impact, setImpact] = useState(null);
  const [returnId, setReturnId] = useState(null);
  const [redeemed, setRedeemed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState('');
  const [partners, setPartners] = useState([]);
  const [loadingPartners, setLoadingPartners] = useState(false);
  const [markerPos, setMarkerPos] = useState([51.505, -0.09]);
  const [markerAddress, setMarkerAddress] = useState('');
  const { token, setUser, fetchUser } = useAuth();

  const handleSubmit = async (data) => {
    // Prepare images as URLs or base64 strings
    const images = (data.images || []).map(img => img.url || img);
    setSubmitting(true);
    try {
      const res = await axios.post(`${API_URL}/returns`, {
        item: data.category,
        condition: data.condition,
        images,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setImpact({
        co2: res.data.co2Saved,
        credits: res.data.credits,
        status: res.data.status,
        id: res.data._id,
        condition: res.data.condition,
        item: res.data.item,
      });
      setReturnId(res.data._id);
      setSubmitted(true);
      await fetchUser(token); // Refresh user data/notifications
    } catch {
      alert('Failed to submit return.');
    }
    setSubmitting(false);
  };

  const handleReset = () => {
    setSubmitted(false);
    setImpact(null);
    setReturnId(null);
    setRedeemed(false);
  };

  const handleRedeem = async () => {
    if (!returnId) return;
    try {
      const res = await axios.post(`${API_URL}/returns/${returnId}/redeem`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRedeemed(true);
      toast.success('Credits redeemed and added to your account!');
      if (res.data && res.data.user) setUser(res.data.user);
    } catch {
      toast.error('Failed to redeem credits.');
    }
  };

  const fetchPartners = async (coords) => {
    setLoadingPartners(true);
    try {
      const apiKey = 'c0f7d1e2cf144f5cbd055917d59d338e';
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
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen w-full pt-28 pb-16 relative overflow-hidden transition-colors duration-300">
        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {submitting && (
          <LoadingSpinner text="Processing your return..." />
        )}

        <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="mb-12 text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-3.5 py-1.5 rounded-full">
              Recycle Program
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">Return or List Your Item</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed">List items for refurbishment or recycling. Track carbon offsets and earn instant eco-credits.</p>
          </div>

          {!submitted ? (
            <ReturnForm onSubmit={handleSubmit} />
          ) : (
            <div className="space-y-8 animate-fade-in-up">
              {/* Impact summary card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-xl p-8 max-w-2xl mx-auto relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
                
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <span>🎉</span> Item Submitted Successfully
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
                  {/* CO2 Saved */}
                  <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100/60 dark:border-emerald-900/30 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                      🌱
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">CO₂ Saved</div>
                      <div className="text-2xl font-black text-emerald-800 dark:text-emerald-400 leading-none mt-1">
                        {impact?.co2 || 0}<span className="text-xs font-semibold ml-0.5">kg</span>
                      </div>
                    </div>
                  </div>

                  {/* Credits Earned */}
                  <div className="bg-teal-50/50 dark:bg-teal-950/10 border border-teal-100/60 dark:border-teal-900/30 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950 flex items-center justify-center text-teal-700 dark:text-teal-400 font-bold shrink-0">
                      🪙
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Credits Earned</div>
                      <div className="text-2xl font-black text-teal-800 dark:text-teal-400 leading-none mt-1">
                        {impact?.credits || 0}<span className="text-xs font-semibold ml-0.5">cr</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Details summary */}
                  <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl p-4">
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 text-xs block font-medium">Product Category</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{impact?.item || 'Other'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 text-xs block font-medium">Reported Condition</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{impact?.condition || 'Excellent'}</span>
                    </div>
                  </div>

                  {/* Next actions tags */}
                  <div>
                    <div className="text-xs font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider mb-2.5">
                      Target Lifecycle Actions
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400 border border-teal-100 dark:border-teal-900/40">Resell</span>
                      <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40">Repair</span>
                      <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40">Recycle</span>
                      <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 border border-purple-100 dark:border-purple-900/40">Donate</span>
                    </div>
                  </div>

                  {/* Progress Meter */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sustainability Impact</span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-450">{impact?.co2 ? Math.min(Math.round((impact.co2/100)*100), 100) : 2}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden border border-slate-200/30 dark:border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full transition-all duration-700"
                        style={{ width: `${impact?.co2 ? Math.min(Math.round((impact.co2/100)*100), 100) : 2}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
                <button
                  className="w-full sm:w-auto px-6 py-3.5 bg-teal-650 hover:bg-teal-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-teal-700/10 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                  onClick={handleOpenModal}
                >
                  📍 Find Nearby Centers
                </button>

                {!redeemed ? (
                  <button
                    className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-700/10 active:scale-95 transition-all cursor-pointer"
                    onClick={handleRedeem}
                  >
                    Redeem Credits
                  </button>
                ) : (
                  <div className="px-6 py-3.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-450 font-bold text-sm rounded-2xl border border-emerald-100 dark:border-emerald-900/30 text-center w-full sm:w-auto">
                    Credits Redeemed!
                  </div>
                )}

                <button
                  className="w-full sm:w-auto px-6 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-655 dark:text-slate-300 font-bold text-sm rounded-2xl active:scale-95 transition-all cursor-pointer"
                  onClick={handleReset}
                >
                  Submit Another
                </button>
              </div>
            </div>
          )}

          {/* Map Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                onClick={() => setShowModal(false)}
              />

              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto z-10 space-y-6">
                <button
                  className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-850 transition duration-200"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  <span className="text-xl">&times;</span>
                </button>

                <div className="text-center">
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Nearby Recycling Centers</h2>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Locate verified partners to drop off your recycled items.</p>
                </div>

                <input
                  type="text"
                  value={location}
                  onChange={handleLocationChange}
                  placeholder="Enter pin code or city (e.g. Jaipur)"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:border-teal-500 focus:bg-white dark:focus:bg-slate-900 text-sm transition-all"
                />

                <PartnerMap partners={partners} onMarkerDrag={handleMarkerDrag} markerPos={markerPos} />

                {markerAddress && (
                  <div className="text-xs text-center font-semibold text-slate-605 dark:text-slate-350 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/80 rounded-xl p-3">
                    Selected Address: {markerAddress}
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">Local Partners</h3>
                  {loadingPartners && <div className="text-teal-600 dark:text-teal-400 font-semibold text-xs">Searching for centers...</div>}
                  
                  <div className="space-y-3">
                    {partners.length === 0 && !loadingPartners ? (
                      <>
                        <p className="text-slate-400 dark:text-slate-500 text-xs">No partners found nearby. Here are some trusted centers you can contact:</p>
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
      </div>
      <Footer />
    </>
  );
};

export default ReturnProductPage;