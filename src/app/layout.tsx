import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claude Code — Feature Showcase",
  description: "Claude Code의 모든 기능을 한눈에 보는 인터랙티브 쇼케이스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-[#e2e8f0]">
        <div className="scanline" />
        {children}
      </body>
    </html>
  );
}
