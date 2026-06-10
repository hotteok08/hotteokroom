"use client";
import { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { useT } from "@/i18n";
import RobotLogo from "./RobotLogo";

interface Message {
  from: "user" | "bot";
  text: string;
}

const NARI_QA: Array<{ kw: string[]; ko: string; en: string }> = [
  {
    kw: ["read", "파일", "읽", "file"],
    ko: "Read 도구는 파일을 펼쳐서 보는 거야! 📖 마치 책을 펼치는 것처럼 Claude Code가 파일 내용을 읽어줘. 이미지, PDF, Jupyter 노트북도 읽을 수 있어~",
    en: "Read is like opening a book! 📖 Claude Code reads file contents — images, PDFs, and Jupyter notebooks too!",
  },
  {
    kw: ["write", "쓰", "작성", "만들"],
    ko: "Write 도구는 새 파일을 만들거나 전체를 새로 쓰는 거야! ✍️ 빈 종이에 글을 쓰는 것처럼 생각하면 돼!",
    en: "Write creates new files or rewrites them completely! ✍️ Think of it like writing on a blank page!",
  },
  {
    kw: ["edit", "수정", "바꾸", "변경", "고치"],
    ko: "Edit 도구는 파일의 특정 부분만 정확하게 바꾸는 거야! ✏️ 책에서 딱 한 문장만 고치는 것처럼!",
    en: "Edit precisely replaces specific text in a file! ✏️ Like fixing just one sentence in a book!",
  },
  {
    kw: ["grep", "검색", "찾", "search"],
    ko: "Grep은 코드에서 원하는 단어를 찾아주는 탐정 도구야! 🔍 엄청 빠른 ripgrep을 써서 대규모 코드베이스도 순식간에 검색해줘!",
    en: "Grep is like a detective finding words in code! 🔍 Uses super-fast ripgrep to search entire codebases instantly!",
  },
  {
    kw: ["agent", "에이전트", "서브에이전트"],
    ko: "에이전트는 Claude Code의 똑똑한 조수들이야! 🤝 복잡한 일을 여러 조수에게 나눠서 동시에 해결해줘. 각자 독립적으로 일을 해서 훨씬 빠르고 효율적이야!",
    en: "Agents are Claude Code's smart helpers! 🤝 They split complex work and handle it simultaneously — each with their own isolated context!",
  },
  {
    kw: ["mcp", "서버", "연동", "server"],
    ko: "MCP는 Claude Code에 외부 앱을 연결하는 마법 다리야! 🌉 GitHub, Notion, Supabase 같은 서비스를 바로 Claude Code에서 쓸 수 있게 해줘!",
    en: "MCP is a magic bridge connecting external apps to Claude Code! 🌉 Use GitHub, Notion, Supabase and more directly from Claude Code!",
  },
  {
    kw: ["bash", "터미널", "명령", "command", "shell"],
    ko: "Bash 도구는 실제 터미널에서 명령어를 실행해주는 거야! 💻 npm install, git push 같은 명령을 Claude Code가 직접 실행해줘!",
    en: "Bash runs actual terminal commands! 💻 npm install, git push — Claude Code executes them directly!",
  },
  {
    kw: ["git", "커밋", "push", "pr", "pull request"],
    ko: "Git 통합은 완전 강력해! ⎇ 커밋, 브랜치, PR 생성까지 Claude Code가 GitHub MCP를 통해 다 해줘!",
    en: "Git integration is super powerful! ⎇ Commits, branches, PR creation — all via GitHub MCP!",
  },
  {
    kw: ["skill", "스킬", "슬래시", "/"],
    ko: "슬래시 커맨드는 특별 능력이야! ⚡ /code-review, /security-review 같은 걸로 한 번에 강력한 작업을 실행할 수 있어!",
    en: "Slash commands are special powers! ⚡ /code-review, /security-review — trigger powerful workflows instantly!",
  },
  {
    kw: ["plan", "모드", "계획"],
    ko: "Plan Mode는 '먼저 계획하고, 그다음 실행'이야! 📋 코드를 바꾸기 전에 전략을 세우고 사용자한테 확인받는 방식이야. 실수를 줄일 수 있어!",
    en: "Plan Mode is 'plan first, execute later'! 📋 Design the strategy, get approval, then make changes. Reduces mistakes!",
  },
  {
    kw: ["안녕", "hello", "hi", "반가"],
    ko: "안녕! 😊 나는 나리야~ Claude Code의 모든 기능을 알기 쉽게 설명해줄게! 궁금한 게 있으면 뭐든 물어봐!",
    en: "Hello! 😊 I'm Nari! I'll explain all Claude Code features in a friendly way! Ask me anything!",
  },
];

const REX_QA: Array<{ kw: string[]; ko: string; en: string }> = [
  {
    kw: ["read", "파일", "읽", "file"],
    ko: "Read: 지정 경로 파일 파싱. 기본 2000줄, limit/offset 파라미터로 범위 지정. PDF/이미지/ipynb 지원. 미존재 파일 읽기 시 에러 반환.",
    en: "Read: Parses file at path. Default 2000 lines, limit/offset params available. Supports PDF/images/ipynb. Returns error for nonexistent files.",
  },
  {
    kw: ["write", "쓰", "작성", "만들"],
    ko: "Write: 파일 생성/완전 덮어쓰기. 반드시 Read 먼저 호출 후 사용. 기존 파일 수정에는 Edit 권장 — diff만 전송해 효율적.",
    en: "Write: Creates/overwrites files. Must Read first. Prefer Edit for modifications — sends only the diff.",
  },
  {
    kw: ["edit", "수정", "바꾸", "변경", "고치"],
    ko: "Edit: old_string → new_string 정확 교체. old_string 비유니크 시 실패. replace_all로 전체 치환 가능. diff만 전송.",
    en: "Edit: Exact old_string → new_string replacement. Fails if old_string is not unique. replace_all for global replace. Sends only diff.",
  },
  {
    kw: ["grep", "검색", "찾", "search"],
    ko: "Grep: ripgrep 기반. regex 완전 지원. glob/type 필터, -A/-B/-C 컨텍스트. output_mode: content|files_with_matches|count. 기본 250결과 제한.",
    en: "Grep: ripgrep backend. Full regex support. glob/type filter, -A/-B/-C context lines. output_mode: content|files_with_matches|count. Default 250 results.",
  },
  {
    kw: ["agent", "에이전트", "서브에이전트"],
    ko: "Agent: 독립 컨텍스트 서브에이전트 스폰. subagent_type 지정 필수. run_in_background: true로 비동기. isolation: 'worktree'로 git 격리. 병렬 호출 시 단일 메시지에 여러 Agent 블록.",
    en: "Agent: Spawns sub-agent with isolated context. subagent_type required. run_in_background for async. isolation:'worktree' for git safety. Parallel calls in single message block.",
  },
  {
    kw: ["mcp", "서버", "연동", "server"],
    ko: "MCP: Model Context Protocol. 도구 호출형식 mcp__<server>__<tool>(). ToolSearch로 스키마 로드 필수. 서버 미연결 시 tool 없음.",
    en: "MCP: Model Context Protocol. Tool format: mcp__<server>__<tool>(). Must load schema via ToolSearch. Tool unavailable if server disconnected.",
  },
  {
    kw: ["bash", "터미널", "명령", "command", "shell"],
    ko: "Bash: 쉘 실행. 최대 timeout 600000ms. run_in_background로 비동기. 상태 비지속 (cd 효과 없음). Glob/Grep/Read 등 전용 도구 우선 사용.",
    en: "Bash: Shell execution. Max timeout 600000ms. run_in_background for async. State non-persistent (cd has no effect). Prefer dedicated tools over Bash.",
  },
  {
    kw: ["git", "커밋", "push", "pr", "pull request"],
    ko: "Git: Safety protocol — force push/reset --hard 전 명시적 허가 필수. --no-verify 금지. amend 대신 신규 커밋. 민감파일(.env) 커밋 거부. PR은 draft로 생성.",
    en: "Git: Safety protocol — explicit permission for force push/reset --hard. No --no-verify. New commit over amend. Block sensitive files. PR as draft.",
  },
  {
    kw: ["skill", "스킬", "슬래시", "/"],
    ko: "Skill: system-reminder에 등록된 것만 호출 가능. Skill({ skill: 'name', args: '...' }) 형식. 메인 대화에서 실행. 목록에 없는 스킬 추측 금지.",
    en: "Skill: Only invokable if listed in system-reminder. Format: Skill({ skill:'name', args:'...' }). Runs in main conversation. Never guess unlisted skills.",
  },
  {
    kw: ["plan", "모드", "계획"],
    ko: "Plan Mode: ExitPlanMode() 호출로 진입. Plan 중 코드변경 불가. AskUserQuestion으로 선택지 제공. ExitPlanMode 후 실행 전환.",
    en: "Plan Mode: Enter via ExitPlanMode(). No code changes during plan. Use AskUserQuestion for options. ExitPlanMode to switch to execution.",
  },
  {
    kw: ["안녕", "hello", "hi", "반가"],
    ko: "Claude Code 기술 질문만 받는다. 구체적으로 물어봐.",
    en: "Technical Claude Code questions only. Be specific.",
  },
];

function getResponse(
  input: string,
  personality: "nari" | "rex",
  language: "ko" | "en"
): string {
  const lower = input.toLowerCase();
  const qa = personality === "nari" ? NARI_QA : REX_QA;
  const match = qa.find((q) => q.kw.some((k) => lower.includes(k)));
  if (match) return language === "en" ? match.en : match.ko;

  if (personality === "nari") {
    return language === "en"
      ? "Hmm, I'm not sure about that! 🤔 Try asking about: Read, Write, Edit, Grep, Agent, MCP, Bash, Git, Skills, or Plan Mode!"
      : "음.. 그건 잘 모르겠어~ 🤔 이런 걸 물어봐봐: Read, Write, Edit, Grep, Agent, MCP, Bash, Git, Skills, Plan Mode!";
  } else {
    return language === "en"
      ? "Unknown topic. Ask about: Read/Write/Edit/Grep/Bash/Agent/MCP/Git/Skill/Plan."
      : "해당 주제 없음. Read/Write/Edit/Grep/Bash/Agent/MCP/Git/Skill/Plan 중 질문.";
  }
}

export default function AgentBot() {
  const { agentPersonality, setAgentPersonality, language } = useApp();
  const t = useT();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [hasOpened, setHasOpened] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const isNari = agentPersonality === "nari";
  const accentColor = isNari ? "#10b981" : "#ef4444";
  const botName = isNari ? t.agentBot.nariName : t.agentBot.rexName;

  useEffect(() => {
    if (open && !hasOpened) {
      setHasOpened(true);
      setTimeout(() => {
        setMessages([{
          from: "bot",
          text: isNari ? t.agentBot.nariWelcome : t.agentBot.rexWelcome,
        }]);
      }, 300);
    }
  }, [open, hasOpened, isNari, t]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [...m, { from: "user", text: userMsg }]);
    setTimeout(() => {
      setMessages((m) => [...m, {
        from: "bot",
        text: getResponse(userMsg, agentPersonality, language),
      }]);
    }, 400 + Math.random() * 300);
  };

  const switchPersonality = () => {
    const next: "nari" | "rex" = isNari ? "rex" : "nari";
    setAgentPersonality(next);
    const newWelcome = next === "nari" ? t.agentBot.nariWelcome : t.agentBot.rexWelcome;
    setMessages([{ from: "bot", text: newWelcome }]);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 rounded-full p-1 transition-all duration-300"
        style={{
          boxShadow: `0 0 24px ${accentColor}66`,
          transform: open ? "scale(0.9)" : "scale(1)",
        }}
        title={`${botName} — Claude Code Assistant`}
      >
        <RobotLogo color={accentColor} size={56} animate={!open} />
      </button>

      {/* Chat Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "var(--bg-surface, #0d0d1a)",
            border: `1px solid ${accentColor}40`,
            boxShadow: `0 0 40px ${accentColor}22`,
            maxHeight: "480px",
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ borderBottom: `1px solid ${accentColor}25` }}
          >
            <div className="flex items-center gap-3">
              <RobotLogo color={accentColor} size={32} />
              <div>
                <div className="text-sm font-semibold text-white">{botName}</div>
                <div className="text-xs" style={{ color: accentColor }}>
                  {isNari
                    ? (language === "ko" ? "친절 모드" : "Friendly Mode")
                    : (language === "ko" ? "전문가 모드" : "Expert Mode")}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={switchPersonality}
                className="p-1.5 rounded-lg text-xs transition-all"
                style={{ background: `${accentColor}18`, color: accentColor }}
                title={t.agentBot.hint}
              >
                {isNari ? "→렉스" : "→나리"}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-3" style={{ minHeight: "240px" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed"
                  style={
                    msg.from === "user"
                      ? { background: `${accentColor}22`, color: "#e2e8f0", border: `1px solid ${accentColor}30` }
                      : { background: "var(--bg-card)", color: "var(--text-dim)", border: "1px solid var(--border)" }
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3" style={{ borderTop: `1px solid ${accentColor}15` }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={t.agentBot.placeholder}
                className="flex-1 px-3 py-2 rounded-lg text-xs outline-none"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "#e2e8f0" }}
              />
              <button
                onClick={handleSend}
                className="px-3 py-2 rounded-lg text-xs font-medium transition-all"
                style={{ background: `${accentColor}22`, color: accentColor, border: `1px solid ${accentColor}40` }}
              >
                ↵
              </button>
            </div>
            <div className="mt-2 text-center text-xs" style={{ color: "var(--text-faint)" }}>
              {t.agentBot.hint}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
