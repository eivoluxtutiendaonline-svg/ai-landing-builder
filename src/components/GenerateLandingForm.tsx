"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CreativeControls, Landing } from "@/lib/types";

export default function GenerateLandingForm({
  productId,
  onGenerated,
}: {
  productId: string;
  onGenerated?: (landing: Landing) => void;
}) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(["", "", ""]);
  const [controls, setControls] = useState<CreativeControls>({
    details: "",
    angle: "",
    avatar: "",
    instructions: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function updateImage(index: number, value: string) {
    setImages((prev) => prev.map((img, i) => (i === index ? value : img)));
  }

  function updateControl(key: keyof CreativeControls, value: string) {
    setControls((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const cleanedImages = images.map((img) => img.trim()).filter(Boolean);
    if (cleanedImages.length !== 3) {
      setError("Debes subir exactamente 3 imágenes reales del producto.");
      setLoading(false);
      return;
    }

    const res = await fetch(`/api/products/${productId}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images: cleanedImages, controls }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message ?? "No se pudo generar la landing.");
      setLoading(false);
      return;
    }

    const data = await res.json();
    if (data.landing && onGenerated) {
      onGenerated(data.landing);
    }
    setSuccess("Landing generada con IA");
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-night-700 bg-night-800/70 p-6 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">Flujo IA</p>
          <h3 className="text-xl font-semibold text-slate-50">Generar landing completa</h3>
          <p className="text-sm text-slate-400">
            Sube las 3 imágenes reales del producto. Eiva Magic mantendrá el mismo frasco en todas las vistas generadas.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {images.map((image, index) => (
          <label
            key={index}
            className="group relative block overflow-hidden rounded-xl border border-night-700 bg-night-900/60 p-4"
          >
            <span className="text-xs font-semibold text-slate-300">Imagen {index + 1}</span>
            <input
              className="mt-2 w-full rounded-lg border border-night-700 bg-night-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/40"
              placeholder="URL o ruta de la imagen real"
              value={image}
              onChange={(e) => updateImage(index, e.target.value)}
              required
            />
            <span className="mt-2 block text-[11px] text-slate-500">
              Usa la misma referencia de frasco: no inventamos nuevos envases.
            </span>
            {image && (
              <div className="mt-3 overflow-hidden rounded-lg border border-night-800 bg-night-800/80">
                <img src={image} alt={`Imagen real ${index + 1}`} className="h-32 w-full object-cover opacity-80" />
                <div className="px-2 py-1 text-[11px] text-slate-400">Preview — el frasco debe ser idéntico</div>
              </div>
            )}
          </label>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-slate-200">
          Detalles del producto
          <textarea
            className="w-full rounded-xl border border-night-700 bg-night-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/40"
            rows={3}
            value={controls.details}
            onChange={(e) => updateControl("details", e.target.value)}
            placeholder="Textura, diferenciadores, beneficios sensoriales"
            required
          />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-200">
          Ángulo de venta
          <textarea
            className="w-full rounded-xl border border-night-700 bg-night-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/40"
            rows={3}
            value={controls.angle}
            onChange={(e) => updateControl("angle", e.target.value)}
            placeholder="Promesa central, antes/después, posicionamiento"
            required
          />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-200">
          Avatar del cliente ideal
          <textarea
            className="w-full rounded-xl border border-night-700 bg-night-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/40"
            rows={3}
            value={controls.avatar}
            onChange={(e) => updateControl("avatar", e.target.value)}
            placeholder="Edad, estilo de vida, objeciones, canales de compra"
            required
          />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-200">
          Instrucciones adicionales
          <textarea
            className="w-full rounded-xl border border-night-700 bg-night-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/40"
            rows={3}
            value={controls.instructions}
            onChange={(e) => updateControl("instructions", e.target.value)}
            placeholder="Tono, claims permitidos, restricciones creativas"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-night-900 shadow-glow transition hover:bg-brand-400 disabled:cursor-not-allowed"
        >
          {loading ? "Generando..." : "Generar landing con IA"}
        </button>
        {error && <span className="text-sm text-red-400">{error}</span>}
        {success && <span className="text-sm text-emerald-300">{success}</span>}
      </div>
    </form>
  );
}
