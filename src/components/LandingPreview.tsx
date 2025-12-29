import type { Landing } from "@/lib/types";

const sectionStyles: Record<string, string> = {
  Hero: "bg-gradient-to-br from-night-800 to-night-700 border border-brand-500/20",
  Problemas: "bg-night-900 border border-night-700",
  Beneficios: "bg-night-900 border border-night-700",
  Ingredientes: "bg-night-900 border border-night-700",
  Autoridad: "bg-night-900 border border-night-700",
  Testimonios: "bg-night-900 border border-night-700",
  Oferta: "bg-night-800 border border-brand-500/20",
};

export default function LandingPreview({ landing }: { landing: Landing }) {
  return (
    <div className="space-y-4">
      {landing.sections.map((section) => (
        <div
          key={section.id}
          className={`overflow-hidden rounded-2xl p-6 shadow-lg ${sectionStyles[section.type] ?? "bg-night-900 border border-night-700"}`}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 md:max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.25em] text-brand-200">{section.type}</p>
              <h3 className="text-xl font-semibold text-slate-50">{section.title}</h3>
              {section.subtitle && <p className="text-sm text-slate-300">{section.subtitle}</p>}
              {section.body && <p className="text-sm text-slate-200">{section.body}</p>}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="grid gap-2 text-sm text-slate-200 md:grid-cols-2">
                  {section.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-brand-400" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.ctaLabel && (
                <button className="mt-3 inline-flex items-center rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-night-900 shadow-glow transition hover:bg-brand-400">
                  {section.ctaLabel}
                </button>
              )}
            </div>
            {section.image && (
              <div className="h-40 w-full max-w-xs overflow-hidden rounded-xl border border-night-700 bg-night-900/60">
                <div className="flex h-full items-center justify-center text-[11px] text-slate-400 px-2 text-center">
                  Imagen real usada en esta sección — el frasco se mantiene idéntico
                </div>
                <img src={section.image} alt={section.title} className="h-full w-full object-cover opacity-80" />
              </div>
            )}
          </div>
          {(section.visualStyle || section.visualContext) && (
            <div className="mt-3 grid gap-2 rounded-lg border border-night-700 bg-night-800/80 p-3 text-xs text-slate-300 md:grid-cols-2">
              {section.visualStyle && (
                <div>
                  <p className="font-semibold text-brand-200">Estilo visual</p>
                  <p className="text-slate-300">{section.visualStyle}</p>
                </div>
              )}
              {section.visualContext && (
                <div>
                  <p className="font-semibold text-brand-200">Contexto</p>
                  <p className="text-slate-300">{section.visualContext}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
