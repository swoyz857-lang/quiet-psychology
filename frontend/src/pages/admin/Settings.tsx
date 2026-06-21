import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Save, Settings2 } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Toggle from '../../components/ui/Toggle';

const SETTING_KEYS = [
  { key: 'site_name', label: 'Site Name', type: 'text' },
  { key: 'site_tagline', label: 'Site Tagline', type: 'text' },
  { key: 'support_email', label: 'Support Email', type: 'email' },
  { key: 'currency', label: 'Currency', type: 'text' },
  { key: 'display_price', label: 'Display Price', type: 'text' },
  { key: 'sale_price', label: 'Sale Price', type: 'text' },
  { key: 'reviews_enabled', label: 'Reviews Enabled', type: 'toggle' },
  { key: 'email_capture_enabled', label: 'Email Capture Enabled', type: 'toggle' },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.settings
      .get()
      .then(setSettings)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    await api.settings.update(settings);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <p className="text-muted-gray">Loading settings...</p>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-soft-gold/10 flex items-center justify-center">
          <Settings2 size={20} className="text-soft-gold" />
        </div>
        <div>
          <h1 className="font-serif text-3xl text-muted-white">Settings</h1>
          <p className="text-muted-gray text-sm">Configure site-wide preferences</p>
        </div>
      </div>

      <div className="bg-charcoal border border-white/5 p-6 md:p-8 space-y-6">
        {SETTING_KEYS.map(({ key, label, type }) => (
          <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/5 last:border-0 last:pb-0">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-white">{label}</p>
              <p className="text-xs text-muted-gray mt-0.5">Key: {key}</p>
            </div>
            {type === 'toggle' ? (
              <Toggle
                checked={settings[key] === 'true'}
                onChange={(checked) => setSettings({ ...settings, [key]: String(checked) })}
              />
            ) : (
              <Input
                type={type}
                value={settings[key] || ''}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                className="sm:w-72"
              />
            )}
          </div>
        ))}

        <div className="pt-4 flex items-center gap-4">
          <Button onClick={save} disabled={saving} className="min-w-[140px]">
            <Save size={16} className="mr-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
          {saved && <span className="text-green-500 text-sm">Settings saved successfully.</span>}
        </div>
      </div>
    </div>
  );
}
