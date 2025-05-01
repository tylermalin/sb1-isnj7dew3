export interface TriviaQuestion {
  id: number;
  question: string;
  answer: string;
  caption: string;
}

export interface GotchaQuestion {
  id: number;
  question: string;
  answer: string;
}

export interface GameState {
  answeredTriviaCount: number;
  gotchaPassed: boolean;
  unlockedFinal: boolean;
}

export interface QuestBadge {
  name: string;
  completionDate: string;
  achievements: string[];
}