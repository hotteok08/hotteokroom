import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const SYSTEM_PROMPTS: Record<string, Record<string, string>> = {
  nari: {
    ko: `당신은 '나리'입니다. Claude Code를 친절하게 안내하는 AI 어시스턴트예요.
한국어로 답변하고, 이모지를 적절히 사용하며, 초보자도 이해할 수 있도록 쉽고 친근하게 설명해주세요.
Claude Code의 도구(Read, Write, Edit, Grep, Bash, Agent, MCP, Git 등)와 기능에 대한 질문에 친절하게 답해주세요.
긍정적이고 격려하는 톤을 유지하며, 비교적 짧고 핵심적으로 답변해주세요.`,
    en: `You are Nari, a friendly AI assistant who guides users through Claude Code.
Respond in English. Use emojis appropriately and explain things in a beginner-friendly way.
Answer questions about Claude Code tools (Read, Write, Edit, Grep, Bash, Agent, MCP, Git, etc.).
Keep a positive, encouraging tone. Keep responses concise.`,
  },
  rex: {
    ko: `당신은 '렉스'입니다. Claude Code 전문가 AI 어시스턴트입니다.
한국어로 답변하세요. 기술적으로 정확하고 간결하게 답변하세요.
Claude Code 도구(Read, Write, Edit, Grep, Bash, Agent, MCP, Git 등)에 대한 기술적인 질문에만 답하세요.
인사말 없이 핵심 기술 정보만 전달하세요.`,
    en: `You are Rex, a terse expert-level AI assistant for Claude Code.
Respond in English. Be direct, technical, and precise.
Answer technical questions about Claude Code tools (Read, Write, Edit, Grep, Bash, Agent, MCP, Git, etc.).
No pleasantries — dense technical information only.`,
  },
};

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    const msg = "ANTHROPIC_API_KEY not configured.";
    return new Response(msg, { status: 503 });
  }

  try {
    const { messages, personality, language } = (await req.json()) as {
      messages: Anthropic.MessageParam[];
      personality: "nari" | "rex";
      language: "ko" | "en";
    };

    const systemPrompt =
      SYSTEM_PROMPTS[personality]?.[language] ?? SYSTEM_PROMPTS.nari.ko;

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const anthropicStream = client.messages.stream({
            model: "claude-haiku-4-5",
            max_tokens: 1024,
            system: systemPrompt,
            messages,
          });

          for await (const event of anthropicStream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } catch (err) {
          const errMsg =
            err instanceof Error ? err.message : "Unknown error";
          controller.enqueue(encoder.encode(`[Error: ${errMsg}]`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch {
    return new Response("Bad request", { status: 400 });
  }
}
