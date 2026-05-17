"use client";

import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

export type MiniSucursalMarker = {
  id: string;
  nombre: string;
  lat: number;
  lng: number;
};

interface MiniMapaHomeProps {
  sucursales: MiniSucursalMarker[];
}

const SAN_SALVADOR_CENTER: [number, number] = [13.7942, -88.8965];
const DEFAULT_ZOOM = 9;

const redIcon = L.divIcon({
  className: "",
  html: `<div style="background:#EC0127;width:18px;height:18px;border-radius:50%;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export function MiniMapaHome({ sucursales }: MiniMapaHomeProps) {
  return (
    <div className="h-full w-full overflow-hidden rounded-2xl border border-surface-border">
      <MapContainer
        center={SAN_SALVADOR_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={false}
        dragging
        doubleClickZoom={false}
        className="h-full w-full"
        style={{ background: "#1E1E1E" }}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {sucursales.map((sucursal) => (
          <Marker
            key={sucursal.id}
            position={[sucursal.lat, sucursal.lng]}
            icon={redIcon}
            title={sucursal.nombre}
          />
        ))}
      </MapContainer>
    </div>
  );
}
