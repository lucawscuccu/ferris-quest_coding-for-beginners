import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export const TeaRecipeSim: React.FC = () => {
  const [steps, setSteps] = useState([
    { id: 1, text: 'Riscalda l\'acqua bollente', icon: '🔥' },
    { id: 2, text: 'Inserisci la bustina di tè nella tazza', icon: '🍵' },
    { id: 3, text: 'Versa l\'acqua calda nella tazza', icon: '🫖' }
  ]);

  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'fail'>('idle');
  const [resultMsg, setResultMsg] = useState('');

  const moveStep = (index: number, direction: 'up' | 'down') => {
    soundFx.playClick();
    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSteps.length) return;

    const temp = newSteps[index];
    newSteps[index] = newSteps[targetIndex];
    newSteps[targetIndex] = temp;
    setSteps(newSteps);
    setStatus('idle');
  };

  const runSimulation = () => {
    setStatus('running');
    // Correct sequence: 1. Riscalda l'acqua, 2. Versa l'acqua/inserisci bustina, 3. Versa l'acqua/immergi bustina
    setTimeout(() => {
      if (steps[0].id === 1 && (steps[1].id === 2 || steps[1].id === 3)) {
        setStatus('success');
        setResultMsg('Perfetto! L\'acqua è stata riscaldata per prima. Il tè è delizioso! ☕✨');
        soundFx.playSuccess();
      } else {
        setStatus('fail');
        setResultMsg('Ops! Hai cercato di versare il tè senza prima aver scaldato l\'acqua! Il tè è freddo! 🧊');
        soundFx.playError();
      }
    }, 800);
  };

  return (
    <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px' }}>
      <h3 style={{ fontSize: '1rem', color: 'var(--accent-orange)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        🎬 Simulator: Sequenza della Ricetta del Tè
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Trascina o usa le frecce per ordinare le istruzioni, poi premi <strong>Esegui Programma</strong>!
      </p>

      {/* Steps List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {steps.map((step, idx) => (
          <div key={step.id} style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{
                background: 'var(--accent-orange)',
                color: '#fff',
                fontWeight: 800,
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem'
              }}>
                {idx + 1}
              </span>
              <span style={{ fontSize: '1.2rem' }}>{step.icon}</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{step.text}</span>
            </div>

            <div style={{ display: 'flex', gap: '0.3rem' }}>
              <button
                disabled={idx === 0}
                onClick={() => moveStep(idx, 'up')}
                className="btn-secondary"
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
              >
                ▲
              </button>
              <button
                disabled={idx === steps.length - 1}
                onClick={() => moveStep(idx, 'down')}
                className="btn-secondary"
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
              >
                ▼
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Action button */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        <button className="btn-primary" onClick={runSimulation} disabled={status === 'running'}>
          <Play size={16} />
          <span>Esegui Programma</span>
        </button>
        <button className="btn-secondary" onClick={() => {
          soundFx.playClick();
          setSteps([
            { id: 2, text: 'Inserisci la bustina di tè nella tazza', icon: '🍵' },
            { id: 1, text: 'Riscalda l\'acqua bollente', icon: '🔥' },
            { id: 3, text: 'Versa l\'acqua calda nella tazza', icon: '🫖' }
          ]);
          setStatus('idle');
        }}>
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
      </div>

      {/* Simulation Result */}
      {status === 'success' && (
        <div style={{
          background: 'rgba(34, 197, 94, 0.15)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          color: '#4ade80',
          padding: '0.75rem 1rem',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.9rem'
        }}>
          <CheckCircle2 size={20} />
          <span>{resultMsg}</span>
        </div>
      )}

      {status === 'fail' && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#f87171',
          padding: '0.75rem 1rem',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.9rem'
        }}>
          <AlertCircle size={20} />
          <span>{resultMsg}</span>
        </div>
      )}
    </div>
  );
};
