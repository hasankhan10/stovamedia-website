import { NextResponse } from "next/server";
import { insertInquiryToSupabase } from "@/lib/db-inquiries";
import { sendMetaServerEvent } from "@/lib/meta-capi";

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
    const eventId = body.eventId || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    
    // Extract headers for Meta CAPI
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || undefined;
    const userAgent = req.headers.get("user-agent") || undefined;
    const cookieHeader = req.headers.get("cookie") || "";
    const fbpMatch = cookieHeader.match(/_fbp=([^;]+)/);
    const fbcMatch = cookieHeader.match(/_fbc=([^;]+)/);
    const fbp = fbpMatch ? fbpMatch[1] : undefined;
    const fbc = fbcMatch ? fbcMatch[1] : undefined;

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

    // Fire Meta Conversions API (CAPI) Server Event strictly for AI E-Commerce campaigns
    const isAIEcom = projectType === "AI E-commerce Platform" || (body.sourceUrl && body.sourceUrl.includes("aiecommerce"));
    if (isAIEcom) {
      sendMetaServerEvent({
        eventName: "Lead",
        eventId,
        eventSourceUrl: body.sourceUrl || "https://stovamedia.in/aiecommerce",
        userData: {
          email,
          phone,
          clientIp,
          userAgent,
          fbp,
          fbc,
        },
        customData: {
          content_name: "AI E-commerce Platform",
          content_category: category || "E-Commerce",
          value: 39999,
          currency: "INR",
        },
      }).catch((err) => console.error("Non-blocking Meta CAPI error:", err));
    }

    return NextResponse.json({ success: true, eventId, message: "Lead recorded successfully" });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

