'use client';

import { TripData, ItineraryDay } from '@/lib/seed';
import { TripDataProvider, useTripData } from '@/components/TripDataProvider';
import { DayCard } from '@/components/DayCard';
import { MapSection, MapPlace } from '@/components/MapSection';

const PARIS_MAP_PLACES: MapPlace[] = [
  { name: '🏠 Airbnb La Garenne-Colombes', lat: 48.9048, lng: 2.2438, day: 'Airbnb', color: '#3C3489', isHome: true },
  { name: 'Gare du Nord (Eurostar arrival)', lat: 48.8809, lng: 2.3553, day: 'Sun May 24', color: '#7B5EA7' },
  { name: 'Champs-Élysées', lat: 48.8698, lng: 2.3078, day: 'Sun May 24', color: '#7B5EA7' },
  { name: 'Arc de Triomphe / Tomb of the Unknown Soldier', lat: 48.8738, lng: 2.2950, day: 'Sun May 24', color: '#7B5EA7' },
  { name: 'Trocadéro', lat: 48.8626, lng: 2.2892, day: 'Sun May 24', color: '#7B5EA7' },
  { name: 'Eiffel Tower', lat: 48.8584, lng: 2.2945, day: 'Mon May 25', color: '#D4537E' },
  { name: 'Louvre Museum', lat: 48.8606, lng: 2.3376, day: 'Mon May 25', color: '#D4537E' },
  { name: 'Notre-Dame Cathedral', lat: 48.8530, lng: 2.3499, day: 'Mon May 25', color: '#D4537E' },
  { name: 'Aaapoum Bapoum (14 Rue Serpente)', lat: 48.8523, lng: 2.3442, day: 'Mon May 25', color: '#D4537E' },
  { name: 'Latin Quarter', lat: 48.8496, lng: 2.3460, day: 'Mon May 25', color: '#D4537E' },
];

const PARIS_DAY_IDS = ['day-6', 'day-7'];

function ParisInner() {
  const { data, saveData } = useTripData();
  const parisDays = data.itinerary.filter((d) => PARIS_DAY_IDS.includes(d.id));

  const saveDay = async (day: ItineraryDay) => {
    await saveData({ ...data, itinerary: data.itinerary.map((d) => (d.id === day.id ? day : d)) });
  };

  return (
    <>
      <div className="mb-4">
        <h1 className="font-serif text-3xl mb-1" style={{ color: 'var(--text)' }}>🇫🇷 Paris</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>May 24–25, 2026 · Airbnb La Garenne-Colombes</p>
      </div>

      <MapSection places={PARIS_MAP_PLACES} />

      {parisDays.map((day) => (
        <div key={day.id}>
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-1.5 mt-3" style={{ color: 'var(--muted)' }}>
            {day.label}
          </p>
          <DayCard day={day} onSave={saveDay} />
        </div>
      ))}
    </>
  );
}

export function ParisClient({ data }: { data: TripData }) {
  return (
    <TripDataProvider initial={data}>
      <ParisInner />
    </TripDataProvider>
  );
}
