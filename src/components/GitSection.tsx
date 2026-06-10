"use client";
import { useEffect, useState } from "react";

interface Commit {
  hash: string;
  subject: string;
  author: string;
  rel: string;
  date: string;
}

const GIT_FEATURES = [
  { icon: "⎇", label: "브랜치 관리", desc: "create_branch, list_branches", color: "#10b981" },
  { icon: "↑", label: "Push & PR", desc: "push_files, create_pull_request", color: "#3b82f6" },
  { icon: "◎", label: "커밋 조회", desc: "list_commits, get_commit", color: "#f59e0b" },
  { icon: "⌕", label: "코드 검색", desc: "search_code, search_commits", color: "#a78bfa" },
  { icon: "⚡", label: "CI/CD", desc: "actions_list, actions_run_trigger", color: "#ef4444" },
  { icon: "💬", label: "PR 리뷰", desc: "pull_request_review_write, add_issue_comment", color: "#06b6d4" },
];

export default function GitSection() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/commits")
      .then((r) => r.json())
      .then((d) => {
        setCommits(d.commits || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="git" className="py-24 px-6" style={{ background: "rgba(0,0,0,0.2)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs"
            style={{ background: "rgba(59, 130, 246, 0.1)", border: "1px solid rgba(59, 130, 246, 0.3)", color: "#3b82f6" }}>
            ⬡ Git Integration
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>Git & GitHub 통합</h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            GitHub MCP 서버를 통한 완전한 Git 워크플로우. 아래 커밋은 이 레포의 실제 히스토리입니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Real Commit Log */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full" style={{ background: "#10b981" }} />
              <h3 className="text-sm font-semibold" style={{ color: "var(--text)" }}>실제 커밋 히스토리</h3>
              <span className="text-xs px-2 py-0.5 rounded"
                style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}>
                hotteok08/hotteokroom
              </span>
            </div>

            <div className="space-y-2">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 rounded-xl animate-pulse"
                    style={{ background: "var(--bg-card)" }} />
                ))
              ) : commits.length === 0 ? (
                <div className="p-6 rounded-xl text-center"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>커밋 정보를 불러오는 중...</div>
                </div>
              ) : (
                commits.slice(0, 8).map((commit, i) => (
                  <div key={commit.hash} className="p-4 rounded-xl transition-all"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)", animationDelay: `${i * 0.05}s` }}>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded flex items-center justify-center text-xs shrink-0 mt-0.5 font-mono"
                        style={{ background: "rgba(59, 130, 246, 0.15)", color: "#3b82f6" }}>
                        {commit.hash.slice(0, 3)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs truncate" style={{ color: "var(--text)" }}>{commit.subject}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs" style={{ color: "var(--text-muted)" }}>{commit.author}</span>
                          <span style={{ color: "var(--text-faint)" }}>·</span>
                          <span className="text-xs" style={{ color: "var(--text-muted)" }}>{commit.rel}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono shrink-0" style={{ color: "var(--text-muted)" }}>{commit.hash}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Git Features */}
          <div>
            <h3 className="text-sm font-semibold mb-6" style={{ color: "var(--text)" }}>GitHub MCP 기능</h3>
            <div className="grid grid-cols-2 gap-3">
              {GIT_FEATURES.map((feat) => (
                <div key={feat.label} className="p-4 rounded-xl"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="text-xl mb-2">{feat.icon}</div>
                  <div className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>{feat.label}</div>
                  <div className="text-xs font-mono" style={{ color: feat.color }}>{feat.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl"
              style={{ background: "rgba(59, 130, 246, 0.06)", border: "1px solid rgba(59, 130, 246, 0.2)" }}>
              <div className="text-xs font-semibold mb-3" style={{ color: "#3b82f6" }}>Git Safety Protocol</div>
              <ul className="space-y-1.5 text-xs" style={{ color: "var(--text-dim)" }}>
                <li>• force push 전 항상 사용자 확인</li>
                <li>• --no-verify 금지 (훅 우회 차단)</li>
                <li>• 새 커밋 우선 (amend 최소화)</li>
                <li>• 민감한 파일 (.env) 커밋 거부</li>
                <li>• PR 생성 후 자동으로 draft 설정</li>
              </ul>
            </div>

            <div className="mt-4 p-4 rounded-xl"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                <span style={{ color: "var(--text-dim)" }}>$ </span>
                <span style={{ color: "#10b981" }}>git push</span>
                <span style={{ color: "var(--text-dim)" }}> -u origin claude/api-showcase-website-T4CEq</span>
              </div>
              <div className="mt-2 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                <span style={{ color: "var(--text-dim)" }}>→ </span>
                <span style={{ color: "#a78bfa" }}>PR 자동 생성 (draft)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
