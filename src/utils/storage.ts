import { GameState } from '../types';

const STORAGE_KEY = 'emilyQuest';

export const getGameState = (): GameState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    answeredTriviaCount: 0,
    gotchaPassed: false,
    unlockedFinal: false
  };
};

export const updateGameState = (updates: Partial<GameState>): void => {
  const currentState = getGameState();
  const newState = { ...currentState, ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
};

export const resetGameState = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};