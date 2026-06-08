import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ToolsSection from "@/components/ToolsSection";
import AgentsSection from "@/components/AgentsSection";
import MCPSection from "@/components/MCPSection";
import GitSection from "@/components/GitSection";
import SkillsSection from "@/components/SkillsSection";
import PlanModeSection from "@/components/PlanModeSection";
import TerminalSection from "@/components/TerminalSection";
import FileExplorerSection from "@/components/FileExplorerSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <ToolsSection />
      <AgentsSection />
      <FileExplorerSection />
      <MCPSection />
      <GitSection />
      <SkillsSection />
      <PlanModeSection />
      <TerminalSection />
      <Footer />
    </main>
  );
}
