# fatsunshineboy

> Death Stranding Themed Blog & AI Tools
> 死亡搁浅主题博客系统

一个具有强烈死亡搁浅视觉风格的现代化博客系统，支持中英文双语、AI 内容润色、图片墙和自动部署功能。

![Death Stranding](public/images/moon-hd.jpg)

## ✨ 特性

### 🎨 死亡搁浅主题
- **焦油流淌文字效果** - 标题文字带有黏稠焦油滴落的艺术效果
- **时间雨粒子系统** - 动态雨滴背景动画
- **开罗尔网络连接** - 全息网络节点动画
- **BB 探测器悬浮** - 经典的 BB 单元界面
- **全息投影风格** - 科技感十足的视觉效果

### 📝 博客系统
- **Markdown 支持** - 使用 Markdown 编写博客文章
- **中英文双语** - 完整的 i18n 支持，一键切换语言
- **Frontmatter 元数据** - 支持标题、描述、标签、日期等
- **语法高亮** - 内置 highlight.js 代码高亮
- **阅读时间估算** - 自动计算文章阅读时间
- **上下篇导航** - 文章详情页支持上一篇/下一篇导航

### 🖼️ 图片墙
- **自动扫描** - 自动扫描 `content/gallery/` 目录中的图片
- **全息卡片效果** - 3D 悬浮卡片展示
- **灯箱浏览** - 点击放大查看大图
- **用户上传** - 支持本地上传图片（浏览器存储）
- **点赞功能** - 支持图片点赞计数

### 🤖 AI 增强
- **AI 内容润色** - 可选的 AI 优化博客内容
- **多语言翻译** - 自动生成英文翻译
- **语法检查** - 自动修正语法错误
- **内容增强** - 补充和扩展文章内容

### 🚀 自动部署
- **GitHub Actions** - Push 到 main 分支自动部署
- **GitHub Pages** - 原生支持 GitHub Pages 部署
- **增量构建** - 只构建变化的内容

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

访问 `http://localhost:5173` 预览。

### 构建生产版本

```bash
npm run build:all
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📁 项目结构

```
fatsunshineboy/
├── content/
│   ├── blog/           # Markdown 博客文件
│   │   ├── welcome.md
│   │   ├── javascript.md
│   │   └── ...
│   └── gallery/        # 图片墙图片
│       └── README.md
├── src/
│   ├── components/     # Vue 组件
│   │   ├── NavComponent.vue
│   │   ├── TimefallContainer.vue
│   │   ├── ChiralNetwork.vue
│   │   └── ...
│   ├── views/          # 页面视图
│   │   ├── HomeView.vue
│   │   ├── BlogView.vue
│   │   ├── PostView.vue
│   │   └── GalleryView.vue
│   ├── styles/         # 主题样式
│   │   └── death-stranding.css
│   ├── lib/           # 工具函数
│   └── App.vue
├── scripts/
│   ├── build-posts.js   # 博客构建脚本
│   ├── build-gallery.js # 图片墙构建脚本
│   └── ai-polish.js     # AI 润色脚本
├── .github/
│   └── workflows/      # GitHub Actions
│       ├── deploy.yml
│       └── build-posts.yml
├── public/
│   ├── data/           # 生成的数据文件
│   └── images/         # 静态图片
├── package.json
├── vite.config.js
└── README.md
```

## 📖 使用指南

### 创建博客文章

1. 在 `content/blog/` 目录创建新的 `.md` 文件

2. 添加 Frontmatter 元数据：

```markdown
---
title: 我的文章标题
title_en: My Article Title
description: 文章描述
description_en: Article description
date: 2026-04-03
tags: [标签 1, 标签 2]
reading_time: 5
---

# 文章正文

这里是文章内容...
```

3. 运行构建命令：

```bash
npm run build:posts
```

### 添加图片到图片墙

1. 将图片文件复制到 `content/gallery/` 目录

2. 支持格式：JPG, PNG, GIF, WebP, BMP, SVG

3. 运行构建命令：

```bash
npm run build:gallery
```

### 使用 AI 润色

```bash
# 润色所有文章
npm run ai:polish -- --all

# 润色指定文章
npm run ai:polish welcome.md

# 交互模式
npm run ai:polish
```

**配置 AI API（可选）：**

在 `.env` 文件中设置 API 密钥：

```bash
OPENAI_API_KEY=your_openai_key
# 或
ANTHROPIC_API_KEY=your_anthropic_key
# 或
ZHIPU_API_KEY=your_zhipu_key
```

## 🛠️ NPM 命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run build:posts` | 构建博客索引 |
| `npm run build:gallery` | 构建图片墙索引 |
| `npm run build:all` | 构建所有数据文件 |
| `npm run ai:polish` | AI 润色博客内容 |

## 🎨 主题定制

### 修改配色方案

编辑 `src/styles/death-stranding.css` 中的 CSS 变量：

```css
:root {
  --ds-black: #0a0a0a;
  --ds-gold: #c4a35a;
  --ds-gold-warm: #d4903c;
  /* ... 更多颜色变量 */
}
```

### 修改网站信息

编辑 `src/App.vue` 中的配置：

```javascript
const config = {
  site: {
    title: 'fatsunshineboy',
    subtitle: {
      zh: '连接 · 创造 · 前行',
      en: 'Connect · Create · Advance'
    }
  },
  features: {
    timefall: { enabled: true },
    chiralNetwork: { enabled: true },
    bbDetector: { enabled: true }
  }
}
```

## 🌐 部署

### GitHub Pages 部署

1. 在 GitHub 仓库设置中启用 GitHub Pages

2. 选择 GitHub Actions 作为部署来源

3. Push 代码到 main 分支：

```bash
git add .
git commit -m "feat: add new blog post"
git push origin main
```

4. GitHub Actions 会自动构建并部署

### 自定义域名

在仓库的 `Settings > Pages > Custom domain` 中设置自定义域名。

## 📝 Frontmatter 字段说明

| 字段 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `title` | ✅ | 中文标题 | `我的博客` |
| `title_en` | ❌ | 英文标题 | `My Blog` |
| `description` | ❌ | 中文描述（用于摘要） | `这是我的博客` |
| `description_en` | ❌ | 英文描述 | `This is my blog` |
| `date` | ❌ | 发布日期 | `2026-04-03` |
| `tags` | ❌ | 标签数组 | `[Vue, JavaScript]` |
| `reading_time` | ❌ | 阅读时间（分钟） | `5` |
| `slug` | ❌ | 自定义 URL 路径 | `my-blog-post` |

## 🔧 故障排除

### 博客文章不显示

1. 检查文件是否在 `content/blog/` 目录
2. 确认文件扩展名为 `.md`
3. 运行 `npm run build:posts` 重新构建
4. 检查 Frontmatter 格式是否正确

### 图片墙不显示图片

1. 检查图片是否在 `content/gallery/` 目录
2. 确认图片格式支持（JPG/PNG/GIF 等）
3. 运行 `npm run build:gallery` 重新构建
4. 检查生成的 `public/data/gallery.json`

### 样式显示异常

1. 清除浏览器缓存
2. 重新安装依赖：`npm install`
3. 重新构建：`npm run build`

## 📄 License

MIT License

## 👤 Author

fatsunshineboy

---

**Built with ❤️ using Vue 3 + Vite**

*Death Stranding is a trademark of KOJIMA PRODUCTIONS.*
