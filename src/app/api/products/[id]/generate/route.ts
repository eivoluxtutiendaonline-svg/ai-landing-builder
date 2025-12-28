import { NextResponse } from "next/server";
import { generateLandingForProduct, getProductById } from "@/lib/data";

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const { images, controls } = body ?? {};

  if (!Array.isArray(images) || images.length !== 3) {
    return NextResponse.json({ message: "Debes subir exactamente 3 imágenes reales del producto." }, { status: 400 });
  }

  if (!controls?.details || !controls?.angle || !controls?.avatar) {
    return NextResponse.json({ message: "Faltan campos de controles creativos." }, { status: 400 });
  }

  const product = getProductById(params.id);
  if (!product) {
    return NextResponse.json({ message: "Producto no encontrado." }, { status: 404 });
  }

  const landing = generateLandingForProduct(params.id, {
    images,
    controls: {
      details: controls.details,
      angle: controls.angle,
      avatar: controls.avatar,
      instructions: controls.instructions ?? "",
    },
  });

  if (!landing) {
    return NextResponse.json({ message: "No se pudo generar la landing." }, { status: 400 });
  }

  return NextResponse.json({ landing });
}
