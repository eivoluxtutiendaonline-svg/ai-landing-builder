import Link from "next/link";
import SectionPreview from "@/components/SectionPreview";
import SectionSelector from "@/components/SectionSelector";
import { getProductById, getTemplates } from "@/lib/data";
import type { Template } from "@/lib/types";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  const templates = getTemplates();

  if (!product) return notFound();

  const mapTemplates = templates.reduce<Record<string, Template>>((acc, template) => {
    acc[template.id] = template;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Producto</p>
          <h1 className="text-2xl font-bold text-slate-900">{product.name}</h1>
          <p className="text-sm text-slate-600">{product.description}</p>
        </div>
        <Link className="text-sm font-semibold text-brand-700" href="/products">
          Volver al listado
        </Link>
      </div>

      <SectionSelector productId={product.id} />

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Secciones</h2>
        {product.sections.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-slate-600">
            Aún no hay secciones. Agrega una para ver la vista previa.
          </div>
        ) : (
          <div className="space-y-4">
            {product.sections.map((section) => (
              <div key={section.id} className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wide text-slate-500">{mapTemplates[section.templateId]?.sectionType}</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {mapTemplates[section.templateId]?.name ?? "Plantilla"}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-brand-700">Vista previa mock</span>
                </div>
                <SectionPreview section={section} template={mapTemplates[section.templateId]} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
