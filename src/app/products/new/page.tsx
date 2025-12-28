import Link from "next/link";
import NewProductForm from "@/components/NewProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Nuevo producto</h1>
          <p className="text-sm text-slate-600">Configura la ficha base para la landing.</p>
        </div>
        <Link className="text-sm font-semibold text-brand-700" href="/products">
          Volver al listado
        </Link>
      </div>

      <NewProductForm />
    </div>
  );
}
