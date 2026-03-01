import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PATCH
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const updated = await prisma.task.update({
      where: { id },
      data: {
        title: body.title,
        leading: body.leading || null,
        speaking: body.speaking || null,
        status: body.status,
        dueDate: body.dueDate
          ? new Date(body.dueDate)
          : null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH ERROR:", error);
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}