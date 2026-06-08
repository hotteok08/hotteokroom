"use client";
import { useEffect, useState } from "react";
import { useT } from "@/i18n";
import RobotLogo from "./RobotLogo";

const COMMANDS = [
  "Read({ file_path: '/src/app/page.tsx' })",
  "Grep({ pattern: 'useState', glob: '**/*.tsx' })",
  "Agent({ subagent_type: 'Explore', prompt: '...' })",
  "Bash({ command: 'npm run build' })",
  "Edit({ old_string: '...', new_string: '...' })",
  "WebSearch({ query: 'Next.js 15 features' })",
  "mcp__github__create_pull_request({ ... })",
];

export default function Hero() {
  const t = useT();
  const [cmdIndex, setCmdIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const cmd = COMMANDS[cmdIndex];
    if (charIndex < cmd.length) {
      const timeout = setTimeout(() => {
        setDisplayed(cmd.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 28);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCmdIndex((i) => (i + 1) % COMMANDS.length);
        setCharIndex(0);
        setDisplayed("");
      }, 2200);
      return () => clearTimeout(timeout);
    }
  }, [cmdIndex, charIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 70%)" }} />

      {/* Floating particles */}
      {[...Array(16)].map((_, i) => (
        <div key={i} className="absolute w-1 h-1 rounded-full opacity-20"
          style={{
            left: `${5 + (i * 6.25)}%`, top: `${10 + (i % 5) * 20}%`,
            background: ["#7c3aed", "#10b981", "#3b82f6", "#f59e0b"][i % 4],
            animation: `float ${4 + (i % 3)}s ease-in-out ${i * 0.25}s infinite`,
          }} />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs"
          style={{ background: "rgba(124, 58, 237, 0.15)", border: "1px solid rgba(124, 58, 237, 0.3)", color: "#a78bfa" }}>
          <RobotLogo color="#a78bfa" size={20} />
          {t.hero.badge}
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span style={{ color: "var(--text)" }}>{t.hero.title1}</span>
          <br />
          <span style={{
            background: "linear-gradient(135deg, #a78bfa, #60a5fa, #34d399)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            {t.hero.title2}
          </span>
        </h1>

        <p className="text-base mb-12 max-w-2xl mx-auto whitespace-pre-line" style={{ color: "var(--text-muted)", lineHeight: 1.9 }}>
          {t.hero.desc}
        </p>

        {/* Terminal Demo */}
        <div className="max-w-2xl mx-auto mb-12 text-left rounded-xl overflow-hidden"
          style={{ background: "var(--bg-surface)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
          <div className="px-4 py-3 flex items-center gap-2"
            style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#10b981" }} />
            <span className="ml-3 text-xs" style={{ color: "var(--text-faint)" }}>claude-code — hotteokroom</span>
          </div>
          <div className="p-6 font-mono text-sm">
            <div className="flex items-center gap-2 mb-3">
              <span style={{ color: "#10b981" }}>›</span>
              <span style={{ color: "var(--text-muted)" }}>claude</span>
            </div>
            <div className="flex items-start gap-2">
              <span style={{ color: "#7c3aed" }}>▸</span>
              <span style={{ color: "var(--text)" }}>{displayed}</span>
              <span className="w-2 h-4 inline-block" style={{ background: "#7c3aed", animation: "blink 1s step-end infinite" }} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { value: "10+", label: t.hero.stats.tools, color: "#10b981" },
            { value: "6", label: t.hero.stats.agents, color: "#3b82f6" },
            { value: "12", label: t.hero.stats.mcp, color: "#7c3aed" },
            { value: "12+", label: t.hero.stats.skills, color: "#f59e0b" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="mt-14 flex flex-col items-center gap-2" style={{ color: "var(--text-faint)" }}>
          <span className="text-xs">{t.hero.scroll}</span>
          <div className="w-0.5 h-8 rounded-full" style={{ background: "linear-gradient(to bottom, #7c3aed, transparent)" }} />
        </div>
      </div>
    </section>
  );
}
