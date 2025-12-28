import Link from "next/link";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            {product.sections.length} secciones
          </span>
        </div>
        <p className="text-sm text-slate-600">{product.description}</p>
      </div>
      <div className="mt-4 flex items-center gap-3 text-sm font-medium">
        <Link
          className="rounded-lg bg-brand-700 px-4 py-2 text-white transition hover:bg-brand-800"
          href={`/products/${product.id}`}
        >
          Ver detalle
        </Link>
        <Link className="text-brand-700 underline" href={`/products/${product.id}`}>
          Editar secciones
        </Link>
      </div>
    </div>
  );
}
