import { useSettings } from '../contexts/SettingsContext';
import Transition from "../components/Transistion";
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export default function Settings() {
  const { settings, updateSettings } = useSettings();

  return (

      <main className="flex flex-col gap-8 items-center sm:items-center overflow-hidden w-full max-w-2xl">
        <Transition>
          <div className="flex flex-col gap-6 w-full p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <h1 className="font-editorial text-2xl">Settings</h1>
            </div>

            <div className="space-y-6">
              {/* Theme Settings */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Appearance</h2>
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <Switch
                    id="dark-mode"
                    checked={settings.isDarkMode}
                    onCheckedChange={(checked: boolean) => updateSettings({ isDarkMode: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="font-size">Font Size</Label>
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
              </div>

              {/* Auto-save Settings */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Auto-save</h2>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-save">Auto-save Interval (minutes)</Label>
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
                <h2 className="text-lg font-semibold">Default Duration</h2>
                <div className="flex items-center justify-between">
                  <Label htmlFor="duration">Default Scene Duration</Label>
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