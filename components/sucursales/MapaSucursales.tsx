"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

export type SucursalMarker = {
  id: string;
  nombre: string;
  direccion: string;
  lat: number;
  lng: number;
};

type MapaSucursalesProps = {
  sucursales: SucursalMarker[];
  selectedId: string | null;
  onSelect?: (id: string) => void;
};

const EL_SALVADOR_CENTER: [number, number] = [13.7942, -88.8965];
const EL_SALVADOR_ZOOM = 9;

const redIcon = L.divIcon({
  className: "",
  html: `<div style="background:#EC0127;width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.5);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const selectedIcon = L.divIcon({
  className: "",
  html: `<div style="background:#EC0127;width:32px;height:32px;border-radius:50%;border:4px solid white;box-shadow:0 0 0 4px rgba(236,1,39,0.4),0 6px 16px rgba(0,0,0,0.6);"></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function MapFocuser({
  sucursales,
  selectedId,
}: {
  sucursales: SucursalMarker[];
  selectedId: string | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedId) return;
    const target = sucursales.find((s) => s.id === selectedId);
    if (!target) return;
    map.flyTo([target.lat, target.lng], 15, { duration: 0.9 });
  }, [selectedId, sucursales, map]);

  return null;
}

function MapBoundsFitter({ sucursales }: { sucursales: SucursalMarker[] }) {
  const map = useMap();

  useEffect(() => {
    if (sucursales.length === 0) {
      map.setView(EL_SALVADOR_CENTER, EL_SALVADOR_ZOOM);
      return;
    }
    if (sucursales.length === 1) {
      const only = sucursales[0];
      map.flyTo([only.lat, only.lng], 14, { duration: 0.8 });
      return;
    }
    const bounds = L.latLngBounds(
      sucursales.map((s) => [s.lat, s.lng] as [number, number]),
    );
    map.flyToBounds(bounds, { padding: [40, 40], duration: 0.8, maxZoom: 13 });
  }, [sucursales, map]);

  return null;
}

export function MapaSucursales({ sucursales, selectedId, onSelect }: MapaSucursalesProps) {
  const markers = useMemo(() => sucursales, [sucursales]);

  return (
    <div className="h-full w-full overflow-hidden rounded-2xl border border-surface-border">
      <MapContainer
        center={EL_SALVADOR_CENTER}
        zoom={EL_SALVADOR_ZOOM}
        scrollWheelZoom
        className="h-full w-full"
        style={{ background: "#1E1E1E" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <MapBoundsFitter sucursales={markers} />
        <MapFocuser sucursales={markers} selectedId={selectedId} />

        {markers.map((sucursal) => {
          const isSelected = sucursal.id === selectedId;
          const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${sucursal.lat},${sucursal.lng}`;
          return (
            <Marker
              key={sucursal.id}
              position={[sucursal.lat, sucursal.lng]}
              icon={isSelected ? selectedIcon : redIcon}
              eventHandlers={{
                click: () => onSelect?.(sucursal.id),
              }}
            >
              <Popup>
                <div className="font-sans">
                  <div className="mb-1 font-bold text-[#1E1E1E]">{sucursal.nombre}</div>
                  <div className="mb-2 text-xs text-[#1E1E1E]">{sucursal.direccion}</div>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-md bg-[#EC0127] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white no-underline"
                  >
                    Cómo llegar
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
