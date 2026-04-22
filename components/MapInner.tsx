'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPlace } from './MapSection';

export default function MapInner({ places }: { places: MapPlace[] }) {
  const bounds: [number, number][] = places.map((p) => [p.lat, p.lng]);
  const center: [number, number] = bounds.length
    ? [bounds.reduce((s, b) => s + b[0], 0) / bounds.length, bounds.reduce((s, b) => s + b[1], 0) / bounds.length]
    : [51.5, -0.1];

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
      bounds={bounds.length >= 2 ? bounds : undefined}
      boundsOptions={{ padding: [30, 30] }}
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        // @ts-ignore
        subdomains="abcd"
        maxZoom={20}
      />
      {places.map((p) => (
        <CircleMarker
          key={p.name}
          center={[p.lat, p.lng]}
          radius={p.isHome ? 10 : 7}
          pathOptions={{
            fillColor: p.color,
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9,
          }}
        >
          <Popup>
            <strong style={{ fontSize: 13 }}>{p.name}</strong>
            <br />
            <span style={{ fontSize: 11, color: '#666' }}>{p.day}</span>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
