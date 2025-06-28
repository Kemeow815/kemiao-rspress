import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: '喵落阁',
  icon: '/kemiao.png',
  logo: {
    light: '/kemiao.png',
    dark: '/kemiao.png',
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/Kemeow815',
      },
    ],
  },
});
