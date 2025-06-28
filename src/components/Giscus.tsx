import React, { useEffect } from 'react';

export default function Giscus() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://giscus.app/client.js";
    script.setAttribute('data-repo', "Kemeow815/kemiao-rspress");
    script.setAttribute('data-repo-id', "R_xxx");
    script.setAttribute('data-category', "General");
    script.setAttribute('data-category-id', "DIC_xxx");
    script.setAttribute('data-mapping', "pathname"); // 按路径匹配文章
    script.setAttribute('data-theme', "preferred_color_scheme"); // 自动适配深色/浅色模式
    script.setAttribute('crossorigin', "anonymous");
    script.async = true;

    const container = document.getElementById('giscus-container');
    container?.appendChild(script);

    return () => {
      container?.removeChild(script);
    };
  }, []);

  return <div id="giscus-container" />;
}