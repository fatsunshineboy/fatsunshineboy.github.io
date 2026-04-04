# fatsunshineboy

> **Death Stranding Themed Blog & AI Tools**
> 死亡搁浅主题博客系统

[![Vue.js](https://img.shields.io/badge/Vue.js-3.4+-42b883?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646cff?logo=vite)](https://vitejs.dev/)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-181717?logo=github)](https://fatsunshineboy.github.io/)

一个具有强烈死亡搁浅视觉风格的现代化博客系统，支持中英文双语、图片墙和自动部署功能。

---

## ✨ 特性

### 🎨 死亡搁浅主题
- **焦油流淌文字效果** - 标题文字带有黏稠焦油滴落的艺术效果
- **时间雨粒子系统** - 动态雨滴背景动画
- **开罗尔网络连接** - 全息网络节点动画
- **全息投影风格** - 科技感十足的视觉效果
- **金色流光点缀** - 经典的金线装饰元素

### 📝 博客系统
- **Markdown 支持** - 使用 Markdown 编写博客文章
- **中英文双语** - 完整的 i18n 支持，一键切换语言
- **Frontmatter 元数据** - 支持标题、描述、标签、日期等
- **语法高亮** - 内置 highlight.js 代码高亮
- **时间线展示** - 按年份分组的博客列表
- **标签筛选** - 按标签快速过滤文章

### 🖼️ 图片墙
- **全息卡片效果** - 3D 悬浮卡片展示
- **灯箱浏览** - 点击放大查看大图
- **响应式布局** - 自适应不同屏幕尺寸
- **点赞功能** - 支持图片点赞计数

### 🛠️ 开发者工具
内置 9 款实用工具：
- 🎨 颜色选择器 | 配色方案生成
- ✨ CSS 渐变生成器
- 📄 JSON 格式化/压缩
- 📝 Markdown 编辑器
- 🖼️ 图片压缩器
- 🔃 Base64 转换器
- 🔍 正则表达式测试
- 💅 CSS 样式生成器

### 🚀 自动部署
- **GitHub Actions** - Push 到 main 分支自动部署
- **GitHub Pages** - 原生支持 GitHub Pages 部署
- **Hash 路由** - 刷新不 404

---

## 📦 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 `http://localhost:3000` 预览。

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

---

## 📁 项目结构

```
fatsunshineboy.github.io/
├── src/
│   ├── views/              # 页面视图
│   │   ├── HomeView.vue    # 首页
│   │   ├── BlogView.vue    # 博客列表
│   │   ├── PostView.vue    # 文章详情
│   │   ├── GalleryView.vue # 图片墙
│   │   ├── ToolsView.vue   # 工具导航
│   │   └── AboutView.vue   # 关于页面
│   ├── components/         # 可复用组件
│   │   ├── NavComponent.vue       # 导航菜单
│   │   ├── TimefallContainer.vue  # 时间雨
│   │   ├── ChiralNetwork.vue      # 开罗尔网络
│   │   ├── CornerDecor.vue        # 角落装饰
│   │   └── LikeButton.vue         # 点赞组件
│   ├── tools/            # 工具组件 (9 个)
│   ├── styles/           # 样式文件
│   │   └── death-stranding.css  # 主题变量
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── public/
│   ├── config/
│   │   └── site.json     # 站点配置
│   ├── data/
│   │   ├── posts.json    # 博客文章数据
│   │   └── gallery.json  # 图片墙数据
│   ├── content/
│   │   └── blog/         # Markdown 博客文章
│   └── images/           # 静态图片资源
├── .github/
│   └── workflows/        # GitHub Actions
├── scripts/
│   └── generate-posts.js # 文章索引生成
├── vite.config.js        # Vite 配置
└── package.json
```

---

## 📖 使用指南

### 创建博客文章

1. 在 `public/content/blog/` 目录创建 `.md` 文件

2. 添加 Frontmatter 元数据：

```markdown
---
title: 我的文章标题
titleEn: My Article Title
date: 2024-01-15
tags: [Vue, JavaScript]
desc: 文章简介
descEn: Article description
---

文章内容...
```

3. Push 代码，GitHub Actions 会自动更新索引

### 添加图片到图片墙

将图片放入 `public/images/` 目录，然后在 `public/data/gallery.json` 中配置。

---

## 🛠️ NPM 命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run build:posts` | 构建博客索引 |

---

## 🌐 部署

### GitHub Pages 部署

1. Push 代码到 main 分支：

```bash
git add .
git commit -m "feat: add new blog post"
git push origin main
```

2. GitHub Actions 会自动构建并部署

### 路由说明

项目使用 **Hash 路由模式**：
- URL 格式：`https://fatsunshineboy.github.io/#/blog`
- 优势：刷新不会 404，无需额外配置

---

## 🎨 主题定制

### 修改配色方案

编辑 `src/styles/death-stranding.css` 中的 CSS 变量：

```css
:root {
  --ds-black: #0a0a0a;
  --ds-abyss: #1a1a1d;
  --ds-gold: #c4a35a;
  --ds-gold-pale: rgba(196, 163, 90, 0.1);
  --ds-hologram: rgba(100, 200, 255, 0.08);
  --ds-hologram-edge: rgba(100, 200, 255, 0.3);
}
```

### 修改站点配置

编辑 `public/config/site.json`：

```json
{
  "site": {
    "title": "fatsunshineboy",
    "subtitle": {
      "zh": "连接 · 创造 · 前行",
      "en": "Connect · Create · Advance"
    }
  },
  "theme": {
    "moonImage": "/images/moon-hd.jpg"
  },
  "features": {
    "likeButton": true,
    "timefall": { "enabled": false },
    "chiralNetwork": { "enabled": true }
  }
}
```

---

## 📄 Frontmatter 字段说明

| 字段 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `title` | ✅ | 中文标题 | `我的博客` |
| `titleEn` | ❌ | 英文标题 | `My Blog` |
| `date` | ❌ | 发布日期 | `2024-01-15` |
| `tags` | ❌ | 标签数组 | `[Vue, JavaScript]` |
| `desc` | ❌ | 中文简介 | `这是我的博客` |
| `descEn` | ❌ | 英文简介 | `This is my blog` |

---

## 🔧 故障排除

### 博客文章不显示

1. 检查文件是否在 `public/content/blog/` 目录
2. 确认文件扩展名为 `.md`
3. 检查 Frontmatter 格式是否正确
4. 运行 `npm run build:posts` 重新构建

### 样式显示异常

1. 清除浏览器缓存
2. 重新安装依赖：`npm install`
3. 重新构建：`npm run build`

### 路由 404

确保使用 Hash 路由模式（已配置），URL 应包含 `#` 符号。

---

## 📦 依赖

### 运行时依赖

| 包 | 版本 | 说明 |
|---|---|---|
| vue | ^3.4.0 | 渐进式框架 |
| vue-router | ^4.3.0 | 路由管理 |
| marked | ^12.0.0 | Markdown 解析 |
| highlight.js | ^11.9.0 | 代码高亮 |

### 开发依赖

| 包 | 版本 | 说明 |
|---|---|---|
| vite | ^5.0.0 | 构建工具 |
| @vitejs/plugin-vue | ^5.0.0 | Vue 支持 |

---

## 🌐 访问

- **生产环境**: https://fatsunshineboy.github.io/

---

## 📄 License

MIT License

---

<div align="center">

**STRANDS CONNECT US ALL**

*Built with ❤️ using Vue 3 + Vite*

*Death Stranding is a trademark of KOJIMA PRODUCTIONS.*

</div>
