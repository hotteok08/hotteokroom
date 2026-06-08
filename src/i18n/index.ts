import { ko, en } from "./translations";
import { useApp } from "@/context/AppContext";

export function useT() {
  const { language } = useApp();
  return language === "en" ? en : ko;
}
