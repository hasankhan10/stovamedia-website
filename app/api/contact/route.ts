import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const { name, email, company, projectType, budget, details } = await req.json();

    if (!name || !email || !projectType || !details) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Email Integration (Resend)
    if (resend) {
      const { data, error } = await resend.emails.send({
        from: "Stova Media <onboarding@resend.dev>",
        to: "stovamedia@gmail.com",
        subject: `New Project Inquiry: ${projectType} - ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background: #080808; color: #F0EDE6; border: 1px solid #C9A84C;">
            <h2 style="color: #C9A84C; border-bottom: 1px solid #1C1C1C; padding-bottom: 10px;">New Inquiry from ${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || "N/A"}</p>
            <p><strong>Project Type:</strong> ${projectType}</p>
            <p><strong>Budget Range:</strong> ${budget}</p>
            <p><strong>Project Details:</strong></p>
            <div style="background: #0C0C0C; padding: 15px; border-left: 4px solid #C9A84C;">
              ${details}
            </div>
          </div>
        `,
      });
      if (error) return NextResponse.json({ error }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    return NextResponse.json({ message: "Inquiry sent successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
