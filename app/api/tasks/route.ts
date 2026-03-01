import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all tasks
export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(tasks);
}

// CREATE task
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const task = await prisma.task.create({
      data: {
        title: body.title,
        leading: body.leading || null,
        speaking: body.speaking || null,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        status: "Pending",
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("CREATE ERROR:", error);
    return NextResponse.json(
      { error: "Create failed" },
      { status: 500 }
    );
  }
}