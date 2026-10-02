import React, { useState } from 'react';
import { Package, Lock, Unlock, ArrowRight } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export const VariableBoxSim: React.FC = () => {
  const [isMutable, setIsMutable] = useState(true);
  const [boxName, setBoxName] = useState('punti');
  const [boxValue, setBoxValue] = useState<number>(100);
  const [inputValue, setInputValue] = useState<string>('150');
  const [log, setLog] = useState<string[]>(['let mut punti = 100;']);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const updateVariable = () => {
    soundFx.playClick();
    if (!isMutable) {
      setErrorMsg('ERRORE COMPILATORE RUST: Non puoi modificare `punti` perché è stata dichiarata immutabile (senza `mut`)!');
      soundFx.playError();
      return;
    }

    const num = parseInt(inputValue, 10);
    if (isNaN(num)) return;

    setErrorMsg(null);
    setBoxValue(num);
    setLog(prev => [...prev, `punti = ${num}; // Scatola aggiornata!`]);
    soundFx.playSuccess();
  };

  const toggleMutable = () => {
    soundFx.playClick();
    const newMut = !isMutable;
    setIsMutable(newMut);
    setErrorMsg(null);
    if (newMut) {
      setLog(['let mut punti = 100; // Scatola con lucchetto APERTO']);
    } else {
      setLog(['let punti = 100; // Scatola SIGILLATA con lucchetto']);
    }
    setBoxValue(100);
  };

  return (
    <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px' }}>
      <h3 style={{ fontSize: '1rem', color: 'var(--accent-orange)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        📦 Simulator: La Scatola delle Variabili
      </h3>

      {/* Control Switch Immutable / Mutable */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <button
          className={isMutable ? 'btn-primary' : 'btn-secondary'}
          onClick={toggleMutable}
          style={{ flex: 1, fontSize: '0.85rem' }}
        >
          {isMutable ? <Unlock size={16} /> : <Lock size={16} />}
          <span>{isMutable ? 'let mut (Mutabile)' : 'let (Immutabile)'}</span>
        </button>
      </div>

      {/* Visual Box Container */}
      <div style={{
        background: '#0d1117',
        border: `2px dashed ${isMutable ? 'var(--accent-orange)' : 'var(--accent-cyan)'}`,
        borderRadius: '16px',
        padding: '1.5rem',
        textAlign: 'center',
        position: 'relative',
        marginBottom: '1.25rem',
        boxShadow: `0 0 20px ${isMutable ? 'var(--accent-orange-glow)' : 'var(--accent-cyan-glow)'}`
      }}>
        {/* Label badge */}
        <div style={{
          position: 'absolute',
          top: '-14px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: isMutable ? 'var(--accent-orange)' : 'var(--accent-cyan)',
          color: '#fff',
          padding: '0.2rem 1rem',
          borderRadius: '12px',
          fontWeight: 800,
          fontSize: '0.85rem',
          fontFamily: 'var(--font-code)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <Package size={14} />
          <span>{boxName}</span>
          {isMutable ? <Unlock size={12} /> : <Lock size={12} />}
        </div>

        {/* Value Inside Box */}
        <div style={{ margin: '1rem 0 0.5rem 0' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Contenuto della variabile:</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-code)' }}>
            {boxValue}
          </div>
        </div>
      </div>

      {/* Modify input */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="number"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Nuovo valore..."
          style={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            color: '#fff',
            padding: '0.5rem 0.75rem',
            fontFamily: 'var(--font-code)'
          }}
        />
        <button className="btn-secondary" onClick={updateVariable}>
          <span>Assegna `punti = {inputValue}`</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Error message */}
      {errorMsg && (
        <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '0.65rem', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '1rem' }}>
          {errorMsg}
        </div>
      )}

      {/* Code Log */}
      <div className="code-block" style={{ fontSize: '0.8rem' }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: '0.3rem' }}>// Rust Code execution log:</div>
        {log.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
};
