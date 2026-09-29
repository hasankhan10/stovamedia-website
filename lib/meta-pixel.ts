// Client-side Meta (Facebook) Pixel utility functions

export const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_FB_PIXEL_ID || "4484533138457911";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

/**
 * Tracks standard PageView on route changes
 */
export const pageview = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
};

/**
 * Tracks standard Meta Pixel events with optional deduplication eventID
 */
export const trackEvent = (
  eventName: string,
  options: Record<string, unknown> = {},
  eventId?: string
) => {
  if (typeof window !== "undefined" && window.fbq) {
    if (eventId) {
      window.fbq("track", eventName, options, { eventID: eventId });
    } else {
      window.fbq("track", eventName, options);
    }
  }
};

/**
 * Tracks custom Meta Pixel events
 */
export const trackCustomEvent = (
  eventName: string,
  options: Record<string, unknown> = {},
  eventId?: string
) => {
  if (typeof window !== "undefined" && window.fbq) {
    if (eventId) {
      window.fbq("trackCustom", eventName, options, { eventID: eventId });
    } else {
      window.fbq("trackCustom", eventName, options);
    }
  }
};
