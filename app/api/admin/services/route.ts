import { NextResponse } from "next/server";
import { 
  fetchServicesFromSupabase, 
  saveServiceToSupabase, 
  deleteServiceFromSupabase 
} from "@/lib/db-services";

export async function GET() {
  const { data, fromDb } = await fetchServicesFromSupabase();
  return NextResponse.json({ services: data, fromDb });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title || !body.id) {
      return NextResponse.json({ error: "Title and Service ID are required" }, { status: 400 });
    }

    const result = await saveServiceToSupabase(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ message: "Service saved successfully", data: result.data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save service" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const serviceId = searchParams.get("id");

    if (!serviceId) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    const result = await deleteServiceFromSupabase(serviceId);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete service" }, { status: 500 });
  }
}
