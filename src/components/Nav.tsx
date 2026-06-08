"use client";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "Tools", href: "#tools" },
  { label: "Agents", href: "#agents" },
  { label: "MCP", href: "#mcp" },
  { label: "Git", href: "#git" },
  { label: "Skills", href: "#skills" },
  { label: "Plan", href: "#plan" },
  { label: "Terminal", href: "#terminal" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(10, 10, 15, 0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(124, 58, 237, 0.2)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
            C
          </div>
          <span className="text-sm font-semibold text-white">Claude Code</span>
          <span className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: "rgba(124, 58, 237, 0.2)", color: "#a78bfa", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
            Showcase
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-xs rounded-md transition-all duration-200"
              style={{ color: "#94a3b8" }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#e2e8f0";
                (e.target as HTMLElement).style.background = "rgba(124, 58, 237, 0.15)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "#94a3b8";
                (e.target as HTMLElement).style.background = "transparent";
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#10b981" }} />
          <span className="text-xs" style={{ color: "#94a3b8" }}>Live Demo</span>
        </div>
      </div>
    </nav>
  );
}
