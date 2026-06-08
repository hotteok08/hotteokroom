"use client";
import { useState, useEffect } from "react";
import { AGENT_TYPES } from "@/data/features";

type AgentStatus = "idle" | "running" | "done" | "background";

interface AgentNode {
  id: string;
  type: string;
  status: AgentStatus;
  task: string;
  result?: string;
  color: string;
}

const DEMO_FLOW: AgentNode[][] = [
  [
    { id: "main", type: "claude", status: "running", task: "메인 작업 조율", color: "#a78bfa" },
  ],
  [
    { id: "explore", type: "Explore", status: "idle", task: "src/**/*.tsx 파일 탐색", color: "#06b6d4" },
    { id: "grep", type: "general-purpose", status: "idle", task: "API 엔드포인트 검색", color: "#10b981" },
    { id: "plan", type: "Plan", status: "idle", task: "구현 계획 수립", color: "#f59e0b" },
  ],
  [
    { id: "result", type: "claude", status: "idle", task: "결과 통합 및 코드 작성", color: "#a78bfa" },
  ],
];

const STATUS_COLOR: Record<AgentStatus, string> = {
  idle: "#475569",
  running: "#f59e0b",
  done: "#10b981",
  background: "#7c3aed",
};

const STATUS_LABEL: Record<AgentStatus, string> = {
  idle: "대기",
  running: "실행 중",
  done: "완료",
  background: "백그라운드",
};

export default function AgentsSection() {
  const [step, setStep] = useState(0);
  const [nodes, setNodes] = useState<AgentNode[][]>(DEMO_FLOW);

  const runDemo = () => {
    setStep(0);
    setNodes(DEMO_FLOW.map((row) => row.map((n) => ({ ...n, status: "idle" as AgentStatus }))));

    setTimeout(() => {
      setNodes((prev) => prev.map((row, ri) =>
        ri === 0 ? row.map((n) => ({ ...n, status: "running" as AgentStatus })) : row
      ));
      setStep(1);
    }, 300);

    setTimeout(() => {
      setNodes((prev) => prev.map((row, ri) =>
        ri === 1 ? row.map((n) => ({ ...n, status: "running" as AgentStatus })) : row
      ));
      setStep(2);
    }, 1200);

    setTimeout(() => {
      setNodes((prev) => prev.map((row, ri) =>
        ri === 1 ? row.map((n) => ({ ...n, status: "done" as AgentStatus, result: "완료" })) : row
      ));
      setStep(3);
    }, 3000);

    setTimeout(() => {
      setNodes((prev) => prev.map((row, ri) => {
        if (ri === 0) return row.map((n) => ({ ...n, status: "done" as AgentStatus }));
        if (ri === 2) return row.map((n) => ({ ...n, status: "running" as AgentStatus }));
        return row;
      }));
      setStep(4);
    }, 4000);

    setTimeout(() => {
      setNodes((prev) => prev.map((row) => row.map((n) => ({ ...n, status: "done" as AgentStatus }))));
      setStep(5);
    }, 5500);
  };

  return (
    <section id="agents" className="py-24 px-6" style={{ background: "rgba(0,0,0,0.3)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs"
            style={{ background: "rgba(167, 139, 250, 0.1)", border: "1px solid rgba(167, 139, 250, 0.3)", color: "#a78bfa" }}>
            ◈ Multi-Agent System
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">에이전트 시스템</h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "#64748b" }}>
            복잡한 작업을 특수화된 서브에이전트로 분할해 병렬 실행. 각 에이전트는 독립 컨텍스트를 가집니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Flow Diagram */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-white">병렬 에이전트 실행 흐름</h3>
              <button
                onClick={runDemo}
                className="px-4 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ background: "rgba(167, 139, 250, 0.2)", border: "1px solid rgba(167, 139, 250, 0.4)", color: "#a78bfa" }}
              >
                ▶ 데모 실행
              </button>
            </div>

            <div className="space-y-4">
              {nodes.map((row, ri) => (
                <div key={ri}>
                  <div className={`flex gap-4 ${ri === 1 ? "justify-around" : "justify-center"}`}>
                    {row.map((node) => (
                      <div
                        key={node.id}
                        className="relative p-4 rounded-xl transition-all duration-500"
                        style={{
                          background: node.status !== "idle" ? `${node.color}11` : "rgba(255,255,255,0.02)",
                          border: `1px solid ${node.status !== "idle" ? node.color : "rgba(255,255,255,0.08)"}`,
                          minWidth: "140px",
                          opacity: node.status === "idle" ? 0.5 : 1,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full transition-colors duration-300"
                            style={{ background: STATUS_COLOR[node.status] }} />
                          <span className="text-xs font-semibold" style={{ color: node.color }}>{node.type}</span>
                        </div>
                        <div className="text-xs" style={{ color: "#94a3b8" }}>{node.task}</div>
                        {node.status !== "idle" && (
                          <div className="mt-2 text-xs" style={{ color: STATUS_COLOR[node.status] }}>
                            {STATUS_LABEL[node.status]}
                            {node.status === "running" && (
                              <span className="ml-1 inline-block w-1 h-3 align-middle"
                                style={{ background: STATUS_COLOR[node.status], animation: "blink 0.8s step-end infinite" }} />
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {ri < nodes.length - 1 && (
                    <div className="flex justify-center my-2">
                      <div className="h-6 w-0.5 transition-all duration-500"
                        style={{ background: step > ri ? "#7c3aed" : "rgba(255,255,255,0.1)" }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {step === 5 && (
              <div className="mt-4 p-3 rounded-lg text-xs"
                style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#10b981" }}>
                ✓ 모든 에이전트 완료 — 결과 통합됨
              </div>
            )}
          </div>

          {/* Agent Types */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-6">사용 가능한 에이전트 타입</h3>
            <div className="space-y-3">
              {AGENT_TYPES.map((agent) => (
                <div key={agent.type} className="p-4 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex items-center gap-3">
                    <div className="px-2 py-0.5 rounded text-xs font-mono font-semibold"
                      style={{ background: `${agent.color}15`, color: agent.color, border: `1px solid ${agent.color}30` }}>
                      {agent.type}
                    </div>
                    <span className="text-xs" style={{ color: "#64748b" }}>{agent.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl"
              style={{ background: "rgba(167, 139, 250, 0.06)", border: "1px solid rgba(167, 139, 250, 0.2)" }}>
              <div className="text-xs font-semibold mb-2" style={{ color: "#a78bfa" }}>⚡ 핵심 기능</div>
              <ul className="space-y-1.5 text-xs" style={{ color: "#94a3b8" }}>
                <li>• <strong style={{ color: "#e2e8f0" }}>병렬 실행</strong> — 독립 작업은 동시에 처리</li>
                <li>• <strong style={{ color: "#e2e8f0" }}>백그라운드</strong> — run_in_background: true로 비동기</li>
                <li>• <strong style={{ color: "#e2e8f0" }}>격리된 컨텍스트</strong> — 각 에이전트는 독립 메모리</li>
                <li>• <strong style={{ color: "#e2e8f0" }}>Worktree 격리</strong> — isolation: "worktree"로 안전한 코드 변경</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
