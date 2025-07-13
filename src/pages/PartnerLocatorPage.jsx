import React, { useState, useEffect } from 'react';
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
      <div className="bg-[#f7faf7] min-h-screen w-full pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight text-center">Find Sustainable Partners Near You</h1>
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
            <h2 className="text-xl font-bold mb-4">Local Partners</h2>
            {loading && <div className="text-blue-600 font-semibold mb-4">Searching for centers...</div>}
            {partners.length === 0 && !loading && (
              <>
                <div className="text-gray-500 mb-4">No partners found nearby. Here are some trusted centers you can contact:</div>
                {HARDCODED_PARTNERS.map((partner, idx) => (
                  <PartnerCard key={idx} partner={partner} onSchedule={handleSchedule} />
                ))}
              </>
            )}
            {partners.map((partner, idx) => (
              <PartnerCard key={idx} partner={partner} onSchedule={handleSchedule} />
            ))}
          </div>
          <div className="flex justify-center">
            <button className="px-6 py-3 rounded-lg bg-[#2196f3] text-white font-semibold shadow hover:bg-[#1769aa] transition-colors">View All Partners</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PartnerLocatorPage; 