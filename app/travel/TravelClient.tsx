'use client';

import { useState } from 'react';
import { TripData, FlightInfo, TrainInfo, HotelInfo } from '@/lib/seed';
import { TripDataProvider, useTripData } from '@/components/TripDataProvider';
import { EditButton } from '@/components/EditButton';

function Field({ label, value, editing, onChange }: {
  label: string; value: string; editing: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2 py-1.5" style={{ borderBottom: '1px solid var(--border)' }}>
      <span className="text-[11px] font-medium w-24 flex-shrink-0 pt-0.5" style={{ color: 'var(--muted)' }}>{label}</span>
      {editing ? (
        <input
          className="flex-1 text-sm bg-transparent border-b outline-none"
          style={{ borderColor: 'var(--accent)', color: 'var(--text)' }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <span className="flex-1 text-sm" style={{ color: 'var(--text)' }}>{value}</span>
      )}
    </div>
  );
}

function FlightCard({ flight, onSave }: { flight: FlightInfo; onSave?: (f: FlightInfo) => Promise<void> }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(flight);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!onSave) return;
    setSaving(true);
    await onSave(draft);
    setSaving(false);
    setEditing(false);
  };

  const set = (field: keyof FlightInfo) => (v: string) => setDraft((d) => ({ ...d, [field]: v }));

  return (
    <div className="trip-card p-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{draft.flightNumber}</span>
          <span className="text-[11px] ml-2 px-2 py-0.5 rounded-full tag-transit">{draft.from} → {draft.to}</span>
        </div>
        {onSave && <EditButton editing={editing} onEdit={() => setEditing(true)} onSave={handleSave} onCancel={() => { setDraft(flight); setEditing(false); }} saving={saving} />}
      </div>
      <Field label="Airline" value={draft.airline} editing={editing} onChange={set('airline')} />
      <Field label="Departs" value={draft.departs} editing={editing} onChange={set('departs')} />
      <Field label="Arrives" value={draft.arrives} editing={editing} onChange={set('arrives')} />
      <Field label="Notes" value={draft.notes} editing={editing} onChange={set('notes')} />
    </div>
  );
}

function TrainCard({ train, onSave }: { train: TrainInfo; onSave?: (t: TrainInfo) => Promise<void> }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(train);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!onSave) return;
    setSaving(true);
    await onSave(draft);
    setSaving(false);
    setEditing(false);
  };

  const set = (field: keyof TrainInfo) => (v: string) => setDraft((d) => ({ ...d, [field]: v }));

  return (
    <div className="trip-card p-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>Eurostar Train {draft.trainNumber}</span>
          <span className="text-[11px] ml-2 px-2 py-0.5 rounded-full tag-confirm">Ref: {draft.ref}</span>
        </div>
        {onSave && <EditButton editing={editing} onEdit={() => setEditing(true)} onSave={handleSave} onCancel={() => { setDraft(train); setEditing(false); }} saving={saving} />}
      </div>
      <Field label="From" value={draft.from} editing={editing} onChange={set('from')} />
      <Field label="To" value={draft.to} editing={editing} onChange={set('to')} />
      <Field label="Departs" value={draft.departs} editing={editing} onChange={set('departs')} />
      <Field label="Arrives" value={draft.arrives} editing={editing} onChange={set('arrives')} />
      <Field label="Coach" value={draft.coach} editing={editing} onChange={set('coach')} />
      <Field label="Seats" value={draft.seats} editing={editing} onChange={set('seats')} />
    </div>
  );
}

function HotelCard({ hotel, onSave }: { hotel: HotelInfo; onSave?: (h: HotelInfo) => Promise<void> }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(hotel);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!onSave) return;
    setSaving(true);
    await onSave(draft);
    setSaving(false);
    setEditing(false);
  };

  const set = (field: keyof HotelInfo) => (v: string) => setDraft((d) => ({ ...d, [field]: v }));

  return (
    <div className="trip-card p-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>🏨 {draft.name}</span>
        {onSave && <EditButton editing={editing} onEdit={() => setEditing(true)} onSave={handleSave} onCancel={() => { setDraft(hotel); setEditing(false); }} saving={saving} />}
      </div>
      <Field label="Location" value={draft.location} editing={editing} onChange={set('location')} />
      <Field label="Check-in" value={draft.checkIn} editing={editing} onChange={set('checkIn')} />
      <Field label="Check-out" value={draft.checkOut} editing={editing} onChange={set('checkOut')} />
      <Field label="Notes" value={draft.notes} editing={editing} onChange={set('notes')} />
    </div>
  );
}

function TravelInner() {
  const { data, saveData } = useTripData();

  const saveFlight = async (flight: FlightInfo) => {
    await saveData({ ...data, travel: { ...data.travel, flights: data.travel.flights.map((f) => (f.id === flight.id ? flight : f)) } });
  };
  const saveTrain = async (train: TrainInfo) => {
    await saveData({ ...data, travel: { ...data.travel, train } });
  };
  const saveHotel = async (hotel: HotelInfo) => {
    await saveData({ ...data, travel: { ...data.travel, hotels: data.travel.hotels.map((h) => (h.id === hotel.id ? hotel : h)) } });
  };

  return (
    <>
      <div className="mb-4">
        <h1 className="font-serif text-3xl mb-1" style={{ color: 'var(--text)' }}>✈️ Travel</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>Flights, Eurostar & hotels</p>
      </div>

      <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Flights</p>
      {data.travel.flights.map((f) => <FlightCard key={f.id} flight={f} onSave={saveFlight} />)}

      <p className="text-[11px] font-semibold uppercase tracking-widest mb-2 mt-4" style={{ color: 'var(--muted)' }}>Eurostar</p>
      <TrainCard train={data.travel.train} onSave={saveTrain} />

      <p className="text-[11px] font-semibold uppercase tracking-widest mb-2 mt-4" style={{ color: 'var(--muted)' }}>Hotels & Stays</p>
      {data.travel.hotels.map((h) => <HotelCard key={h.id} hotel={h} onSave={saveHotel} />)}

      <div className="trip-card p-4 mt-4 text-sm" style={{ color: 'var(--muted)' }}>
        <p className="font-semibold mb-1" style={{ color: 'var(--text)' }}>⚠️ Baggage reminder</p>
        Both Delta flights are Basic Economy — carry-on bags only, no free checked bags. Pack accordingly or pay the checked bag fee at check-in.
      </div>
    </>
  );
}

export function TravelClient({ data }: { data: TripData }) {
  return (
    <TripDataProvider initial={data}>
      <TravelInner />
    </TripDataProvider>
  );
}
