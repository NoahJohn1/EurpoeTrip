'use client';

import { useState } from 'react';
import { TripData, PackingItem } from '@/lib/seed';
import { TripDataProvider, useTripData } from '@/components/TripDataProvider';

function PackingInner() {
  const { data, saveData } = useTripData();
  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [addingCategory, setAddingCategory] = useState('');

  const categories = Array.from(new Set(data.packing.map((p) => p.category)));

  const toggle = async (id: string) => {
    const updated = data.packing.map((p) => p.id === id ? { ...p, checked: !p.checked } : p);
    await saveData({ ...data, packing: updated });
  };

  const addItem = async (category: string, text: string) => {
    if (!text.trim()) return;
    const newItem: PackingItem = {
      id: `pk-${Date.now()}`,
      text: text.trim(),
      checked: false,
      category,
    };
    await saveData({ ...data, packing: [...data.packing, newItem] });
    setNewItemText('');
    setAddingCategory('');
  };

  const removeItem = async (id: string) => {
    await saveData({ ...data, packing: data.packing.filter((p) => p.id !== id) });
  };

  const checkedCount = data.packing.filter((p) => p.checked).length;

  return (
    <>
      <div className="mb-4">
        <h1 className="font-serif text-3xl mb-1" style={{ color: 'var(--text)' }}>🧳 Packing</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          {checkedCount}/{data.packing.length} items packed · Carry-on only
        </p>
      </div>

      {/* Progress bar */}
      <div className="trip-card p-4 mb-4">
        <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--muted)' }}>
          <span>Packing progress</span>
          <span>{Math.round((checkedCount / data.packing.length) * 100)}%</span>
        </div>
        <div className="w-full h-2 rounded-full" style={{ background: 'var(--border)' }}>
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{ width: `${(checkedCount / data.packing.length) * 100}%`, background: 'var(--accent)' }}
          />
        </div>
      </div>

      {categories.map((category) => {
        const items = data.packing.filter((p) => p.category === category);
        const catChecked = items.filter((p) => p.checked).length;
        const isWarning = category === 'Luggage Rules';

        return (
          <div key={category} className="trip-card mb-3 overflow-hidden">
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: '1px solid var(--border)', background: isWarning ? 'var(--tag-flame)' : undefined }}
            >
              <div>
                <span className="font-semibold text-sm" style={{ color: isWarning ? 'var(--tag-flame-text)' : 'var(--text)' }}>
                  {category}
                </span>
                <span className="text-[11px] ml-2" style={{ color: 'var(--muted)' }}>
                  {catChecked}/{items.length}
                </span>
              </div>
            </div>
            <div className="px-4 py-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggle(item.id)}
                    className="w-4 h-4 rounded flex-shrink-0 cursor-pointer"
                    style={{ accentColor: 'var(--accent)' }}
                  />
                  <span
                    className="flex-1 text-sm"
                    style={{ color: 'var(--text)', textDecoration: item.checked ? 'line-through' : 'none', opacity: item.checked ? 0.5 : 1 }}
                  >
                    {item.text}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[10px] w-5 h-5 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity"
                    style={{ color: '#ef4444', border: '1px solid #ef4444' }}
                    title="Remove"
                  >✕</button>
                </div>
              ))}

              {/* Add item inline */}
              {addingCategory === category ? (
                <div className="flex gap-2 py-2 items-center">
                  <input
                    autoFocus
                    className="flex-1 text-sm bg-transparent border-b outline-none"
                    style={{ borderColor: 'var(--accent)', color: 'var(--text)' }}
                    placeholder="Item description…"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addItem(category, newItemText);
                      if (e.key === 'Escape') setAddingCategory('');
                    }}
                  />
                  <button
                    onClick={() => addItem(category, newItemText)}
                    className="text-xs px-2 py-1 rounded"
                    style={{ background: 'var(--accent)', color: '#fff' }}
                  >Add</button>
                  <button onClick={() => setAddingCategory('')} className="text-xs" style={{ color: 'var(--muted)' }}>✕</button>
                </div>
              ) : (
                <button
                  onClick={() => { setAddingCategory(category); setNewItemText(''); }}
                  className="text-sm flex items-center gap-1 py-2 transition-colors"
                  style={{ color: 'var(--accent)' }}
                >
                  + Add item
                </button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export function PackingClient({ data }: { data: TripData }) {
  return (
    <TripDataProvider initial={data}>
      <PackingInner />
    </TripDataProvider>
  );
}
