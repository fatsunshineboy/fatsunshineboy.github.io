<template>
  <div class="tools-page">
    <!-- 导航 -->
    <NavComponent />

    <header class="tools-header">
      <h1 class="tools-title">{{ t('title') }}</h1>
      <p class="tools-subtitle">{{ t('subtitle') }}</p>
    </header>
    <div class="tools-grid">
      <router-link v-for="tool in tools" :key="tool.id" :to="tool.path" class="tool-card">
        <div class="tool-card-icon" v-html="tool.icon"></div>
        <h3 class="tool-card-name">{{ tool.name }}</h3>
        <p class="tool-card-desc">{{ tool.desc }}</p>
        <span class="tool-card-link">{{ t('useNow') }} →</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import NavComponent from '../components/NavComponent.vue'

const lang = inject('lang')

const tools = [
  { id: 'color-picker', name: '全屏取色器', desc: '从屏幕任意位置吸取颜色，支持 HEX、RGB、HSL 格式', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>', path: '/tools/color-picker' },
  { id: 'color-scheme', name: '配色方案生成器', desc: '生成和谐的配色方案，支持互补、类似、三元等模式', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="8" r="2"/><circle cx="9" cy="15" r="1.5"/><circle cx="16" cy="14" r="1.5"/></svg>', path: '/tools/color-scheme' },
  { id: 'gradient-generator', name: '渐变生成器', desc: '创建线性渐变和径向渐变，支持多色标控制', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="21" x2="21" y2="3"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/></svg>', path: '/tools/gradient-generator' },
  { id: 'json-formatter', name: 'JSON 格式化', desc: '格式化、验证和压缩 JSON 数据', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>', path: '/tools/json-formatter' },
  { id: 'markdown-editor', name: 'Markdown 编辑器', desc: '实时预览的 Markdown 编辑器，支持导出 HTML', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/><polyline points="10 17 9 17 8 17"/></svg>', path: '/tools/markdown-editor' },
  { id: 'image-compressor', name: '图片压缩工具', desc: '在线压缩图片，保持质量的同时减小文件大小', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>', path: '/tools/image-compressor' },
  { id: 'base64-converter', name: 'Base64 转换器', desc: '图片、文本与 Base64 互相转换', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 7V4h16v3M9 20H4V9h16v11h-5"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="12" y1="4" x2="12" y2="20"/></svg>', path: '/tools/base64-converter' },
  { id: 'regex-tester', name: '正则表达式测试', desc: '实时测试正则表达式，匹配高亮显示', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 7c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z"/><path d="M8 7v10"/><path d="M12 7v10"/><path d="M16 7v10"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/></svg>', path: '/tools/regex-tester' },
  { id: 'css-generator', name: 'CSS 生成器', desc: '可视化生成 CSS 代码，支持阴影、圆角、动画等', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>', path: '/tools/css-generator' }
]

const translations = {
  zh: { title: '工具', subtitle: '为创作者和开发者打造的实用工具', useNow: '立即使用' },
  en: { title: 'Tools', subtitle: 'Utilities for creators and developers', useNow: 'Use Now' }
}

function t(key) {
  return translations[lang.value]?.[key] || key
}
</script>

<style scoped>
.tools-page { min-height: 100vh; padding-top: 80px; }

.tools-header {
  text-align: center;
  padding: var(--space-12) var(--space-6);
  border-bottom: 1px solid var(--border-subtle);
}

.tools-title { font-size: var(--text-4xl); font-weight: var(--font-bold); margin-bottom: var(--space-4); }
.tools-subtitle { font-size: var(--text-lg); color: var(--text-muted); }

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
  padding: var(--space-12) var(--space-6);
  max-width: 1200px;
  margin: 0 auto;
}

.tool-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  text-decoration: none;
}

.tool-card:hover {
  border-color: var(--accent-primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-gold);
}

.tool-card-icon { width: 48px; height: 48px; margin: 0 auto var(--space-4); color: var(--accent-primary); }
.tool-card-name { font-size: var(--text-lg); font-weight: var(--font-semibold); margin-bottom: var(--space-2); }
.tool-card-desc { font-size: var(--text-sm); color: var(--text-muted); margin-bottom: var(--space-4); }

.tool-card-link {
  font-size: var(--text-sm);
  color: var(--accent-primary);
  opacity: 0;
  transform: translateY(8px);
  transition: all var(--transition-normal);
}

.tool-card:hover .tool-card-link {
  opacity: 1;
  transform: translateY(0);
}
</style>
