import { NextResponse } from "next/server";
import { execSync } from "child_process";

const FALLBACK_COMMITS = [
  { hash: "9423cb0", subject: "fix: QA 종합 수정 — 라이트모드 대응/모드 가시성/드롭다운 외부 클릭 닫기", author: "claude", rel: "1 day ago", date: "2026-06-10" },
  { hash: "4eb19c8", subject: "feat: 로봇 캐릭터/다중모드/라이트테마/언어설정/에이전트봇 추가", author: "claude", rel: "2 days ago", date: "2026-06-09" },
  { hash: "9fa7950", subject: "docs: README를 프로젝트에 맞게 업데이트", author: "claude", rel: "3 days ago", date: "2026-06-08" },
  { hash: "55d391e", subject: "feat: Claude Code Feature Showcase 웹사이트 구현", author: "claude", rel: "3 days ago", date: "2026-06-08" },
  { hash: "4725783", subject: "Initial commit", author: "hotteok08", rel: "4 days ago", date: "2026-06-07" },
];

export async function GET() {
  try {
    const raw = execSync(
      'git log --pretty=format:"%H|%s|%an|%ar|%ad" --date=short -20',
      { cwd: process.cwd(), timeout: 3000 }
    ).toString();

    const commits = raw
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [hash, subject, author, rel, date] = line.split("|");
        return { hash: hash?.slice(0, 7), subject, author, rel, date };
      });

    return NextResponse.json({ commits: commits.length > 0 ? commits : FALLBACK_COMMITS });
  } catch {
    return NextResponse.json({ commits: FALLBACK_COMMITS });
  }
}
