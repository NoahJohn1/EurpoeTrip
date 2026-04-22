'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { TripData } from '@/lib/seed';

interface TripDataCtx {
  data: TripData;
  saveData: (updated: TripData) => Promise<void>;
  saving: boolean;
}

const Ctx = createContext<TripDataCtx | null>(null);

export function TripDataProvider({ children, initial }: { children: ReactNode; initial: TripData }) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);

  const saveData = useCallback(async (updated: TripData) => {
    setSaving(true);
    try {
      const res = await fetch('/api/data', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) setData(updated);
    } finally {
      setSaving(false);
    }
  }, []);

  return <Ctx.Provider value={{ data, saveData, saving }}>{children}</Ctx.Provider>;
}

export function useTripData() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTripData must be used inside TripDataProvider');
  return ctx;
}
