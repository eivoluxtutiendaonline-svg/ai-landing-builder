import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function ProductsPage() {
  const products = getProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-50">Productos</h1>
          <p className="text-sm text-slate-400">
            Cada producto incluye su landing completa generada por IA usando tus tres imágenes reales.
          </p>
        </div>
        <Link
          href="/products/new"
          className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-night-900 shadow-glow transition hover:bg-brand-400"
        >
          Nuevo producto
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-night-700 bg-night-800/70 p-6 text-slate-300">
          No hay productos aún. Crea uno nuevo y genera una landing lista para vender.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
