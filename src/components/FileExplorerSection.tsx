"use client";
import { useState } from "react";

interface FileNode {
  name: string;
  type: "dir" | "file";
  color?: string;
  children?: FileNode[];
  content?: string;
}

const FILE_TREE: FileNode[] = [
  {
    name: "src", type: "dir", children: [
      {
        name: "app", type: "dir", children: [
          { name: "page.tsx", type: "file", color: "#60a5fa", content: `import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ToolsSection from "@/components/ToolsSection";
// ... more sections

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ToolsSection />
      <AgentsSection />
      <MCPSection />
      <GitSection />
      <SkillsSection />
      <PlanModeSection />
      <TerminalSection />
    </main>
  );
}` },
          { name: "layout.tsx", type: "file", color: "#60a5fa", content: `export const metadata = {
  title: "Claude Code — Feature Showcase",
  description: "Claude Code 모든 기능 쇼케이스",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}` },
          {
            name: "api", type: "dir", children: [
              { name: "commits/route.ts", type: "file", color: "#34d399", content: `import { execSync } from "child_process";

export async function GET() {
  const raw = execSync('git log --pretty=format:"%H|%s|%an|%ar" -20');
  const commits = raw.toString().split("\\n").map(line => {
    const [hash, subject, author, rel] = line.split("|");
    return { hash: hash?.slice(0, 7), subject, author, rel };
  });
  return Response.json({ commits });
}` },
            ]
          },
        ]
      },
      {
        name: "components", type: "dir", children: [
          { name: "Hero.tsx", type: "file", color: "#a78bfa", content: "타이핑 애니메이션 히어로 섹션" },
          { name: "ToolsSection.tsx", type: "file", color: "#a78bfa", content: "10개 도구 인터랙티브 뷰어" },
          { name: "AgentsSection.tsx", type: "file", color: "#a78bfa", content: "멀티에이전트 플로우 다이어그램" },
          { name: "MCPSection.tsx", type: "file", color: "#a78bfa", content: "6개 MCP 서버 시각화" },
          { name: "GitSection.tsx", type: "file", color: "#a78bfa", content: "실제 커밋 히스토리 + Git 기능" },
          { name: "SkillsSection.tsx", type: "file", color: "#a78bfa", content: "12개 슬래시 커맨드 쇼케이스" },
          { name: "TerminalSection.tsx", type: "file", color: "#a78bfa", content: "인터랙티브 터미널 시뮬레이터" },
        ]
      },
      {
        name: "data", type: "dir", children: [
          { name: "features.ts", type: "file", color: "#f59e0b", content: "TOOLS, MCP_SERVERS, SKILLS, AGENT_TYPES 데이터" },
        ]
      },
    ]
  },
  { name: "package.json", type: "file", color: "#10b981", content: '{"next": "^16.2.7", "react": "^19.0.0", "framer-motion": "^11.x"}' },
  { name: "tailwind.config.ts", type: "file", color: "#06b6d4", content: "Tailwind CSS 설정" },
  { name: "tsconfig.json", type: "file", color: "#3b82f6", content: "TypeScript 설정" },
];

function TreeNode({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);
  const [selected, setSelected] = useState(false);

  if (node.type === "dir") {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left flex items-center gap-2 px-2 py-1 rounded text-xs hover:bg-white/5 transition-colors"
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          <span style={{ color: "#f59e0b" }}>{open ? "▾" : "▸"}</span>
          <span style={{ color: "#e2e8f0" }}>{node.name}/</span>
        </button>
        {open && node.children?.map((child) => (
          <TreeNode key={child.name} node={child} depth={depth + 1} />
        ))}
      </div>
    );
  }

  return (
    <button
      onClick={() => setSelected(!selected)}
      className="w-full text-left flex items-center gap-2 px-2 py-1 rounded text-xs transition-colors"
      style={{
        paddingLeft: `${depth * 16 + 8}px`,
        background: selected ? "rgba(124, 58, 237, 0.15)" : "transparent",
      }}
      onMouseEnter={(e) => {
        if (!selected) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
      }}
      onMouseLeave={(e) => {
        if (!selected) (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      <span>📄</span>
      <span style={{ color: node.color || "#94a3b8" }}>{node.name}</span>
    </button>
  );
}

export default function FileExplorerSection() {
  const [grepQuery, setGrepQuery] = useState("useState");
  const [grepResults] = useState([
    { file: "src/components/Hero.tsx", line: 4, match: "  const [cmdIndex, setCmdIndex] = useState(0);" },
    { file: "src/components/ToolsSection.tsx", line: 7, match: "  const [selected, setSelected] = useState(TOOLS[0]);" },
    { file: "src/components/AgentsSection.tsx", line: 19, match: "  const [step, setStep] = useState(0);" },
    { file: "src/components/TerminalSection.tsx", line: 44, match: '  const [input, setInput] = useState("");' },
  ]);

  return (
    <section className="py-24 px-6" style={{ background: "rgba(0,0,0,0.15)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs"
            style={{ background: "rgba(6, 182, 212, 0.1)", border: "1px solid rgba(6, 182, 212, 0.3)", color: "#06b6d4" }}>
            ⌕ File Explorer
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>파일 탐색 & 검색</h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Glob으로 파일 트리 탐색, Grep으로 코드 심볼 검색. 아래는 이 사이트의 실제 구조입니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* File Tree */}
          <div className="rounded-xl overflow-hidden"
            style={{ background: "#0d0d1a", border: "1px solid var(--border)" }}>
            <div className="px-4 py-3 flex items-center justify-between"
              style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>파일 트리 (Glob: src/**/*)</span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>hotteokroom/</span>
            </div>
            <div className="p-2 overflow-auto max-h-96">
              {FILE_TREE.map((node) => (
                <TreeNode key={node.name} node={node} />
              ))}
            </div>
          </div>

          {/* Grep */}
          <div>
            <div className="rounded-xl overflow-hidden mb-4"
              style={{ background: "#0d0d1a", border: "1px solid rgba(6, 182, 212, 0.3)" }}>
              <div className="px-4 py-3"
                style={{ borderBottom: "1px solid rgba(6, 182, 212, 0.15)" }}>
                <span className="text-xs font-semibold" style={{ color: "#06b6d4" }}>Grep 검색</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>pattern:</span>
                  <input
                    type="text"
                    value={grepQuery}
                    onChange={(e) => setGrepQuery(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-xs font-mono"
                    style={{ color: "#06b6d4" }}
                  />
                </div>

                <div className="space-y-2">
                  {grepResults
                    .filter((r) => r.match.includes(grepQuery) || grepQuery === "")
                    .map((result, i) => (
                      <div key={i} className="p-3 rounded-lg"
                        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs" style={{ color: "#06b6d4" }}>{result.file}</span>
                          <span className="text-xs" style={{ color: "var(--text-muted)" }}>:{result.line}</span>
                        </div>
                        <div className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
                          {result.match.split(grepQuery).map((part, j, arr) => (
                            <span key={j}>
                              {part}
                              {j < arr.length - 1 && (
                                <span style={{ background: "rgba(6,182,212,0.3)", color: "#e2e8f0" }}>
                                  {grepQuery}
                                </span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { tool: "Glob", desc: "패턴: src/**/*.tsx", color: "#8b5cf6" },
                { tool: "Grep", desc: "ripgrep 기반 검색", color: "#06b6d4" },
              ].map((item) => (
                <div key={item.tool} className="p-4 rounded-xl"
                  style={{ background: "var(--bg-card)", border: `1px solid ${item.color}25` }}>
                  <div className="text-sm font-semibold mb-1" style={{ color: item.color }}>{item.tool}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
