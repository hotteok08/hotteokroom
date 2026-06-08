export const TOOLS = [
  {
    id: "read", name: "Read", category: "file", color: "#10b981",
    description: "파일 시스템에서 파일을 읽습니다. PDF, 이미지, Jupyter 노트북까지 지원.",
    example: `Read({\n  file_path: "/src/app/page.tsx",\n  limit: 100,\n  offset: 0\n})\n// → 코드, PDF, 이미지, .ipynb 모두 가능`,
  },
  {
    id: "write", name: "Write", category: "file", color: "#3b82f6",
    description: "새 파일을 생성하거나 기존 파일을 완전히 덮어씁니다. 반드시 Read 이후에 사용.",
    example: `Write({\n  file_path: "/src/components/Hero.tsx",\n  content: "export default function Hero() {...}"\n})\n// → 파일 생성/덮어쓰기`,
  },
  {
    id: "edit", name: "Edit", category: "file", color: "#f59e0b",
    description: "파일의 특정 문자열을 찾아 정확하게 교체합니다. diff만 전송하여 효율적.",
    example: `Edit({\n  file_path: "/src/app/page.tsx",\n  old_string: "Hello World",\n  new_string: "Claude Code",\n  replace_all: false\n})`,
  },
  {
    id: "glob", name: "Glob", category: "file", color: "#8b5cf6",
    description: "glob 패턴으로 파일을 검색합니다. 수정 시간 순으로 정렬.",
    example: `Glob({\n  pattern: "src/**/*.tsx",\n  path: "/home/user/project"\n})\n// → ["page.tsx", "layout.tsx", ...]`,
  },
  {
    id: "grep", name: "Grep", category: "search", color: "#06b6d4",
    description: "ripgrep 기반 고성능 정규식 검색. 파일 타입 필터, 컨텍스트 라인 지원.",
    example: `Grep({\n  pattern: "useEffect",\n  glob: "**/*.tsx",\n  output_mode: "content",\n  "-C": 3\n})\n// → 매칭 라인 + 전후 3줄`,
  },
  {
    id: "bash", name: "Bash", category: "execution", color: "#ef4444",
    description: "쉘 명령을 실행합니다. 백그라운드 실행, 타임아웃 설정 가능.",
    example: `Bash({\n  command: "npm run build && npm test",\n  timeout: 60000,\n  run_in_background: false\n})\n// → stdout, stderr, exit code`,
  },
  {
    id: "webfetch", name: "WebFetch", category: "web", color: "#ec4899",
    description: "URL에서 웹 콘텐츠를 가져옵니다. HTML → 마크다운 변환.",
    example: `WebFetch({\n  url: "https://docs.anthropic.com",\n  prompt: "API 엔드포인트 목록을 추출해줘"\n})`,
  },
  {
    id: "websearch", name: "WebSearch", category: "web", color: "#f97316",
    description: "실시간 웹 검색으로 최신 정보를 조회합니다.",
    example: `WebSearch({\n  query: "Next.js 15 새로운 기능",\n})\n// → 최신 검색 결과 반환`,
  },
  {
    id: "agent", name: "Agent", category: "agent", color: "#a78bfa",
    description: "특수화된 서브에이전트를 스폰합니다. 병렬 실행, 독립 컨텍스트.",
    example: `Agent({\n  subagent_type: "Explore",\n  description: "코드베이스 탐색",\n  prompt: "모든 API 엔드포인트를 찾아줘",\n  run_in_background: true\n})`,
  },
  {
    id: "todo", name: "TodoWrite", category: "planning", color: "#34d399",
    description: "작업 목록을 관리합니다. 진행 상황 추적 및 체크리스트 관리.",
    example: `TodoWrite({\n  todos: [\n    { id: "1", content: "Hero 구현", status: "completed" },\n    { id: "2", content: "Agent 섹션", status: "in_progress" },\n    { id: "3", content: "Git 섹션", status: "pending" }\n  ]\n})`,
  },
];

export const MCP_SERVERS = [
  {
    id: "github", name: "GitHub", icon: "⬡", color: "#e2e8f0",
    description: "PR 생성, 이슈 관리, 커밋 조회, 코드 검색, CI/CD",
    tools: ["create_pull_request", "list_commits", "search_code", "add_issue_comment", "merge_pull_request", "actions_list"],
    connected: true,
  },
  {
    id: "supabase", name: "Supabase", icon: "◈", color: "#3ecf8e",
    description: "데이터베이스 관리, SQL 실행, 마이그레이션, Edge Function",
    tools: ["execute_sql", "apply_migration", "list_tables", "create_project", "get_logs"],
    connected: true,
  },
  {
    id: "notion", name: "Notion", icon: "◻", color: "#e2e8f0",
    description: "페이지 생성/수정, 데이터베이스 쿼리, 코멘트 작성",
    tools: ["notion-create-pages", "notion-search", "notion-update-page", "notion-fetch"],
    connected: true,
  },
  {
    id: "canva", name: "Canva", icon: "◉", color: "#7c4ef0",
    description: "디자인 생성/수정, 에셋 관리, 내보내기, AI 디자인 생성",
    tools: ["generate-design", "get-design", "export-design", "create-folder"],
    connected: true,
  },
  {
    id: "gdrive", name: "Google Drive", icon: "▲", color: "#4285f4",
    description: "파일 읽기/쓰기, 검색, 메타데이터 조회",
    tools: ["read_file_content", "search_files", "create_file", "get_file_metadata"],
    connected: true,
  },
  {
    id: "gmail", name: "Gmail", icon: "✉", color: "#ea4335",
    description: "이메일 검색, 쓰레드 관리, 레이블 작업, 드래프트 생성",
    tools: ["search_threads", "get_thread", "list_labels", "create_draft"],
    connected: true,
  },
  {
    id: "slack", name: "Slack", icon: "#", color: "#4a154b",
    description: "메시지 전송, 채널 관리, 워크스페이스 검색",
    tools: ["send_message", "list_channels", "search_messages"],
    connected: false,
  },
  {
    id: "linear", name: "Linear", icon: "◐", color: "#5e6ad2",
    description: "이슈 트래킹, 프로젝트 관리, 스프린트 계획",
    tools: ["create_issue", "list_issues", "update_issue"],
    connected: false,
  },
  {
    id: "figma", name: "Figma", icon: "✦", color: "#f24e1e",
    description: "디자인 파일 조회, 컴포넌트 추출, 코드 생성",
    tools: ["get_file", "get_components", "export_frames"],
    connected: false,
  },
  {
    id: "sentry", name: "Sentry", icon: "⊗", color: "#362d59",
    description: "에러 추적, 이슈 관리, 성능 모니터링",
    tools: ["list_issues", "get_issue", "resolve_issue"],
    connected: false,
  },
  {
    id: "vercel", name: "Vercel", icon: "▽", color: "#e2e8f0",
    description: "배포 관리, 환경 변수, 도메인 설정",
    tools: ["list_deployments", "create_deployment", "get_project"],
    connected: false,
  },
  {
    id: "postgres", name: "PostgreSQL", icon: "🐘", color: "#336791",
    description: "직접 DB 쿼리, 스키마 조회, 마이그레이션",
    tools: ["query", "list_tables", "describe_table"],
    connected: false,
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
