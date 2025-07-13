import React, { useEffect, useRef } from 'react';
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

function ChangeMapView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

// Accept markerPos as a prop
const PartnerMap = ({ partners = [], onMarkerDrag, markerPos = [51.505, -0.09] }) => {
  const markerRef = useRef(null);

  // Handler for marker drag end
  const handleDragEnd = () => {
    const marker = markerRef.current;
    if (marker) {
      const latlng = marker.getLatLng();
      if (onMarkerDrag) {
        onMarkerDrag([latlng.lat, latlng.lng]);
      }
    }
  };

  return (
    <div className="mb-8">
      <MapContainer center={markerPos} zoom={13} style={{ height: 250, width: '100%' }} className="rounded-xl overflow-hidden">
        <ChangeMapView center={markerPos} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />
        {/* Draggable marker for user selection */}
        <Marker
          position={markerPos}
          icon={markerIcon}
          draggable={true}
          eventHandlers={{ dragend: handleDragEnd }}
          ref={markerRef}
        >
          <Popup>
            Selected Location<br />
            Lat: {markerPos[0].toFixed(5)}, Lng: {markerPos[1].toFixed(5)}
          </Popup>
        </Marker>
        {/* Markers for each partner */}
        {partners.map((partner, idx) => (
          <Marker
            key={idx}
            position={[parseFloat(partner.lat), parseFloat(partner.lon)]}
            icon={markerIcon}
          >
            <Popup>
              <div className="font-bold">{partner.name}</div>
              <div className="text-xs text-gray-600">{partner.address}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PartnerMap;