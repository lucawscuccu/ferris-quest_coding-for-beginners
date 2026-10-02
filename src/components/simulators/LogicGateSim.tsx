import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Zap } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export const LogicGateSim: React.FC = () => {
  const [energy, setEnergy] = useState<number>(70);
  const [threshold, setThreshold] = useState<number>(50);

  const isAccessAllowed = energy > threshold;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    soundFx.playClick();
    setEnergy(parseInt(e.target.value, 10));
  };

  return (
    <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px' }}>
      <h3 style={{ fontSize: '1rem', color: 'var(--accent-orange)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        🔀 Simulator: Il Barriera Laser (if / else)
      </h3>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
          Regola il livello di energia di Ferris (`energia = {energy}`):
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={energy}
          onChange={handleSliderChange}
          style={{ width: '100%', accentColor: 'var(--accent-orange)' }}
        />
      </div>

      {/* Visual Gate Indicator */}
      <div style={{
        background: isAccessAllowed ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
        border: `2px solid ${isAccessAllowed ? '#22c55e' : '#ef4444'}`,
        borderRadius: '12px',
        padding: '1.25rem',
        textAlign: 'center',
        marginBottom: '1rem',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          {isAccessAllowed ? '🔓 🦀 ➡️' : '🔒 🦀 🛑'}
        </div>
        <div style={{ fontWeight: 800, color: isAccessAllowed ? '#4ade80' : '#f87171', fontSize: '1rem' }}>
          {isAccessAllowed ? 'ACCESSO CONSENTITO' : 'ACCESSO NEGATO'}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
          {isAccessAllowed ? 'La condizione `energia > 50` è VERA (true)!' : 'La condizione `energia > 50` è FALSA (false)!'}
        </div>
      </div>

      {/* Code preview */}
      <div className="code-block" style={{ fontSize: '0.85rem' }}>
        <div style={{ color: '#94a3b8' }}>// Valutazione in tempo reale:</div>
        <span style={{ color: 'var(--accent-purple)' }}>if</span> <span style={{ color: '#38bdf8' }}>energia ({energy}) &gt; {threshold}</span> &#123;<br/>
        &nbsp;&nbsp;<span style={{ color: isAccessAllowed ? '#4ade80' : '#64748b' }}>print!("Porta Aperta!"); // ← {isAccessAllowed ? 'ESEGUITO!' : 'Ignorato'}</span><br/>
        &#125; <span style={{ color: 'var(--accent-purple)' }}>else</span> &#123;<br/>
        &nbsp;&nbsp;<span style={{ color: !isAccessAllowed ? '#f87171' : '#64748b' }}>print!("Allarme Attivo!"); // ← {!isAccessAllowed ? 'ESEGUITO!' : 'Ignorato'}</span><br/>
        &#125;
      </div>
    </div>
  );
};
