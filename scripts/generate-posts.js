#!/usr/bin/env node

/**
 * Markdown to JSON Generator
 *
 * 将 public/blog/posts/*.md 文件转换为 public/data/posts.json
 *
 * 使用方法:
 * npm run build:posts
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { marked } from 'marked'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 配置
const POSTS_DIR = path.join(__dirname, '../public/blog/posts')
const OUTPUT_FILE = path.join(__dirname, '../public/data/posts.json')

// Front Matter 解析
function parseFrontMatter(content) {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontMatterRegex)

  if (!match) {
    return { meta: {}, content }
  }

  const metaContent = match[1]
  const body = match[2]

  const meta = {}
  const lines = metaContent.split('\n')

  lines.forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim()
      let value = line.slice(colonIndex + 1).trim()

      // 处理数组格式 [tag1, tag2]
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrContent = value.slice(1, -1)
        // 中文逗号 \uff0c 替换为英文逗号，然后分割
        value = arrContent.replace(/\uff0c/g, ',').split(',').map(s => s.trim()).filter(s => s.length > 0)
      }

      meta[key] = value
    }
  })

  return { meta, content: body }
}

// 计算阅读时间
function calculateReadingTime(content) {
  const words = content.replace(/[#*`()\[\]]/g, '').split(/\s+/).length
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length
  // 中文按 400 字/分钟，英文按 200 词/分钟
  const minutes = Math.ceil(chineseChars / 400 + words / 200)
  return Math.max(1, minutes)
}

// 提取纯文本摘要
function extractExcerpt(content, length = 100) {
  const text = content
    .replace(/#{1,6}\s/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .trim()

  return text.slice(0, length) + (text.length > length ? '...' : '')
}

// 生成 Slug
function generateSlug(filename) {
  return filename.replace('.md', '')
}

// 处理单篇文章
function processPost(filename) {
  const filePath = path.join(POSTS_DIR, filename)
  const content = fs.readFileSync(filePath, 'utf-8')
  const { meta, content: body } = parseFrontMatter(content)

  const readingTime = meta.readingTime || calculateReadingTime(body)
  const slug = meta.slug || generateSlug(filename)

  // 渲染 Markdown 为 HTML（用于 content 字段）
  const htmlContent = marked.parse(body)

  return {
    id: slug,
    title: meta.title || 'Untitled',
    titleEn: meta.titleEn || 'Untitled',
    desc: meta.desc || extractExcerpt(body, 80),
    descEn: meta.descEn || extractExcerpt(body, 80),
    date: meta.date || new Date().toISOString().split('T')[0],
    tags: meta.tags || [],
    cover: meta.cover || '',
    readingTime: String(readingTime),
    slug: slug,
    content: body,
    contentEn: meta.contentEn || body,
    contentHtml: htmlContent
  }
}

// 主函数
async function main() {
  console.log('📝 Markdown to JSON Generator\n')
  console.log(`输入目录：${POSTS_DIR}`)
  console.log(`输出文件：${OUTPUT_FILE}\n`)

  // 检查目录是否存在
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`错误：目录不存在 - ${POSTS_DIR}`)
    process.exit(1)
  }

  // 读取所有 Markdown 文件
  const files = fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .sort((a, b) => {
      // 按文件名排序（可改为按日期）
      return a.localeCompare(b)
    })

  console.log(`找到 ${files.length} 篇 Markdown 文件\n`)

  const posts = []

  for (const file of files) {
    try {
      console.log(`处理：${file}`)
      const post = processPost(file)
      posts.push(post)
    } catch (err) {
      console.error(`处理 ${file} 失败：`, err.message)
    }
  }

  // 按日期降序排序
  posts.sort((a, b) => new Date(b.date) - new Date(a.date))

  // 生成输出
  const output = {
    generated: new Date().toISOString(),
    total: posts.length,
    posts: posts
  }

  // 确保输出目录存在
  const outputDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // 写入文件
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8')

  console.log(`\n✅ 生成成功！`)
  console.log(`共 ${posts.length} 篇文章`)
  console.log(`输出到：${OUTPUT_FILE}\n`)

  // 列出所有文章
  console.log('文章列表:')
  posts.forEach((p, i) => {
    console.log(`  ${i + 1}. [${p.date}] ${p.title}`)
  })
}

// 运行
main().catch(err => {
  console.error('执行失败:', err)
  process.exit(1)
})
