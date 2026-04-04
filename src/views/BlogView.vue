<template>
  <div class="blog-page">
    <!-- 导航 -->
    <NavComponent />

    <!-- 时间雨背景 -->
    <TimefallContainer v-if="config?.features.timefall?.enabled" />

    <!-- 页面头部 -->
    <header class="blog-header">
      <h1 class="blog-title tar-text">
        {{ t('title') }}
        <span class="tar-text-drip" style="left: 10%"></span>
        <span class="tar-text-drip" style="left: 30%; animation-delay: 1.5s"></span>
        <span class="tar-text-drip" style="left: 50%; animation-delay: 0.8s"></span>
        <span class="tar-text-drip" style="left: 70%; animation-delay: 2.2s"></span>
        <span class="tar-text-drip" style="left: 90%; animation-delay: 3s"></span>
      </h1>
      <p class="blog-subtitle">{{ t('subtitle') }}</p>
    </header>

    <!-- 内容区域 -->
    <div class="blog-container">
      <!-- 筛选器 -->
      <div class="filter-section">
        <div class="filter-label">{{ t('filterLabel') }}</div>
        <div class="tag-cloud">
          <button class="tag-btn" :class="{ active: currentTag === 'all' }" @click="currentTag = 'all'">{{ t('all') }}</button>
          <button v-for="tag in allTags" :key="tag" class="tag-btn" :class="{ active: currentTag === tag }" @click="currentTag = tag">{{ tag }}</button>
        </div>
      </div>

      <!-- 时间线 -->
      <div class="timeline">
        <div v-for="{ year, posts } in groupedPosts" :key="year" class="timeline-year">
          <div class="timeline-year-title">{{ year }}</div>
          <router-link v-for="post in posts" :key="post.id" :to="`/blog/${post.id}`" class="timeline-item">
            <div class="item-header">
              <h3 class="item-title">{{ lang === 'en' ? post.titleEn : post.title }}</h3>
              <span class="item-date">{{ formatDate(post.date) }}</span>
            </div>
            <p class="item-desc">{{ lang === 'en' ? post.descEn : post.desc }}</p>
            <div class="item-tags">
              <span v-for="tag in post.tags" :key="tag" class="item-tag">{{ tag }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import TimefallContainer from '../components/TimefallContainer.vue'
import NavComponent from '../components/NavComponent.vue'

const lang = inject('lang')
const posts = inject('posts')
const config = inject('config')
const currentTag = ref('all')

const allTags = computed(() => {
  const tags = new Set()
  posts.value.forEach(p => p.tags?.forEach(t => tags.add(t)))
  return Array.from(tags).sort()
})

const filteredPosts = computed(() => {
  if (currentTag.value === 'all') return posts.value
  return posts.value.filter(p => p.tags?.includes(currentTag.value))
})

const groupedPosts = computed(() => {
  const groups = {}
  filteredPosts.value.forEach(post => {
    const year = post.date.split('-')[0]
    if (!groups[year]) groups[year] = []
    groups[year].push(post)
  })
  // 按年份降序排序并返回数组
  return Object.keys(groups).sort((a, b) => b - a).map(year => ({
    year,
    posts: groups[year].sort((a, b) => new Date(b.date) - new Date(a.date))
  }))
})

const translations = {
  zh: { title: '博客', subtitle: '技术笔记与学习心得', filterLabel: '按标签筛选', all: '全部' },
  en: { title: 'Blog', subtitle: 'Notes, thoughts and learnings', filterLabel: 'Filter by tag', all: 'All' }
}

function t(key) {
  const translation = translations[lang.value]?.[key]
  if (translation) return translation
  //  fallback: try English then return key
  const enFallback = translations.en?.[key]
  return enFallback || key
}

function formatDate(dateStr) {
  const [, month, day] = dateStr.split('-')
  if (lang.value === 'zh') return `${month}月${day}日`
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[parseInt(month) - 1]} ${parseInt(day)}`
}
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  padding-top: 80px;
}

.blog-header {
  text-align: center;
  padding: var(--space-12) var(--space-6);
  border-bottom: 1px solid var(--border-subtle);
}

.blog-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-4);
  display: inline-block;
}

.blog-subtitle {
  font-size: var(--text-lg);
  color: var(--text-muted);
}

.blog-container {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
}

.filter-section {
  margin-bottom: var(--space-8);
}

.filter-label {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-bottom: var(--space-3);
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tag-btn {
  padding: var(--space-1) var(--space-3);
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.tag-btn:hover, .tag-btn.active {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.tag-btn.active {
  background: var(--accent-primary);
  color: var(--color-abyss);
}

.timeline {
  position: relative;
  padding-left: var(--space-12);
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-subtle);
}

.timeline-year {
  position: relative;
  margin-bottom: var(--space-8);
}

.timeline-year-title {
  position: absolute;
  left: calc(-1 * var(--space-12) - 50px);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--accent-primary);
  min-width: 50px;
  text-align: right;
  padding-right: 10px;
}

.timeline-year::before {
  content: '';
  position: absolute;
  left: -53px;
  top: 4px;
  width: 12px;
  height: 12px;
  background: var(--accent-primary);
  border-radius: 50%;
}

.timeline-item {
  display: block;
  padding: var(--space-5);
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-4);
  text-decoration: none;
  color: inherit;
  transition: all var(--transition-normal);
}

.timeline-item:hover {
  border-color: var(--accent-primary);
  transform: translateX(4px);
  box-shadow: var(--shadow-gold);
}

.item-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-2);
}

.item-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
}

.item-date {
  font-size: var(--text-xs);
  color: var(--text-muted);
}

.item-desc {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-bottom: var(--space-3);
}

.item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.item-tag {
  padding: var(--space-1) var(--space-2);
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .timeline {
    padding-left: var(--space-8);
  }
  .timeline-year-title {
    left: calc(-1 * var(--space-8) - 40px);
  }
}
</style>
