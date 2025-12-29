import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const products = getProducts();
  const generated = products.filter((p) => p.landing).length;

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-night-900 via-night-800 to-night-900 p-8 shadow-glow">
        <div className="grid gap-8 md:grid-cols-[2fr,1fr] md:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">Eiva Magic</p>
            <h1 className="text-4xl font-extrabold text-slate-50 leading-tight">Landings ganadoras, generadas por IA</h1>
            <p className="max-w-2xl text-slate-300">
              No más page builders infinitos. Eiva Magic analiza tu producto real, entiende tu ángulo de venta y genera una landing completa, coherente y lista para vender.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products/new"
                className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-night-900 shadow-glow transition hover:bg-brand-400"
              >
                Crear nuevo producto
              </Link>
              <Link
                href="/products"
                className="rounded-xl border border-night-700 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-brand-400 hover:text-brand-100"
              >
                Ver productos generados
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-brand-500/30 bg-night-900/70 p-5 shadow-lg">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-200">Estado</p>
            <div className="mt-3 grid grid-cols-2 gap-4 text-slate-100">
              <div className="rounded-xl border border-night-700 bg-night-800/80 p-4">
                <p className="text-sm text-slate-400">Productos</p>
                <p className="text-3xl font-bold text-slate-50">{products.length}</p>
              </div>
              <div className="rounded-xl border border-night-700 bg-night-800/80 p-4">
                <p className="text-sm text-slate-400">Landings IA</p>
                <p className="text-3xl font-bold text-slate-50">{generated}</p>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-brand-500/20 bg-brand-500/10 p-4 text-sm text-brand-100">
              El frasco no se inventa: reutilizamos tus 3 imágenes reales en todas las secciones generadas.
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-50">Productos generados</h2>
          <Link className="text-sm font-semibold text-brand-200" href="/products">
            Ver todos
          </Link>
        </div>
        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-night-700 bg-night-800/70 p-6 text-slate-300">
            Aún no hay productos. Crea el primero para que la IA genere tu landing completa.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {products.slice(0, 2).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
