"use client";
import { useState } from "react";
import { MCP_SERVERS } from "@/data/features";

export default function MCPSection() {
  const [active, setActive] = useState(MCP_SERVERS[0]);

  return (
    <section id="mcp" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs"
            style={{ background: "rgba(6, 182, 212, 0.1)", border: "1px solid rgba(6, 182, 212, 0.3)", color: "#06b6d4" }}>
            ◈ MCP Servers
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">MCP 서버 연동</h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "#64748b" }}>
            이 세션에 실제로 연결된 MCP 서버들. Model Context Protocol로 외부 도구를 Claude Code에 통합합니다.
          </p>
          <div className="inline-flex items-center gap-2 mt-3 text-xs"
            style={{ color: "#10b981" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#10b981" }} />
            6개 서버 현재 연결됨
          </div>
        </div>

        {/* Connection visualization */}
        <div className="mb-12 flex items-center justify-center gap-4 flex-wrap">
          {/* Claude Code center */}
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c3aed22, #3b82f622)", border: "2px solid rgba(124, 58, 237, 0.5)" }}>
              <div className="text-2xl font-bold" style={{
                background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>CC</div>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap"
              style={{ color: "#94a3b8" }}>Claude Code</div>
          </div>

          <div className="hidden md:flex flex-col items-center gap-1">
            <div className="text-xs" style={{ color: "#475569" }}>──────── MCP ────────</div>
            <div className="text-xs" style={{ color: "#7c3aed" }}>Model Context Protocol</div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {MCP_SERVERS.map((server) => (
              <button
                key={server.id}
                onClick={() => setActive(server)}
                className="w-16 h-16 rounded-xl flex flex-col items-center justify-center gap-1 text-xl transition-all duration-200"
                style={{
                  background: active.id === server.id ? `${server.color}18` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${active.id === server.id ? server.color : "rgba(255,255,255,0.08)"}`,
                  transform: active.id === server.id ? "scale(1.1)" : "scale(1)",
                }}
              >
                <span>{server.icon}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Server Detail */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${active.color}30`, background: "#0d0d1a" }}>
            {/* Header */}
            <div className="px-6 py-4 flex items-center gap-4"
              style={{ borderBottom: `1px solid ${active.color}20` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: `${active.color}15`, border: `1px solid ${active.color}30` }}>
                {active.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold">{active.name}</h3>
                  {active.reallyConnected && (
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" }}>
                      ● 연결됨
                    </span>
                  )}
                </div>
                <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{active.description}</p>
              </div>
            </div>

            {/* Tools */}
            <div className="p-6">
              <div className="text-xs mb-3" style={{ color: "#475569" }}>// 사용 가능한 도구</div>
              <div className="flex flex-wrap gap-2">
                {active.tools.map((tool) => (
                  <span key={tool} className="px-3 py-1.5 rounded-lg text-xs font-mono"
                    style={{ background: `${active.color}10`, color: active.color, border: `1px solid ${active.color}25` }}>
                    {tool}
                  </span>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg text-xs"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", color: "#94a3b8" }}>
                <span style={{ color: "#7c3aed" }}>mcp__{active.id === "github" ? "github" : active.id}__</span>
                <span style={{ color: "#94a3b8" }}>{active.tools[0]}</span>
                <span style={{ color: "#475569" }}>{"({ ... })"}</span>
              </div>
            </div>
          </div>

          {/* All servers grid */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {MCP_SERVERS.map((server) => (
              <button
                key={server.id}
                onClick={() => setActive(server)}
                className="p-4 rounded-xl text-left transition-all"
                style={{
                  background: active.id === server.id ? `${server.color}10` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${active.id === server.id ? server.color + "50" : "rgba(255,255,255,0.07)"}`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{server.icon}</span>
                  <span className="text-xs font-semibold text-white">{server.name.replace(" MCP", "")}</span>
                </div>
                <div className="text-xs" style={{ color: "#475569" }}>{server.tools.length} 도구</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
