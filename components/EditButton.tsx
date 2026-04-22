'use client';

interface EditButtonProps {
  editing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  saving?: boolean;
}

export function EditButton({ editing, onEdit, onSave, onCancel, saving }: EditButtonProps) {
  if (!editing) {
    return (
      <button
        onClick={onEdit}
        className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg transition-colors"
        style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        Edit
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={onCancel}
        className="text-xs px-2.5 py-1 rounded-lg transition-colors"
        style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        disabled={saving}
        className="text-xs px-2.5 py-1 rounded-lg font-medium transition-colors disabled:opacity-50"
        style={{ background: 'var(--accent)', color: '#fff' }}
      >
        {saving ? 'Saving…' : 'Save'}
      </button>
    </div>
  );
}
