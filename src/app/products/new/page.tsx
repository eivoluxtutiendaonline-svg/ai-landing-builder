import Link from "next/link";
import NewProductForm from "@/components/NewProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-200">Crear</p>
          <h1 className="text-3xl font-bold text-slate-50">Nuevo producto</h1>
          <p className="text-sm text-slate-400">
            Define el nombre y la descripción. Luego subirás las 3 imágenes y el brief creativo para que Eiva Magic genere la landing completa.
          </p>
        </div>
        <Link className="text-sm font-semibold text-brand-200" href="/products">
          Volver al listado
        </Link>
      </div>

      <NewProductForm />
    </div>
  );
}
