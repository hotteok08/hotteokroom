"use client";
import { useApp } from "@/context/AppContext";
import BeginnerInteractive from "./BeginnerInteractive";

export default function ModeAwareContent() {
  const { mode } = useApp();

  if (mode === "beginner" || mode === "intermediate") {
    return (
      <div>
        <BeginnerInteractive />
        {mode === "intermediate" && (
          <div className="py-8 px-6">
            <div className="max-w-3xl mx-auto p-4 rounded-xl text-xs text-center"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", color: "#3b82f6" }}>
              💡 중급자 모드 — 아래 전문가 섹션도 함께 확인하세요
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
