import { NextResponse } from "next/server";
import { updateLandingSection, getProductById } from "@/lib/data";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const { sectionId, updates } = body ?? {};

  if (!sectionId || typeof updates !== "object") {
    return NextResponse.json({ message: "Datos inválidos para actualizar la sección." }, { status: 400 });
  }

  const product = getProductById(params.id);
  if (!product || !product.landing) {
    return NextResponse.json({ message: "Landing no encontrada para este producto." }, { status: 404 });
  }

  const landing = updateLandingSection(params.id, sectionId, updates);
  if (!landing) {
    return NextResponse.json({ message: "No se pudo actualizar la sección." }, { status: 400 });
  }

  return NextResponse.json({ landing });
}
