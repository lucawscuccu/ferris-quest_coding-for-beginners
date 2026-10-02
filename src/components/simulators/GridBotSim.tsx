import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export const GridBotSim: React.FC = () => {
  // Grid 4x4
  // Robot starts at (0,0), Gem at (0,2)
  const [robotPos, setRobotPos] = useState({ r: 2, c: 2 });
  const [commands, setCommands] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'win' | 'fail'; message: string }>({ status: 'idle', message: '' });

  const addCommand = (cmd: string) => {
    soundFx.playClick();
    if (commands.length < 5 && !isSimulating) {
      setCommands([...commands, cmd]);
    }
  };

  const removeCommand = (idx: number) => {
    soundFx.playClick();
    if (!isSimulating) {
      setCommands(commands.filter((_, i) => i !== idx));
    }
  };

  const runCommands = async () => {
    setIsSimulating(true);
    setFeedback({ status: 'idle', message: '' });
    let curR = 2;
    let curC = 2;
    setRobotPos({ r: curR, c: curC });

    for (let i = 0; i < commands.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      const cmd = commands[i];

      switch (cmd) {
        case 'avanza()':
          // Va verso l'alto (diminuisce l'indice di riga)
          if (curR > 0) curR -= 1;
          break;
        case 'giù()':
          // Va verso il basso (aumenta l'indice di riga)
          if (curR < 3 - 1) curR += 1;
          break;
        default:
          break;
      }

      setRobotPos({ r: curR, c: curC });
      soundFx.playClick();
    }

    await new Promise(resolve => setTimeout(resolve, 400));
    // Check victory condition: reached (0,2) or (1,2) with last command 'raccogli()'
    const hasCollect = commands[commands.length - 1] === 'raccogli()';
    if (curR === 0 && curC === 2 && hasCollect) {
      setFeedback({ status: 'win', message: 'Fantastico! Ferris ha raggiunto la gemma e l\'ha raccolta! 💎✨' });
      soundFx.playVictory();
    } else {
      setFeedback({ status: 'fail', message: 'Ops! Ferris non è arrivato sulla gemma o ha dimenticato raccogli()!' });
      soundFx.playError();
    }
    setIsSimulating(false);
  };

  const reset = () => {
    soundFx.playClick();
    setRobotPos({ r: 2, c: 2 });
    setCommands([]);
    setFeedback({ status: 'idle', message: '' });
    setIsSimulating(false);
  };

  return (
    <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px' }}>
      <h3 style={{ fontSize: '1rem', color: 'var(--accent-orange)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        🤖 Simulator: Navigazione Grid di Ferris
      </h3>
      
      {/* Grid Canvas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
        width: '240px',
        margin: '0 auto 1.25rem auto',
        background: '#0d1117',
        padding: '12px',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => {
            const isRobot = robotPos.r === r && robotPos.c === c;
            const isGem = r === 0 && c === 2;
            return (
              <div
                key={`${r}-${c}`}
                style={{
                  width: '60px',
                  height: '60px',
                  background: isRobot ? 'rgba(249, 115, 22, 0.25)' : isGem ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.03)',
                  border: isRobot ? '2px solid var(--accent-orange)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  boxShadow: isRobot ? '0 0 10px var(--accent-orange-glow)' : 'none'
                }}
              >
                {isRobot ? '🦀' : isGem ? '💎' : ''}
              </div>
            );
          })
        )}
      </div>

      {/* Control Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1rem' }}>
        <button className="btn-secondary" onClick={() => addCommand('avanza()')} disabled={isSimulating} style={{ fontSize: '0.8rem' }}>
          ➕ avanza()
        </button>
        <button className="btn-secondary" onClick={() => addCommand('raccogli()')} disabled={isSimulating} style={{ fontSize: '0.8rem' }}>
          ➕ raccogli()
        </button>
      </div>

      {/* Code Buffer */}
      <div className="code-block" style={{ marginBottom: '1rem', minHeight: '80px' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.4rem' }}>// Sequenza istruzioni:</div>
        {commands.length === 0 ? (
          <span style={{ color: '#64748b' }}>Aggiungi comandi con i bottoni sopra...</span>
        ) : (
          commands.map((cmd, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.15rem 0' }}>
              <span>{idx + 1}. ferris.{cmd};</span>
              {!isSimulating && (
                <span onClick={() => removeCommand(idx)} style={{ color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem' }}>✖</span>
              )}
            </div>
          ))
        )}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
        <button className="btn-primary" onClick={runCommands} disabled={isSimulating || commands.length === 0}>
          <Play size={16} />
          <span>Esegui Codice</span>
        </button>
        <button className="btn-secondary" onClick={reset} disabled={isSimulating}>
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
      </div>

      {/* Feedback message */}
      {feedback.status === 'win' && (
        <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} />
          <span>{feedback.message}</span>
        </div>
      )}
      {feedback.status === 'fail' && (
        <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} />
          <span>{feedback.message}</span>
        </div>
      )}
    </div>
  );
};
