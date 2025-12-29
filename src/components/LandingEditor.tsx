"use client";

import { useState, useEffect } from "react";
import type { Landing, LandingSection } from "@/lib/types";
import LandingSectionEditor from "@/components/LandingSectionEditor";

export default function LandingEditor({
  productId,
  landing,
  onLandingUpdated,
}: {
  productId: string;
  landing: Landing;
  onLandingUpdated?: (landing: Landing) => void;
}) {
  const [currentLanding, setCurrentLanding] = useState<Landing>(landing);

  useEffect(() => {
    setCurrentLanding(landing);
  }, [landing]);

  function handleUpdated(updatedSectionId: string, updated: LandingSection) {
    setCurrentLanding((prev) => {
      const next = {
        ...prev,
        sections: prev.sections.map((section) => (section.id === updatedSectionId ? updated : section)),
      };
      onLandingUpdated?.(next);
      return next;
    });
  }

  return (
    <div className="space-y-4 rounded-2xl border border-night-700 bg-night-900/60 p-5">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">Edición manual</p>
        <p className="text-sm text-slate-300">
          Ajusta textos e imágenes generadas por la IA. La base sigue siendo la landing completa generada automáticamente.
        </p>
      </div>
      <div className="space-y-3">
        {currentLanding.sections.map((section) => (
          <LandingSectionEditor
            key={section.id}
            productId={productId}
            section={section}
            onUpdated={(updated) => handleUpdated(section.id, updated)}
          />
        ))}
      </div>
    </div>
  );
}
