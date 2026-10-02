import React from 'react';
import { UserProgress } from '../types';
import { soundFx } from '../utils/audio';
import { Flame, Volume2, VolumeX, Map, Award, Sparkles } from 'lucide-react';

interface HeaderProps {
  progress: UserProgress;
  onToggleSound: () => void;
  onOpenMap: () => void;
  currentLevelTitle?: string;
  isMapView: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  progress,
  onToggleSound,
  onOpenMap,
  currentLevelTitle,
  isMapView
}) => {
  return (
    <header className="glass-card" style={{ padding: '0.75rem 1.5rem', marginBottom: '1.5rem', borderRadius: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={onOpenMap}>
          <div style={{
            fontSize: '1.8rem',
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            borderRadius: '12px',
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(249, 115, 22, 0.4)'
          }}>
            🦀
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, background: 'linear-gradient(90deg, #fff, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>
              FERRIS QUEST
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Coding for Beginners
            </p>
          </div>
        </div>

        {/* Current Level Breadcrumb / Indicator */}
        {!isMapView && currentLevelTitle && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: 600
          }}>
            <span style={{ color: 'var(--accent-orange)' }}>📍 Current:</span>
            <span>{currentLevelTitle}</span>
          </div>
        )}

        {/* Stats & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          {/* Streak Combo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            padding: '0.4rem 0.8rem',
            borderRadius: '12px',
            color: '#f87171',
            fontWeight: 700,
            fontSize: '0.9rem'
          }} title="Streak di risposte corrette di fila">
            <Flame size={18} color="#ef4444" />
            <span>{progress.streak}</span>
          </div>

          {/* XP Total */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(249, 115, 22, 0.15)',
            border: '1px solid rgba(249, 115, 22, 0.3)',
            padding: '0.4rem 0.8rem',
            borderRadius: '12px',
            color: '#fb923c',
            fontWeight: 700,
            fontSize: '0.9rem'
          }} title="Punti Esperienza Totali">
            <Sparkles size={18} color="#f97316" />
            <span>{progress.totalXp} XP</span>
          </div>

          {/* Badges count */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(168, 85, 247, 0.15)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            padding: '0.4rem 0.8rem',
            borderRadius: '12px',
            color: '#c084fc',
            fontWeight: 700,
            fontSize: '0.9rem'
          }} title="Badge Sbloccati">
            <Award size={18} color="#a855f7" />
            <span>{progress.unlockedBadges.length}</span>
          </div>

          {/* Map Button */}
          <button 
            className="btn-secondary"
            onClick={() => {
              soundFx.playClick();
              onOpenMap();
            }}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
          >
            <Map size={16} />
            <span>{isMapView ? 'In Gioco' : 'Mappa Livelli'}</span>
          </button>

          {/* Sound Toggle */}
          <button 
            className="btn-secondary" 
            onClick={() => {
              soundFx.playClick();
              onToggleSound();
            }}
            style={{ padding: '0.45rem', borderRadius: '10px' }}
            title={progress.mutedSound ? "Attiva Audio" : "Disattiva Audio"}
          >
            {progress.mutedSound ? <VolumeX size={18} color="#94a3b8" /> : <Volume2 size={18} color="#22c55e" />}
          </button>

        </div>

      </div>
    </header>
  );
};
