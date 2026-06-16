import React, { useState, useEffect } from 'react';
import { MapPin, Search, Building2, Users, ArrowRight, Loader2 } from 'lucide-react';
import Footer from '../components/Footer';
import PartnerMap from '../components/PartnerMap';
import PartnerCard from '../components/PartnerCard';

const PartnerLocatorPage = () => {
  const [location, setLocation] = useState('');
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [markerPos, setMarkerPos] = useState([51.505, -0.09]); // Default: London
  const [markerAddress, setMarkerAddress] = useState('');

  // Fetch real recycling/refurbish centers from Geoapify
  const fetchPartners = async (coords) => {
    setLoading(true);
    try {
      const apiKey = 'c0f7d1e2cf144f5cbd055917d59d338e'; // <-- Replace with your real key
      const lat = coords[0];
      const lon = coords[1];
      const radius = 5000; // meters
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
    } catch {
      setPartners([]);
    }
    setLoading(false);
  };

  // Reverse geocode marker position to address
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
    } catch {
      setMarkerAddress('');
    }
  };

  // Geocode location string to coordinates
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
    } catch {
      // Optionally log or handle error
    }
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

  // Called when marker is dragged
  const handleMarkerDrag = (coords) => {
    setMarkerPos(coords);
    fetchPartners(coords);
    reverseGeocode(coords);
  };

  const handleSchedule = (partner) => {
    alert(`Schedule requested for ${partner.name}`);
  };

  useEffect(() => {
    // Only run on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];
          setMarkerPos(coords);
          fetchPartners(coords);
          reverseGeocode(coords);
        },
        () => {
          // If denied or error, just use default (London)
          fetchPartners(markerPos);
          reverseGeocode(markerPos);
        }
      );
    } else {
      // Geolocation not supported
      fetchPartners(markerPos);
      reverseGeocode(markerPos);
    }
    // eslint-disable-next-line
  }, []);

  const HARDCODED_PARTNERS = [
    { name: 'EcoTech Recyclers', type: 'Electronics, Small Appliances' },
    { name: 'Renew Threads', type: 'Clothing, Textiles' },
    { name: 'ReHome Refurbishers', type: 'Furniture, Large Items' },
    { name: 'GreenLeaf Recycling', type: 'Bulk Pickup Available' },
  ];

  return (
    <>
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen w-full pt-28 pb-16 relative overflow-hidden transition-colors duration-300">
        {/* Decorative blur orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-teal-500/10 dark:bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-32 right-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/40 text-teal-700 dark:text-teal-400 text-sm font-bold mb-4">
              <Users className="w-3.5 h-3.5" />
              Partner Network
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Find Sustainable Partners{' '}
              <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Near You</span>
            </h1>
            <p className="mt-3 text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Locate trusted recycling centers, refurbishment partners, and eco-friendly services in your area.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <MapPin className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter your location..."
              className="w-full pl-14 pr-12 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 shadow-sm transition-all duration-200"
            />
            <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
              <Search className="w-4.5 h-4.5 text-slate-300 dark:text-slate-650" />
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-4 mb-6 overflow-hidden">
            <PartnerMap partners={partners} onMarkerDrag={handleMarkerDrag} markerPos={markerPos} />
          </div>

          {/* Selected Address */}
          {markerAddress && (
            <div className="mb-6 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-100 dark:border-slate-800 shadow-sm">
              <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                Selected Address: <span className="text-slate-900 dark:text-white">{markerAddress}</span>
              </span>
            </div>
          )}

          {/* Local Partners Section */}
          <div className="mb-10">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 shadow-sm">
                <Building2 className="w-4.5 h-4.5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Local Partners</h2>
            </div>

            {loading && (
              <div className="flex items-center gap-2.5 px-5 py-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 mb-5">
                <Loader2 className="w-5 h-5 text-teal-600 dark:text-teal-400 animate-spin" />
                <span className="text-teal-700 dark:text-teal-400 font-semibold">Searching for centers...</span>
              </div>
            )}

            {partners.length === 0 && !loading && (
              <>
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 mb-5">
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    No partners found nearby. Here are some trusted centers you can contact:
                  </p>
                </div>
                {HARDCODED_PARTNERS.map((partner, idx) => (
                  <PartnerCard key={idx} partner={partner} onSchedule={handleSchedule} />
                ))}
              </>
            )}

            {partners.map((partner, idx) => (
              <PartnerCard key={idx} partner={partner} onSchedule={handleSchedule} />
            ))}
          </div>

          {/* View All Partners Button */}
          <div className="flex justify-center">
            <button className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold shadow-md hover:shadow-xl hover:shadow-teal-500/20 hover:-translate-y-0.5 transition-all duration-300">
              View All Partners
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PartnerLocatorPage;