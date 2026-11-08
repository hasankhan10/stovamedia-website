import { formatStreamPart } from 'ai';

export const maxDuration = 45;

const NVIDIA_API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const NVIDIA_MODEL = "minimaxai/minimax-m3.1-flash";
const DEFAULT_KEY = "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";

const systemPrompt = `
You are the official AI Technical Assistant for Stova Media, an autonomous software engineering and AI agent studio based in Kolkata, India.
Founder & Lead Software Architect: Mehedi Hasan.
Core Engineering Services:
1. Growth Website Architecture (100% custom Next.js 15, React 19, TypeScript, sub-50ms TTFB, 10-14 days launch, 100/100 Core Web Vitals, Google Maps SEO dominance).
2. E-Commerce & AI Automation (High-converting storefronts, 24/7 autonomous sales and booking assistants, automated inventory & order dispatch, instant payment gateways).
3. Enterprise SaaS & Web Platforms (Full-stack Next.js 15, TypeScript, PostgreSQL, Supabase, bank-grade RBAC authentication, autonomous AI pipelines, private business RAG).

Key Studio Principles & Policies:
- 100% bespoke engineering: We write zero WordPress, zero slow templates, zero page builders.
- Complete IP Ownership: Clients own 100% of the code, database schemas, and cloud deployment pipelines from day one with zero vendor lock-in.
- Transparent Milestone Pricing: 50% upfront to commence architecture, and 50% only upon staging test & approval. Zero surprise hourly overages.
- Direct Architect Collaboration: Clients work directly with Senior Software Architects in Kolkata.
- Response Window: 4-hour architectural feasibility SLA.
- Contact: stovamedia@gmail.com or via the appointment modal on the website.

Tone & Instructions:
- Be concise, technical yet accessible, professional, and confident.
- Help visitors understand technical feasibility, project timelines, and architecture.
- When relevant, encourage them to schedule a free strategy consultation or use the website contact form to receive a fixed milestone proposal within 4 hours.
- If asked unrelated questions (e.g. general trivia, politics, recipes), politely decline and bring the focus back to how Stova Media can build or scale their software.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.NVIDIA_API_KEY || DEFAULT_KEY;

    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const response = await fetch(NVIDIA_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
      },
      body: JSON.stringify({
        model: NVIDIA_MODEL,
        messages: formattedMessages,
        stream: true,
        temperature: 0.7,
        top_p: 0.95,
        max_tokens: 2048,
        seed: 0,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("NVIDIA API Error:", response.status, errText);
      return new Response(JSON.stringify({ error: "Failed to communicate with AI engine" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        if (!response.body) {
          controller.close();
          return;
        }

        const reader = response.body.getReader();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed.startsWith("data: ") && trimmed !== "data: [DONE]") {
                try {
                  const json = JSON.parse(trimmed.slice(6));
                  const content = json.choices?.[0]?.delta?.content;
                  if (content) {
                    controller.enqueue(encoder.encode(formatStreamPart("text", content)));
                  }
                } catch {
                  // Ignore JSON chunks in transit
                }
              }
            }
          }
        } catch (err) {
          console.error("Stream reader exception:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Vercel-AI-Data-Stream": "v1",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (err: unknown) {
    console.error("Chat API error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
