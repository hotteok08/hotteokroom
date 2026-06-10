import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "Claude Code — Feature Showcase",
  description: "Claude Code의 모든 기능을 한눈에 보는 인터랙티브 쇼케이스",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col" style={{ background: "var(--bg)", color: "var(--text)" }}>
        <AppProvider>
          <div className="scanline" />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
