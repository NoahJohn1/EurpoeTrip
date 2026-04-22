'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { TripData } from '@/lib/seed';

const LS_KEY = 'eurotrip-data-v1';

function loadFromLocalStorage(): TripData | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveToLocalStorage(data: TripData) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {}
}

interface TripDataCtx {
  data: TripData;
  saveData: (updated: TripData) => Promise<void>;
  saving: boolean;
}

const Ctx = createContext<TripDataCtx | null>(null);

export function TripDataProvider({ children, initial }: { children: ReactNode; initial: TripData }) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);

  // On mount, prefer localStorage over server-provided initial data
  // (handles dev mode where blob isn't available yet)
  useEffect(() => {
    const local = loadFromLocalStorage();
    if (local) setData(local);
  }, []);

  const saveData = useCallback(async (updated: TripData) => {
    setData(updated);
    saveToLocalStorage(updated); // always persist locally
    setSaving(true);
    try {
      await fetch('/api/data', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
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
