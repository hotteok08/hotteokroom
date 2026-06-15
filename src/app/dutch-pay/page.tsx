"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

// ── 타입 ────────────────────────────────────────────────────────────────
interface Participant {
  id: string;
  name: string;
  customAmount: string;
}

type SplitMode = "equal" | "custom";

// ── 로직(계산 함수) ──────────────────────────────────────────────────────

// 균등 분배: 1원 단위 올림, 마지막 1명이 초과분 할인
function calcEqualSplit(total: number, count: number): number[] {
  if (count === 0 || total === 0) return Array(count).fill(0);
  const ceil = Math.ceil(total / count);
  const amounts = Array(count).fill(ceil);
  const excess = ceil * count - total;
  if (excess > 0) amounts[count - 1] = ceil - excess;
  return amounts;
}

// 차등 분배: 각자 입력 금액 그대로 반환
function calcCustomSplit(participants: Participant[]): number[] {
  return participants.map((p) => {
    const v = parseInt(p.customAmount, 10);
    return isNaN(v) ? 0 : v;
  });
}

// 정산 문자 생성
function buildMessage(
  participants: Participant[],
  amounts: number[],
  total: number,
  splitMode: SplitMode,
  accountInfo: string,
  payerName: string
): string {
  if (participants.length === 0 || total === 0) return "";
  const lines: string[] = [
    "정산 안내",
    `총 ${total.toLocaleString()}원 / ${participants.length}명 (${splitMode === "equal" ? "균등" : "차등"})`,
    "─────────────────",
    ...participants.map((p, i) => `• ${p.name} : ${(amounts[i] ?? 0).toLocaleString()}원`),
    "─────────────────",
  ];
  if (payerName) lines.push(`받는 사람: ${payerName}`);
  if (accountInfo) lines.push(`계좌: ${accountInfo}`);
  return lines.join("\n");
}

// ── 메인 컴포넌트 ──────────────────────────────────────────────────────
export default function DutchPayPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [nameInput, setNameInput] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [splitMode, setSplitMode] = useState<SplitMode>("equal");
  const [accountInfo, setAccountInfo] = useState("");
  const [payerName, setPayerName] = useState("");
  const [copied, setCopied] = useState(false);

  // ── 파생 값 계산 ──
  const total = parseInt(totalAmount, 10) || 0;
  const count = participants.length;

  const amounts: number[] =
    splitMode === "equal"
      ? calcEqualSplit(total, count)
      : calcCustomSplit(participants);

  const customTotal =
    splitMode === "custom" ? amounts.reduce((a, b) => a + b, 0) : 0;
  const customDiff = splitMode === "custom" ? total - customTotal : 0;
  const isCustomValid = splitMode === "custom" ? customTotal === total : true;

  const canShowResult =
    count > 0 && total > 0 && (splitMode === "equal" || isCustomValid);

  const message = canShowResult
    ? buildMessage(participants, amounts, total, splitMode, accountInfo, payerName)
    : "";

  // ── 이벤트 핸들러 ──
  const addParticipant = useCallback(() => {
    const name = nameInput.trim();
    if (!name) return;
    setParticipants((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, customAmount: "" },
    ]);
    setNameInput("");
  }, [nameInput]);

  const removeParticipant = useCallback((id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateCustomAmount = useCallback((id: string, value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, customAmount: cleaned } : p))
    );
  }, []);

  const handleTotalInput = (value: string) => {
    setTotalAmount(value.replace(/[^0-9]/g, ""));
  };

  const handleCopy = async () => {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = message;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── 렌더 ──
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="max-w-lg mx-auto px-4 py-8 pb-16">
        {/* 뒤로가기 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs mb-6 transition-colors"
          style={{ color: "var(--text-dim)" }}
        >
          ← 돌아가기
        </Link>

        {/* 헤더 */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-1">더치페이 계산기</h1>
          <p className="text-sm" style={{ color: "var(--text-dim)" }}>
            정산 문자 자동 생성기
          </p>
        </div>

        {/* ─── [1] 총액 입력 ─── */}
        <Section label="총액">
          <div className="flex items-center gap-2">
            <input
              type="text"
              inputMode="numeric"
              value={totalAmount}
              onChange={(e) => handleTotalInput(e.target.value)}
              placeholder="예: 48000"
              className="flex-1 px-3 py-2 rounded-lg text-base outline-none"
              style={inputStyle}
            />
            <span className="text-sm" style={{ color: "var(--text-dim)" }}>
              원
            </span>
          </div>
          {total > 0 && (
            <p className="mt-1 text-xs" style={{ color: "var(--text-dim)" }}>
              {total.toLocaleString()}원
            </p>
          )}
        </Section>

        {/* ─── [2] 참가자 입력 ─── */}
        <Section label="참가자">
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addParticipant()}
              placeholder="이름 입력 후 추가 (Enter)"
              className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
              style={inputStyle}
            />
            <button
              onClick={addParticipant}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: "#7c3aed", color: "white" }}
            >
              추가
            </button>
          </div>

          {participants.length === 0 ? (
            <p
              className="text-xs text-center py-2"
              style={{ color: "var(--text-muted)" }}
            >
              참가자를 추가하세요
            </p>
          ) : (
            <ul className="space-y-2">
              {participants.map((p, i) => (
                <li key={p.id} className="flex items-center gap-2">
                  <span
                    className="text-xs w-5 text-center shrink-0"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm">{p.name}</span>
                  {splitMode === "custom" && (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={p.customAmount}
                        onChange={(e) =>
                          updateCustomAmount(p.id, e.target.value)
                        }
                        placeholder="0"
                        className="w-24 px-2 py-1 rounded-lg text-sm outline-none text-right"
                        style={inputStyle}
                      />
                      <span
                        className="text-xs shrink-0"
                        style={{ color: "var(--text-dim)" }}
                      >
                        원
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => removeParticipant(p.id)}
                    className="text-xs px-2 py-1 rounded shrink-0 transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Section>

        {/* ─── [3] 균등 / 차등 토글 ─── */}
        <div className="mb-6">
          <div
            className="flex rounded-xl overflow-hidden border"
            style={{ borderColor: "var(--border)" }}
          >
            <ToggleBtn
              label="균등 분배"
              active={splitMode === "equal"}
              onClick={() => setSplitMode("equal")}
            />
            <ToggleBtn
              label="차등 분배"
              active={splitMode === "custom"}
              onClick={() => setSplitMode("custom")}
            />
          </div>

          {/* 차등 검증 경고 */}
          {splitMode === "custom" &&
            total > 0 &&
            customTotal > 0 &&
            !isCustomValid && (
              <p className="mt-2 text-xs text-center" style={{ color: "#ef4444" }}>
                {customDiff > 0
                  ? `⚠ ${customDiff.toLocaleString()}원 부족`
                  : `⚠ ${(-customDiff).toLocaleString()}원 초과`}
              </p>
            )}
        </div>

        {/* ─── [4] 계좌 / 받는사람 입력 ─── */}
        <Section label="계좌 정보">
          <input
            type="text"
            value={payerName}
            onChange={(e) => setPayerName(e.target.value)}
            placeholder="받는 사람 이름 (선택)"
            className="w-full px-3 py-2 rounded-lg text-sm outline-none mb-2"
            style={inputStyle}
          />
          <input
            type="text"
            value={accountInfo}
            onChange={(e) => setAccountInfo(e.target.value)}
            placeholder="예: ○○은행 110-****-****"
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={inputStyle}
          />
        </Section>

        {/* ─── [5] 결과 표 ─── */}
        {canShowResult ? (
          <Section label="결과">
            <table className="w-full text-sm">
              <tbody>
                {participants.map((p, i) => (
                  <tr
                    key={p.id}
                    className="border-b last:border-0"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <td className="py-2 pr-4">{p.name}</td>
                    <td className="py-2 text-right font-medium">
                      {(amounts[i] ?? 0).toLocaleString()}원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        ) : count > 0 || total > 0 ? (
          <div
            className="mb-6 p-4 rounded-xl text-center text-sm"
            style={{ color: "var(--text-muted)", border: "1px dashed var(--border)" }}
          >
            {count === 0
              ? "참가자를 추가하세요"
              : total === 0
              ? "총액을 입력하세요"
              : splitMode === "custom" && !isCustomValid
              ? "차등 금액의 합계가 총액과 맞지 않습니다"
              : "정보를 입력하세요"}
          </div>
        ) : null}

        {/* ─── [6] 정산 문자 미리보기 ─── */}
        <Section label="정산 문자 미리보기">
          {message ? (
            <pre
              className="text-sm whitespace-pre-wrap leading-7"
              style={{ color: "var(--text)", fontFamily: "inherit" }}
            >
              {message}
            </pre>
          ) : (
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              정보를 입력하면 문자가 자동 생성됩니다.
            </p>
          )}
        </Section>

        {/* ─── [7] 복사 버튼 ─── */}
        <button
          onClick={handleCopy}
          disabled={!message}
          className="w-full py-3 rounded-xl font-semibold text-sm transition-all"
          style={{
            background: copied ? "#16a34a" : message ? "#7c3aed" : "var(--bg-surface)",
            color: message ? "white" : "var(--text-muted)",
            cursor: message ? "pointer" : "not-allowed",
            border: message ? "none" : "1px solid var(--border)",
          }}
        >
          {copied ? "✓ 복사됨!" : "정산 문자 복사하기"}
        </button>
      </div>
    </div>
  );
}

// ── 공통 컴포넌트 ──────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  background: "var(--bg-surface)",
  border: "1px solid var(--border)",
  color: "var(--text)",
};

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 p-4 rounded-xl card-glass">
      <p
        className="text-xs font-semibold mb-3 uppercase tracking-widest"
        style={{ color: "var(--text-dim)" }}
      >
        {label}
      </p>
      {children}
    </section>
  );
}

function ToggleBtn({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 py-2 text-sm font-medium transition-colors"
      style={{
        background: active ? "#7c3aed" : "var(--bg-surface)",
        color: active ? "white" : "var(--text-dim)",
      }}
    >
      {label}
    </button>
  );
}
