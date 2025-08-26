# 个人网站

一个无需后端的静态个人网站：包含关于我、项目展示、联系方式、暗色模式与响应式布局。

## 技术栈选择与理由

- 纯静态站点（HTML/CSS/JS）：
  - **无需后端**，部署极简、成本为零。
  - 能部署到 GitHub Pages / Vercel / Netlify 免费计划。
  - 联系表单如需真正收件，可接入第三方（Formspree、Vercel Serverless、Netlify Forms）。

## 本地预览

任何静态服务器均可，例如：

```bash
python3 -m http.server 5173
# 或者
npx serve -p 5173 .
```

打开浏览器访问 `http://localhost:5173`。

## 部署方案

### 方案一：GitHub Pages（推荐纯静态）
1. 新建仓库并推送代码。
2. 在仓库 Settings → Pages → Source 选择 `Deploy from a branch`，分支选 `main`，目录 `/(root)`。
3. 保存后等待几分钟，会生成站点地址（`https://<username>.github.io/<repo>`）。

注意：若使用项目子路径访问，`index.html` 内资源用相对路径（已使用 `./styles.css` 等）。

### 方案二：Vercel
1. 登录 vercel.com，新建项目并选择该仓库。
2. 框架选择 `Other`（静态），无需构建命令与输出目录（默认）。
3. 点击部署，完成后会得到 `https://*.vercel.app` 域名。

### 方案三：Netlify
1. 登录 app.netlify.com，New site from Git。
2. 连接 Git 仓库，Build command 留空，Publish directory 指定 `.`。
3. 部署完成后会得到 `https://*.netlify.app` 域名。

## 自定义内容

- 修改 `index.html` 中的文案（姓名、简介、联系方式、社交链接）。
- 在 `script.js` 的 `projects` 数组中添加/修改项目。
- 替换 `assets/icons/favicon.svg` 以使用自定义图标。

## 表单收件（可选）

- 使用第三方：Formspree / Getform / Basin 等，将 `form` 的 `action` 指向对应端点，并改为普通提交。
- 或使用 Vercel Serverless：创建 `api/contact.js` 处理邮件（需配置邮件服务）。

## 许可

MIT


