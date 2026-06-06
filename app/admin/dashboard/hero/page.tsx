"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { SITE } from "@/lib/constants";

interface HeroData {
  greeting: string;
  name: string;
  tagline: string;
  splineUrl: string;
}

export default function HeroAdmin() {
  const [data, setData] = useState<HeroData>({
    greeting: "Hey, I'm",
    name: SITE.name,
    tagline: "",
    splineUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/hero")
      .then((r) => r.json())
      .then((d) => {
        if (d && d.name) setData(d);
        setLoading(false);
      });
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/admin/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) return <div className="animate-pulse text-neutral-500">Loading…</div>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Hero Section</h1>
      <div className="max-w-xl space-y-4 rounded-xl border border-white/10 bg-white/5 p-6">
        <Field label="Greeting" value={data.greeting} onChange={(v) => setData({ ...data, greeting: v })} />
        <Field label="Name" value={data.name} onChange={(v) => setData({ ...data, name: v })} />
        <Field label="Tagline" value={data.tagline} onChange={(v) => setData({ ...data, tagline: v })} textarea />
        <Field label="Spline Scene URL" value={data.splineUrl} onChange={(v) => setData({ ...data, splineUrl: v })} />
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium transition hover:bg-cyan-500 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  const cls = "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30";
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-neutral-400">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={cls} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </div>
  );
}
