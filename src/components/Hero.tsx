"use client";
import { useEffect, useState } from "react";

const COMMANDS = [
  "Read({ file_path: '/src/app/page.tsx' })",
  "Grep({ pattern: 'useState', glob: '**/*.tsx' })",
  "Agent({ subagent_type: 'Explore', prompt: '...' })",
  "Bash({ command: 'npm run build' })",
  "Edit({ file_path: '...', old_string: '...', new_string: '...' })",
  "WebSearch({ query: 'Next.js 15 features' })",
];

const STATS = [
  { label: "Tools", value: "10+", color: "#10b981" },
  { label: "Agent Types", value: "6", color: "#3b82f6" },
  { label: "MCP Servers", value: "6", color: "#7c3aed" },
  { label: "Skills", value: "12+", color: "#f59e0b" },
];

export default function Hero() {
  const [cmdIndex, setCmdIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const cmd = COMMANDS[cmdIndex];
    if (charIndex < cmd.length) {
      const timeout = setTimeout(() => {
        setDisplayed(cmd.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCmdIndex((i) => (i + 1) % COMMANDS.length);
        setCharIndex(0);
        setDisplayed("");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [cmdIndex, charIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124, 58, 237, 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: ["#7c3aed", "#10b981", "#3b82f6", "#f59e0b"][i % 4],
            animation: `float ${4 + (i % 4)}s ease-in-out ${i * 0.3}s infinite`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs"
          style={{ background: "rgba(124, 58, 237, 0.15)", border: "1px solid rgba(124, 58, 237, 0.3)", color: "#a78bfa" }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#a78bfa" }} />
          Claude Code — Anthropic CLI
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-white">Claude Code</span>
          <br />
          <span style={{
            background: "linear-gradient(135deg, #a78bfa, #60a5fa, #34d399)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            모든 기능 쇼케이스
          </span>
        </h1>

        <p className="text-lg mb-12 max-w-2xl mx-auto" style={{ color: "#94a3b8", lineHeight: 1.8 }}>
          파일 조작부터 멀티에이전트, MCP 서버 연동, Git 통합까지
          <br />
          Claude Code가 실제로 이 사이트를 만들면서 사용한 모든 기능
        </p>

        {/* Terminal Demo */}
        <div className="max-w-2xl mx-auto mb-12 text-left rounded-xl overflow-hidden"
          style={{ background: "#0d0d1a", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
          <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#10b981" }} />
            <span className="ml-3 text-xs" style={{ color: "#64748b" }}>claude-code — feature showcase</span>
          </div>
          <div className="p-6 font-mono text-sm">
            <div className="flex items-center gap-2 mb-3" style={{ color: "#64748b" }}>
              <span style={{ color: "#10b981" }}>›</span>
              <span style={{ color: "#94a3b8" }}>claude</span>
            </div>
            <div className="flex items-start gap-2">
              <span style={{ color: "#7c3aed" }}>▸</span>
              <span style={{ color: "#e2e8f0" }}>{displayed}</span>
              <span className="w-2 h-4 inline-block" style={{ background: "#7c3aed", animation: "blink 1s step-end infinite" }} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {STATS.map((stat) => (
            <div key={stat.label} className="card-glass rounded-xl p-4">
              <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs" style={{ color: "#64748b" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="mt-16 flex flex-col items-center gap-2" style={{ color: "#475569" }}>
          <span className="text-xs">스크롤해서 탐색</span>
          <div className="w-0.5 h-8 rounded-full" style={{ background: "linear-gradient(to bottom, #7c3aed, transparent)" }} />
        </div>
      </div>
    </section>
  );
}
