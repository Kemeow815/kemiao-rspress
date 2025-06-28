import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // 监听系统主题变化
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };
    
    // 监听本地存储（用户手动切换）
    const handleStorageChange = () => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) setTheme(savedTheme as "dark" | "light");
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    window.addEventListener("storage", handleStorageChange);
    
    // 初始化：优先本地存储，其次系统设置
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme ? savedTheme as "dark"|"light" : mediaQuery.matches ? "dark" : "light");

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return theme;
}