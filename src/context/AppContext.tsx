"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Theme = "dark" | "light";
export type Language = "ko" | "en";
export type Mode = "expert" | "intermediate" | "beginner";
export type AgentPersonality = "nari" | "rex";

interface AppState {
  theme: Theme;
  setTheme: (t: Theme) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  agentPersonality: AgentPersonality;
  setAgentPersonality: (p: AgentPersonality) => void;
}

const AppContext = createContext<AppState>({
  theme: "dark", setTheme: () => {},
  language: "ko", setLanguage: () => {},
  mode: "expert", setMode: () => {},
  agentPersonality: "nari", setAgentPersonality: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [language, setLanguageState] = useState<Language>("ko");
  const [mode, setModeState] = useState<Mode>("expert");
  const [agentPersonality, setPersonalityState] = useState<AgentPersonality>("nari");

  useEffect(() => {
    const t = localStorage.getItem("cc-theme") as Theme | null;
    const l = localStorage.getItem("cc-lang") as Language | null;
    const m = localStorage.getItem("cc-mode") as Mode | null;
    const a = localStorage.getItem("cc-agent") as AgentPersonality | null;
    if (t) { setThemeState(t); document.documentElement.setAttribute("data-theme", t); }
    if (l) setLanguageState(l);
    if (m) setModeState(m);
    if (a) setPersonalityState(a);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("cc-theme", t);
    document.documentElement.setAttribute("data-theme", t);
  };
  const setLanguage = (l: Language) => { setLanguageState(l); localStorage.setItem("cc-lang", l); };
  const setMode = (m: Mode) => { setModeState(m); localStorage.setItem("cc-mode", m); };
  const setAgentPersonality = (p: AgentPersonality) => { setPersonalityState(p); localStorage.setItem("cc-agent", p); };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <AppContext.Provider value={{ theme, setTheme, language, setLanguage, mode, setMode, agentPersonality, setAgentPersonality }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
