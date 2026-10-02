import React, { useState } from 'react';
import { LevelData, StepContent } from '../types';
import { soundFx } from '../utils/audio';
import { TeaRecipeSim } from './simulators/TeaRecipeSim';
import { GridBotSim } from './simulators/GridBotSim';
import { VariableBoxSim } from './simulators/VariableBoxSim';
import { DataTypeSim } from './simulators/DataTypeSim';
import { LogicGateSim } from './simulators/LogicGateSim';
import { BookOpen, Lightbulb, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, HelpCircle, Sparkles } from 'lucide-react';

interface StepCardProps {
  level: LevelData;
  stepIndex: number;
  onCompleteStep: (stepId: string) => void;
  onPreviousStep?: () => void;
  onFinishLevel: () => void;
  onBackToMap: () => void;
}

export const StepCard: React.FC<StepCardProps> = ({
  level,
  stepIndex,
  onCompleteStep,
  onPreviousStep,
  onFinishLevel,
  onBackToMap
}) => {
  const currentStep: StepContent = level.steps[stepIndex];
  const isLastStep = stepIndex === level.steps.length - 1;

  // Exercise selection state
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [orderedItems, setOrderedItems] = useState(currentStep.orderingItems ? [...currentStep.orderingItems] : []);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [showHint, setShowHint] = useState(false);

  // Reset exercise state when step changes
  React.useEffect(() => {
    setSelectedChoiceId(null);
    setOrderedItems(currentStep.orderingItems ? [...currentStep.orderingItems] : []);
    setIsAnswered(false);
    setIsCorrect(false);
    setFeedbackMsg('');
    setShowHint(false);
  }, [stepIndex, currentStep]);

  // Handle Multiple Choice Verification
  const handleVerifyChoice = () => {
    if (!selectedChoiceId || !currentStep.choices) return;
    soundFx.playClick();
    const choice = currentStep.choices.find(c => c.id === selectedChoiceId);
    if (!choice) return;

    setIsAnswered(true);
    if (choice.isCorrect) {
      setIsCorrect(true);
      setFeedbackMsg(choice.explanation || 'Risposta esatta! Bravissimo! ✨');
      soundFx.playSuccess();
    } else {
      setIsCorrect(false);
      setFeedbackMsg(choice.explanation || 'Risposta errata. Rileggi bene la spiegazione o la metafora e riprova!');
      soundFx.playError();
    }
  };

  // Handle Ordering Verification
  const handleVerifyOrdering = () => {
    if (!currentStep.orderingItems) return;
    soundFx.playClick();
    let correctCount = 0;
    orderedItems.forEach((item, idx) => {
      if (item.correctIndex === idx) correctCount++;
    });

    setIsAnswered(true);
    if (correctCount === orderedItems.length) {
      setIsCorrect(true);
      setFeedbackMsg('Sequenza perfetta! Hai ordinato tutte le istruzioni correttamente! 🚀');
      soundFx.playSuccess();
    } else {
      setIsCorrect(false);
      setFeedbackMsg(`Alcune istruzioni non sono al posto giusto (${correctCount}/${orderedItems.length} corrette). Riprova!`);
      soundFx.playError();
    }
  };

  const moveOrderingItem = (idx: number, dir: 'up' | 'down') => {
    soundFx.playClick();
    const newItems = [...orderedItems];
    const target = dir === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= newItems.length) return;
    const tmp = newItems[idx];
    newItems[idx] = newItems[target];
    newItems[target] = tmp;
    setOrderedItems(newItems);
    setIsAnswered(false);
  };

  const handleNext = () => {
    soundFx.playClick();
    onCompleteStep(currentStep.id);
    if (isLastStep) {
      onFinishLevel();
    }
  };

  const handlePrevious = () => {
    soundFx.playClick();
    if (onPreviousStep) {
      onPreviousStep();
    }
  };

  // Render appropriate interactive simulator for current level
  const renderLevelSimulator = () => {
    switch (level.id) {
      case 0:
        return <TeaRecipeSim />;
      case 1:
        return <GridBotSim />;
      case 2:
        return <VariableBoxSim />;
      case 3:
        return <DataTypeSim />;
      case 4:
        return <LogicGateSim />;
      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1rem 2rem 1rem' }}>
      
      {/* Top Step Progress Bar */}
      <div className="glass-card" style={{ padding: '1rem 1.5rem', marginBottom: '1.5rem', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
          <div>
            <span style={{ color: 'var(--accent-orange)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '1px' }}>
              {level.topic} — {level.title}
            </span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
              {currentStep.title}
            </h3>
          </div>
          <span style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '0.3rem 0.8rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700 }}>
            Passo {stepIndex + 1} di {level.steps.length}
          </span>
        </div>

        {/* Visual progress track */}
        <div style={{ background: 'rgba(255, 255, 255, 0.08)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            width: `${((stepIndex + 1) / level.steps.length) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #f97316, #06b6d4)',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* LEFT COLUMN: Spiegazione, Metafora, Codice & Next Button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Theory card */}
          {currentStep.theoryText && (
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '0.6rem', fontSize: '0.9rem' }}>
                <BookOpen size={18} />
                <span>Spiegazione Concetto</span>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#e2e8f0' }}>
                {currentStep.theoryText}
              </p>
            </div>
          )}

          {/* Real world analogy card */}
          {currentStep.analogyText && (
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid var(--accent-orange)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-orange)', fontWeight: 700, marginBottom: '0.6rem', fontSize: '0.9rem' }}>
                <Lightbulb size={18} />
                <span>Metafora del Mondo Reale</span>
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#cbd5e1', whiteSpace: 'pre-line' }}>
                {currentStep.analogyText}
              </p>
            </div>
          )}

          {/* Code Example box */}
          {currentStep.codeExample && (
            <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '0.5px' }}>
                SINTASSI RUST DI ESEMPIO:
              </div>
              <pre className="code-block" style={{ margin: 0 }}>
                <code>{currentStep.codeExample}</code>
              </pre>
            </div>
          )}

          {/* If step is Theory or Example, put the Next step button right here on the left */}
          {(currentStep.type === 'theory' || currentStep.type === 'example') && (
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem' }}>
              {stepIndex > 0 && (
                <button className="btn-secondary" onClick={handlePrevious} style={{ flex: 1, justifyContent: 'center' }}>
                  <ArrowLeft size={18} />
                  <span>Indietro</span>
                </button>
              )}
              <button className="btn-primary" onClick={handleNext} style={{ flex: 2, justifyContent: 'center' }}>
                <span>Ho Capito! Vai al Passo Successivo</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* Hint collapsible */}
          {currentStep.hint && (
            <div style={{ marginTop: 'auto' }}>
              <button
                className="btn-secondary"
                onClick={() => setShowHint(!showHint)}
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
              >
                <HelpCircle size={16} />
                <span>{showHint ? 'Nascondi Suggerimento' : 'Hai bisogno di un Suggerimento?'}</span>
              </button>
              {showHint && (
                <div style={{ marginTop: '0.5rem', padding: '0.75rem 1rem', background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '10px', color: '#38bdf8', fontSize: '0.85rem' }}>
                  💡 <strong>Suggerimento:</strong> {currentStep.hint}
                </div>
              )}
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Always render the Interactive Simulator + Exercise if applicable */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Show the level simulator only in theory or example steps */}
          {(currentStep.type === 'theory' || currentStep.type === 'example' || currentStep.type === 'demo') && renderLevelSimulator()}

          {/* If step is Simple Exercise (Multiple Choice) */}
          {currentStep.type === 'simple_exercise' && currentStep.choices && (
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-orange)', fontWeight: 800, marginBottom: '0.8rem' }}>
                <Sparkles size={18} />
                <span>Mettiti alla Prova: Quesito</span>
              </div>
              
              <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                {currentStep.question}
              </h4>

              {/* Choices list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {currentStep.choices.map((choice) => {
                  const isSelected = selectedChoiceId === choice.id;
                  return (
                    <div
                      key={choice.id}
                      onClick={() => {
                        if (!isAnswered || !isCorrect) {
                          soundFx.playClick();
                          setSelectedChoiceId(choice.id);
                        }
                      }}
                      style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        background: isSelected ? 'rgba(249, 115, 22, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                        border: isSelected ? '2px solid var(--accent-orange)' : '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: isSelected ? '6px solid var(--accent-orange)' : '2px solid var(--text-muted)',
                        background: '#fff'
                      }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>
                        {choice.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Verify / Feedback area */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                {stepIndex > 0 && (
                  <button
                    className="btn-secondary"
                    onClick={handlePrevious}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <ArrowLeft size={18} />
                    <span>Indietro</span>
                  </button>
                )}
                {!isCorrect ? (
                  <button
                    className="btn-primary"
                    onClick={handleVerifyChoice}
                    disabled={!selectedChoiceId}
                    style={{ flex: 2, justifyContent: 'center' }}
                  >
                    <CheckCircle2 size={18} />
                    <span>Verifica Risposta</span>
                  </button>
                ) : (
                  <button
                    className="btn-accent-cyan"
                    onClick={handleNext}
                    style={{ flex: 2, justifyContent: 'center' }}
                  >
                    <span>Risposta Corretta! Continua</span>
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>

              {/* Feedback box */}
              {isAnswered && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  background: isCorrect ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  border: `1px solid ${isCorrect ? '#22c55e' : '#ef4444'}`,
                  color: isCorrect ? '#4ade80' : '#f87171',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {isCorrect ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span>{feedbackMsg}</span>
                </div>
              )}
            </div>
          )}

          {/* If step is Autonomous Exercise (Ordering or choices) */}
          {currentStep.type === 'autonomous_exercise' && (
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontWeight: 800, marginBottom: '0.8rem' }}>
                <Sparkles size={18} />
                <span>Sfida Autonoma di Consolidamento</span>
              </div>

              <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                {currentStep.question}
              </h4>

              {/* Ordering exercise UI */}
              {currentStep.orderingItems && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {orderedItems.map((item, idx) => (
                    <div key={item.id} style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-subtle)',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ background: 'var(--accent-cyan)', color: '#fff', fontWeight: 800, width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifySelf: 'center', fontSize: '0.75rem' }}>
                          {idx + 1}
                        </span>
                        <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-code)', color: '#e2e8f0' }}>{item.text}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.2rem' }}>
                        <button disabled={idx === 0} onClick={() => moveOrderingItem(idx, 'up')} className="btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}>▲</button>
                        <button disabled={idx === orderedItems.length - 1} onClick={() => moveOrderingItem(idx, 'down')} className="btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}>▼</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Multiple Choice inside Autonomous */}
              {currentStep.choices && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {currentStep.choices.map((choice) => {
                    const isSelected = selectedChoiceId === choice.id;
                    return (
                      <div
                        key={choice.id}
                        onClick={() => {
                          if (!isAnswered || !isCorrect) {
                            soundFx.playClick();
                            setSelectedChoiceId(choice.id);
                          }
                        }}
                        style={{
                          padding: '1rem',
                          borderRadius: '12px',
                          background: isSelected ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                          border: isSelected ? '2px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem'
                        }}
                      >
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: isSelected ? '5px solid var(--accent-cyan)' : '2px solid var(--text-muted)' }} />
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', fontFamily: choice.label.includes(';') ? 'var(--font-code)' : 'inherit' }}>
                          {choice.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Verification Button */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                {stepIndex > 0 && (
                  <button
                    className="btn-secondary"
                    onClick={handlePrevious}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <ArrowLeft size={18} />
                    <span>Indietro</span>
                  </button>
                )}
                {!isCorrect ? (
                  <button
                    className="btn-accent-cyan"
                    onClick={currentStep.orderingItems ? handleVerifyOrdering : handleVerifyChoice}
                    style={{ flex: 2, justifyContent: 'center' }}
                  >
                    <CheckCircle2 size={18} />
                    <span>Verifica Risposta Autonoma</span>
                  </button>
                ) : (
                  <button
                    className="btn-primary"
                    onClick={handleNext}
                    style={{ flex: 2, justifyContent: 'center' }}
                  >
                    <span>Sfida Vinta! Continua</span>
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>

              {/* Feedback box */}
              {isAnswered && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  background: isCorrect ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  border: `1px solid ${isCorrect ? '#22c55e' : '#ef4444'}`,
                  color: isCorrect ? '#4ade80' : '#f87171',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {isCorrect ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span>{feedbackMsg}</span>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
