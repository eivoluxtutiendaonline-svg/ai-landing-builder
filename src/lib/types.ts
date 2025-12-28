export type SectionType =
  | "Hero"
  | "Oferta"
  | "Beneficios"
  | "TablaComparativa"
  | "Testimonios"
  | "PruebaAutoridad"
  | "ModoUso"
  | "Logistica";

export type TemplateField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "cta" | "list";
  helperText?: string;
};

export type Template = {
  id: string;
  name: string;
  sectionType: SectionType;
  structure: Record<string, unknown>;
  editableFields: TemplateField[];
  defaultContent: Record<string, string | string[]>;
};

export type Section = {
  id: string;
  templateId: string;
  content: Record<string, string | string[]>;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  sections: Section[];
};
