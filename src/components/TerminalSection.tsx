"use client";
import { useState, useRef, useEffect } from "react";

interface Line {
  type: "input" | "output" | "error" | "info";
  text: string;
}

const FAKE_RESPONSES: Record<string, Line[]> = {
  help: [
    { type: "info", text: "Claude Code 사용 가능한 도구:" },
    { type: "output", text: "  Read, Write, Edit, Glob, Grep" },
    { type: "output", text: "  Bash, WebFetch, WebSearch" },
    { type: "output", text: "  Agent, TodoWrite, SendUserFile" },
    { type: "info", text: "슬래시 커맨드: /code-review, /security-review, /run ..." },
  ],
  ls: [
    { type: "output", text: "src/" },
    { type: "output", text: "├── app/" },
    { type: "output", text: "│   ├── page.tsx" },
    { type: "output", text: "│   └── layout.tsx" },
    { type: "output", text: "├── components/" },
    { type: "output", text: "│   ├── Hero.tsx" },
    { type: "output", text: "│   ├── ToolsSection.tsx" },
    { type: "output", text: "│   └── ..." },
    { type: "output", text: "└── data/" },
    { type: "output", text: "    └── features.ts" },
  ],
  "git log": [
    { type: "info", text: "commit a1b2c3d (HEAD -> claude/api-showcase-website-T4CEq)" },
    { type: "output", text: "Author: Claude Code <claude@anthropic.com>" },
    { type: "output", text: "Date:   Mon Jun  8 2026" },
    { type: "output", text: "" },
    { type: "output", text: "    feat: Claude Code Feature Showcase 웹사이트 구현" },
  ],
  "git status": [
    { type: "info", text: "On branch claude/api-showcase-website-T4CEq" },
    { type: "output", text: "Your branch is up to date with 'origin/...'." },
    { type: "output", text: "" },
    { type: "output", text: "nothing to commit, working tree clean" },
  ],
  "npm run build": [
    { type: "info", text: "▲ Next.js 16.2.7" },
    { type: "output", text: "" },
    { type: "output", text: "Creating an optimized production build ..." },
    { type: "output", text: "✓ Compiled successfully" },
    { type: "output", text: "✓ Linting and checking validity of types" },
    { type: "output", text: "✓ Collecting page data" },
    { type: "output", text: "✓ Generating static pages (4/4)" },
    { type: "info", text: "Route (app):" },
    { type: "output", text: "  ○  /    (Static)" },
    { type: "output", text: "  ƒ  /api/commits  (Dynamic)" },
  ],
  clear: [],
};

export default function TerminalSection() {
  const [lines, setLines] = useState<Line[]>([
    { type: "info", text: "Claude Code — Interactive Terminal" },
    { type: "output", text: 'help, ls, git log, git status, npm run build, clear 를 입력해보세요' },
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const newLines: Line[] = [
      ...lines,
      { type: "input", text: `$ ${cmd}` },
    ];

    if (cmd === "clear") {
      setLines([]);
    } else if (FAKE_RESPONSES[cmd]) {
      setLines([...newLines, ...FAKE_RESPONSES[cmd]]);
    } else {
      setLines([
        ...newLines,
        { type: "error", text: `명령어 '${cmd}'를 찾을 수 없습니다. 'help'를 입력하세요.` },
      ]);
    }

    setHistory((h) => [cmd, ...h.slice(0, 19)]);
    setHistIdx(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? "" : history[idx]);
    }
  };

  const LINE_COLORS: Record<Line["type"], string> = {
    input: "#a78bfa",
    output: "#94a3b8",
    error: "#ef4444",
    info: "#10b981",
  };

  return (
    <section id="terminal" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs"
            style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444" }}>
            ▸ Terminal / Bash
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>인터랙티브 터미널</h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Bash 도구로 실행되는 실제 쉘 환경. 아래 터미널에서 직접 커맨드를 입력해보세요.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden"
          style={{ background: "#0a0a12", border: "1px solid rgba(124, 58, 237, 0.3)", boxShadow: "0 0 40px rgba(124, 58, 237, 0.15)" }}>
          {/* Title bar */}
          <div className="px-4 py-3 flex items-center gap-3"
            style={{ borderBottom: "1px solid var(--border)", background: "#0d0d1a" }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#10b981" }} />
            </div>
            <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>
              bash — hotteokroom
            </span>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#10b981" }} />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>connected</span>
            </div>
          </div>

          {/* Output */}
          <div
            className="h-80 overflow-auto p-4 cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, i) => (
              <div key={i} className="text-xs leading-6 font-mono" style={{ color: LINE_COLORS[line.type] }}>
                {line.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="text-xs font-mono" style={{ color: "#7c3aed" }}>›</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="커맨드 입력..."
              className="flex-1 bg-transparent outline-none text-xs font-mono placeholder:text-gray-700"
              style={{ color: "#e2e8f0" }}
              autoComplete="off"
              spellCheck={false}
            />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>↵</span>
          </form>
        </div>

        {/* Bash tool info */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "타임아웃", value: "최대 10분", color: "#f59e0b" },
            { label: "백그라운드", value: "run_in_background", color: "#10b981" },
            { label: "히스토리", value: "↑↓ 탐색", color: "#3b82f6" },
            { label: "병렬 실행", value: "독립 Bash 호출", color: "#a78bfa" },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-xl text-center"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="text-xs font-mono mb-1" style={{ color: item.color }}>{item.value}</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
