"use client";
import { useState } from "react";
import { TOOLS } from "@/data/features";

const CATEGORY_COLORS: Record<string, string> = {
  file: "#10b981",
  search: "#06b6d4",
  execution: "#ef4444",
  web: "#ec4899",
  agent: "#a78bfa",
  planning: "#34d399",
};

const CATEGORY_LABELS: Record<string, string> = {
  file: "파일 작업",
  search: "검색",
  execution: "실행",
  web: "웹 연동",
  agent: "에이전트",
  planning: "계획",
};

export default function ToolsSection() {
  const [selected, setSelected] = useState(TOOLS[0]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [...new Set(TOOLS.map((t) => t.category))];
  const filtered = activeCategory ? TOOLS.filter((t) => t.category === activeCategory) : TOOLS;

  return (
    <section id="tools" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs"
            style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#10b981" }}>
            ⚡ Core Tools
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>Built-in 도구들</h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Claude Code가 코드베이스와 상호작용하는 모든 기본 도구. 클릭하면 실제 사용 예제를 볼 수 있습니다.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className="px-4 py-1.5 rounded-full text-xs transition-all"
            style={{
              background: activeCategory === null ? "rgba(124, 58, 237, 0.3)" : "var(--bg-card)",
              border: `1px solid ${activeCategory === null ? "rgba(124, 58, 237, 0.6)" : "var(--border)"}`,
              color: activeCategory === null ? "#a78bfa" : "var(--text-muted)",
            }}
          >
            전체
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
              className="px-4 py-1.5 rounded-full text-xs transition-all"
              style={{
                background: activeCategory === cat ? `${CATEGORY_COLORS[cat]}22` : "var(--bg-card)",
                border: `1px solid ${activeCategory === cat ? CATEGORY_COLORS[cat] : "var(--border)"}`,
                color: activeCategory === cat ? CATEGORY_COLORS[cat] : "var(--text-muted)",
              }}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Tool List */}
          <div className="lg:col-span-2 space-y-2">
            {filtered.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelected(tool)}
                className="w-full text-left p-4 rounded-xl transition-all duration-200"
                style={{
                  background: selected.id === tool.id
                    ? `${tool.color}11`
                    : "rgba(255,255,255,0.02)",
                  border: `1px solid ${selected.id === tool.id ? tool.color : "rgba(255,255,255,0.06)"}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ background: `${tool.color}22`, color: tool.color }}>
                    {tool.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>{tool.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {CATEGORY_LABELS[tool.category]}
                    </div>
                  </div>
                  {selected.id === tool.id && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: tool.color }} />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Tool Detail */}
          <div className="lg:col-span-3">
            <div className="h-full rounded-xl overflow-hidden"
              style={{ border: `1px solid ${selected.color}33`, background: "#0d0d1a" }}>
              {/* Header */}
              <div className="px-6 py-4 flex items-center justify-between"
                style={{ borderBottom: `1px solid ${selected.color}22` }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold"
                    style={{ background: `${selected.color}22`, color: selected.color }}>
                    {selected.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: "var(--text)" }}>{selected.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: CATEGORY_COLORS[selected.category] }}>
                      {CATEGORY_LABELS[selected.category]}
                    </div>
                  </div>
                </div>
                <div className="px-2 py-1 rounded text-xs"
                  style={{ background: `${selected.color}11`, color: selected.color, border: `1px solid ${selected.color}33` }}>
                  Tool
                </div>
              </div>

              {/* Description */}
              <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <p className="text-sm" style={{ color: "var(--text-dim)", lineHeight: 1.7 }}>{selected.description}</p>
              </div>

              {/* Code Example */}
              <div className="p-6">
                <div className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>// 사용 예제</div>
                <pre className="text-sm leading-relaxed overflow-auto"
                  style={{ color: "#e2e8f0", fontFamily: "'Fira Code', monospace" }}>
                  {selected.example.split("\n").map((line, i) => {
                    let color = "#e2e8f0";
                    if (line.trim().startsWith("//")) color = "#475569";
                    else if (line.includes("(") && !line.includes(":")) color = selected.color;
                    else if (line.includes("→")) color = "#94a3b8";
                    return (
                      <span key={i} style={{ color }} className="block">
                        {line}
                      </span>
                    );
                  })}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
