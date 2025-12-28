"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { SectionType, Template } from "@/lib/types";

const sectionTypes: { value: SectionType; label: string }[] = [
  { value: "Hero", label: "Hero" },
  { value: "Oferta", label: "Oferta" },
  { value: "Beneficios", label: "Beneficios" },
  { value: "TablaComparativa", label: "Tabla comparativa" },
  { value: "Testimonios", label: "Testimonios" },
  { value: "PruebaAutoridad", label: "Prueba de autoridad" },
  { value: "ModoUso", label: "Modo de uso" },
  { value: "Logistica", label: "Logística" },
];

export default function SectionSelector({ productId }: { productId: string }) {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [type, setType] = useState<SectionType | "">("");
  const [templateId, setTemplateId] = useState<string>("");
  const [content, setContent] = useState<Record<string, string | string[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function loadTemplates() {
      const res = await fetch("/api/templates");
      const data = await res.json();
      setTemplates(data.templates ?? []);
    }
    loadTemplates();
  }, []);

  const templatesByType = useMemo(
    () => (type ? templates.filter((tpl) => tpl.sectionType === type) : templates),
    [templates, type],
  );

  const selectedTemplate = templates.find((tpl) => tpl.id === templateId);

  useEffect(() => {
    if (selectedTemplate) {
      setContent(selectedTemplate.defaultContent);
    }
  }, [selectedTemplate]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const res = await fetch(`/api/products/${productId}/sections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ templateId, content }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message ?? "No se pudo agregar la sección");
      setLoading(false);
      return;
    }

    setSuccess("Sección agregada");
    setLoading(false);
    router.refresh();
  }

  function handleContentChange(key: string, value: string | string[]) {
    setContent((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-slate-900">Agregar sección</h3>
        <p className="text-sm text-slate-600">
          Selecciona un tipo y plantilla para insertar una nueva sección en la landing.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm font-medium text-slate-800">
          Tipo de sección
          <select
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            value={type}
            onChange={(e) => {
              setType(e.target.value as SectionType);
              setTemplateId("");
            }}
            required
          >
            <option value="">Selecciona tipo</option>
            {sectionTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1 text-sm font-medium text-slate-800">
          Plantilla
          <select
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            required
            disabled={!type}
          >
            <option value="">Selecciona plantilla</option>
            {templatesByType.map((tpl) => (
              <option key={tpl.id} value={tpl.id}>
                {tpl.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {selectedTemplate && (
        <div className="space-y-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-800">Contenido editable</p>
          <div className="grid gap-4 md:grid-cols-2">
            {selectedTemplate.editableFields.map((field) => (
              <label key={field.key} className="space-y-1 text-xs font-medium text-slate-700">
                {field.label}
                {field.helperText && <span className="block text-[11px] font-normal text-slate-500">{field.helperText}</span>}
                {field.type === "textarea" ? (
                  <textarea
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    rows={3}
                    value={(content[field.key] as string) ?? ""}
                    onChange={(e) => handleContentChange(field.key, e.target.value)}
                  />
                ) : field.type === "list" ? (
                  <textarea
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    rows={3}
                    placeholder="Una viñeta por línea"
                    value={Array.isArray(content[field.key]) ? (content[field.key] as string[]).join("\n") : ""}
                    onChange={(e) =>
                      handleContentChange(
                        field.key,
                        e.target.value
                          .split("\n")
                          .map((line) => line.trim())
                          .filter(Boolean),
                      )
                    }
                  />
                ) : (
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    type="text"
                    value={(content[field.key] as string) ?? ""}
                    onChange={(e) => handleContentChange(field.key, e.target.value)}
                  />
                )}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={!templateId || loading}
          className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed"
        >
          {loading ? "Guardando..." : "Agregar sección"}
        </button>
        {error && <span className="text-sm text-red-600">{error}</span>}
        {success && <span className="text-sm text-emerald-600">{success}</span>}
      </div>
    </form>
  );
}
