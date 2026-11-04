import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Email Notification] RESEND_API_KEY is not set in environment.");
    return null;
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export interface LeadEmailPayload {
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  service?: string;
  budget?: string;
  details?: string;
  sourceUrl?: string;
}

export interface AppointmentEmailPayload {
  name: string;
  phone?: string;
  email?: string;
  service?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  sourceUrl?: string;
}

export async function sendLeadNotificationEmail(payload: LeadEmailPayload): Promise<boolean> {
  const resend = getResendClient();
  if (!resend) return false;

  const recipient = process.env.NOTIFICATION_EMAIL || "stovamedia@gmail.com";
  const fromAddress = process.env.RESEND_FROM_EMAIL || "Stova Media Leads <onboarding@resend.dev>";
  const cleanPhone = (payload.phone || "").replace(/[^0-9]/g, "");
  const waUrl = cleanPhone.length >= 10 
    ? `https://wa.me/${cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone}`
    : "";

  const isTravelPage = payload.sourceUrl?.includes("ailandingpage") || payload.service?.includes("Travel");
  const isEcommercePage = payload.sourceUrl?.includes("aiecommerce") || payload.service?.includes("E-commerce");

  let tag = "💼 New Inquiry";
  if (isTravelPage) tag = "✈️ New Travel Agency Lead";
  if (isEcommercePage) tag = "🛒 New AI E-Commerce Lead";

  const subject = `${tag}: ${payload.name} ${payload.company ? `(${payload.company})` : ""}`.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a;">
  <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #ea580c, #f97316); padding: 24px; text-align: left; color: #ffffff;">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.9; margin-bottom: 6px;">
        STOVA MEDIA • INSTANT LEAD ALERT
      </div>
      <h1 style="margin: 0; font-size: 22px; font-weight: 800; line-height: 1.25;">
        ${tag}
      </h1>
    </div>

    <!-- Body Content -->
    <div style="padding: 24px;">
      <p style="margin: 0 0 18px 0; font-size: 15px; color: #475569; line-height: 1.5;">
        A new client lead was just submitted on <a href="${payload.sourceUrl || "https://stovamedia.in"}" style="color: #ea580c; text-decoration: none; font-weight: 600;">stovamedia.in</a>. Here are the full verified details:
      </p>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 600; width: 35%;">Client Name</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 700;">${payload.name || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 600;">Mobile / WhatsApp</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 700;">
            ${payload.phone ? `<a href="tel:${payload.phone}" style="color: #0284c7; text-decoration: none;">${payload.phone}</a>` : "N/A"}
          </td>
        </tr>
        ${payload.email ? `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 600;">Email</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">
            <a href="mailto:${payload.email}" style="color: #0284c7; text-decoration: none;">${payload.email}</a>
          </td>
        </tr>` : ""}
        ${payload.company ? `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 600;">Agency / Business</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 600;">${payload.company}</td>
        </tr>` : ""}
        ${payload.service ? `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 600;">Service / Category</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">${payload.service}</td>
        </tr>` : ""}
        ${payload.budget ? `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 600;">Budget / Package</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">${payload.budget}</td>
        </tr>` : ""}
        ${payload.details ? `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 600; vertical-align: top;">Notes / Details</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 13px; line-height: 1.4;">${payload.details}</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 10px 12px; color: #64748b; font-size: 13px; font-weight: 600;">Source Page</td>
          <td style="padding: 10px 12px; color: #475569; font-size: 12px; word-break: break-all;">
            <a href="${payload.sourceUrl || "https://stovamedia.in"}" style="color: #64748b; text-decoration: underline;">${payload.sourceUrl || "https://stovamedia.in"}</a>
          </td>
        </tr>
      </table>

      <!-- Quick Action Buttons -->
      ${cleanPhone ? `
      <div style="display: flex; gap: 10px; margin-top: 20px;">
        <a href="${waUrl}" style="flex: 1; display: inline-block; background-color: #25D366; color: #ffffff; text-align: center; padding: 12px 18px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">
          💬 Chat on WhatsApp
        </a>
        <a href="tel:${payload.phone}" style="flex: 1; display: inline-block; background-color: #0f172a; color: #ffffff; text-align: center; padding: 12px 18px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">
          📞 Call Client
        </a>
      </div>` : ""}

      <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
        Stova Media Automatic Notification Engine • Sent to ${recipient}
      </div>
    </div>
  </div>
</body>
</html>
`.trim();

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: recipient,
      subject,
      html,
    });

    if (error) {
      console.error("[Email Notification] Resend send error:", error);
      return false;
    }

    console.log("[Email Notification] Lead email delivered successfully with ID:", data?.id);
    return true;
  } catch (err) {
    console.error("[Email Notification] Unexpected email sending error:", err);
    return false;
  }
}

export async function sendAppointmentNotificationEmail(payload: AppointmentEmailPayload): Promise<boolean> {
  const resend = getResendClient();
  if (!resend) return false;

  const recipient = process.env.NOTIFICATION_EMAIL || "stovamedia@gmail.com";
  const fromAddress = process.env.RESEND_FROM_EMAIL || "Stova Media Appointments <onboarding@resend.dev>";
  const cleanPhone = (payload.phone || "").replace(/[^0-9]/g, "");
  const waUrl = cleanPhone.length >= 10 
    ? `https://wa.me/${cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone}`
    : "";

  const subject = `📅 New Appointment Booking: ${payload.name} (${payload.preferredDate || "Date TBD"})`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a;">
  <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #4f46e5, #6366f1); padding: 24px; text-align: left; color: #ffffff;">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.9; margin-bottom: 6px;">
        STOVA MEDIA • APPOINTMENT BOOKED
      </div>
      <h1 style="margin: 0; font-size: 22px; font-weight: 800; line-height: 1.25;">
        📅 New Consultation Scheduled
      </h1>
    </div>

    <!-- Body Content -->
    <div style="padding: 24px;">
      <p style="margin: 0 0 18px 0; font-size: 15px; color: #475569; line-height: 1.5;">
        A client has scheduled an appointment on <a href="${payload.sourceUrl || "https://stovamedia.in"}" style="color: #4f46e5; text-decoration: none; font-weight: 600;">stovamedia.in</a>:
      </p>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 600; width: 35%;">Client Name</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 700;">${payload.name || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 600;">Preferred Slot</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #4f46e5; font-size: 14px; font-weight: 700;">
            ${payload.preferredDate || "N/A"} ${payload.preferredTime ? `at ${payload.preferredTime}` : ""}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 600;">Phone / WhatsApp</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 700;">
            ${payload.phone ? `<a href="tel:${payload.phone}" style="color: #0284c7; text-decoration: none;">${payload.phone}</a>` : "N/A"}
          </td>
        </tr>
        ${payload.email ? `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 600;">Email</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">
            <a href="mailto:${payload.email}" style="color: #0284c7; text-decoration: none;">${payload.email}</a>
          </td>
        </tr>` : ""}
        ${payload.service ? `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 600;">Service Requested</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px;">${payload.service}</td>
        </tr>` : ""}
        ${payload.message ? `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 600; vertical-align: top;">Note / Message</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 13px; line-height: 1.4;">${payload.message}</td>
        </tr>` : ""}
      </table>

      <!-- Quick Action Buttons -->
      ${cleanPhone ? `
      <div style="display: flex; gap: 10px; margin-top: 20px;">
        <a href="${waUrl}" style="flex: 1; display: inline-block; background-color: #25D366; color: #ffffff; text-align: center; padding: 12px 18px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">
          💬 Chat on WhatsApp
        </a>
        <a href="tel:${payload.phone}" style="flex: 1; display: inline-block; background-color: #0f172a; color: #ffffff; text-align: center; padding: 12px 18px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">
          📞 Call Client
        </a>
      </div>` : ""}

      <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
        Stova Media Automatic Notification Engine • Sent to ${recipient}
      </div>
    </div>
  </div>
</body>
</html>
`.trim();

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: recipient,
      subject,
      html,
    });

    if (error) {
      console.error("[Email Notification] Resend send error:", error);
      return false;
    }

    console.log("[Email Notification] Appointment email delivered successfully with ID:", data?.id);
    return true;
  } catch (err) {
    console.error("[Email Notification] Unexpected email sending error:", err);
    return false;
  }
}

