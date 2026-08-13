import { supabase } from "@/lib/supabase";

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  company?: string;
  project_type: string;
  budget?: string;
  details: string;
  status: "new" | "contacted" | "in_progress" | "archived";
  created_at?: string;
}

export async function fetchInquiriesFromSupabase(): Promise<{ data: Inquiry[]; success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { data: [], success: false, error: error.message };
    }

    return { data: data || [], success: true };
  } catch (err: any) {
    return { data: [], success: false, error: err.message || "Failed to fetch inquiries" };
  }
}

export async function insertInquiryToSupabase(inquiry: Omit<Inquiry, "id" | "status" | "created_at">): Promise<{ success: boolean; data?: Inquiry; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("inquiries")
      .insert([
        {
          name: inquiry.name,
          email: inquiry.email,
          company: inquiry.company || null,
          project_type: inquiry.project_type,
          budget: inquiry.budget || null,
          details: inquiry.details,
          status: "new",
        },
      ])
      .select()
      .single();

    if (error) {
      console.warn("Supabase inquiry insert warning:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to log inquiry into Supabase" };
  }
}

export async function updateInquiryStatusInSupabase(id: string, status: Inquiry["status"]): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("inquiries")
      .update({ status })
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update status" };
  }
}
