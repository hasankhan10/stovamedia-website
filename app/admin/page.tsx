import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | Stova Media",
  description: "Internal website control center for Stova Media.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminDashboard />;
}
