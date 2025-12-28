import { NextResponse } from "next/server";
import { getProductById } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const product = getProductById(params.id);

  if (!product) {
    return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
  }

  return NextResponse.json({ product });
}
