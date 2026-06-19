"use client";
import { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { useT } from "@/i18n";
import RobotLogo from "./RobotLogo";

interface DisplayMessage {
  from: "user" | "bot";
  text: string;
}

interface ApiMessage {
  role: "user" | "assistant";
  content: string;
}

export default function AgentBot() {
  const { agentPersonality, setAgentPersonality, language } = useApp();
  const t = useT();
  const [open, setOpen] = useState(false);
  const [displayMessages, setDisplayMessages] = useState<DisplayMessage[]>([]);
  const [apiMessages, setApiMessages] = useState<ApiMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const isNari = agentPersonality === "nari";
  const accentColor = isNari ? "#10b981" : "#ef4444";
  const botName = isNari ? t.agentBot.nariName : t.agentBot.rexName;

  useEffect(() => {
    if (open && !hasOpened) {
      setHasOpened(true);
      const welcomeText = isNari ? t.agentBot.nariWelcome : t.agentBot.rexWelcome;
      setTimeout(() => {
        setDisplayMessages([{ from: "bot", text: welcomeText }]);
      }, 300);
    }
  }, [open, hasOpened, isNari, t]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayMessages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userText = input.trim();
    setInput("");

    const updatedApiMessages: ApiMessage[] = [
      ...apiMessages,
      { role: "user", content: userText },
    ];
    setApiMessages(updatedApiMessages);
    setDisplayMessages((prev) => [
      ...prev,
      { from: "user", text: userText },
      { from: "bot", text: "" },
    ]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedApiMessages,
          personality: agentPersonality,
          language,
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setDisplayMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { from: "bot", text: fullText };
          return updated;
        });
      }

      setApiMessages((prev) => [
        ...prev,
        { role: "assistant", content: fullText },
      ]);
    } catch {
      const errText =
        language === "ko"
          ? "오류가 발생했어요. 잠시 후 다시 시도해주세요."
          : "An error occurred. Please try again.";
      setDisplayMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { from: "bot", text: errText };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const switchPersonality = () => {
    const next: "nari" | "rex" = isNari ? "rex" : "nari";
    setAgentPersonality(next);
    const welcomeText =
      next === "nari" ? t.agentBot.nariWelcome : t.agentBot.rexWelcome;
    setDisplayMessages([{ from: "bot", text: welcomeText }]);
    setApiMessages([]);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 rounded-full p-1 transition-all duration-300"
        style={{
          boxShadow: `0 0 24px ${accentColor}66`,
          transform: open ? "scale(0.9)" : "scale(1)",
        }}
        title={`${botName} — Claude Code Assistant`}
      >
        <RobotLogo color={accentColor} size={56} animate={!open} />
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "var(--bg-surface, #0d0d1a)",
            border: `1px solid ${accentColor}40`,
            boxShadow: `0 0 40px ${accentColor}22`,
            maxHeight: "480px",
          }}
        >
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ borderBottom: `1px solid ${accentColor}25` }}
          >
            <div className="flex items-center gap-3">
              <RobotLogo color={accentColor} size={32} />
              <div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {botName}
                </div>
                <div className="text-xs" style={{ color: accentColor }}>
                  {isNari
                    ? language === "ko"
                      ? "친절 모드"
                      : "Friendly Mode"
                    : language === "ko"
                    ? "전문가 모드"
                    : "Expert Mode"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={switchPersonality}
                className="p-1.5 rounded-lg text-xs transition-all"
                style={{ background: `${accentColor}18`, color: accentColor }}
                title={t.agentBot.hint}
              >
                {isNari ? "→렉스" : "→나리"}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                ✕
              </button>
            </div>
          </div>

          <div
            className="flex-1 overflow-auto p-4 space-y-3"
            style={{ minHeight: "240px" }}
          >
            {displayMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className="max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed"
                  style={
                    msg.from === "user"
                      ? {
                          background: `${accentColor}22`,
                          color: "var(--text)",
                          border: `1px solid ${accentColor}30`,
                        }
                      : {
                          background: "var(--bg-card)",
                          color: "var(--text-dim)",
                          border: "1px solid var(--border)",
                        }
                  }
                >
                  {msg.from === "bot" &&
                  isLoading &&
                  i === displayMessages.length - 1 &&
                  msg.text === "" ? (
                    <span style={{ color: accentColor }}>●●●</span>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div
            className="p-3"
            style={{ borderTop: `1px solid ${accentColor}15` }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={t.agentBot.placeholder}
                disabled={isLoading}
                className="flex-1 px-3 py-2 rounded-lg text-xs outline-none"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  opacity: isLoading ? 0.6 : 1,
                }}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="px-3 py-2 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: isLoading
                    ? "var(--bg-card)"
                    : `${accentColor}22`,
                  color: isLoading ? "var(--text-muted)" : accentColor,
                  border: `1px solid ${
                    isLoading ? "var(--border)" : accentColor + "40"
                  }`,
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
              >
                {isLoading ? "…" : "↵"}
              </button>
            </div>
            <div
              className="mt-2 text-center text-xs"
              style={{ color: "var(--text-faint)" }}
            >
              {t.agentBot.hint}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
