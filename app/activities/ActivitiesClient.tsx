'use client';

import { useState } from 'react';
import { TripData, BookingActivity } from '@/lib/seed';
import { TripDataProvider, useTripData } from '@/components/TripDataProvider';

const TIER_COLORS: Record<number, { bg: string; text: string; label: string }> = {
  1: { bg: '#FAECE7', text: '#C73E1D', label: 'Book today' },
  2: { bg: '#FAEEDA', text: '#A55812', label: 'This week' },
  3: { bg: '#FAEEDA', text: '#8B5E0C', label: 'Soon' },
  4: { bg: '#F1EFE8', text: '#6B6B66', label: 'Flexible' },
  5: { bg: '#EAF3DE', text: '#3B6D11', label: 'Last-min' },
};

const DARK_TIER_COLORS: Record<number, { bg: string; text: string }> = {
  1: { bg: '#3D1A0F', text: '#FCA98A' },
  2: { bg: '#3D2A0A', text: '#FCD34D' },
  3: { bg: '#3D2A0A', text: '#FCD34D' },
  4: { bg: '#2A2A26', text: '#C0BEB8' },
  5: { bg: '#0F2A08', text: '#86EFAC' },
};

function ActivityRow({
  activity,
  onToggleBooked,
  onUpdate,
  onRemove,
  onMove,
  isFirst,
  isLast,
}: {
  activity: BookingActivity;
  onToggleBooked: () => void;
  onUpdate: (updated: BookingActivity) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(activity);

  const tier = activity.tier;
  const tierStyle = tier > 0 ? TIER_COLORS[tier] : null;

  return (
    <div className="p-3" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="flex items-start gap-3">
        {/* Reorder buttons */}
        <div className="flex flex-col gap-0.5 flex-shrink-0 mt-0.5">
          <button onClick={() => onMove(-1)} disabled={isFirst} className="text-[9px] w-4 h-4 flex items-center justify-center rounded disabled:opacity-20" style={{ color: 'var(--muted)' }}>▲</button>
          <button onClick={() => onMove(1)} disabled={isLast} className="text-[9px] w-4 h-4 flex items-center justify-center rounded disabled:opacity-20" style={{ color: 'var(--muted)' }}>▼</button>
        </div>

        {/* Checkbox */}
        <input
          type="checkbox"
          checked={activity.booked}
          onChange={onToggleBooked}
          className="w-5 h-5 mt-0.5 flex-shrink-0 cursor-pointer rounded"
          style={{ accentColor: '#4A3B8C' }}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap">
            {editing ? (
              <input
                className="font-semibold text-sm flex-1 bg-transparent border-b outline-none"
                style={{ borderColor: 'var(--accent)', color: 'var(--text)' }}
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              />
            ) : (
              <span
                className="font-semibold text-sm"
                style={{
                  color: 'var(--text)',
                  textDecoration: activity.booked ? 'line-through' : 'none',
                  opacity: activity.booked ? 0.6 : 1,
                }}
              >
                {activity.name}
              </span>
            )}
            {tierStyle && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: tierStyle.bg, color: tierStyle.text }}>
                {tierStyle.label}
              </span>
            )}
            {activity.booked && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full tag-confirm flex-shrink-0">✓ Booked</span>
            )}
          </div>

          <div className="flex flex-wrap gap-x-3 mt-0.5">
            {editing ? (
              <>
                <input className="text-[11px] bg-transparent border-b outline-none" style={{ borderColor: 'var(--accent)', color: 'var(--muted)', width: '100px' }} value={draft.date} onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))} placeholder="Date" />
                <input className="text-[11px] bg-transparent border-b outline-none" style={{ borderColor: 'var(--accent)', color: 'var(--muted)', width: '100px' }} value={draft.cost} onChange={(e) => setDraft((d) => ({ ...d, cost: e.target.value }))} placeholder="Cost" />
                <input className="text-[11px] bg-transparent border-b outline-none w-full mt-1" style={{ borderColor: 'var(--accent)', color: 'var(--muted)' }} value={draft.detail} onChange={(e) => setDraft((d) => ({ ...d, detail: e.target.value }))} placeholder="Detail / booking URL" />
              </>
            ) : (
              <>
                <span className="text-[11px]" style={{ color: 'var(--muted)' }}>{activity.date}</span>
                <span className="text-[11px] font-semibold" style={{ color: 'var(--muted)' }}>{activity.cost}</span>
                {activity.url && (
                  <a href={activity.url} target="_blank" rel="noopener noreferrer" className="text-[11px] underline" style={{ color: 'var(--accent)' }}>
                    Book →
                  </a>
                )}
              </>
            )}
          </div>

          {!editing && activity.detail && (
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--muted)' }}>{activity.detail}</p>
          )}
        </div>

        {/* Edit/remove */}
        <div className="flex gap-1 flex-shrink-0">
          {editing ? (
            <>
              <button
                onClick={() => { onUpdate(draft); setEditing(false); }}
                className="text-[10px] px-2 py-1 rounded font-medium"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >Save</button>
              <button onClick={() => { setDraft(activity); setEditing(false); }} className="text-[10px] px-2 py-1 rounded" style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}>✕</button>
            </>
          ) : (
            <>
              <button onClick={() => setEditing(true)} className="text-[10px] px-2 py-1 rounded" style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}>Edit</button>
              <button onClick={onRemove} className="text-[10px] px-2 py-1 rounded" style={{ color: '#ef4444', border: '1px solid #ef4444' }}>✕</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ActivitiesInner() {
  const { data, saveData } = useTripData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState<Partial<BookingActivity>>({ name: '', date: '', cost: '', tier: 3, detail: '', url: '' });

  const toBook = data.activities.filter((a) => !a.confirmed);
  const confirmed = data.activities.filter((a) => a.confirmed);

  const bookedCount = toBook.filter((a) => a.booked).length;

  const updateActivities = async (activities: BookingActivity[]) => {
    await saveData({ ...data, activities });
  };

  const toggleBooked = async (id: string) => {
    const updated = data.activities.map((a) => a.id === id ? { ...a, booked: !a.booked } : a);
    await updateActivities(updated);
  };

  const updateActivity = async (updated: BookingActivity) => {
    await updateActivities(data.activities.map((a) => a.id === updated.id ? updated : a));
  };

  const removeActivity = async (id: string) => {
    await updateActivities(data.activities.filter((a) => a.id !== id));
  };

  const moveActivity = async (id: string, dir: -1 | 1) => {
    const items = [...data.activities];
    const idx = items.findIndex((a) => a.id === id);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= items.length) return;
    [items[idx], items[newIdx]] = [items[newIdx], items[idx]];
    await updateActivities(items);
  };

  const addActivity = async () => {
    if (!newActivity.name?.trim()) return;
    const act: BookingActivity = {
      id: `act-${Date.now()}`,
      name: newActivity.name || '',
      date: newActivity.date || '',
      cost: newActivity.cost || '',
      tier: newActivity.tier ?? 3,
      urgency: TIER_COLORS[newActivity.tier ?? 3]?.label || '',
      detail: newActivity.detail || '',
      url: newActivity.url || '',
      booked: false,
      confirmed: false,
    };
    await updateActivities([...data.activities, act]);
    setShowAddForm(false);
    setNewActivity({ name: '', date: '', cost: '', tier: 3, detail: '', url: '' });
  };

  return (
    <>
      <div className="mb-4">
        <h1 className="font-serif text-3xl mb-1" style={{ color: 'var(--text)' }}>📋 Activities</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          {bookedCount}/{toBook.length} pre-book items booked
        </p>
      </div>

      {/* Progress */}
      <div className="trip-card p-4 mb-4">
        <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--muted)' }}>
          <span>Booking progress</span>
          <span>{toBook.length > 0 ? Math.round((bookedCount / toBook.length) * 100) : 100}%</span>
        </div>
        <div className="w-full h-2 rounded-full" style={{ background: 'var(--border)' }}>
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{ width: `${toBook.length > 0 ? (bookedCount / toBook.length) * 100 : 100}%`, background: 'var(--accent)' }}
          />
        </div>
      </div>

      {/* To-book activities */}
      <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Book in Advance</p>
      <div className="trip-card mb-4">
        {toBook.map((activity, idx) => (
          <ActivityRow
            key={activity.id}
            activity={activity}
            onToggleBooked={() => toggleBooked(activity.id)}
            onUpdate={updateActivity}
            onRemove={() => removeActivity(activity.id)}
            onMove={(dir) => moveActivity(activity.id, dir)}
            isFirst={idx === 0}
            isLast={idx === toBook.length - 1}
          />
        ))}

        {/* Add new */}
        {showAddForm ? (
          <div className="p-3" style={{ borderTop: '1px solid var(--border)' }}>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--muted)' }}>New activity</p>
            <div className="flex flex-col gap-2">
              <input className="text-sm bg-transparent border-b outline-none" style={{ borderColor: 'var(--accent)', color: 'var(--text)' }} placeholder="Name" value={newActivity.name} onChange={(e) => setNewActivity((n) => ({ ...n, name: e.target.value }))} />
              <div className="flex gap-3">
                <input className="text-sm bg-transparent border-b outline-none flex-1" style={{ borderColor: 'var(--accent)', color: 'var(--text)' }} placeholder="Date (e.g. Fri May 22)" value={newActivity.date} onChange={(e) => setNewActivity((n) => ({ ...n, date: e.target.value }))} />
                <input className="text-sm bg-transparent border-b outline-none flex-1" style={{ borderColor: 'var(--accent)', color: 'var(--text)' }} placeholder="Cost" value={newActivity.cost} onChange={(e) => setNewActivity((n) => ({ ...n, cost: e.target.value }))} />
              </div>
              <input className="text-sm bg-transparent border-b outline-none" style={{ borderColor: 'var(--accent)', color: 'var(--text)' }} placeholder="Booking URL" value={newActivity.url} onChange={(e) => setNewActivity((n) => ({ ...n, url: e.target.value }))} />
              <input className="text-sm bg-transparent border-b outline-none" style={{ borderColor: 'var(--accent)', color: 'var(--text)' }} placeholder="Details / notes" value={newActivity.detail} onChange={(e) => setNewActivity((n) => ({ ...n, detail: e.target.value }))} />
              <div className="flex gap-2 mt-1">
                <button onClick={addActivity} className="text-sm px-3 py-1.5 rounded-lg font-medium" style={{ background: 'var(--accent)', color: '#fff' }}>Add Activity</button>
                <button onClick={() => setShowAddForm(false)} className="text-sm px-3 py-1.5 rounded-lg" style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}>Cancel</button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full text-sm py-3 flex items-center justify-center gap-1 transition-colors"
            style={{ color: 'var(--accent)', borderTop: '1px solid var(--border)' }}
          >
            + Add activity
          </button>
        )}
      </div>

      {/* Already confirmed */}
      <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Already Confirmed</p>
      <div className="trip-card">
        {confirmed.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3 p-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <span className="text-green-500 flex-shrink-0">✓</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{activity.name}</p>
              <p className="text-[11px]" style={{ color: 'var(--muted)' }}>{activity.date} · {activity.detail}</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full tag-confirm flex-shrink-0">Confirmed</span>
          </div>
        ))}
      </div>
    </>
  );
}

export function ActivitiesClient({ data }: { data: TripData }) {
  return (
    <TripDataProvider initial={data}>
      <ActivitiesInner />
    </TripDataProvider>
  );
}
