"use client";
import { useState } from "react";
import { MCP_SERVERS } from "@/data/features";
import { useT } from "@/i18n";

export default function MCPSection() {
  const t = useT();
  const [active, setActive] = useState(MCP_SERVERS[0]);
  const [showAll, setShowAll] = useState(false);

  const connected = MCP_SERVERS.filter((s) => s.connected);
  const available = MCP_SERVERS.filter((s) => !s.connected);
  const visible = showAll ? available : available.slice(0, 3);

  return (
    <section id="mcp" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs"
            style={{ background: "rgba(6, 182, 212, 0.1)", border: "1px solid rgba(6, 182, 212, 0.3)", color: "#06b6d4" }}>
            ◈ {t.mcp.badge}
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>{t.mcp.title}</h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>{t.mcp.desc}</p>
          <div className="inline-flex items-center gap-2 mt-3 text-xs" style={{ color: "#10b981" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#10b981" }} />
            {connected.length}{t.mcp.connected}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Server detail */}
          <div>
            <div className="rounded-2xl overflow-hidden mb-6"
              style={{ border: `1px solid ${active.color}30`, background: "var(--bg-surface)" }}>
              <div className="px-6 py-4 flex items-center gap-4"
                style={{ borderBottom: `1px solid ${active.color}20` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${active.color}15`, border: `1px solid ${active.color}30` }}>
                  {active.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold" style={{ color: "var(--text)" }}>{active.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={active.connected
                        ? { background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" }
                        : { background: "rgba(255,255,255,0.05)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                      {active.connected ? `● ${t.mcp.connectedLabel}` : t.mcp.availableLabel}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{active.description}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs mb-3" style={{ color: "var(--text-faint)" }}>// {t.mcp.toolsCount}</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {active.tools.map((tool) => (
                    <span key={tool} className="px-3 py-1.5 rounded-lg text-xs font-mono"
                      style={{ background: `${active.color}10`, color: active.color, border: `1px solid ${active.color}25` }}>
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="p-3 rounded-lg text-xs"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                  <span style={{ color: "#7c3aed" }}>mcp__{active.id}__</span>
                  <span>{active.tools[0]}</span>
                  <span style={{ color: "var(--text-faint)" }}>{"({ ... })"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Server list */}
          <div className="space-y-6">
            {/* Connected */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ background: "#10b981" }} />
                <span className="text-xs font-semibold" style={{ color: "#10b981" }}>{t.mcp.activeLabel} ({connected.length})</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {connected.map((server) => (
                  <button
                    key={server.id}
                    onClick={() => setActive(server)}
                    className="p-3 rounded-xl text-left transition-all duration-200"
                    style={{
                      background: active.id === server.id ? `${server.color}15` : "var(--bg-card)",
                      border: `1px solid ${active.id === server.id ? server.color + "50" : "var(--border)"}`,
                      transform: active.id === server.id ? "scale(1.03)" : "scale(1)",
                    }}
                  >
                    <div className="text-xl mb-1">{server.icon}</div>
                    <div className="text-xs font-semibold" style={{ color: "var(--text)" }}>{server.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#10b981" }}>● {t.mcp.connectedLabel}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Available */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ background: "var(--text-muted)" }} />
                <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{t.mcp.availableLabel} ({available.length})</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {visible.map((server) => (
                  <button
                    key={server.id}
                    onClick={() => setActive(server)}
                    className="p-3 rounded-xl text-left transition-all duration-200 opacity-60 hover:opacity-100"
                    style={{
                      background: active.id === server.id ? `${server.color}10` : "var(--bg-card)",
                      border: `1px solid ${active.id === server.id ? server.color + "40" : "var(--border)"}`,
                    }}
                  >
                    <div className="text-xl mb-1">{server.icon}</div>
                    <div className="text-xs font-semibold" style={{ color: "var(--text)" }}>{server.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>연결 가능</div>
                  </button>
                ))}
              </div>
              {!showAll && available.length > 3 && (
                <button
                  onClick={() => setShowAll(true)}
                  className="mt-3 w-full py-2 rounded-xl text-xs transition-all"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
                >
                  +{available.length - 3}개 더 보기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
