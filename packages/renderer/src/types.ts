export type Settings = {
  isDarkMode: boolean;
  autoSaveInterval: number;
  defaultDuration: string;
  sidebarExpanded: boolean;
  fontSize: string;
  theme: string;
}; 

export interface Scene {
  id: string;
  title: string;
  description: string;
  notes: string;
  characters: string[];
  location: string;
  duration: string;
  timeOfDay: string;
  cameraAngle: string;
  order: number;
  createdAt: string;
}

export interface Storyboard {
  id: string;
  name: string;
  description: string;
  scenes: Scene[];
  characters?: string[];
  locations?: string[];
  createdAt: string;
  updatedAt: string;
}