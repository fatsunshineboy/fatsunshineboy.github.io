<template>
  <div class="json-tool">
    <NavComponent />
    <div class="tool-container">
      <header class="tool-header">
        <h1 class="tool-title">{{ t('title') }}</h1>
        <p class="tool-subtitle">{{ t('subtitle') }}</p>
      </header>
      <main class="tool-main">
        <div class="editor-container">
          <div class="editor-panel">
            <div class="panel-header">
              <label>{{ t('input') }}</label>
              <div class="panel-actions">
                <button @click="formatJSON" class="btn-action">{{ t('format') }}</button>
                <button @click="minifyJSON" class="btn-action">{{ t('minify') }}</button>
                <button @click="clearAll" class="btn-action">{{ t('clear') }}</button>
              </div>
            </div>
            <textarea v-model="inputJSON" @input="validateJSON" class="json-input" :class="{ error: hasError }" placeholder='{"key": "value"}'></textarea>
            <div v-if="hasError" class="error-message">{{ errorMessage }}</div>
          </div>
          <div class="editor-panel">
            <div class="panel-header">
              <label>{{ t('output') }}</label>
              <div class="panel-actions">
                <button @click="copyOutput" class="btn-action">{{ t('copy') }}</button>
              </div>
            </div>
            <textarea v-model="outputJSON" readonly class="json-output"></textarea>
          </div>
        </div>
        <div class="validation-status" :class="{ valid: isValid, error: hasError }">
          <span v-if="isValid">{{ t('validJSON') }}</span>
          <span v-else-if="hasError">{{ t('invalidJSON') }}</span>
          <span v-else>{{ t('waiting') }}</span>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import NavComponent from '../components/NavComponent.vue'

const lang = inject('lang')
const inputJSON = ref('')
const outputJSON = ref('')
const hasError = ref(false)
const errorMessage = ref('')
const isValid = ref(false)

const translations = {
  zh: { title: 'JSON 格式化', subtitle: '格式化、验证和压缩 JSON 数据', input: '输入 JSON', output: '输出', format: '格式化', minify: '压缩', clear: '清空', copy: '复制', validJSON: '✓ JSON 格式正确', invalidJSON: '✗ JSON 格式错误', waiting: '请输入 JSON' },
  en: { title: 'JSON Formatter', subtitle: 'Format, validate and minify JSON', input: 'Input JSON', output: 'Output', format: 'Format', minify: 'Minify', clear: 'Clear', copy: 'Copy', validJSON: '✓ Valid JSON', invalidJSON: '✗ Invalid JSON', waiting: 'Enter JSON' }
}
function t(key) { return translations[lang.value]?.[key] || key }

function validateJSON() {
  if (!inputJSON.value.trim()) { hasError.value = false; isValid.value = false; outputJSON.value = ''; return }
  try {
    const parsed = JSON.parse(inputJSON.value)
    hasError.value = false
    isValid.value = true
    outputJSON.value = JSON.stringify(parsed, null, 2)
  } catch (e) {
    hasError.value = true
    isValid.value = false
    errorMessage.value = e.message
    outputJSON.value = ''
  }
}

function formatJSON() {
  try {
    const parsed = JSON.parse(inputJSON.value)
    outputJSON.value = JSON.stringify(parsed, null, 2)
    isValid.value = true
    hasError.value = false
  } catch (e) {
    hasError.value = true
    errorMessage.value = e.message
  }
}

function minifyJSON() {
  try {
    const parsed = JSON.parse(inputJSON.value)
    outputJSON.value = JSON.stringify(parsed)
    isValid.value = true
    hasError.value = false
  } catch (e) {
    hasError.value = true
    errorMessage.value = e.message
  }
}

function clearAll() {
  inputJSON.value = ''
  outputJSON.value = ''
  hasError.value = false
  isValid.value = false
}

function copyOutput() {
  if (outputJSON.value) navigator.clipboard.writeText(outputJSON.value)
}
</script>

<style scoped>
.json-tool { min-height: 100vh; background: var(--bg-primary); }
.tool-container { max-width: 1200px; margin: 0 auto; padding: var(--space-12) var(--space-6); }
.tool-header { text-align: center; margin-bottom: var(--space-12); }
.tool-title { font-size: var(--text-4xl); font-weight: var(--font-bold); color: var(--text-primary); margin-bottom: var(--space-4); }
.tool-subtitle { font-size: var(--text-lg); color: var(--text-muted); }
.tool-main { display: flex; flex-direction: column; gap: var(--space-6); }
.editor-container { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6); }
@media (max-width: 768px) { .editor-container { grid-template-columns: 1fr; } }
.editor-panel { display: flex; flex-direction: column; gap: var(--space-2); }
.panel-header { display: flex; justify-content: space-between; align-items: center; }
.panel-header label { font-size: var(--text-sm); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; }
.panel-actions { display: flex; gap: var(--space-2); }
.btn-action { padding: var(--space-1) var(--space-3); background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary); cursor: pointer; transition: all var(--transition-fast); font-size: var(--text-xs); }
.btn-action:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
.json-input, .json-output { width: 100%; min-height: 400px; padding: var(--space-4); background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text-primary); font-family: 'JetBrains Mono', monospace; font-size: var(--text-sm); resize: vertical; }
.json-input.error { border-color: #ef4444; }
.json-output { background: var(--bg-tertiary); }
.error-message { color: #ef4444; font-size: var(--text-sm); font-family: 'JetBrains Mono', monospace; }
.validation-status { text-align: center; padding: var(--space-3); border-radius: var(--radius-md); font-size: var(--text-sm); }
.validation-status.valid { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
.validation-status.error { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
.validation-status:not(.valid):not(.error) { color: var(--text-muted); }
</style>
