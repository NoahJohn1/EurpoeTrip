'use client';

import { TripData, ItineraryDay } from '@/lib/seed';
import { TripDataProvider, useTripData } from '@/components/TripDataProvider';
import { DayCard } from '@/components/DayCard';
import { MapSection, MapPlace } from '@/components/MapSection';

const LONDON_MAP_PLACES: MapPlace[] = [
  { name: '🏨 Premier Inn Aldgate (Hotel)', lat: 51.5134, lng: -0.0711, day: 'Hotel', color: '#0C447C', isHome: true },
  { name: 'Brick Lane / Spitalfields', lat: 51.5225, lng: -0.0708, day: 'Wed May 20', color: '#2196F3' },
  { name: 'Tower of London', lat: 51.5081, lng: -0.0759, day: 'Thu May 21', color: '#FF9800' },
  { name: 'Tower Bridge', lat: 51.5055, lng: -0.0754, day: 'Thu May 21', color: '#FF9800' },
  { name: 'Sky Garden (20 Fenchurch St)', lat: 51.5114, lng: -0.0834, day: 'Thu May 21', color: '#FF9800' },
  { name: 'OVO Arena Wembley', lat: 51.5590, lng: -0.2796, day: 'Thu May 21', color: '#FF9800' },
  { name: 'Westminster Abbey', lat: 51.4994, lng: -0.1273, day: 'Fri May 22', color: '#4CAF50' },
  { name: 'Big Ben & Houses of Parliament', lat: 51.5001, lng: -0.1245, day: 'Fri May 22', color: '#4CAF50' },
  { name: 'Buckingham Palace', lat: 51.5014, lng: -0.1419, day: 'Fri May 22', color: '#4CAF50' },
  { name: 'London Eye', lat: 51.5033, lng: -0.1196, day: 'Fri May 22', color: '#4CAF50' },
  { name: 'Borough Market', lat: 51.5055, lng: -0.0909, day: 'Fri May 22', color: '#4CAF50' },
  { name: 'British Museum', lat: 51.5194, lng: -0.1270, day: 'Sat May 23', color: '#9C27B0' },
  { name: 'Forbidden Planet (179 Shaftesbury Ave)', lat: 51.5147, lng: -0.1253, day: 'Sat May 23', color: '#9C27B0' },
  { name: 'Covent Garden', lat: 51.5117, lng: -0.1240, day: 'Sat May 23', color: '#9C27B0' },
  { name: 'Natural History Museum', lat: 51.4967, lng: -0.1764, day: 'Sat May 23', color: '#9C27B0' },
  { name: 'Westminster Pier (Thames Cruise start)', lat: 51.5014, lng: -0.1234, day: 'Sat May 23', color: '#9C27B0' },
  { name: 'Tower Pier (Thames Cruise end)', lat: 51.5064, lng: -0.0776, day: 'Sat May 23', color: '#9C27B0' },
];

const LONDON_DAY_IDS = ['day-2', 'day-3', 'day-4', 'day-5'];

function LondonInner() {
  const { data, saveData } = useTripData();
  const londonDays = data.itinerary.filter((d) => LONDON_DAY_IDS.includes(d.id));

  const saveDay = async (day: ItineraryDay) => {
    await saveData({ ...data, itinerary: data.itinerary.map((d) => (d.id === day.id ? day : d)) });
  };

  return (
    <>
      <div className="mb-4">
        <h1 className="font-serif text-3xl mb-1" style={{ color: 'var(--text)' }}>🇬🇧 London</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>May 20–23, 2026 · Premier Inn Aldgate</p>
      </div>

      <MapSection places={LONDON_MAP_PLACES} />

      {londonDays.map((day) => (
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

export function LondonClient({ data }: { data: TripData }) {
  return (
    <TripDataProvider initial={data}>
      <LondonInner />
    </TripDataProvider>
  );
}
