import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const ext = path.extname(file.name) || ".png";
    const filename = `project_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;

    // 1. Upload to Supabase Storage bucket 'project-images'
    const { data: storageData, error: storageError } = await supabase.storage
      .from("project-images")
      .upload(filename, buffer, {
        contentType: file.type || "image/png",
        upsert: true,
      });

    if (!storageError && storageData) {
      const { data: publicUrlData } = supabase.storage
        .from("project-images")
        .getPublicUrl(filename);

      if (publicUrlData?.publicUrl) {
        return NextResponse.json({
          url: publicUrlData.publicUrl,
          storage: "supabase",
          message: "Uploaded to Supabase Storage successfully",
        });
      }
    }

    console.warn("Supabase storage notice:", storageError?.message);

    // 2. Backup upload to local public/uploads directory if bucket is pending creation
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, filename);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({
      url: publicUrl,
      storage: "local",
      message: storageError ? `Local fallback used (${storageError.message})` : "Uploaded successfully",
    });
  } catch (err: any) {
    console.error("Upload API error:", err);
    return NextResponse.json({ error: err.message || "Failed to upload image" }, { status: 500 });
  }
}
