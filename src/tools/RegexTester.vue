<template>
  <div class="regex-tool">
    <NavComponent />
    <div class="tool-container">
      <header class="tool-header">
        <h1 class="tool-title">{{ t('title') }}</h1>
        <p class="tool-subtitle">{{ t('subtitle') }}</p>
      </header>
      <main class="tool-main">
        <div class="regex-input-group">
          <label>{{ t('regex') }}</label>
          <div class="regex-wrapper">
            <span class="regex-delimiter">/</span>
            <input v-model="pattern" @input="testRegex" class="regex-input" :class="{ error: regexError }" placeholder="\w+@\w+\.\w+" />
            <span class="regex-delimiter">/</span>
            <div class="regex-flags">
              <label v-for="flag in ['g', 'i', 'm', 's']" :key="flag" class="flag-label">
                <input type="checkbox" :value="flag" v-model="flags" @change="testRegex" class="flag-checkbox" />
                {{ flag }}
              </label>
            </div>
          </div>
          <div v-if="regexError" class="error-message">{{ regexError }}</div>
        </div>
        <div class="test-input-group">
          <label>{{ t('testString') }}</label>
          <textarea v-model="testString" @input="testRegex" class="test-input" :placeholder="t('testPlaceholder')"></textarea>
        </div>
        <div v-if="matches.length > 0" class="matches-section">
          <h3 class="matches-title">{{ t('matches') }} ({{ matches.length }})</h3>
          <div class="matches-list">
            <div v-for="(match, index) in matches" :key="index" class="match-item" @click="copyMatch(match)">
              <span class="match-content">{{ match }}</span>
              <span class="match-index">#{{ index + 1 }}</span>
            </div>
          </div>
        </div>
        <div v-if="matchGroups && matchGroups.length > 0" class="groups-section">
          <h3 class="matches-title">{{ t('captureGroups') }}</h3>
          <div v-for="(group, index) in matchGroups" :key="index" class="group-item">
            <span class="group-label">Group {{ index }}:</span>
            <code>{{ group || '(empty)' }}</code>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import NavComponent from '../components/NavComponent.vue'

const lang = inject('lang')
const pattern = ref('')
const flags = ref([])
const testString = ref('')
const matches = ref([])
const matchGroups = ref([])
const regexError = ref('')

const translations = {
  zh: { title: '正则表达式测试', subtitle: '实时测试和验证正则表达式', regex: '正则表达式', testString: '测试字符串', testPlaceholder: '输入要测试的文本...', matches: '匹配结果', captureGroups: '捕获组', copyMatch: '点击复制' },
  en: { title: 'Regex Tester', subtitle: 'Test and validate regular expressions in real-time', regex: 'Regular Expression', testString: 'Test String', testPlaceholder: 'Enter text to test...', matches: 'Matches', captureGroups: 'Capture Groups', copyMatch: 'Click to copy' }
}
function t(key) { return translations[lang.value]?.[key] || key }

function testRegex() {
  matches.value = []
  matchGroups.value = []
  regexError.value = ''
  if (!pattern.value || !testString.value) return
  try {
    const regex = new RegExp(pattern.value, flags.value.join(''))
    const allMatches = [...testString.value.matchAll(regex)]
    if (allMatches.length > 0) {
      matches.value = allMatches.map(m => m[0])
      if (allMatches[0] && allMatches[0].length > 1) {
        matchGroups.value = allMatches[0].slice(1)
      }
    }
  } catch (e) {
    regexError.value = e.message
  }
}

function copyMatch(match) {
  navigator.clipboard.writeText(match)
}
</script>

<style scoped>
.regex-tool { min-height: 100vh; background: var(--bg-primary); }
.tool-container { max-width: 900px; margin: 0 auto; padding: var(--space-12) var(--space-6); }
.tool-header { text-align: center; margin-bottom: var(--space-12); }
.tool-title { font-size: var(--text-4xl); font-weight: var(--font-bold); color: var(--text-primary); margin-bottom: var(--space-4); }
.tool-subtitle { font-size: var(--text-lg); color: var(--text-muted); }
.tool-main { display: flex; flex-direction: column; gap: var(--space-6); }
.regex-input-group { display: flex; flex-direction: column; gap: var(--space-2); }
.regex-input-group label, .test-input-group label { font-size: var(--text-sm); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; }
.regex-wrapper { display: flex; align-items: center; gap: var(--space-2); background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-2) var(--space-4); }
.regex-wrapper.error { border-color: #ef4444; }
.regex-delimiter { font-family: 'JetBrains Mono', monospace; color: var(--accent-primary); font-size: var(--text-lg); }
.regex-input { flex: 1; background: transparent; border: none; color: var(--text-primary); font-family: 'JetBrains Mono', monospace; font-size: var(--text-base); outline: none; }
.regex-flags { display: flex; gap: var(--space-3); }
.flag-label { display: flex; align-items: center; gap: var(--space-1); font-size: var(--text-sm); color: var(--text-muted); cursor: pointer; }
.flag-checkbox { accent-color: var(--accent-primary); }
.test-input { width: 100%; min-height: 150px; padding: var(--space-4); background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text-primary); font-family: 'JetBrains Mono', monospace; font-size: var(--text-sm); resize: vertical; outline: none; }
.error-message { color: #ef4444; font-size: var(--text-sm); font-family: 'JetBrains Mono', monospace; }
.matches-section, .groups-section { background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: var(--space-4); }
.matches-title { font-size: var(--text-sm); color: var(--text-muted); margin-bottom: var(--space-3); text-transform: uppercase; letter-spacing: 0.1em; }
.matches-list { display: flex; flex-wrap: wrap; gap: var(--space-2); }
.match-item { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-2) var(--space-3); background: var(--bg-tertiary); border-radius: var(--radius-sm); cursor: pointer; transition: all var(--transition-fast); }
.match-item:hover { background: var(--ds-gold-pale); }
.match-content { font-family: 'JetBrains Mono', monospace; color: var(--accent-primary); }
.match-index { font-size: var(--text-xs); color: var(--text-muted); }
.group-item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) 0; border-bottom: 1px solid var(--border-subtle); }
.group-label { font-size: var(--text-sm); color: var(--text-muted); }
.group-item code { flex: 1; font-family: 'JetBrains Mono', monospace; color: var(--text-primary); background: var(--bg-tertiary); padding: var(--space-1) var(--space-2); border-radius: var(--radius-sm); }
</style>
