import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';
import { Award, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

interface BadgeModalProps {
  badgeName: string;
  badgeDescription: string;
  xpEarned: number;
  onNextLevel: () => void;
  onMap: () => void;
  hasNextLevel: boolean;
}

export const BadgeModal: React.FC<BadgeModalProps> = ({
  badgeName,
  badgeDescription,
  xpEarned,
  onNextLevel,
  onMap,
  hasNextLevel
}) => {
  useEffect(() => {
    soundFx.playVictory();
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(9, 12, 16, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="glass-card pulse-animation" style={{
        maxWidth: '480px',
        width: '100%',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        borderRadius: '24px',
        border: '2px solid var(--accent-orange)',
        boxShadow: '0 0 50px rgba(249, 115, 22, 0.4)'
      }}>
        
        <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>🏆✨</div>

        <span style={{ color: 'var(--accent-orange)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          LIVELLO COMPLETATO!
        </span>

        <h3 style={{ fontSize: '1.75rem', fontWeight: 900, margin: '0.5rem 0', color: '#fff' }}>
          {badgeName}
        </h3>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          {badgeDescription}
        </p>

        {/* XP Reward card */}
        <div style={{
          background: 'rgba(249, 115, 22, 0.15)',
          border: '1px solid rgba(249, 115, 22, 0.3)',
          borderRadius: '16px',
          padding: '1rem',
          marginBottom: '2rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <Sparkles size={24} color="var(--accent-orange)" />
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fb923c' }}>
            +{xpEarned} Punti XP Guadagnati!
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn-secondary" onClick={onMap}>
            <span>Mappa Livelli</span>
          </button>
          
          {hasNextLevel && (
            <button className="btn-primary" onClick={onNextLevel}>
              <span>Prossimo Livello</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
