# 博客写作指南

## 📝 如何发布新文章

### 1. 创建 Markdown 文件

在 `public/blog/posts/` 目录下创建一个新的 `.md` 文件，例如：

```bash
public/blog/posts/my-new-article.md
```

### 2. 编写文章 Front Matter

在文件**顶部**添加 Front Matter（元数据），格式如下：

```markdown
---
title: 我的文章标题
titleEn: My Article Title
desc: 文章描述，用于博客列表页显示
descEn: Article description for blog list page
date: 2026-04-04
tags: [标签 1, 标签 2, 前端]
cover: /images/gallery/cover.jpg
readingTime: 5
slug: my-new-article
---

# 文章正文

从这里开始写你的文章内容...
```

### 3. Front Matter 字段说明

| 字段 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `title` | ✅ | 中文标题 | `Vue 开发注意事项` |
| `titleEn` | ❌ | 英文标题 | `Vue Development Tips` |
| `desc` | ✅ | 中文描述（简短） | `总结 Vue 项目开发的常见问题` |
| `descEn` | ❌ | 英文描述 | `Summary of Vue development issues` |
| `date` | ✅ | 发布日期 (YYYY-MM-DD) | `2026-04-04` |
| `tags` | ❌ | 标签数组 | `[前端，Vue, 框架]` |
| `cover` | ❌ | 封面图路径 | `/images/gallery/20260328_1.jpg` |
| `readingTime` | ❌ | 阅读时间（分钟） | `5`（可自动计算） |
| `slug` | ❌ | 文章 URL 标识 | `vue-tips`（默认用文件名） |

### 4. 编写文章内容

Front Matter 之后就是文章的 Markdown 正文：

```markdown
## 二级标题

这里是正文内容...

### 三级标题

- 列表项 1
- 列表项 2

```javascript
// 代码块示例
const foo = 'bar'
console.log(foo)
```
```

### 5. 生成 JSON 数据

保存文件后，运行命令生成博客数据：

```bash
npm run build:posts
```

脚本会：
- 扫描 `public/blog/posts/` 目录下的所有 `.md` 文件
- 解析 Front Matter 和 Markdown 内容
- 自动生成 `public/data/posts.json`
- 按日期降序排序文章

### 6. 预览和发布

```bash
# 开发模式预览
npm run dev

# 构建生产版本
npm run build
```

访问网站的博客页面即可查看新文章！

---

## 📁 目录结构

```
public/
├── blog/
│   └── posts/           # ← 在这里创建 Markdown 文件
│       ├── welcome.md
│       ├── vue-tips.md
│       └── ...
├── data/
│   └── posts.json       # ← 自动生成的博客数据
└── images/
    └── gallery/         # ← 封面图片放在这里
```

---

## ✨ Markdown 语法支持

本博客支持标准 Markdown 语法：

### 基础语法

```markdown
# 标题
**粗体**  *斜体*
- 无序列表
1. 有序列表
[链接](https://example.com)
![图片](/path/to/image.jpg)
```

### 代码块

````markdown
```javascript
// 带语法高亮的代码块
function hello() {
  console.log('Hello, World!')
}
```
````

支持的语言：`javascript`, `typescript`, `python`, `css`, `html`, `bash`, `json`, `vue` 等

---

## 🔧 自动化（可选）

### 开发时自动重建

如果你希望在开发模式下自动检测 Markdown 文件变化，可以安装 `chokidar`：

```bash
npm install --save-dev chokidar
```

然后创建一个简单的监听脚本 `scripts/watch-posts.js`：

```javascript
import chokidar from 'chokidar'
import { exec } from 'child_process'

const watcher = chokidar.watch('public/blog/posts/*.md')

watcher.on('change', () => {
  console.log('检测到 Markdown 文件变化，重新生成...')
  exec('npm run build:posts')
})

console.log('监听 Markdown 文件中...')
```

添加 npm 脚本：

```json
{
  "scripts": {
    "dev:blog": "node scripts/watch-posts.js"
  }
}
```

运行 `npm run dev:blog` 即可自动监听。

---

## 💡 提示

1. **封面图片**：建议使用网站已有的图片，路径格式为 `/images/gallery/xxx.jpg`
2. **标签命名**：保持标签一致性，如使用 `前端` 而不是混用 `Frontend`
3. **文章排序**：文章按 `date` 字段降序排列，最新的文章会显示在最前面
4. **双语支持**：建议同时填写中英文字段，方便切换语言
5. **阅读时间**：如不填写，会自动根据字数计算

---

## 🐛 故障排查

### 运行 `npm run build:posts` 报错

1. 确保 `public/blog/posts/` 目录存在
2. 确保已安装依赖：`npm install`
3. 检查 Markdown 文件的 Front Matter 格式是否正确

### 文章没有显示

1. 检查 Front Matter 是否完整（至少包含 `title` 和 `date`）
2. 确认 `public/data/posts.json` 已更新
3. 刷新浏览器页面

### 图片无法显示

1. 检查图片路径是否正确（相对于 `public/` 目录）
2. 确保图片文件确实存在于对应位置

---

## 📖 示例文章

参考 `public/blog/posts/welcome.md` 查看完整的文章格式示例。
