export type StepType = 'theory' | 'example' | 'demo' | 'simple_exercise' | 'autonomous_exercise';

export interface ExerciseChoice {
  id: string;
  label: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface OrderingItem {
  id: string;
  text: string;
  correctIndex: number;
}

export interface VariableBox {
  id: string;
  name: string;
  type: string;
  isMutable: boolean;
  value: string | number | boolean;
}

export interface StepContent {
  id: string;
  type: StepType;
  title: string;
  theoryText?: string;
  analogyText?: string; // Real world metaphor
  codeExample?: string;
  demoInstruction?: string;
  // Exercise specific:
  question?: string;
  choices?: ExerciseChoice[];
  orderingItems?: OrderingItem[];
  variableBoxes?: VariableBox[];
  targetBoxId?: string;
  targetValue?: string | number | boolean;
  codeTemplate?: string;
  expectedOutput?: string;
  hint?: string;
}

export interface LevelData {
  id: number;
  title: string;
  topic: string;
  subtitle: string;
  description: string;
  iconName: string;
  badgeName: string;
  badgeIcon: string;
  badgeDescription: string;
  steps: StepContent[];
}

export interface UserProgress {
  nickname: string;
  totalXp: number;
  streak: number;
  currentLevelId: number;
  completedLevelIds: number[];
  unlockedBadges: string[];
  mutedSound: boolean;
}
