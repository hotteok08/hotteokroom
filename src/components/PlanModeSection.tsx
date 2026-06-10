"use client";
import { useState } from "react";

const PLAN_STEPS = [
  {
    phase: "Plan Mode",
    icon: "◈",
    color: "#f59e0b",
    items: [
      "요구사항 분석",
      "파일 탐색 (Glob, Grep)",
      "구현 전략 설계",
      "AskUserQuestion으로 선택지 제공",
    ],
    code: `// Plan Mode 진입
ExitPlanMode() // 설계 완료 후 호출

// Plan 중에만 사용
AskUserQuestion({
  questions: [{
    question: "어떤 방식으로 구현할까요?",
    header: "Approach",
    options: [
      { label: "REST API", description: "..." },
      { label: "GraphQL", description: "..." }
    ]
  }]
})`,
  },
  {
    phase: "Execute Mode",
    icon: "▶",
    color: "#10b981",
    items: [
      "파일 생성/수정 (Write, Edit)",
      "명령 실행 (Bash)",
      "테스트 실행",
      "Git 커밋 & PR",
    ],
    code: `// Execute Mode
Write({ file_path: "...", content: "..." })
Edit({ old_string: "...", new_string: "..." })
Bash({ command: "npm test" })

// 변경 완료 후
git commit -m "feat: ..."
git push -u origin branch`,
  },
];

const PERMISSION_MODES = [
  { mode: "Default", desc: "위험한 작업은 사용자 승인 요청", color: "#f59e0b" },
  { mode: "Auto-approve", desc: "특정 패턴 자동 허용 (allowlist)", color: "#10b981" },
  { mode: "Deny", desc: "도구 호출 거부 후 대안 탐색", color: "#ef4444" },
];

export default function PlanModeSection() {
  const [activePhase, setActivePhase] = useState(0);
  const step = PLAN_STEPS[activePhase];

  return (
    <section id="plan" className="py-24 px-6" style={{ background: "rgba(0,0,0,0.3)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs"
            style={{ background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.3)", color: "#f59e0b" }}>
            ◎ Plan Mode
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>Plan Mode & 권한 시스템</h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            설계와 실행을 분리하는 워크플로우. 코드 변경 전에 계획을 검토하고 승인합니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Plan/Execute Toggle */}
          <div>
            <div className="flex gap-2 mb-6">
              {PLAN_STEPS.map((s, i) => (
                <button
                  key={s.phase}
                  onClick={() => setActivePhase(i)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: activePhase === i ? `${s.color}20` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${activePhase === i ? s.color : "rgba(255,255,255,0.08)"}`,
                    color: activePhase === i ? s.color : "#64748b",
                  }}
                >
                  <span className="mr-2">{s.icon}</span>{s.phase}
                </button>
              ))}
            </div>

            <div className="p-5 rounded-xl mb-4"
              style={{ background: "var(--bg-card)", border: `1px solid ${step.color}25` }}>
              <div className="text-xs font-semibold mb-3" style={{ color: step.color }}>실행 내용</div>
              <ul className="space-y-2">
                {step.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-dim)" }}>
                    <span style={{ color: step.color }}>→</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl overflow-hidden"
              style={{ background: "#0d0d1a", border: `1px solid ${step.color}20` }}>
              <div className="px-4 py-2 text-xs" style={{ borderBottom: `1px solid ${step.color}15`, color: "var(--text-muted)" }}>
                // {step.phase} 코드
              </div>
              <pre className="p-4 text-xs leading-relaxed overflow-auto"
                style={{ color: "var(--text-dim)", fontFamily: "'Fira Code', monospace" }}>
                {step.code}
              </pre>
            </div>
          </div>

          {/* Permission System */}
          <div>
            <h3 className="text-sm font-semibold mb-6" style={{ color: "var(--text)" }}>권한 시스템</h3>
            <div className="space-y-3 mb-8">
              {PERMISSION_MODES.map((mode) => (
                <div key={mode.mode} className="p-4 rounded-xl flex items-start gap-4"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: mode.color }} />
                  <div>
                    <div className="text-sm font-semibold mb-0.5" style={{ color: mode.color }}>{mode.mode}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{mode.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reversibility Guide */}
            <div className="p-5 rounded-xl"
              style={{ background: "rgba(245, 158, 11, 0.05)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
              <div className="text-xs font-semibold mb-4" style={{ color: "#f59e0b" }}>⚡ 가역성 기준</div>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <span style={{ color: "#10b981" }}>✓ 자유롭게</span>
                  <span style={{ color: "var(--text-dim)" }}>파일 편집, 테스트 실행, 로컬 검색</span>
                </div>
                <div className="flex items-start gap-3">
                  <span style={{ color: "#f59e0b" }}>⚠ 확인 필요</span>
                  <span style={{ color: "var(--text-dim)" }}>git push, PR 생성, 외부 서비스 호출</span>
                </div>
                <div className="flex items-start gap-3">
                  <span style={{ color: "#ef4444" }}>✗ 명시적 허가</span>
                  <span style={{ color: "var(--text-dim)" }}>force push, reset --hard, 파일 대량 삭제</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="text-xs font-semibold mb-2" style={{ color: "var(--text-dim)" }}>AskUserQuestion</div>
              <div className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                사용자가 결정해야 하는 선택지가 있을 때 인터랙티브 UI를 표시합니다.
                옵션 2~4개, 멀티셀렉트 지원.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
