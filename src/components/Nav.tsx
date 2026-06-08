"use client";
import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { useT } from "@/i18n";
import RobotLogo from "./RobotLogo";
import type { Mode } from "@/context/AppContext";

const NAV_SECTIONS = [
  { key: "tools", href: "#tools" },
  { key: "agents", href: "#agents" },
  { key: "mcp", href: "#mcp" },
  { key: "git", href: "#git" },
  { key: "skills", href: "#skills" },
  { key: "plan", href: "#plan" },
  { key: "terminal", href: "#terminal" },
] as const;

const MODES: { value: Mode; color: string }[] = [
  { value: "expert", color: "#7c3aed" },
  { value: "intermediate", color: "#3b82f6" },
  { value: "beginner", color: "#10b981" },
];

export default function Nav() {
  const { theme, setTheme, language, setLanguage, mode, setMode } = useApp();
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [modeOpen, setModeOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLight = theme === "light";
  const currentMode = MODES.find((m) => m.value === mode)!;
  const modeLabelMap = { expert: t.nav.expert, intermediate: t.nav.intermediate, beginner: t.nav.beginner };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? `var(--bg-surface)ee` : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <RobotLogo color="#7c3aed" size={32} />
          <div className="hidden sm:block">
            <span className="text-sm font-bold" style={{ color: "var(--text)" }}>Claude Code</span>
          </div>
        </a>

        {/* Nav links — hidden on small screens */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_SECTIONS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-xs rounded-md transition-all duration-150 hover:text-white"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.background = "rgba(124,58,237,0.12)"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.background = "transparent"; }}
            >
              {t.nav[item.key as keyof typeof t.nav] as string}
            </a>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mode selector */}
          <div className="relative">
            <button
              onClick={() => setModeOpen(!modeOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all"
              style={{
                background: `${currentMode.color}18`,
                border: `1px solid ${currentMode.color}40`,
                color: currentMode.color,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: currentMode.color }} />
              {modeLabelMap[mode]}
              <span style={{ color: "var(--text-muted)" }}>▾</span>
            </button>
            {modeOpen && (
              <div
                className="absolute right-0 top-9 rounded-xl overflow-hidden z-50"
                style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", minWidth: "140px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
              >
                {MODES.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => { setMode(m.value); setModeOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs transition-all flex items-center gap-2"
                    style={{
                      color: mode === m.value ? m.color : "var(--text-dim)",
                      background: mode === m.value ? `${m.color}15` : "transparent",
                    }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: m.color }} />
                    {modeLabelMap[m.value]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(isLight ? "dark" : "light")}
            className="p-1.5 rounded-lg text-xs transition-all"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-dim)" }}
            title={isLight ? t.nav.darkMode : t.nav.lightMode}
          >
            {isLight ? "🌙" : "☀️"}
          </button>

          {/* Language toggle */}
          <button
            onClick={() => setLanguage(language === "ko" ? "en" : "ko")}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-dim)" }}
          >
            {t.nav.lang}
          </button>

          {/* Live indicator */}
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#10b981", animation: "pulseGlow 2s ease-in-out infinite" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Live</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
