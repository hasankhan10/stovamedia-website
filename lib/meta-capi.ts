import crypto from "crypto";

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "4484533138457911";
const ACCESS_TOKEN = process.env.FB_CONVERSIONS_API_ACCESS_TOKEN;

function hashSha256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function normalizeAndHashPhone(phone: string): string | undefined {
  if (!phone) return undefined;
  const cleaned = phone.replace(/[^0-9]/g, "");
  if (!cleaned) return undefined;
  return crypto.createHash("sha256").update(cleaned).digest("hex");
}

export interface CAPIUserData {
  email?: string;
  phone?: string;
  clientIp?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
}

export interface CAPIOptions {
  eventName: "Lead" | "Schedule" | "Contact" | "ViewContent" | "InitiateCheckout" | string;
  eventId?: string;
  eventSourceUrl?: string;
  userData?: CAPIUserData;
  customData?: Record<string, unknown>;
}

/**
 * Sends a server-side conversion event to Meta Conversions API (CAPI)
 */
export async function sendMetaServerEvent({
  eventName,
  eventId,
  eventSourceUrl,
  userData = {},
  customData = {},
}: CAPIOptions) {
  if (!ACCESS_TOKEN || !PIXEL_ID) {
    console.warn("Meta Conversions API: Missing ACCESS_TOKEN or PIXEL_ID");
    return { success: false, reason: "Missing credentials" };
  }

  try {
    const formattedUserData: Record<string, unknown> = {};

    if (userData.email) {
      formattedUserData.em = [hashSha256(userData.email)];
    }
    if (userData.phone) {
      const hashedPhone = normalizeAndHashPhone(userData.phone);
      if (hashedPhone) {
        formattedUserData.ph = [hashedPhone];
      }
    }
    if (userData.clientIp) {
      formattedUserData.client_ip_address = userData.clientIp;
    }
    if (userData.userAgent) {
      formattedUserData.client_user_agent = userData.userAgent;
    }
    if (userData.fbp) {
      formattedUserData.fbp = userData.fbp;
    }
    if (userData.fbc) {
      formattedUserData.fbc = userData.fbc;
    }

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_id: eventId,
          event_source_url: eventSourceUrl || "https://stovamedia.in",
          user_data: formattedUserData,
          custom_data: customData,
        },
      ],
    };

    const url = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Meta CAPI Error Response:", result);
      return { success: false, error: result };
    }

    return { success: true, result };
  } catch (error) {
    console.error("Meta CAPI Execution Error:", error);
    return { success: false, error };
  }
}
