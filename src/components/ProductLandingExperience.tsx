"use client";

import Link from "next/link";
import { useState } from "react";
import GenerateLandingForm from "@/components/GenerateLandingForm";
import LandingPreview from "@/components/LandingPreview";
import LandingEditor from "@/components/LandingEditor";
import type { Product, Landing } from "@/lib/types";

export default function ProductLandingExperience({ product }: { product: Product }) {
  const [landing, setLanding] = useState<Landing | undefined>(product.landing);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-200">Producto</p>
          <h1 className="text-3xl font-bold text-slate-50">{product.name}</h1>
          <p className="text-sm text-slate-300 max-w-2xl">{product.description}</p>
          <div className="flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="rounded-md border border-night-700 bg-night-800 px-2 py-1">Imágenes: {product.images.length}/3</span>
            <span className="rounded-md border border-night-700 bg-night-800 px-2 py-1">
              Brief IA: {product.creativeControls ? "Listo" : "Pendiente"}
            </span>
            <span className="rounded-md border border-night-700 bg-night-800 px-2 py-1">
              Landing: {landing ? "Generada" : "Sin generar"}
            </span>
          </div>
        </div>
        <Link className="text-sm font-semibold text-brand-200" href="/products">
          Volver al listado
        </Link>
      </div>

      {product.images.length > 0 && (
        <div className="grid gap-4 rounded-2xl border border-night-700 bg-night-800/60 p-4 md:grid-cols-3">
          {product.images.map((img, index) => (
            <div key={img} className="overflow-hidden rounded-xl border border-night-700 bg-night-900/70">
              <img src={img} alt={`Producto real ${index + 1}`} className="h-40 w-full object-cover opacity-80" />
              <div className="px-3 py-2 text-xs text-slate-400">Imagen real {index + 1} — mismo frasco</div>
            </div>
          ))}
        </div>
      )}

      <GenerateLandingForm
        productId={product.id}
        onGenerated={(generated) => setLanding(generated)}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-50">Landing generada</h2>
          {landing && <span className="text-xs text-slate-400">Generada el {new Date(landing.generatedAt).toLocaleString("es-ES")}</span>}
        </div>
        {!landing ? (
          <div className="rounded-2xl border border-dashed border-night-700 bg-night-800/70 p-6 text-slate-300">
            Genera la landing con IA usando tus 3 imágenes reales y el brief creativo. El frasco no se inventa.
          </div>
        ) : (
          <div className="space-y-4">
            <LandingPreview landing={landing} />
            <LandingEditor
              productId={product.id}
              landing={landing}
              onLandingUpdated={(next) => setLanding(next)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
