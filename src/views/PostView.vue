<template>
  <div class="blog-article-page">
    <!-- 时间雨背景 -->
    <TimefallContainer v-if="config?.features.timefall?.enabled" />

    <!-- 文章头部 -->
    <header class="article-header">
      <div class="article-header-content">
        <nav class="article-breadcrumb">
          <router-link to="/blog" class="breadcrumb-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>{{ lang === 'zh' ? '博客' : 'Blog' }}</span>
          </router-link>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">{{ lang === 'en' ? post?.titleEn : post?.title }}</span>
        </nav>

        <h1 class="article-title">{{ lang === 'en' ? post?.titleEn : post?.title }}</h1>

        <div class="article-meta">
          <div class="meta-row">
            <svg class="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span class="meta-text">{{ formatDate(post?.date) }}</span>
          </div>
          <div class="meta-row">
            <svg class="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            <span class="meta-text">{{ readingTime }} {{ lang === 'zh' ? '分钟阅读' : 'min read' }}</span>
          </div>
          <div class="article-tags">
            <span v-for="tag in post?.tags" :key="tag" class="article-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 文章内容 -->
    <main class="article-main">
      <article class="article-content" v-html="content"></article>

      <!-- 文章导航 -->
      <footer class="article-footer">
        <div class="article-nav-links">
          <router-link v-if="prevPost" :to="`/blog/${prevPost.id}`" class="article-nav-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <div class="nav-link-content">
              <span class="nav-link-label">{{ lang === 'zh' ? '上一篇' : 'Previous' }}</span>
              <span class="nav-link-title">{{ lang === 'en' ? prevPost.titleEn : prevPost.title }}</span>
            </div>
          </router-link>

          <router-link v-if="nextPost" :to="`/blog/${nextPost.id}`" class="article-nav-link next">
            <div class="nav-link-content">
              <span class="nav-link-label">{{ lang === 'zh' ? '下一篇' : 'Next' }}</span>
              <span class="nav-link-title">{{ lang === 'en' ? nextPost.titleEn : nextPost.title }}</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </router-link>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import hljs from 'highlight.js'
import TimefallContainer from '../components/TimefallContainer.vue'
import 'highlight.js/styles/github-dark.css'

const route = useRoute()
const lang = inject('lang')
const posts = inject('posts')
const config = inject('config')

const post = ref(null)
const content = ref('')
const readingTime = ref(5)

const postIndex = computed(() =>
  post.value ? posts.value.findIndex(p => p.id === post.value.id) : -1
)
const prevPost = computed(() =>
  postIndex.value >= 0 && postIndex.value < posts.value.length - 1
    ? posts.value[postIndex.value + 1]
    : null
)
const nextPost = computed(() =>
  postIndex.value > 0
    ? posts.value[postIndex.value - 1]
    : null
)

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-')
  if (lang.value === 'zh') return `${year}年${month}月${day}日`
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`
}

async function loadPost(id) {
  post.value = posts.value.find(p => p.id === id)
  if (!post.value) return

  document.title = `${lang.value === 'en' ? post.value.titleEn : post.value.title} | fatsunshineboy`

  try {
    const res = await fetch(`/blog/posts/${id}.md`)
    const md = await res.text()
    const body = md.split('---').slice(2).join('---')

    marked.setOptions({
      highlight: (code, lang) => lang && hljs.getLanguage(lang)
        ? hljs.highlight(code, { language: lang }).value
        : hljs.highlightAuto(code).value,
      breaks: true,
      gfm: true
    })

    content.value = marked.parse(body)
    readingTime.value = Math.ceil(content.value.replace(/<[^>]*>/g, '').length / 500) || 5

    // 滚动到顶部
    window.scrollTo(0, 0)
  } catch (e) {
    console.error('Failed to load post:', e)
    content.value = '<p class="error-message">内容加载失败 / Content failed to load</p>'
  }
}

watch(() => route.params.id, (id) => id && loadPost(id), { immediate: true })
</script>

<style scoped>
.blog-article-page {
  min-height: 100vh;
  background: var(--bg-primary);
  position: relative;
}

/* 文章头部 */
.article-header {
  background: linear-gradient(180deg, rgba(10, 10, 21, 0.95) 0%, rgba(18, 18, 32, 0.9) 100%);
  border-bottom: 1px solid var(--border-subtle);
  padding: var(--space-12) var(--space-6) var(--space-8);
  position: relative;
  z-index: 1;
}

.article-header-content {
  max-width: 800px;
  margin: 0 auto;
}

.article-breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-bottom: var(--space-6);
}

.breadcrumb-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--text-muted);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.breadcrumb-link:hover {
  color: var(--accent-primary);
}

.breadcrumb-sep {
  color: var(--border-subtle);
}

.breadcrumb-current {
  color: var(--text-secondary);
}

.article-title {
  font-size: clamp(28px, 5vw, 42px);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-6);
  line-height: 1.3;
  letter-spacing: 0.02em;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4);
}

.meta-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.meta-icon {
  color: var(--accent-primary);
  opacity: 0.8;
}

.meta-text {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-left: auto;
}

.article-tag {
  padding: var(--space-1) var(--space-3);
  background: rgba(196, 163, 90, 0.1);
  border: 1px solid rgba(196, 163, 90, 0.2);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  color: var(--accent-primary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all var(--transition-fast);
}

.article-tag:hover {
  background: rgba(196, 163, 90, 0.2);
  border-color: var(--accent-primary);
}

/* 文章主体 */
.article-main {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-10) var(--space-6);
  position: relative;
  z-index: 1;
}

.article-content {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.9;
}

.article-content :deep(h1) {
  font-size: var(--text-2xl);
  color: var(--text-primary);
  margin-top: var(--space-10);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--border-subtle);
}

.article-content :deep(h2) {
  font-size: var(--text-xl);
  color: var(--text-primary);
  margin-top: var(--space-8);
  margin-bottom: var(--space-4);
}

.article-content :deep(h3) {
  font-size: var(--text-lg);
  color: var(--text-primary);
  margin-top: var(--space-6);
  margin-bottom: var(--space-3);
}

.article-content :deep(h4) {
  font-size: var(--text-base);
  color: var(--text-primary);
  margin-top: var(--space-5);
  margin-bottom: var(--space-2);
}

.article-content :deep(p) {
  margin-bottom: var(--space-5);
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin-bottom: var(--space-5);
  padding-left: var(--space-6);
}

.article-content :deep(li) {
  margin-bottom: var(--space-2);
}

.article-content :deep(a) {
  color: var(--accent-primary);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all var(--transition-fast);
}

.article-content :deep(a:hover) {
  border-bottom-color: var(--accent-primary);
}

.article-content :deep(code) {
  padding: var(--space-1) var(--space-2);
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.9em;
  color: var(--accent-primary);
}

.article-content :deep(pre) {
  margin: var(--space-6) 0;
  padding: var(--space-5);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  overflow-x: auto;
}

.article-content :deep(pre code) {
  padding: 0;
  background: transparent;
  color: var(--text-secondary);
}

.article-content :deep(blockquote) {
  margin: var(--space-6) 0;
  padding: var(--space-4) var(--space-5);
  border-left: 3px solid var(--accent-primary);
  background: rgba(196, 163, 90, 0.05);
  color: var(--text-muted);
  font-style: italic;
}

.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  margin: var(--space-6) 0;
}

.article-content :deep(hr) {
  border: none;
  border-top: 1px solid var(--border-subtle);
  margin: var(--space-8) 0;
}

.error-message {
  color: #ff6b6b;
  font-size: var(--text-lg);
  padding: var(--space-8);
  text-align: center;
  border: 1px solid rgba(255, 107, 107, 0.2);
  border-radius: var(--radius-md);
  background: rgba(255, 107, 107, 0.05);
}

/* 文章底部导航 */
.article-footer {
  margin-top: var(--space-12);
  padding-top: var(--space-8);
  border-top: 1px solid var(--border-subtle);
}

.article-nav-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.article-nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-5);
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-normal);
}

.article-nav-link:hover {
  border-color: var(--accent-primary);
  box-shadow: 0 4px 20px rgba(196, 163, 90, 0.15);
  transform: translateY(-2px);
}

.article-nav-link.next {
  flex-direction: row-reverse;
  text-align: right;
}

.article-nav-link svg {
  flex-shrink: 0;
  color: var(--accent-primary);
}

.article-nav-link.next svg {
  transform: rotate(0deg);
}

.nav-link-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.nav-link-label {
  font-size: var(--text-xs);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.nav-link-title {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--text-primary);
}

/* 响应式 */
@media (max-width: 768px) {
  .article-header {
    padding: var(--space-8) var(--space-4) var(--space-6);
  }

  .article-title {
    font-size: var(--text-2xl);
  }

  .article-tags {
    margin-left: 0;
    width: 100%;
    margin-top: var(--space-3);
  }

  .article-main {
    padding: var(--space-6) var(--space-4);
  }
}
</style>
