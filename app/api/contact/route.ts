import { NextResponse } from "next/server";
import { insertInquiryToSupabase } from "@/lib/db-inquiries";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = body.name || "Anonymous Lead";
    const phone = body.phone || "";
    const email = body.email || (phone ? `${phone.replace(/[^0-9]/g, "")}@lead.stovamedia.in` : "client@stovamedia.in");
    const company = body.company || body.business || "";
    const category = body.category || "";
    const projectType = body.projectType || body.service || "AI E-commerce Platform";
    const budget = body.budget || "Launch Package";
    
    // Construct rich readable details
    let details = body.details || body.message || "";
    if (phone || category || company) {
      const extraInfo: string[] = [];
      if (phone) extraInfo.push(`📱 Phone / WhatsApp: ${phone}`);
      if (company) extraInfo.push(`🏢 Brand / Business: ${company}`);
      if (category) extraInfo.push(`🏷️ Business Category: ${category}`);
      if (details) extraInfo.push(`📝 Notes: ${details}`);
      details = extraInfo.join(" | ");
    }

    // Log Inquiry into Supabase DB
    await insertInquiryToSupabase({
      name,
      email,
      company: company || (category ? `[${category}]` : ""),
      project_type: projectType,
      budget: budget || "",
      details: details || "Discovery consultation requested.",
    });

    return NextResponse.json({ success: true, message: "Lead recorded successfully" });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

