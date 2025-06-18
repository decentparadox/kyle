import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSettings } from "../contexts/SettingsContext";
import { Moon, Sun, Clock, Save } from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface InlineSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InlineSettings({ isOpen, onClose }: InlineSettingsProps) {
  const { settings, updateSettings } = useSettings();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-20 right-4 w-80 rounded-lg shadow-lg p-4 z-50"
          >
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Dark Mode</Label>
                  <Switch
                    checked={settings.isDarkMode}
                    onCheckedChange={(checked) => updateSettings({ isDarkMode: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Font Size</Label>
                  <Select
                    value={settings.fontSize}
                    onValueChange={(value) => updateSettings({ fontSize: value })}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="14">Small</SelectItem>
                      <SelectItem value="16">Medium</SelectItem>
                      <SelectItem value="18">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Auto-save (minutes)</Label>
                  <Select
                    value={settings.autoSaveInterval.toString()}
                    onValueChange={(value) => updateSettings({ autoSaveInterval: parseInt(value) })}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 min</SelectItem>
                      <SelectItem value="5">5 min</SelectItem>
                      <SelectItem value="10">10 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 