import { NextResponse } from "next/server";
import { execSync } from "child_process";

export async function GET() {
  try {
    const raw = execSync(
      'git log --pretty=format:"%H|%s|%an|%ar|%ad" --date=short -20',
      { cwd: process.cwd() }
    ).toString();

    const commits = raw
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [hash, subject, author, rel, date] = line.split("|");
        return { hash: hash?.slice(0, 7), subject, author, rel, date };
      });

    return NextResponse.json({ commits });
  } catch {
    return NextResponse.json({ commits: [] });
  }
}
