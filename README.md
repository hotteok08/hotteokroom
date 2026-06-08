# Claude Code Feature Showcase

Claude Code에서 사용할 수 있는 모든 기능을 한눈에 볼 수 있는 인터랙티브 쇼케이스 웹사이트입니다.

## 시작하기

```bash
npm install
npm run dev
```

`http://localhost:3000`에서 확인할 수 있습니다.

## 구현된 섹션

- **Tools** — 10개 built-in 도구 (Read/Write/Edit/Glob/Grep/Bash/WebFetch/WebSearch/Agent/TodoWrite)
- **Agents** — 멀티에이전트 병렬 실행 플로우 다이어그램
- **File Explorer** — 실제 파일 트리 + Grep 인터랙티브 검색
- **MCP Servers** — 연결된 6개 MCP 서버 (GitHub/Supabase/Notion/Canva/GDrive/Gmail) 시각화
- **Git** — 실제 커밋 히스토리 표시 (`/api/commits`)
- **Skills** — 12개 슬래시 커맨드 쇼케이스
- **Plan Mode** — Plan/Execute 단계 + 권한 시스템
- **Terminal** — 인터랙티브 터미널 시뮬레이터

## 기술 스택

- Next.js 16 (App Router)
- Tailwind CSS v4
- TypeScript
