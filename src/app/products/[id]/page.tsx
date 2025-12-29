import { notFound } from "next/navigation";
import ProductLandingExperience from "@/components/ProductLandingExperience";
import { getProductById } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  if (!product) return notFound();

  return <ProductLandingExperience product={product} />;
}
