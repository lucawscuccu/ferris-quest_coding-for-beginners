import React from 'react';
import { LevelData, UserProgress } from '../types';
import { soundFx } from '../utils/audio';
import { Lock, CheckCircle2, Play, Award, Star, Sparkles } from 'lucide-react';

interface LevelMapProps {
  levels: LevelData[];
  progress: UserProgress;
  onSelectLevel: (levelId: number) => void;
}

export const LevelMap: React.FC<LevelMapProps> = ({ levels, progress, onSelectLevel }) => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem' }}>
      
      {/* Hero Welcome Header */}
      <div className="glass-card pulse-animation" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2.5rem', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '120px',
          height: '120px',
          background: 'radial-gradient(circle, var(--accent-orange) 0%, transparent 70%)',
          opacity: 0.2
        }} />
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🦀🚀</div>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem', background: 'linear-gradient(90deg, #fff, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          La tua Avventura nel Coding inizia qui!
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
          Impara a programmare in <strong>Rust</strong> partendo da zero assoluto! Segui la mappa dei livelli: ogni tappa ti spiegherà prima il concetto con esempi concreti e poi ti metterà alla prova.
        </p>
        <div style={{ display: 'inline-flex', gap: '1.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1.5rem', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Livelli Completati</div>
            <div style={{ fontWeight: 800, color: 'var(--accent-orange)', fontSize: '1.2rem' }}>
              {progress.completedLevelIds.length} / {levels.length}
            </div>
          </div>
          <div style={{ width: '1px', background: 'var(--border-subtle)' }} />
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>XP Totali</div>
            <div style={{ fontWeight: 800, color: 'var(--accent-cyan)', fontSize: '1.2rem' }}>
              {progress.totalXp} XP
            </div>
          </div>
        </div>
      </div>

      {/* Levels Roadmap Timeline */}
      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Sparkles size={20} color="var(--accent-orange)" />
        Mappa dei Livelli
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {levels.map((level, idx) => {
          const isCompleted = progress.completedLevelIds.includes(level.id);
          const isUnlocked = level.id === 0 || progress.completedLevelIds.includes(level.id - 1) || isCompleted;

          return (
            <div
              key={level.id}
              className={isUnlocked ? 'glass-card-interactive' : 'glass-card'}
              onClick={() => {
                if (isUnlocked) {
                  soundFx.playClick();
                  onSelectLevel(level.id);
                }
              }}
              style={{
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.5rem',
                opacity: isUnlocked ? 1 : 0.6,
                borderLeft: isCompleted ? '4px solid var(--accent-green)' : isUnlocked ? '4px solid var(--accent-orange)' : '4px solid var(--border-subtle)',
                position: 'relative'
              }}
            >
              {/* Left Badge / Icon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: isCompleted ? 'rgba(34, 197, 94, 0.2)' : isUnlocked ? 'rgba(249, 115, 22, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: isCompleted ? '2px solid #22c55e' : isUnlocked ? '2px solid var(--accent-orange)' : '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: isCompleted ? '#4ade80' : isUnlocked ? 'var(--accent-orange)' : 'var(--text-dark)'
                }}>
                  {isCompleted ? <CheckCircle2 size={28} color="#22c55e" /> : isUnlocked ? `${level.id}` : <Lock size={24} color="#64748b" />}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '1px' }}>
                      {level.topic}
                    </span>
                    {isCompleted && (
                      <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', fontSize: '0.7rem', padding: '0.1rem 0.5rem', borderRadius: '10px', fontWeight: 700 }}>
                        Completato ✨
                      </span>
                    )}
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                    {level.subtitle}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '480px' }}>
                    {level.description}
                  </p>
                </div>
              </div>

              {/* Right Action Button */}
              <div>
                {isUnlocked ? (
                  <button className={isCompleted ? 'btn-secondary' : 'btn-primary'} style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}>
                    <Play size={16} />
                    <span>{isCompleted ? 'Rigioca' : 'Inizia'}</span>
                  </button>
                ) : (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dark)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Lock size={14} />
                    <span>Sblocca Livello {level.id - 1}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
