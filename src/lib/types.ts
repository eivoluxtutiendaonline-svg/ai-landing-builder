export type CreativeControls = {
  details: string;
  angle: string;
  avatar: string;
  instructions: string;
};

export type LandingSectionType =
  | "Hero"
  | "Problemas"
  | "Beneficios"
  | "Ingredientes"
  | "Testimonios"
  | "Autoridad"
  | "Oferta";

export type LandingSection = {
  id: string;
  type: LandingSectionType;
  title: string;
  subtitle?: string;
  bullets?: string[];
  body?: string;
  image?: string;
  ctaLabel?: string;
  visualContext?: string;
  visualStyle?: string;
};

export type Landing = {
  id: string;
  productId: string;
  sections: LandingSection[];
  generatedAt: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  images: string[];
  creativeControls?: CreativeControls;
  landing?: Landing;
  createdAt: string;
};
