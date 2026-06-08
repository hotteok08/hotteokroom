"use client";
import { useState } from "react";
import { useT } from "@/i18n";
import { useApp } from "@/context/AppContext";

// ---- Step 1: File Read Demo ----
const FILES = [
  { name: "page.tsx", icon: "⚛", content: `export default function Home() {\n  return <main>Hello World</main>;\n}` },
  { name: "styles.css", icon: "🎨", content: `body {\n  background: #0a0a0f;\n  color: #e2e8f0;\n}` },
  { name: "data.json", icon: "📦", content: `{\n  "version": "1.0.0",\n  "name": "hotteokroom"\n}` },
];

function ReadDemo({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState<(typeof FILES)[0] | null>(null);
  const [done, setDone] = useState(false);

  const handleClick = (f: (typeof FILES)[0]) => {
    setSelected(f);
    if (!done) {
      setTimeout(() => { setDone(true); onComplete(); }, 800);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: "#94a3b8" }}>
        📌 <strong style={{ color: "#e2e8f0" }}>지시:</strong> 아래 파일 중 하나를 클릭하세요
      </p>
      <div className="flex gap-3 flex-wrap">
        {FILES.map((f) => (
          <button
            key={f.name}
            onClick={() => handleClick(f)}
            className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200"
            style={{
              background: selected?.name === f.name ? "rgba(124, 58, 237, 0.2)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${selected?.name === f.name ? "#7c3aed" : "rgba(255,255,255,0.1)"}`,
              transform: selected?.name === f.name ? "scale(1.05)" : "scale(1)",
            }}
          >
            <span className="text-3xl">{f.icon}</span>
            <span className="text-xs" style={{ color: "#94a3b8" }}>{f.name}</span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(124,58,237,0.3)" }}>
          <div className="px-4 py-2 flex items-center justify-between text-xs"
            style={{ background: "rgba(124,58,237,0.1)", borderBottom: "1px solid rgba(124,58,237,0.2)" }}>
            <span style={{ color: "#a78bfa" }}>📄 {selected.name}</span>
            <span style={{ color: "#10b981" }}>Read 완료 ✓</span>
          </div>
          <pre className="p-4 text-xs leading-relaxed" style={{ color: "#94a3b8", fontFamily: "monospace" }}>
            {selected.content}
          </pre>
          <div className="px-4 py-2 text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "#475569" }}>
            <span style={{ color: "#7c3aed" }}>Read</span>{"({ file_path: '"}
            <span style={{ color: "#10b981" }}>{selected.name}</span>
            {"' })"}
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Step 2: Grep Demo ----
const CODE_LINES = [
  "import { useState } from 'react';",
  "import { useEffect } from 'react';",
  "export default function App() {",
  "  const [count, setCount] = useState(0);",
  "  useEffect(() => { console.log(count); }, [count]);",
  "  return <div>{count}</div>;",
  "}",
];

function GrepDemo({ onComplete }: { onComplete: () => void }) {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const matches = query
    ? CODE_LINES.filter((l) => l.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleSearch = (val: string) => {
    setQuery(val);
    if (val.length >= 2 && !searched) {
      setSearched(true);
      onComplete();
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: "#94a3b8" }}>
        📌 <strong style={{ color: "#e2e8f0" }}>지시:</strong> 검색창에 단어를 입력하세요 (예: useState, import)
      </p>
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
        style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.3)" }}>
        <span style={{ color: "#06b6d4" }}>🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="검색어 입력..."
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: "#e2e8f0" }}
        />
        {matches.length > 0 && (
          <span className="text-xs" style={{ color: "#06b6d4" }}>{matches.length}개 발견</span>
        )}
      </div>
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
        {CODE_LINES.map((line, i) => {
          const isMatch = query && line.toLowerCase().includes(query.toLowerCase());
          const idx = query ? line.toLowerCase().indexOf(query.toLowerCase()) : -1;
          return (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-1.5 text-xs font-mono transition-all duration-200"
              style={{
                background: isMatch ? "rgba(6,182,212,0.1)" : "transparent",
                borderLeft: isMatch ? "2px solid #06b6d4" : "2px solid transparent",
              }}
            >
              <span style={{ color: "#2d3748", minWidth: "20px" }}>{i + 1}</span>
              <span style={{ color: isMatch ? "#e2e8f0" : "#64748b" }}>
                {isMatch && idx >= 0 ? (
                  <>
                    {line.slice(0, idx)}
                    <span style={{ background: "rgba(6,182,212,0.4)", color: "#e2e8f0", borderRadius: "2px", padding: "0 2px" }}>
                      {line.slice(idx, idx + query.length)}
                    </span>
                    {line.slice(idx + query.length)}
                  </>
                ) : line}
              </span>
            </div>
          );
        })}
      </div>
      {query && (
        <div className="text-xs" style={{ color: "#475569" }}>
          <span style={{ color: "#06b6d4" }}>Grep</span>{"({ pattern: '"}
          <span style={{ color: "#e2e8f0" }}>{query}</span>
          {"', glob: '**/*.tsx' })"}
        </div>
      )}
    </div>
  );
}

// ---- Step 3: Agent Demo ----
type AgentState = "idle" | "running" | "done";
const TASKS = ["파일 탐색", "코드 분석", "문서 검색"];
const TASK_COLORS = ["#10b981", "#3b82f6", "#f59e0b"];

function AgentDemo({ onComplete }: { onComplete: () => void }) {
  const [states, setStates] = useState<AgentState[]>(["idle", "idle", "idle"]);
  const [started, setStarted] = useState(false);

  const runAgents = () => {
    if (started) return;
    setStarted(true);
    setStates(["running", "running", "running"]);
    setTimeout(() => { setStates(["done", "running", "running"]); }, 1000);
    setTimeout(() => { setStates(["done", "done", "running"]); }, 1800);
    setTimeout(() => {
      setStates(["done", "done", "done"]);
      onComplete();
    }, 2600);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: "#94a3b8" }}>
        📌 <strong style={{ color: "#e2e8f0" }}>지시:</strong> 아래 복잡한 작업을 에이전트들에게 분배해보세요
      </p>
      <div className="p-4 rounded-xl" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
        <div className="text-xs mb-1" style={{ color: "#a78bfa" }}>큰 작업</div>
        <div className="text-sm text-white">"이 프로젝트의 모든 컴포넌트를 분석하고 문서화해줘"</div>
      </div>
      <button
        onClick={runAgents}
        disabled={started}
        className="w-full py-2.5 rounded-xl text-sm font-medium transition-all"
        style={{
          background: started ? "rgba(255,255,255,0.05)" : "rgba(167,139,250,0.2)",
          border: `1px solid ${started ? "rgba(255,255,255,0.1)" : "rgba(167,139,250,0.4)"}`,
          color: started ? "#475569" : "#a78bfa",
        }}
      >
        {started ? "에이전트 작동 중..." : "🤖 에이전트들에게 분배하기"}
      </button>
      <div className="grid grid-cols-3 gap-3">
        {TASKS.map((task, i) => (
          <div
            key={task}
            className="p-3 rounded-xl text-center transition-all duration-500"
            style={{
              background: states[i] !== "idle" ? `${TASK_COLORS[i]}12` : "rgba(255,255,255,0.02)",
              border: `1px solid ${states[i] !== "idle" ? TASK_COLORS[i] : "rgba(255,255,255,0.07)"}`,
              opacity: states[i] === "idle" ? 0.4 : 1,
            }}
          >
            <div className="text-xs font-semibold mb-1" style={{ color: TASK_COLORS[i] }}>
              에이전트 {i + 1}
            </div>
            <div className="text-xs mb-2" style={{ color: "#94a3b8" }}>{task}</div>
            <div className="text-xs" style={{ color: TASK_COLORS[i] }}>
              {states[i] === "idle" && "대기"}
              {states[i] === "running" && (
                <span>실행 중<span style={{ animation: "blink 0.8s step-end infinite" }}>█</span></span>
              )}
              {states[i] === "done" && "✓ 완료"}
            </div>
          </div>
        ))}
      </div>
      {states.every((s) => s === "done") && (
        <div className="p-3 rounded-xl text-xs text-center"
          style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981" }}>
          ✓ 모든 에이전트 완료 — 결과가 통합됐어요!
        </div>
      )}
    </div>
  );
}

// ---- Step 4: Edit Demo ----
const ORIGINAL = "const greeting = 'Hello World';";

function EditDemo({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState(ORIGINAL);
  const [saved, setSaved] = useState(false);
  const [edited, setEdited] = useState(false);

  const handleChange = (val: string) => {
    setText(val);
    if (val !== ORIGINAL) setEdited(true);
  };

  const handleSave = () => {
    if (!edited) return;
    setSaved(true);
    onComplete();
  };

  const diff = text !== ORIGINAL;

  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: "#94a3b8" }}>
        📌 <strong style={{ color: "#e2e8f0" }}>지시:</strong> 텍스트를 수정하고 저장 버튼을 눌러보세요
      </p>
      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${diff ? "#f59e0b" : "rgba(255,255,255,0.1)"}` }}>
        <div className="px-4 py-2 text-xs flex items-center justify-between"
          style={{ background: diff ? "rgba(245,158,11,0.08)" : "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ color: "#94a3b8" }}>constants.ts</span>
          {diff && <span style={{ color: "#f59e0b" }}>● 수정됨</span>}
        </div>
        <div className="p-4">
          <textarea
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            rows={3}
            className="w-full bg-transparent outline-none text-sm font-mono resize-none"
            style={{ color: "#e2e8f0" }}
          />
        </div>
      </div>
      {diff && (
        <div className="text-xs p-3 rounded-lg" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", color: "#94a3b8" }}>
          <span style={{ color: "#ef4444" }}>- {ORIGINAL}</span><br />
          <span style={{ color: "#10b981" }}>+ {text}</span>
        </div>
      )}
      <button
        onClick={handleSave}
        disabled={!edited || saved}
        className="w-full py-2.5 rounded-xl text-sm font-medium transition-all"
        style={{
          background: saved ? "rgba(16,185,129,0.2)" : edited ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${saved ? "#10b981" : edited ? "#f59e0b" : "rgba(255,255,255,0.1)"}`,
          color: saved ? "#10b981" : edited ? "#f59e0b" : "#475569",
        }}
      >
        {saved ? "✓ 저장됨 — Edit 도구 실행 완료!" : edited ? "💾 저장하기 (Edit 실행)" : "먼저 텍스트를 수정하세요"}
      </button>
      {saved && (
        <div className="text-xs" style={{ color: "#475569" }}>
          <span style={{ color: "#f59e0b" }}>Edit</span>{"({ old_string: '"}
          <span style={{ color: "#ef4444" }}>{ORIGINAL}</span>
          {"', new_string: '"}
          <span style={{ color: "#10b981" }}>{text}</span>
          {"' })"}
        </div>
      )}
    </div>
  );
}

// ---- Main Component ----
const STEPS = ["read", "search", "agent", "edit"] as const;

export default function BeginnerInteractive() {
  const t = useT();
  const { language } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>([false, false, false, false]);

  const markDone = (idx: number) => {
    setCompleted((c) => { const n = [...c]; n[idx] = true; return n; });
  };

  const stepTitles = [
    t.beginner.steps.read.title,
    t.beginner.steps.search.title,
    t.beginner.steps.agent.title,
    t.beginner.steps.edit.title,
  ];

  const allDone = completed.every(Boolean);

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs"
            style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa" }}>
            {t.beginner.badge}
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">{t.beginner.title}</h2>
          <p className="text-sm" style={{ color: "#64748b" }}>{t.beginner.desc}</p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className="flex items-center gap-2"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                style={{
                  background: completed[i]
                    ? "rgba(16,185,129,0.3)"
                    : currentStep === i
                    ? "rgba(124,58,237,0.3)"
                    : "rgba(255,255,255,0.05)",
                  border: `2px solid ${completed[i] ? "#10b981" : currentStep === i ? "#7c3aed" : "rgba(255,255,255,0.1)"}`,
                  color: completed[i] ? "#10b981" : currentStep === i ? "#a78bfa" : "#475569",
                }}
              >
                {completed[i] ? "✓" : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-8 h-0.5" style={{ background: completed[i] ? "#10b981" : "rgba(255,255,255,0.1)" }} />
              )}
            </button>
          ))}
        </div>

        {/* Step Title */}
        <div className="mb-6 text-center">
          <h3 className="text-xl font-bold text-white">{stepTitles[currentStep]}</h3>
          <div className="text-xs mt-1" style={{ color: "#475569" }}>
            {currentStep + 1} / {STEPS.length}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
          {currentStep === 0 && <ReadDemo onComplete={() => markDone(0)} />}
          {currentStep === 1 && <GrepDemo onComplete={() => markDone(1)} />}
          {currentStep === 2 && <AgentDemo onComplete={() => markDone(2)} />}
          {currentStep === 3 && <EditDemo onComplete={() => markDone(3)} />}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 rounded-xl text-sm transition-all"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: currentStep === 0 ? "#2d3748" : "#94a3b8" }}
          >
            ← 이전
          </button>
          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={() => setCurrentStep((s) => s + 1)}
              className="px-5 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                background: completed[currentStep] ? "rgba(16,185,129,0.2)" : "rgba(124,58,237,0.2)",
                border: `1px solid ${completed[currentStep] ? "#10b981" : "#7c3aed"}`,
                color: completed[currentStep] ? "#10b981" : "#a78bfa",
              }}
            >
              {t.beginner.nextStep}
            </button>
          ) : (
            <button
              onClick={() => { setCurrentStep(0); setCompleted([false, false, false, false]); }}
              className="px-5 py-2 rounded-xl text-sm font-medium"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }}
            >
              {t.beginner.restart}
            </button>
          )}
        </div>

        {allDone && (
          <div className="mt-6 p-4 rounded-xl text-center"
            style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)" }}>
            <div className="text-lg mb-1">🎉</div>
            <div className="text-sm font-semibold" style={{ color: "#10b981" }}>
              {language === "ko" ? "모든 체험 완료! 이제 Claude Code의 핵심 도구를 알게 됐어요." : "All demos complete! You now know Claude Code's core tools."}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
