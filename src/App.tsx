import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LevelMap } from './components/LevelMap';
import { StepCard } from './components/StepCard';
import { BadgeModal } from './components/BadgeModal';
import { LEVELS } from './data/levels';
import { UserProgress } from './types';
import { soundFx } from './utils/audio';

const STORAGE_KEY = 'ferris_quest_user_progress_v1';

const defaultProgress: UserProgress = {
  nickname: 'CoderNovizio',
  totalXp: 0,
  streak: 0,
  currentLevelId: 0,
  completedLevelIds: [],
  unlockedBadges: [],
  mutedSound: false
};

export const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return defaultProgress;
  });

  const [activeView, setActiveView] = useState<'map' | 'game'>('map');
  const [selectedLevelId, setSelectedLevelId] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [showBadgeModal, setShowBadgeModal] = useState<boolean>(false);

  // Save to localStorage on progress change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // fallback
    }
    soundFx.enabled = !progress.mutedSound;
  }, [progress]);

  const handleToggleSound = () => {
    setProgress(prev => ({
      ...prev,
      mutedSound: !prev.mutedSound
    }));
  };

  const handleSelectLevel = (levelId: number) => {
    setSelectedLevelId(levelId);
    setCurrentStepIndex(0);
    setActiveView('game');
  };

  const handleOpenMap = () => {
    setActiveView('map');
  };

  const handleCompleteStep = (stepId: string) => {
    setProgress(prev => ({
      ...prev,
      totalXp: prev.totalXp + 25,
      streak: prev.streak + 1
    }));
    
    const currentLevel = LEVELS.find(l => l.id === selectedLevelId);
    if (currentLevel && currentStepIndex < currentLevel.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleFinishLevel = () => {
    const currentLevel = LEVELS.find(l => l.id === selectedLevelId);
    if (!currentLevel) return;

    setProgress(prev => {
      const isAlreadyCompleted = prev.completedLevelIds.includes(selectedLevelId);
      const newCompleted = isAlreadyCompleted ? prev.completedLevelIds : [...prev.completedLevelIds, selectedLevelId];
      const newBadges = prev.unlockedBadges.includes(currentLevel.badgeName)
        ? prev.unlockedBadges
        : [...prev.unlockedBadges, currentLevel.badgeName];

      return {
        ...prev,
        totalXp: isAlreadyCompleted ? prev.totalXp + 50 : prev.totalXp + 150,
        completedLevelIds: newCompleted,
        unlockedBadges: newBadges
      };
    });

    setShowBadgeModal(true);
  };

  const handleNextLevelFromModal = () => {
    setShowBadgeModal(false);
    if (selectedLevelId < LEVELS.length - 1) {
      const nextId = selectedLevelId + 1;
      setSelectedLevelId(nextId);
      setCurrentStepIndex(0);
      setActiveView('game');
    } else {
      setActiveView('map');
    }
  };

  const currentLevel = LEVELS.find(l => l.id === selectedLevelId) || LEVELS[0];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Sticky Header Bar */}
      <div style={{ padding: '1rem 1.5rem 0 1.5rem' }}>
        <Header
          progress={progress}
          onToggleSound={handleToggleSound}
          onOpenMap={handleOpenMap}
          currentLevelTitle={`${currentLevel.title}: ${currentLevel.topic}`}
          isMapView={activeView === 'map'}
        />
      </div>

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {activeView === 'map' ? (
          <LevelMap
            levels={LEVELS}
            progress={progress}
            onSelectLevel={handleSelectLevel}
          />
        ) : (
          <StepCard
            level={currentLevel}
            stepIndex={currentStepIndex}
            onCompleteStep={handleCompleteStep}
            onPreviousStep={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
            onFinishLevel={handleFinishLevel}
            onBackToMap={handleOpenMap}
          />
        )}
      </main>

      {/* Celebratory Badge Modal */}
      {showBadgeModal && (
        <BadgeModal
          badgeName={currentLevel.badgeName}
          badgeDescription={currentLevel.badgeDescription}
          xpEarned={150}
          onNextLevel={handleNextLevelFromModal}
          onMap={() => {
            setShowBadgeModal(false);
            setActiveView('map');
          }}
          hasNextLevel={selectedLevelId < LEVELS.length - 1}
        />
      )}

      {/* Minimal Footer */}
      <footer style={{ textAlign: 'center', padding: '1.5rem', borderTop: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        🦀 Ferris Quest — Piattaforma di Aprendimento Gamificata per Principianti Assoluti • Sviluppato per Coding Game Contest
      </footer>

    </div>
  );
};

export default App;
