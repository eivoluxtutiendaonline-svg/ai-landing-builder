import { randomUUID } from "crypto";
import type {
  CreativeControls,
  Landing,
  LandingSection,
  LandingSectionType,
  Product,
} from "@/lib/types";

const products: Product[] = [
  {
    id: "prd-demo-1",
    name: "Serum Lumina Gold",
    description: "Serum facial iluminador premium con vitamina C estabilizada y péptidos.",
    images: [
      "/products/lumina-front.jpg",
      "/products/lumina-side.jpg",
      "/products/lumina-closeup.jpg",
    ],
    creativeControls: {
      details: "Serum dorado, sensación de lujo clínico, envase negro con tipografía oro.",
      angle: "Skinimalism premium, resultados visibles en 14 días.",
      avatar: "Mujer profesional 30-45, cuida su piel, compra online marcas boutique.",
      instructions: "Tono elegante, directo, evita claims médicos, resalta textura sedosa.",
    },
    landing: buildLanding("prd-demo-1", {
      name: "Serum Lumina Gold",
      description: "Serum facial iluminador premium con vitamina C estabilizada y péptidos.",
      images: [
        "/products/lumina-front.jpg",
        "/products/lumina-side.jpg",
        "/products/lumina-closeup.jpg",
      ],
      controls: {
        details: "Serum dorado, sensación de lujo clínico, envase negro con tipografía oro.",
        angle: "Skinimalism premium, resultados visibles en 14 días.",
        avatar: "Mujer profesional 30-45, cuida su piel, compra online marcas boutique.",
        instructions: "Tono elegante, directo, evita claims médicos, resalta textura sedosa.",
      },
    }),
    createdAt: new Date().toISOString(),
  },
];

type BuildLandingInput = {
  name: string;
  description: string;
  images: string[];
  controls: CreativeControls;
};

function sectionImage(images: string[], fallbackIndex = 0) {
  return images[fallbackIndex] ?? images[0] ?? "/placeholder-hero.svg";
}

function buildLanding(productId: string, input: BuildLandingInput): Landing {
  const now = new Date().toISOString();
  const sequence: { type: LandingSectionType; title: string; subtitle?: string; bullets?: string[] }[] =
    [
      {
        type: "Hero",
        title: `Transforma tu piel con ${input.name}`,
        subtitle: input.description,
        bullets: [
          "Sensación inmediata de luminosidad",
          "Textura ligera y absorción rápida",
          "Ingredientes premium validados por laboratorio",
        ],
      },
      {
        type: "Problemas",
        title: "Lo que tu cliente siente hoy",
        bullets: [
          "Piel cansada, opaca y sin vida",
          "Rutinas complejas que no se sostienen",
          "Desconfianza en promesas irreales",
        ],
      },
      {
        type: "Beneficios",
        title: "Beneficios claros y tangibles",
        bullets: [
          "Brillo uniforme y tono equilibrado",
          "Hidratación profunda sin sensación grasosa",
          "Look profesional en menos pasos",
        ],
      },
      {
        type: "Ingredientes",
        title: "Dentro del frasco, ciencia y lujo",
        bullets: [
          "Vitamina C estabilizada + péptidos biomiméticos",
          "Extracto botánico antioxidante grado dermo",
          "Base hipoalergénica, sin fragancias añadidas",
        ],
      },
      {
        type: "Testimonios",
        title: "Testimonios realistas",
        bullets: [
          "“En dos semanas noté la piel más luminosa, sin sensación pegajosa.” — Valeria, 34",
          "“Por fin un serum premium que cumple y se siente ligero.” — Andrea, 31",
          "“Lo uso antes del maquillaje y mejora el acabado.” — Sofía, 29",
        ],
      },
      {
        type: "Autoridad",
        title: "Autoridad y confianza",
        subtitle: "Envío prioritario, pago seguro y garantía de satisfacción avalados por expertos.",
        bullets: [
          "Despacho rápido y trazable",
          "Pasarela de pago certificada",
          "Equipo humano acompañando post-compra",
        ],
      },
      {
        type: "Oferta",
        title: "Oferta final",
        subtitle: "Llévate Lumina Gold con envío prioritario y garantía de satisfacción 30 días.",
        bullets: ["Entrega prioritaria", "Pago seguro", "Acompañamiento post-compra"],
      },
    ];

  const sections: LandingSection[] = sequence.map((item, index) => ({
    id: `sec-${randomUUID()}`,
    type: item.type,
    title: item.title,
    subtitle: item.subtitle,
    bullets: item.bullets,
    body: item.type === "Hero" ? `${input.controls.angle}. ${input.controls.details}` : undefined,
    image: sectionImage(input.images, Math.min(index, input.images.length - 1)),
    ctaLabel: item.type === "Oferta" || item.type === "Hero" ? "Comprar ahora" : undefined,
  }));

  return {
    id: `lnd-${randomUUID()}`,
    productId,
    sections,
    generatedAt: now,
  };
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
    images: [],
    createdAt: new Date().toISOString(),
  };

  products.unshift(newProduct);
  return newProduct;
}

export function generateLandingForProduct(
  productId: string,
  payload: { images: string[]; controls: CreativeControls },
): Landing | undefined {
  const product = getProductById(productId);
  if (!product) return undefined;
  if (payload.images.length !== 3) return undefined;

  product.images = payload.images;
  product.creativeControls = payload.controls;
  const landing = buildLanding(productId, {
    name: product.name,
    description: product.description,
    images: payload.images,
    controls: payload.controls,
  });
  product.landing = landing;
  return landing;
}

export function updateLandingSection(
  productId: string,
  sectionId: string,
  updates: Partial<LandingSection>,
): Landing | undefined {
  const product = getProductById(productId);
  if (!product || !product.landing) return undefined;

  product.landing.sections = product.landing.sections.map((section) =>
    section.id === sectionId ? { ...section, ...updates } : section,
  );

  return product.landing;
}
