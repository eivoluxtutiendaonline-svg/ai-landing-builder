import Link from "next/link";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const isGenerated = Boolean(product.landing);

  return (
    <div className="flex flex-col justify-between rounded-xl border border-night-700 bg-night-800/70 p-5 shadow-lg">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-50">{product.name}</h3>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isGenerated
                ? "bg-emerald-900/40 text-emerald-200 border border-emerald-700/60"
                : "bg-night-700 text-slate-300 border border-night-600"
            }`}
          >
            {isGenerated ? "Landing generada" : "Pendiente de IA"}
          </span>
        </div>
        <p className="text-sm text-slate-300">{product.description}</p>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="rounded-md bg-night-700 px-2 py-1">Imágenes: {product.images.length || 0}/3</span>
          <span className="rounded-md bg-night-700 px-2 py-1">
            IA: {product.creativeControls ? "Configurada" : "Sin brief"}
          </span>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-3 text-sm font-semibold">
        <Link
          className="rounded-lg bg-brand-500 px-4 py-2 text-night-900 shadow-glow transition hover:bg-brand-400"
          href={`/products/${product.id}`}
        >
          Abrir producto
        </Link>
        {isGenerated && (
          <Link className="text-brand-200 underline" href={`/products/${product.id}`}>
            Ver landing
          </Link>
        )}
      </div>
    </div>
  );
}
