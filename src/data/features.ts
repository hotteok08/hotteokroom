export const TOOLS = [
  {
    id: "read",
    name: "Read",
    category: "file",
    color: "#10b981",
    description: "파일 시스템에서 파일을 읽습니다. PDF, 이미지, Jupyter 노트북까지 지원.",
    example: `// 파일 읽기
Read({
  file_path: "/src/app/page.tsx",
  limit: 100,
  offset: 0
})
// → 코드, PDF, 이미지, .ipynb 모두 가능`,
  },
  {
    id: "write",
    name: "Write",
    category: "file",
    color: "#3b82f6",
    description: "새 파일을 생성하거나 기존 파일을 완전히 덮어씁니다.",
    example: `// 파일 작성
Write({
  file_path: "/src/components/Hero.tsx",
  content: "export default function Hero() {...}"
})
// → 파일 생성/덮어쓰기`,
  },
  {
    id: "edit",
    name: "Edit",
    category: "file",
    color: "#f59e0b",
    description: "파일의 특정 문자열을 찾아 정확하게 교체합니다. diff만 전송하여 효율적.",
    example: `// 정확한 문자열 교체
Edit({
  file_path: "/src/app/page.tsx",
  old_string: "Hello World",
  new_string: "Claude Code",
  replace_all: false
})`,
  },
  {
    id: "glob",
    name: "Glob",
    category: "file",
    color: "#8b5cf6",
    description: "glob 패턴으로 파일을 검색합니다. 수정 시간 순으로 정렬.",
    example: `// 패턴으로 파일 찾기
Glob({
  pattern: "src/**/*.tsx",
  path: "/home/user/project"
})
// → ["page.tsx", "layout.tsx", ...]`,
  },
  {
    id: "grep",
    name: "Grep",
    category: "search",
    color: "#06b6d4",
    description: "ripgrep 기반 고성능 정규식 검색. 파일 타입 필터, 컨텍스트 라인 지원.",
    example: `// 코드 심볼 검색
Grep({
  pattern: "useEffect",
  glob: "**/*.tsx",
  output_mode: "content",
  "-C": 3
})
// → 매칭 라인 + 전후 3줄`,
  },
  {
    id: "bash",
    name: "Bash",
    category: "execution",
    color: "#ef4444",
    description: "쉘 명령을 실행합니다. 백그라운드 실행, 타임아웃 설정 가능.",
    example: `// 쉘 명령 실행
Bash({
  command: "npm run build && npm test",
  timeout: 60000,
  run_in_background: false
})
// → stdout, stderr, exit code`,
  },
  {
    id: "webfetch",
    name: "WebFetch",
    category: "web",
    color: "#ec4899",
    description: "URL에서 웹 콘텐츠를 가져옵니다. HTML → 마크다운 변환.",
    example: `// 웹 페이지 가져오기
WebFetch({
  url: "https://docs.anthropic.com",
  prompt: "API 엔드포인트 목록을 추출해줘"
})`,
  },
  {
    id: "websearch",
    name: "WebSearch",
    category: "web",
    color: "#f97316",
    description: "실시간 웹 검색으로 최신 정보를 조회합니다.",
    example: `// 실시간 검색
WebSearch({
  query: "Next.js 15 새로운 기능",
})
// → 최신 검색 결과 반환`,
  },
  {
    id: "agent",
    name: "Agent",
    category: "agent",
    color: "#a78bfa",
    description: "특수화된 서브에이전트를 스폰합니다. 병렬 실행, 독립 컨텍스트.",
    example: `// 서브에이전트 스폰
Agent({
  subagent_type: "Explore",
  description: "코드베이스 탐색",
  prompt: "모든 API 엔드포인트를 찾아줘",
  run_in_background: true  // 백그라운드 실행
})`,
  },
  {
    id: "task",
    name: "TodoWrite",
    category: "planning",
    color: "#34d399",
    description: "작업 목록을 관리합니다. 진행 상황 추적 및 체크리스트 관리.",
    example: `// 작업 목록 업데이트
TodoWrite({
  todos: [
    { id: "1", content: "Hero 섹션 구현", status: "completed" },
    { id: "2", content: "Agent 섹션 구현", status: "in_progress" },
    { id: "3", content: "Git 섹션 구현", status: "pending" }
  ]
})`,
  },
];

export const MCP_SERVERS = [
  {
    id: "github",
    name: "GitHub MCP",
    icon: "⬡",
    color: "#e2e8f0",
    description: "PR 생성, 이슈 관리, 커밋 조회, 코드 검색",
    tools: ["create_pull_request", "list_commits", "search_code", "add_issue_comment", "merge_pull_request"],
    reallyConnected: true,
  },
  {
    id: "supabase",
    name: "Supabase MCP",
    icon: "◈",
    color: "#3ecf8e",
    description: "데이터베이스 관리, SQL 실행, 마이그레이션, Edge Function",
    tools: ["execute_sql", "apply_migration", "list_tables", "create_project", "get_logs"],
    reallyConnected: true,
  },
  {
    id: "notion",
    name: "Notion MCP",
    icon: "◻",
    color: "#e2e8f0",
    description: "페이지 생성/수정, 데이터베이스 쿼리, 코멘트 작성",
    tools: ["notion-create-pages", "notion-search", "notion-update-page", "notion-fetch"],
    reallyConnected: true,
  },
  {
    id: "canva",
    name: "Canva MCP",
    icon: "◉",
    color: "#7c4ef0",
    description: "디자인 생성/수정, 에셋 관리, 내보내기, AI 디자인 생성",
    tools: ["generate-design", "get-design", "export-design", "create-folder"],
    reallyConnected: true,
  },
  {
    id: "gdrive",
    name: "Google Drive MCP",
    icon: "▲",
    color: "#4285f4",
    description: "파일 읽기/쓰기, 검색, 메타데이터 조회",
    tools: ["read_file_content", "search_files", "create_file", "get_file_metadata"],
    reallyConnected: true,
  },
  {
    id: "gmail",
    name: "Gmail MCP",
    icon: "✉",
    color: "#ea4335",
    description: "이메일 검색, 쓰레드 관리, 레이블 작업, 드래프트 생성",
    tools: ["search_threads", "get_thread", "list_labels", "create_draft"],
    reallyConnected: true,
  },
];

export const SKILLS = [
  { name: "/code-review", color: "#ef4444", desc: "코드 정확성 버그 및 최적화 리뷰" },
  { name: "/security-review", color: "#f59e0b", desc: "보안 취약점 전체 스캔" },
  { name: "/run", color: "#10b981", desc: "앱을 실행하고 동작 확인" },
  { name: "/verify", color: "#3b82f6", desc: "변경 사항이 실제로 작동하는지 검증" },
  { name: "/deep-research", color: "#8b5cf6", desc: "다중 소스 팩트체크 리서치 보고서" },
  { name: "/init", color: "#06b6d4", desc: "CLAUDE.md 코드베이스 문서 초기화" },
  { name: "/review", color: "#ec4899", desc: "PR 전체 리뷰" },
  { name: "/simplify", color: "#34d399", desc: "코드 단순화 및 리팩토링 제안" },
  { name: "/update-config", color: "#f97316", desc: "settings.json 자동화 설정" },
  { name: "/loop", color: "#a78bfa", desc: "반복 실행 및 주기적 작업 설정" },
  { name: "/claude-api", color: "#60a5fa", desc: "Claude API 레퍼런스 문서" },
  { name: "/fewer-permission-prompts", color: "#fbbf24", desc: "허용 목록으로 권한 요청 최소화" },
];

export const AGENT_TYPES = [
  { type: "claude", desc: "범용 에이전트 — 모든 도구 사용 가능", color: "#a78bfa" },
  { type: "Explore", desc: "빠른 읽기 전용 코드 탐색", color: "#06b6d4" },
  { type: "Plan", desc: "구현 계획 설계 전용", color: "#f59e0b" },
  { type: "general-purpose", desc: "복잡한 멀티스텝 리서치", color: "#10b981" },
  { type: "claude-code-guide", desc: "Claude Code / API 질문 전담", color: "#3b82f6" },
  { type: "statusline-setup", desc: "상태바 설정 전문 에이전트", color: "#ec4899" },
];
