import React, { useEffect, useRef } from "react";

export default function Giscus() {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme(); // 从主题钩子获取当前主题值（深色/浅色）

  // 向 Giscus 发送主题更新
  const updateGiscusTheme = (theme: string) => {
    const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
    if (!iframe) return;
    
    // 发送主题配置消息（关键步骤）
    iframe.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme: theme === "dark" ? "dark" : "light", // 替换为你的主题名
          },
        },
      },
      "https://giscus.app"
    );
  };

  // 监听主题变化
  useEffect(() => {
    updateGiscusTheme(theme);
  }, [theme]);

  // 初始化 Giscus
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", "Kemeow815/kemiao-rspress");
    script.setAttribute("data-repo-id", "R_kgDOPDVH8w");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDOPDVH884CsJzD");
    script.setAttribute("data-mapping", "title");
    script.setAttribute("data-theme", "preferred_color_scheme"); // 初始值
    script.setAttribute("data-lang", "zh-CN");
    script.setAttribute("data-loading", "lazy"); // 延迟加载

    containerRef.current?.appendChild(script);

    // 处理 iframe 加载完成事件
    window.addEventListener("message", (event) => {
      if (event.origin !== "https://giscus.app") return;
      if (event.data.giscus?.loading === false) {
        updateGiscusTheme(theme); // 加载完成后立即同步主题
      }
    });
  }, []);

  return <div ref={containerRef} className="giscus" />;
}

function useTheme(): "light" | "dark" {
  // 简单实现：根据 prefers-color-scheme 媒体查询返回主题
  const [theme, setTheme] = React.useState<"light" | "dark">(
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => setTheme(e.matches ? "dark" : "light");
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return theme;
}

