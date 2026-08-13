import { NextResponse } from "next/server";
import { 
  fetchProjectsFromSupabase, 
  saveProjectToSupabase, 
  deleteProjectFromSupabase 
} from "@/lib/db-projects";

export async function GET() {
  const { data, fromDb } = await fetchProjectsFromSupabase();
  return NextResponse.json({ projects: data, fromDb });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title || !body.slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const result = await saveProjectToSupabase(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ message: "Project saved successfully", data: result.data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save project" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const result = await deleteProjectFromSupabase(slug);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete project" }, { status: 500 });
  }
}
