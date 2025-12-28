import type { Section, Template } from "@/lib/types";

type Props = {
  section: Section;
  template: Template | undefined;
};

function renderHero(content: Section["content"]) {
  const bullets = Array.isArray(content.bullets) ? content.bullets : [];

  return (
    <div className="grid gap-8 rounded-xl bg-gradient-to-r from-brand-50 via-white to-brand-50 p-8 shadow-sm md:grid-cols-2">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Hero</p>
        <h3 className="text-2xl font-bold text-slate-900">{content.headline}</h3>
        <p className="text-slate-600">{content.subheadline}</p>
        {bullets.length > 0 && (
          <ul className="space-y-2 text-sm text-slate-700">
            {bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-600" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
        <button className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800">
          {content.ctaLabel}
        </button>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex h-48 w-full max-w-md items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white text-slate-500">
          Mock imagen ({content.imageUrl})
        </div>
      </div>
    </div>
  );
}

export default function SectionPreview({ section, template }: Props) {
  if (!template) {
    return (
      <div className="rounded-lg border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-500">
        Plantilla no encontrada para esta sección.
      </div>
    );
  }

  switch (template.sectionType) {
    case "Hero":
      return renderHero(section.content);
    default:
      return (
        <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Sección {template.sectionType}</p>
          <pre className="mt-2 overflow-auto rounded bg-slate-50 p-3 text-xs text-slate-700">
            {JSON.stringify(section.content, null, 2)}
          </pre>
        </div>
      );
  }
}
