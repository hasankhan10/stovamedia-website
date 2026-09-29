import { NextResponse } from "next/server";
import { insertInquiryToSupabase } from "@/lib/db-inquiries";
import { sendMetaServerEvent } from "@/lib/meta-capi";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = body.name || "Anonymous Booking";
    const email = body.email || "";
    const phone = body.phone || "";
    const service = body.service || "General Inquiry";
    const preferredDate = body.preferredDate || "";
    const preferredTime = body.preferredTime || "";
    const message = body.message || "";
    const eventId = body.eventId || `schedule_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Extract headers for Meta CAPI
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || undefined;
    const userAgent = req.headers.get("user-agent") || undefined;
    const cookieHeader = req.headers.get("cookie") || "";
    const fbpMatch = cookieHeader.match(/_fbp=([^;]+)/);
    const fbcMatch = cookieHeader.match(/_fbc=([^;]+)/);
    const fbp = fbpMatch ? fbpMatch[1] : undefined;
    const fbc = fbcMatch ? fbcMatch[1] : undefined;

    const details = `📅 Slot: ${preferredDate} (${preferredTime}) | 📱 Phone/WA: ${phone}${message ? ` | 📝 Note: ${message}` : ""}`;

    // Record into DB
    await insertInquiryToSupabase({
      name,
      email: email || `${phone.replace(/[^0-9]/g, "")}@appointment.stovamedia.in`,
      company: "[Appointment Booking]",
      project_type: service,
      budget: "Consultation Request",
      details,
    });

    // Fire Meta Conversions API (CAPI) Server Event
    sendMetaServerEvent({
      eventName: "Schedule",
      eventId,
      eventSourceUrl: body.sourceUrl || "https://stovamedia.in",
      userData: {
        email,
        phone,
        clientIp,
        userAgent,
        fbp,
        fbc,
      },
      customData: {
        content_name: service,
        content_type: "Appointment Consultation",
        preferred_date: preferredDate,
        preferred_time: preferredTime,
      },
    }).catch((err) => console.error("Non-blocking Meta CAPI error:", err));

    return NextResponse.json({ success: true, eventId, message: "Appointment scheduled successfully" });
  } catch (err) {
    console.error("Appointments API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
