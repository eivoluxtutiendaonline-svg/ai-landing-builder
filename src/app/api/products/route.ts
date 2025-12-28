import { NextResponse } from "next/server";
import { addProduct, getProducts } from "@/lib/data";

export async function GET() {
  const products = getProducts();
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.name || !body.description) {
    return NextResponse.json({ message: "Faltan campos requeridos" }, { status: 400 });
  }

  const product = addProduct({ name: body.name, description: body.description });
  return NextResponse.json({ product }, { status: 201 });
}
