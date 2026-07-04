# Colin Wang — 个人网站

React + Vite + TypeScript 构建的纯前端个人网站原型，用于展示作品、介绍自己与联系方式。

## 技术栈

- **React 19** + **TypeScript**
- **Vite 6** — 开发与构建
- 纯静态站点，无需后端

## 本地开发

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:5173`。

## 构建与预览

```bash
npm run build    # 输出到 dist/
npm run preview  # 本地预览构建结果
```

## 自定义内容

所有可编辑内容集中在 `src/data/`：

| 文件 | 内容 |
|------|------|
| `profile.ts` | 姓名、简介、技能、社交链接 |
| `projects.ts` | 项目列表、分类标签 |

样式在 `src/index.css`，组件在 `src/components/`。

## 部署

构建产物是 `dist/` 目录下的静态文件，可部署到任意静态托管：

- **GitHub Pages** — 推送后 Settings → Pages，Build 选 GitHub Actions 或手动上传 `dist/`
- **Vercel / Netlify** — 连接仓库，Build command: `npm run build`，Output: `dist`
- **云服务器** — 将 `dist/` 内容放到 Nginx/Caddy 的 web 根目录

## 许可

MIT
