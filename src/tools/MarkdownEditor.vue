<template>
  <div class="markdown-tool">
    <NavComponent />
    <div class="tool-container">
      <header class="tool-header">
        <h1 class="tool-title">{{ t('title') }}</h1>
        <p class="tool-subtitle">{{ t('subtitle') }}</p>
      </header>
      <main class="tool-main">
        <div class="toolbar">
          <button @click="insertMarkdown('# ')" class="btn-toolbar" title="H1">H1</button>
          <button @click="insertMarkdown('## ')" class="btn-toolbar" title="H2">H2</button>
          <button @click="insertMarkdown('### ')" class="btn-toolbar" title="H3">H3</button>
          <button @click="insertMarkdown('**', '**')" class="btn-toolbar" title="Bold"><strong>B</strong></button>
          <button @click="insertMarkdown('*', '*')" class="btn-toolbar" title="Italic"><em>I</em></button>
          <button @click="insertMarkdown('[', '](url)')" class="btn-toolbar" title="Link">🔗</button>
          <button @click="insertMarkdown('![', '](url)')" class="btn-toolbar" title="Image">🖼️</button>
          <button @click="insertMarkdown('- ')" class="btn-toolbar" title="List">•</button>
          <button @click="insertMarkdown('1. ')" class="btn-toolbar" title="Numbered List">1.</button>
          <button @click="insertMarkdown('> ')" class="btn-toolbar" title="Quote">❝</button>
          <button @click="insertMarkdown('```', '\n```')" class="btn-toolbar" title="Code">{'<'}</button>
          <div class="toolbar-divider"></div>
          <button @click="exportHTML" class="btn-toolbar btn-export">{{ t('exportHTML') }}</button>
        </div>
        <div class="editor-container">
          <div class="editor-panel">
            <div class="panel-header">{{ t('editor') }}</div>
            <textarea v-model="markdown" @input="renderMarkdown" class="markdown-input" placeholder="Enter Markdown..."></textarea>
          </div>
          <div class="preview-panel">
            <div class="panel-header">{{ t('preview') }}</div>
            <div class="markdown-preview" v-html="renderedHTML"></div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import NavComponent from '../components/NavComponent.vue'
import { marked } from 'marked'

const lang = inject('lang')
const markdown = ref('# Hello World\n\nStart writing **Markdown** here...')
const renderedHTML = ref('')

const translations = {
  zh: { title: 'Markdown 编辑器', subtitle: '实时预览的 Markdown 编辑器', editor: '编辑器', preview: '预览', exportHTML: '导出 HTML' },
  en: { title: 'Markdown Editor', subtitle: 'Real-time preview Markdown editor', editor: 'Editor', preview: 'Preview', exportHTML: 'Export HTML' }
}
function t(key) { return translations[lang.value]?.[key] || key }

function renderMarkdown() {
  renderedHTML.value = marked(markdown.value)
}

function insertMarkdown(prefix, suffix = '') {
  const textarea = document.querySelector('.markdown-input')
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = markdown.value
  const before = text.substring(0, start)
  const selected = text.substring(start, end)
  const after = text.substring(end)
  markdown.value = before + prefix + selected + (suffix || '') + after
  setTimeout(() => {
    textarea.focus()
    textarea.setSelectionRange(start + prefix.length, end + prefix.length)
  }, 0)
}

function exportHTML() {
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Exported HTML</title><style>body{font-family:system-ui,sans-serif;max-width:800px;margin:0 auto;padding:20px;line-height:1.6;}</style></head><body>${renderedHTML.value}</body></html>`
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'exported.html'
  a.click()
  URL.revokeObjectURL(url)
}

renderMarkdown()
</script>

<style scoped>
.markdown-tool { min-height: 100vh; background: var(--bg-primary); }
.tool-container { max-width: 1400px; margin: 0 auto; padding: var(--space-12) var(--space-6); }
.tool-header { text-align: center; margin-bottom: var(--space-8); }
.tool-title { font-size: var(--text-4xl); font-weight: var(--font-bold); color: var(--text-primary); margin-bottom: var(--space-4); }
.tool-subtitle { font-size: var(--text-lg); color: var(--text-muted); }
.tool-main { display: flex; flex-direction: column; gap: var(--space-4); }
.toolbar { display: flex; gap: var(--space-1); flex-wrap: wrap; padding: var(--space-2); background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); }
.btn-toolbar { padding: var(--space-2) var(--space-3); background: transparent; border: 1px solid transparent; border-radius: var(--radius-sm); color: var(--text-primary); cursor: pointer; transition: all var(--transition-fast); font-size: var(--text-sm); }
.btn-toolbar:hover { background: var(--bg-tertiary); border-color: var(--border-subtle); }
.btn-toolbar.btn-export { background: var(--accent-primary); color: var(--ds-black); }
.toolbar-divider { width: 1px; background: var(--border-subtle); margin: var(--space-1) var(--space-2); }
.editor-container { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); min-height: 500px; }
@media (max-width: 768px) { .editor-container { grid-template-columns: 1fr; } }
.editor-panel, .preview-panel { display: flex; flex-direction: column; }
.panel-header { padding: var(--space-2) var(--space-4); background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md) var(--radius-md) 0 0; font-size: var(--text-sm); color: var(--text-muted); }
.markdown-input, .markdown-preview { flex: 1; padding: var(--space-4); background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-top: none; border-radius: 0 0 var(--radius-md) var(--radius-md); overflow: auto; }
.markdown-input { font-family: 'JetBrains Mono', monospace; font-size: var(--text-sm); resize: none; color: var(--text-primary); }
.markdown-preview { color: var(--text-primary); line-height: 1.8; }
.markdown-preview :deep(h1), .markdown-preview :deep(h2), .markdown-preview :deep(h3) { color: var(--accent-primary); margin-top: 1em; }
.markdown-preview :deep(code) { background: var(--bg-tertiary); padding: 2px 6px; border-radius: var(--radius-sm); font-family: 'JetBrains Mono', monospace; }
.markdown-preview :deep(pre) { background: var(--bg-tertiary); padding: var(--space-4); border-radius: var(--radius-md); overflow-x: auto; }
.markdown-preview :deep(blockquote) { border-left: 3px solid var(--accent-primary); padding-left: var(--space-4); color: var(--text-muted); }
.markdown-preview :deep(a) { color: var(--accent-primary); }
</style>
