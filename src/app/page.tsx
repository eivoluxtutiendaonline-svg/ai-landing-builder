import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts, getTemplates } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const products = getProducts();
  const templates = getTemplates();

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              Generador de landings
            </p>
            <h1 className="text-3xl font-bold text-slate-900">Construye landings de ecommerce en minutos</h1>
            <p className="max-w-2xl text-slate-600">
              Arrancamos con una base mockeada para iterar la UX: productos, secciones y plantillas listas para ser editadas.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/products/new"
              className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              Crear producto
            </Link>
            <Link
              href="/products"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-brand-200 hover:text-brand-700"
            >
              Ver productos
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-600">Productos</p>
          <p className="text-3xl font-bold text-slate-900">{products.length}</p>
          <p className="text-xs text-slate-500">Gestiona y crea landings personalizadas.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-600">Plantillas disponibles</p>
          <p className="text-3xl font-bold text-slate-900">{templates.length}</p>
          <p className="text-xs text-slate-500">Tipos de sección configurados.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-600">Fase</p>
          <p className="text-3xl font-bold text-slate-900">Base mock</p>
          <p className="text-xs text-slate-500">Sin IA ni generación de imágenes aún.</p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Productos activos</h2>
          <Link className="text-sm font-semibold text-brand-700" href="/products">
            Ver todos
          </Link>
        </div>
        {products.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-slate-600">
            Aún no hay productos. Crea el primero para empezar a armar landings.
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
