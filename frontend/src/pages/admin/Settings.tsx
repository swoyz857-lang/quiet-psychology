import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const SETTING_KEYS = [
  'site_name',
  'site_tagline',
  'support_email',
  'currency',
  'display_price',
  'sale_price',
  'reviews_enabled',
  'email_capture_enabled',
];

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.settings
      .get()
      .then(setSettings)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    await api.settings.update(settings);
    setSaving(false);
  };

  if (loading) return <p className="text-muted-gray">Loading settings...</p>;

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-serif text-3xl text-muted-white">Settings</h1>
      <div className="bg-charcoal border border-white/5 p-6 md:p-8 space-y-4">
        {SETTING_KEYS.map((key) => (
          <Input
            key={key}
            label={key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            value={settings[key] || ''}
            onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
          />
        ))}
        <Button onClick={save} className="w-full" disabled={saving}>
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
}
