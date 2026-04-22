'use client';

import { useState } from 'react';
import { ItineraryDay, ActivityItem, ActivityTag } from '@/lib/seed';
import { EditButton } from './EditButton';

interface DayCardProps {
  day: ItineraryDay;
  onSave?: (updated: ItineraryDay) => Promise<void>;
}

const TAG_LABELS: Record<ActivityTag, string> = {
  ticket: '🎟 Pre-book',
  free: '🟢 Free',
  transit: '🚇 Transit',
  tip: '💡 Tip',
  flame: "🔥 Don't miss",
  confirm: '✅ Confirmed',
  manga: '📚 Manga',
};

function TagBadge({ tag, label }: { tag: ActivityTag; label?: string }) {
  return (
    <span
      className={`tag-${tag} text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0`}
    >
      {label || TAG_LABELS[tag]}
    </span>
  );
}

export function DayCard({ day, onSave }: DayCardProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ItineraryDay>(day);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!onSave) return;
    setSaving(true);
    await onSave(draft);
    setSaving(false);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(day);
    setEditing(false);
  };

  const updateActivity = (id: string, field: keyof ActivityItem, value: string) => {
    setDraft((d) => ({
      ...d,
      activities: d.activities.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    }));
  };

  const addActivity = () => {
    const newItem: ActivityItem = {
      id: `new-${Date.now()}`,
      time: '',
      text: 'New activity',
    };
    setDraft((d) => ({ ...d, activities: [...d.activities, newItem] }));
  };

  const removeActivity = (id: string) => {
    setDraft((d) => ({ ...d, activities: d.activities.filter((a) => a.id !== id) }));
  };

  const moveActivity = (id: string, dir: -1 | 1) => {
    setDraft((d) => {
      const items = [...d.activities];
      const idx = items.findIndex((a) => a.id === id);
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= items.length) return d;
      [items[idx], items[newIdx]] = [items[newIdx], items[idx]];
      return { ...d, activities: items };
    });
  };

  const badgeClass = `badge-${draft.badge}`;

  return (
    <div className="trip-card mb-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 p-4 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`${badgeClass} text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide`}>
              {draft.badge}
            </span>
            {draft.hotel && (
              <span className="text-[11px]" style={{ color: 'var(--muted)' }}>
                🏨 {editing ? (
                  <input
                    className="bg-transparent border-b outline-none"
                    style={{ borderColor: 'var(--accent)', color: 'var(--muted)', width: '180px' }}
                    value={draft.hotel}
                    onChange={(e) => setDraft((d) => ({ ...d, hotel: e.target.value }))}
                  />
                ) : draft.hotel}
              </span>
            )}
          </div>
          {editing ? (
            <input
              className="font-semibold text-sm w-full bg-transparent border-b outline-none"
              style={{ borderColor: 'var(--accent)', color: 'var(--text)' }}
              value={draft.title}
              onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
            />
          ) : (
            <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{draft.title}</p>
          )}
        </div>
        {onSave && (
          <EditButton editing={editing} onEdit={() => setEditing(true)} onSave={handleSave} onCancel={handleCancel} saving={saving} />
        )}
      </div>

      {/* Activities */}
      <div className="px-4 py-2">
        {draft.activities.map((activity, idx) => (
          <div key={activity.id}>
            <div className="flex gap-3 items-start py-2" style={{ borderBottom: '1px solid var(--border)' }}>
              {editing && (
                <div className="flex flex-col gap-0.5 mt-1 flex-shrink-0">
                  <button
                    onClick={() => moveActivity(activity.id, -1)}
                    disabled={idx === 0}
                    className="text-[10px] w-5 h-5 flex items-center justify-center rounded disabled:opacity-30"
                    style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
                  >▲</button>
                  <button
                    onClick={() => moveActivity(activity.id, 1)}
                    disabled={idx === draft.activities.length - 1}
                    className="text-[10px] w-5 h-5 flex items-center justify-center rounded disabled:opacity-30"
                    style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
                  >▼</button>
                </div>
              )}

              <div className="flex-shrink-0 w-16">
                {editing ? (
                  <input
                    className="text-[11px] font-medium w-full bg-transparent border-b outline-none"
                    style={{ borderColor: 'var(--accent)', color: 'var(--muted)' }}
                    value={activity.time}
                    onChange={(e) => updateActivity(activity.id, 'time', e.target.value)}
                    placeholder="Time"
                  />
                ) : (
                  <span className="text-[11px] font-medium" style={{ color: 'var(--muted)' }}>{activity.time}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                {editing ? (
                  <input
                    className="text-sm w-full bg-transparent border-b outline-none"
                    style={{ borderColor: 'var(--accent)', color: 'var(--text)' }}
                    value={activity.text}
                    onChange={(e) => updateActivity(activity.id, 'text', e.target.value)}
                  />
                ) : (
                  <span className="text-sm" style={{ color: 'var(--text)' }}>{activity.text}</span>
                )}
              </div>

              {activity.tag && !editing && (
                <TagBadge tag={activity.tag} label={activity.tagLabel} />
              )}

              {editing && (
                <button
                  onClick={() => removeActivity(activity.id)}
                  className="text-xs flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full hover:bg-red-100 dark:hover:bg-red-900"
                  style={{ color: '#ef4444' }}
                >✕</button>
              )}
            </div>

            {activity.note && !editing && (
              <p className="text-[11px] italic pl-[76px] pb-1 pt-0.5" style={{ color: 'var(--muted)' }}>
                {activity.note}
              </p>
            )}
            {activity.booking && !editing && (
              <div className="booking-strip text-[11px] ml-[76px] my-1 px-3 py-1.5" style={{ color: 'var(--muted)' }}>
                {activity.booking}
              </div>
            )}
          </div>
        ))}

        {editing && (
          <button
            onClick={addActivity}
            className="mt-2 mb-1 text-sm flex items-center gap-1 px-2 py-1 rounded-lg transition-colors"
            style={{ color: 'var(--accent)', border: '1px dashed var(--accent)' }}
          >
            + Add activity
          </button>
        )}
      </div>
    </div>
  );
}
