import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { themes } from '../lib/themes';

interface Settings {
  isDarkMode: boolean;
  autoSaveInterval: number;
  defaultDuration: string;
  sidebarExpanded: boolean;
  fontSize: string;
  theme: string;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  isDarkMode: true,
  autoSaveInterval: 5,
  defaultDuration: '30s',
  sidebarExpanded: true,
  fontSize: '16',
  theme: 'forest'
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useLocalStorage('app-settings', defaultSettings);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.isDarkMode);
  }, [settings.isDarkMode]);

  // Apply theme
  useEffect(() => {
    const currentTheme = themes.find(t => t.name === settings.theme)?.colors;
    if (currentTheme) {
      Object.entries(currentTheme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value);
      });
    }
  }, [settings.theme]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};