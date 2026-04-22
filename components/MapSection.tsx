'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const MapWithNoSSR = dynamic(() => import('./MapInner'), { ssr: false });

export interface MapPlace {
  name: string;
  lat: number;
  lng: number;
  day: string;
  color: string;
  isHome?: boolean;
}

export function MapSection({ places }: { places: MapPlace[] }) {
  const memoPlaces = useMemo(() => places, [places]);
  return (
    <div className="trip-card overflow-hidden mb-3" style={{ height: 380 }}>
      <MapWithNoSSR places={memoPlaces} />
    </div>
  );
}
