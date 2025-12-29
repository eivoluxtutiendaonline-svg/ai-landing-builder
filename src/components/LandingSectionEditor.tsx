"use client";

import { useState } from "react";
import type { LandingSection } from "@/lib/types";

type Props = {
  productId: string;
  section: LandingSection;
  onUpdated: (updated: LandingSection) => void;
};

export default function LandingSectionEditor({ productId, section, onUpdated }: Props) {
  const [local, setLocal] = useState<LandingSection>(section);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function updateField<K extends keyof LandingSection>(key: K, value: LandingSection[K]) {
    setLocal((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setLoading(true);
    setError(null);
    setSaved(false);

    const res = await fetch(`/api/products/${productId}/landing`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sectionId: section.id, updates: local }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message ?? "No se pudo actualizar la sección");
      setLoading(false);
      return;
    }

    const data = await res.json();
    const updatedSection = data.landing.sections.find((s: LandingSection) => s.id === section.id) as
      | LandingSection
      | undefined;
    if (updatedSection) {
      onUpdated(updatedSection);
      setLocal(updatedSection);
      setSaved(true);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-3 rounded-xl border border-night-700 bg-night-900/60 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-100">Editar sección {section.type}</p>
        {saved && <span className="text-xs text-emerald-300">Guardado</span>}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-1 text-xs font-semibold text-slate-300">
          Título
          <input
            className="w-full rounded-lg border border-night-700 bg-night-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/40"
            value={local.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </label>
        <label className="space-y-1 text-xs font-semibold text-slate-300">
          Subtítulo
          <input
            className="w-full rounded-lg border border-night-700 bg-night-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/40"
            value={local.subtitle ?? ""}
            onChange={(e) => updateField("subtitle", e.target.value)}
          />
        </label>
        <label className="space-y-1 text-xs font-semibold text-slate-300">
          Texto
          <textarea
            className="w-full rounded-lg border border-night-700 bg-night-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/40"
            rows={3}
            value={local.body ?? ""}
            onChange={(e) => updateField("body", e.target.value)}
          />
        </label>
        <label className="space-y-1 text-xs font-semibold text-slate-300">
          Bullets (uno por línea)
          <textarea
            className="w-full rounded-lg border border-night-700 bg-night-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/40"
            rows={3}
            value={(local.bullets ?? []).join("\n")}
            onChange={(e) =>
              updateField(
                "bullets",
                e.target.value
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean),
              )
            }
          />
        </label>
        <label className="space-y-1 text-xs font-semibold text-slate-300">
          Imagen de sección
          <input
            className="w-full rounded-lg border border-night-700 bg-night-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/40"
            value={local.image ?? ""}
            onChange={(e) => updateField("image", e.target.value)}
          />
        </label>
        <label className="space-y-1 text-xs font-semibold text-slate-300">
          CTA (si aplica)
          <input
            className="w-full rounded-lg border border-night-700 bg-night-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/40"
            value={local.ctaLabel ?? ""}
            onChange={(e) => updateField("ctaLabel", e.target.value)}
          />
        </label>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-night-900 shadow-glow transition hover:bg-brand-400 disabled:cursor-not-allowed"
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
        {error && <span className="text-sm text-red-400">{error}</span>}
      </div>
    </div>
  );
}
