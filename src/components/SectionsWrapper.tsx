"use client";
import { useApp } from "@/context/AppContext";
import type { ReactNode } from "react";

export default function SectionsWrapper({ children }: { children: ReactNode }) {
  const { mode } = useApp();
  if (mode === "beginner") return null;
  return <>{children}</>;
}
