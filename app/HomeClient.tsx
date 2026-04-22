'use client';

import { TripData } from '@/lib/seed';
import { TripDataProvider, useTripData } from '@/components/TripDataProvider';
import { CountdownWidget } from '@/components/CountdownWidget';
import { DayCard } from '@/components/DayCard';
import { ItineraryDay } from '@/lib/seed';

const TRIP_START = new Date('2026-05-19');
const TRIP_END = new Date('2026-05-26');

function getStatus() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(TRIP_START);
  const end = new Date(TRIP_END);
  end.setDate(end.getDate() + 1);
  if (today < start) return 'before';
  if (today >= end) return 'after';
  return 'during';
}

function getCurrentDayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function HomeInner() {
  const { data, saveData } = useTripData();
  const status = getStatus();
  const todayIso = getCurrentDayIso();

  const saveDay = async (day: ItineraryDay) => {
    const updated: TripData = {
      ...data,
      itinerary: data.itinerary.map((d) => (d.id === day.id ? day : d)),
    };
    await saveData(updated);
  };

  if (status === 'before') {
    const firstDay = data.itinerary[0];
    return (
      <>
        <div className="mb-6">
          <h1 className="font-serif text-3xl mb-1" style={{ color: 'var(--text)' }}>
            Bryan & Noah — London + Paris
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            May 19–26, 2026 · Chicago ORD → London LHR → Paris CDG → Chicago ORD
          </p>
        </div>

        <CountdownWidget />

        {firstDay && (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2 mt-4" style={{ color: 'var(--muted)' }}>
              Day 1 Preview
            </p>
            <DayCard day={firstDay} onSave={saveDay} />
          </>
        )}
      </>
    );
  }

  if (status === 'after') {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="font-serif text-3xl mb-2" style={{ color: 'var(--text)' }}>Trip complete!</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          What a trip, Bryan & Noah. London + Paris — done. 🇬🇧🇫🇷
        </p>
      </div>
    );
  }

  // During the trip — show today's day card
  const todayCard = data.itinerary.find((d) => d.date === todayIso) ?? data.itinerary[0];

  return (
    <>
      <div className="mb-4">
        <h1 className="font-serif text-3xl mb-1" style={{ color: 'var(--text)' }}>
          Today in {todayCard.badge === 'london' ? '🇬🇧 London' : todayCard.badge === 'paris' ? '🇫🇷 Paris' : '✈️ Transit'}
        </h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>{todayCard.label}</p>
      </div>
      <DayCard day={todayCard} onSave={saveDay} />
    </>
  );
}

export function HomeClient({ data }: { data: TripData }) {
  return (
    <TripDataProvider initial={data}>
      <HomeInner />
    </TripDataProvider>
  );
}
