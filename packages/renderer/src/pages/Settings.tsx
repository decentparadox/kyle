import { useSettings } from '../contexts/SettingsContext';
import Transition from "../components/Transistion";
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { themes } from '../lib/themes';

export default function Settings() {
  const { settings, updateSettings } = useSettings();

  return (

      <main className="flex flex-col gap-8 items-center sm:items-center overflow-hidden w-full max-w-2xl">
        <Transition>
          <div className="flex flex-col gap-6 w-full p-6 bg-[var(--card)] rounded-lg">
            <div className="flex items-center justify-between">
              <h1 className="font-editorial text-2xl text-[var(--text)]">Settings</h1>
            </div>

            <div className="space-y-6">
              {/* Theme Settings */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[var(--text)]">Appearance</h2>
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode" className="text-[var(--text)]">Dark Mode</Label>
                  <Switch
                    id="dark-mode"
                    checked={settings.isDarkMode}
                    onCheckedChange={(checked: boolean) => updateSettings({ isDarkMode: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="font-size" className="text-[var(--text)]">Font Size</Label>
                  <Select
                    value={settings.fontSize}
                    onValueChange={(value) => updateSettings({ fontSize: value })}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="14">Small</SelectItem>
                      <SelectItem value="16">Medium</SelectItem>
                      <SelectItem value="18">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-[var(--text)]">Theme</h2>
                  <div className="flex items-center gap-4">
                    {themes.map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() => updateSettings({ theme: theme.name })}
                        className={`w-10 h-10 rounded-full transition-all ${
                          settings.theme === theme.name ? 'ring-2 ring-offset-2 ring-[var(--text)]' : ''
                        }`}
                        style={{ background: theme.colors.primary }}
                        aria-label={`Select ${theme.name} theme`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Auto-save Settings */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[var(--text)]">Auto-save</h2>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-save" className="text-[var(--text)]">Auto-save Interval (minutes)</Label>
                  <Select
                    value={settings.autoSaveInterval.toString()}
                    onValueChange={(value) => updateSettings({ autoSaveInterval: parseInt(value) })}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 minute</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Default Duration */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[var(--text)]">Default Duration</h2>
                <div className="flex items-center justify-between">
                  <Label htmlFor="duration" className="text-[var(--text)]">Default Scene Duration</Label>
                  <Select
                    value={settings.defaultDuration}
                    onValueChange={(value) => updateSettings({ defaultDuration: value })}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15s">15 seconds</SelectItem>
                      <SelectItem value="30s">30 seconds</SelectItem>
                      <SelectItem value="45s">45 seconds</SelectItem>
                      <SelectItem value="60s">1 minute</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </main>

  );
}