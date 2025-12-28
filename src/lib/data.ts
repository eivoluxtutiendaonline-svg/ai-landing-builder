import { randomUUID } from "crypto";
import type { Product, Section, SectionType, Template } from "@/lib/types";

const templates: Template[] = [
  {
    id: "tpl-hero-impacto",
    name: "Hero impacto visual",
    sectionType: "Hero",
    structure: {
      layout: "two-column",
      emphasis: true,
      theme: "gradient",
      fields: ["headline", "subheadline", "bullets", "ctaLabel", "imageUrl"],
    },
    editableFields: [
      {
        key: "headline",
        label: "Titular principal",
        type: "text",
        helperText: "Mensaje directo con la propuesta de valor",
      },
      {
        key: "subheadline",
        label: "Subtítulo",
        type: "textarea",
        helperText: "Refuerza el beneficio principal",
      },
      {
        key: "bullets",
        label: "Beneficios clave",
        type: "list",
        helperText: "3-5 bullets sobre lo que hace al producto especial",
      },
      {
        key: "ctaLabel",
        label: "Texto CTA",
        type: "cta",
      },
      {
        key: "imageUrl",
        label: "Imagen destacada",
        type: "image",
      },
    ],
    defaultContent: {
      headline: "Lanza tu landing en minutos",
      subheadline: "Plantillas optimizadas para ecommerce que convierten desde el primer clic",
      bullets: [
        "Estructuras probadas para tiendas DTC",
        "Componentes editables sin necesidad de código",
        "Versionado rápido para campañas y creativos",
      ],
      ctaLabel: "Crear mi landing",
      imageUrl: "/placeholder-hero.svg",
    },
  },
  {
    id: "tpl-oferta-basica",
    name: "Oferta directa",
    sectionType: "Oferta",
    structure: {
      layout: "single-column",
      emphasis: false,
      fields: ["headline", "ctaLabel"],
    },
    editableFields: [
      { key: "headline", label: "Oferta", type: "text" },
      { key: "ctaLabel", label: "CTA", type: "cta" },
    ],
    defaultContent: {
      headline: "Llévatelo hoy con 30% OFF",
      ctaLabel: "Comprar ahora",
    },
  },
];

const products: Product[] = [
  {
    id: "prd-demo-1",
    name: "Pack Detox Vital",
    description: "Suplemento natural para energía y bienestar diario.",
    sections: [
      {
        id: "sec-demo-hero",
        templateId: "tpl-hero-impacto",
        content: {
          headline: "Energía limpia para todo el día",
          subheadline:
            "Comienza tu mañana con ingredientes naturales que impulsan tu productividad y bienestar.",
          bullets: [
            "Fórmula con adaptógenos y vitaminas esenciales",
            "Sin azúcares añadidos ni crash energético",
            "Envío rápido y seguimiento en 24h",
          ],
          ctaLabel: "Probar el pack",
          imageUrl: "/placeholder-hero.svg",
        },
      },
    ],
  },
];

export function getTemplates(): Template[] {
  return templates;
}

export function getTemplatesByType(type: SectionType): Template[] {
  return templates.filter((template) => template.sectionType === type);
}

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function addProduct(input: Pick<Product, "name" | "description">): Product {
  const newProduct: Product = {
    id: `prd-${randomUUID()}`,
    name: input.name,
    description: input.description,
    sections: [],
  };

  products.unshift(newProduct);
  return newProduct;
}

export function addSectionToProduct(
  productId: string,
  templateId: string,
  content: Record<string, string | string[]> | undefined,
): Section | undefined {
  const product = getProductById(productId);
  if (!product) return undefined;

  const template = templates.find((tpl) => tpl.id === templateId);
  if (!template) return undefined;

  const section: Section = {
    id: `sec-${randomUUID()}`,
    templateId,
    content: content ?? template.defaultContent,
  };

  product.sections.push(section);
  return section;
}
