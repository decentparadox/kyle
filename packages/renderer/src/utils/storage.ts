import { type Storyboard } from '../types';

export const saveStoryboard = (storyboard: Storyboard): void => {
  const storyboards = getAllStoryboards();
  const existingIndex = storyboards.findIndex(b => b.id === storyboard.id);
  
  if (existingIndex >= 0) {
    storyboards[existingIndex] = storyboard;
  } else {
    storyboards.push(storyboard);
  }
  
  localStorage.setItem('storyboards', JSON.stringify(storyboards));
};

export const getAllStoryboards = (): Storyboard[] => {
  const data = localStorage.getItem('storyboards');
  return data ? JSON.parse(data) : [];
};

export const getStoryboardById = (id: string): Storyboard | undefined => {
  const storyboards = getAllStoryboards();
  return storyboards.find(board => board.id === id);
};

export const deleteStoryboard = (id: string): void => {
  const storyboards = getAllStoryboards();
  const filtered = storyboards.filter(board => board.id !== id);
  localStorage.setItem('storyboards', JSON.stringify(filtered));
};