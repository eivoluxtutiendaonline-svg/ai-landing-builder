import { NextResponse } from "next/server";
import { addSectionToProduct } from "@/lib/data";

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const { templateId, content } = body;

  if (!templateId) {
    return NextResponse.json({ message: "Selecciona una plantilla" }, { status: 400 });
  }

  const section = addSectionToProduct(params.id, templateId, content);

  if (!section) {
    return NextResponse.json({ message: "No se pudo agregar la sección" }, { status: 400 });
  }

  return NextResponse.json({ section }, { status: 201 });
}
