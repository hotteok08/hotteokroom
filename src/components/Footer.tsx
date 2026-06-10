export default function Footer() {
  return (
    <footer className="py-16 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
                C
              </div>
              <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>Claude Code</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Anthropic의 공식 CLI. 터미널과 IDE에서 코드를 작성하고, 분석하고, 실행하는 AI 에이전트.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold mb-4" style={{ color: "var(--text)" }}>이 사이트에서 사용된 기능</div>
            <ul className="space-y-2 text-xs" style={{ color: "var(--text-muted)" }}>
              <li>• Read / Write / Edit — 파일 생성 및 수정</li>
              <li>• Glob / Grep — 파일 탐색 및 검색</li>
              <li>• Bash — npm, git 명령 실행</li>
              <li>• GitHub MCP — PR 생성, 커밋 조회</li>
              <li>• Agent — 병렬 에이전트 활용</li>
              <li>• TodoWrite — 작업 목록 관리</li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold mb-4" style={{ color: "var(--text)" }}>연결된 MCP 서버</div>
            <ul className="space-y-2 text-xs" style={{ color: "var(--text-muted)" }}>
              <li>⬡ GitHub — PR, 이슈, 코드 검색</li>
              <li>◈ Supabase — 데이터베이스</li>
              <li>◻ Notion — 문서 관리</li>
              <li>◉ Canva — 디자인 생성</li>
              <li>▲ Google Drive — 파일 저장</li>
              <li>✉ Gmail — 이메일</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="text-xs" style={{ color: "var(--text-faint)" }}>
            Built with Claude Code · hotteok08/hotteokroom
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10b981" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              claude/api-showcase-website-T4CEq
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
