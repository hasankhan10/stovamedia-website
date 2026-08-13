import { supabase } from "@/lib/supabase";

export const ADMIN_STORAGE_KEY = "stova_admin_session";
export const DEFAULT_ADMIN_EMAIL = "stovamedia@gmail.com";
export const DEFAULT_ADMIN_PASS = "Stovamedia@2003";

export async function loginAdminWithSupabase(
  email: string,
  pass: string
): Promise<{ success: boolean; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = pass.trim();

  try {
    // 1. Attempt official Supabase Auth login
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: cleanPass,
    });

    if (!error && data?.session) {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          ADMIN_STORAGE_KEY,
          JSON.stringify({
            authenticated: true,
            email: data.user?.email || cleanEmail,
            timestamp: Date.now(),
          })
        );
      }
      return { success: true };
    }

    // 2. Fallback check for exact user credentials if user account is not created in Supabase Auth yet
    if (cleanEmail === DEFAULT_ADMIN_EMAIL && cleanPass === DEFAULT_ADMIN_PASS) {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          ADMIN_STORAGE_KEY,
          JSON.stringify({
            authenticated: true,
            email: DEFAULT_ADMIN_EMAIL,
            timestamp: Date.now(),
          })
        );
      }
      return { success: true };
    }

    return { success: false, error: error?.message || "Invalid admin credentials" };
  } catch (err: any) {
    if (cleanEmail === DEFAULT_ADMIN_EMAIL && cleanPass === DEFAULT_ADMIN_PASS) {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          ADMIN_STORAGE_KEY,
          JSON.stringify({
            authenticated: true,
            email: DEFAULT_ADMIN_EMAIL,
            timestamp: Date.now(),
          })
        );
      }
      return { success: true };
    }
    return { success: false, error: err?.message || "Authentication failed" };
  }
}

export function checkAdminSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const session = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!session) return false;
    const data = JSON.parse(session);
    return data && data.authenticated === true && Date.now() - data.timestamp < 7 * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export async function logoutAdmin() {
  try {
    await supabase.auth.signOut();
  } catch {
    // ignore
  }
  if (typeof window !== "undefined") {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  }
}
