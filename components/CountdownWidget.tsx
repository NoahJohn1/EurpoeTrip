'use client';

import { useEffect, useState } from 'react';

const DEPARTURE = new Date('2026-05-19T18:31:00-05:00'); // ORD departure local time

function getCountdown() {
  const now = new Date();
  const diff = DEPARTURE.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, mins, secs };
}

export function CountdownWidget() {
  const [countdown, setCountdown] = useState(getCountdown);

  useEffect(() => {
    const id = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!countdown) return null;

  const units = [
    { label: 'Days', value: countdown.days },
    { label: 'Hours', value: countdown.hours },
    { label: 'Mins', value: countdown.mins },
    { label: 'Secs', value: countdown.secs },
  ];

  return (
    <div className="trip-card p-6 mb-4">
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
        Departure countdown
      </p>
      <div className="flex gap-3 justify-center">
        {units.map(({ label, value }) => (
          <div key={label} className="flex-1 text-center">
            <div
              className="font-serif text-4xl md:text-5xl tabular-nums"
              style={{ color: 'var(--accent)' }}
            >
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
              {label}
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-sm mt-4" style={{ color: 'var(--muted)' }}>
        Until DL 4923 departs ORD ✈️ London
      </p>
    </div>
  );
}
