import React, { useState } from 'react';
import { Tags, CheckCircle2, AlertCircle } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export const DataTypeSim: React.FC = () => {
  const [items, setItems] = useState([
    { id: '1', val: '42', correctType: 'i32' },
    { id: '2', val: '"Ferris"', correctType: 'String' },
    { id: '3', val: 'true', correctType: 'bool' },
    { id: '4', val: '"Robot"', correctType: 'String' }
  ]);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [classified, setClassified] = useState<{ [key: string]: string }>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const selectItem = (id: string) => {
    soundFx.playClick();
    setSelectedItem(id);
    setFeedback(null);
  };

  const classifyInContainer = (type: string) => {
    if (!selectedItem) return;
    soundFx.playClick();

    const targetItem = items.find(i => i.id === selectedItem);
    if (targetItem) {
      if (targetItem.correctType === type) {
        setClassified(prev => ({ ...prev, [selectedItem]: type }));
        setFeedback(`Ottimo! ${targetItem.val} appartiene al tipo ${type}! ✨`);
        soundFx.playSuccess();
      } else {
        setFeedback(`Ops! ${targetItem.val} non appartiene a ${type}. Riprova!`);
        soundFx.playError();
      }
    }
    setSelectedItem(null);
  };

  return (
    <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px' }}>
      <h3 style={{ fontSize: '1rem', color: 'var(--accent-orange)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        🏷️ Simulator: Classificatore di Tipi di Dato
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Seleziona un elemento in alto e poi clicca sul contenitore di tipo corrispondente!
      </p>

      {/* Items pool */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {items.map(item => {
          const isDone = !!classified[item.id];
          const isSelected = selectedItem === item.id;
          return (
            <button
              key={item.id}
              disabled={isDone}
              onClick={() => selectItem(item.id)}
              style={{
                background: isDone ? 'rgba(34, 197, 94, 0.15)' : isSelected ? 'var(--accent-orange)' : 'rgba(255,255,255,0.06)',
                color: isDone ? '#4ade80' : isSelected ? '#fff' : 'var(--text-main)',
                border: isSelected ? '2px solid #fff' : '1px solid var(--border-subtle)',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontFamily: 'var(--font-code)',
                fontWeight: 700,
                cursor: isDone ? 'default' : 'pointer',
                opacity: isDone ? 0.6 : 1
              }}
            >
              {item.val} {isDone ? '✓' : ''}
            </button>
          );
        })}
      </div>

      {/* 3 Containers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
        
        {/* i32 Container */}
        <div
          onClick={() => classifyInContainer('i32')}
          style={{
            background: 'rgba(6, 182, 212, 0.1)',
            border: '2px dashed var(--accent-cyan)',
            borderRadius: '12px',
            padding: '1rem 0.5rem',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)' }}>
            Numeri (i32)
          </div>
        </div>

        {/* String Container */}
        <div
          onClick={() => classifyInContainer('String')}
          style={{
            background: 'rgba(249, 115, 22, 0.1)',
            border: '2px dashed var(--accent-orange)',
            borderRadius: '12px',
            padding: '1rem 0.5rem',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-orange)', fontFamily: 'var(--font-code)' }}>
            Testo (&str)
          </div>
        </div>

        {/* bool Container */}
        <div
          onClick={() => classifyInContainer('bool')}
          style={{
            background: 'rgba(168, 85, 247, 0.1)',
            border: '2px dashed var(--accent-purple)',
            borderRadius: '12px',
            padding: '1rem 0.5rem',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-purple)', fontFamily: 'var(--font-code)' }}>
            Booleani (bool)
          </div>
        </div>

      </div>

      {feedback && (
        <div style={{ fontSize: '0.85rem', color: '#38bdf8', padding: '0.5rem', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.1)' }}>
          {feedback}
        </div>
      )}
    </div>
  );
};
