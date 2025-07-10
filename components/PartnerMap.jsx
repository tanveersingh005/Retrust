import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: '/assets/marker-icon.png',
  shadowUrl: '/assets/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Helper to update map center
function ChangeMapView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

const PartnerMap = ({ location, setLocation }) => {
  const [center, setCenter] = useState([51.505, -0.09]); // Default: London

  // Get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setCenter([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  // Geocode location string to lat/lng
  const handleLocationChange = async e => {
    setLocation(e.target.value);
    if (e.target.value.length > 3) {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(e.target.value)}`
      );
      const data = await res.json();
      if (data && data[0]) {
        setCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      }
    }
  };

  return (
    <div className="mb-8">
      <input
        type="text"
        value={location}
        onChange={handleLocationChange}
        placeholder="Enter your location"
        className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white mb-4 focus:outline-none focus:ring-2 focus:ring-[#2196f3]/30 text-base"
      />
      <MapContainer center={center} zoom={13} style={{ height: 250, width: '100%' }} className="rounded-xl overflow-hidden">
        <ChangeMapView center={center} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="" // Remove text, but see note above
        />
        <Marker position={center} icon={markerIcon}>
          <Popup>
            Selected Location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PartnerMap;