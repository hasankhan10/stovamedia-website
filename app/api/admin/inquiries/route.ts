import { NextResponse } from "next/server";
import { 
  fetchInquiriesFromSupabase, 
  updateInquiryStatusInSupabase 
} from "@/lib/db-inquiries";

export async function GET() {
  const { data, success, error } = await fetchInquiriesFromSupabase();
  if (!success) {
    return NextResponse.json({ inquiries: [], error }, { status: 500 });
  }
  return NextResponse.json({ inquiries: data });
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const result = await updateInquiryStatusInSupabase(id, status);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ message: "Status updated successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update inquiry status" }, { status: 500 });
  }
}
