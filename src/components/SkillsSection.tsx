"use client";
import { useState } from "react";
import { SKILLS } from "@/data/features";

const SKILL_DETAILS: Record<string, { usage: string; output: string }> = {
  "/code-review": {
    usage: "/code-review --effort high --comment",
    output: "PR에 인라인 코멘트로 버그/최적화 포인트 게시",
  },
  "/security-review": {
    usage: "/security-review",
    output: "OWASP Top 10, SQL Injection, XSS 등 취약점 전체 스캔",
  },
  "/run": {
    usage: "/run",
    output: "앱 실행 → 브라우저 확인 → 스크린샷 캡처",
  },
  "/verify": {
    usage: "/verify",
    output: "변경 사항이 실제로 작동하는지 앱 레벨에서 검증",
  },
  "/deep-research": {
    usage: "/deep-research Next.js 15 Server Components",
    output: "다중 소스 팬아웃 → 팩트체크 → 인용 포함 리포트",
  },
  "/init": {
    usage: "/init",
    output: "CLAUDE.md 생성 — 코드베이스 구조, 명령어, 컨벤션",
  },
  "/review": {
    usage: "/review",
    output: "현재 PR 전체 코드 리뷰 — 아키텍처 레벨까지",
  },
  "/simplify": {
    usage: "/simplify",
    output: "리팩토링 적용 — 중복 제거, 추상화 단순화",
  },
  "/update-config": {
    usage: "/update-config",
    output: "settings.json 수정 — 훅, 권한, 환경변수 설정",
  },
  "/loop": {
    usage: "/loop 5m /code-review",
    output: "5분마다 코드 리뷰 반복 실행 (폴링 루프)",
  },
  "/claude-api": {
    usage: "/claude-api streaming tool-use",
    output: "Claude API 공식 레퍼런스 — 모델ID, 가격, 파라미터",
  },
  "/fewer-permission-prompts": {
    usage: "/fewer-permission-prompts",
    output: "허용 목록 자동 생성 → 권한 요청 최소화",
  },
};

export default function SkillsSection() {
  const [selected, setSelected] = useState(SKILLS[0]);

  const detail = SKILL_DETAILS[selected.name] || { usage: selected.name, output: selected.desc };

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs"
            style={{ background: "rgba(236, 72, 153, 0.1)", border: "1px solid rgba(236, 72, 153, 0.3)", color: "#ec4899" }}>
            / Skills
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>슬래시 커맨드 (Skills)</h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            특수화된 워크플로우를 <code style={{ color: "#ec4899" }}>/</code>로 시작하는 커맨드로 실행.
            클릭해서 각 스킬의 사용법을 확인하세요.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Skills Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-3">
            {SKILLS.map((skill) => (
              <button
                key={skill.name}
                onClick={() => setSelected(skill)}
                className="p-4 rounded-xl text-left transition-all duration-200"
                style={{
                  background: selected.name === skill.name ? `${skill.color}12` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${selected.name === skill.name ? skill.color : "rgba(255,255,255,0.07)"}`,
                  transform: selected.name === skill.name ? "scale(1.02)" : "scale(1)",
                }}
              >
                <div className="text-sm font-mono font-semibold mb-2" style={{ color: skill.color }}>
                  {skill.name}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{skill.desc}</div>
              </button>
            ))}
          </div>

          {/* Detail Panel */}
          <div className="space-y-4">
            <div className="p-5 rounded-xl"
              style={{ background: "#0d0d1a", border: `1px solid ${selected.color}30` }}>
              <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>// 실행 방법</div>
              <div className="font-mono text-sm" style={{ color: selected.color }}>{detail.usage}</div>
            </div>

            <div className="p-5 rounded-xl"
              style={{ background: "#0d0d1a", border: "1px solid var(--border)" }}>
              <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>// 출력</div>
              <div className="text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>{detail.output}</div>
            </div>

            <div className="p-4 rounded-xl"
              style={{ background: `${selected.color}08`, border: `1px solid ${selected.color}25` }}>
              <div className="text-xs" style={{ color: selected.color }}>
                Skill은 Claude Code CLI의 내장 기능입니다. 시스템 reminder에 등록된 스킬만 호출 가능하며,
                Skill 도구를 통해 메인 대화에서 실행됩니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
