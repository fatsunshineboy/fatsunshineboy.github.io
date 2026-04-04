<template>
  <div class="base64-tool">
    <NavComponent />
    <div class="tool-container">
      <header class="tool-header">
        <h1 class="tool-title">{{ t('title') }}</h1>
        <p class="tool-subtitle">{{ t('subtitle') }}</p>
      </header>
      <main class="tool-main">
        <div class="tabs">
          <button :class="{ active: mode === 'text' }" @click="mode = 'text'">{{ t('textMode') }}</button>
          <button :class="{ active: mode === 'image' }" @click="mode = 'image'">{{ t('imageMode') }}</button>
        </div>
        <div v-if="mode === 'text'" class="text-mode">
          <div class="input-group">
            <label>{{ t('input') }}</label>
            <textarea v-model="textInput" @input="encodeText" class="text-input" :placeholder="t('textPlaceholder')"></textarea>
          </div>
          <div class="convert-actions">
            <button @click="encodeText" class="btn-action">{{ t('encode') }}</button>
            <button @click="decodeText" class="btn-action">{{ t('decode') }}</button>
            <button @click="clearAll" class="btn-action">{{ t('clear') }}</button>
          </div>
          <div class="input-group">
            <label>{{ t('output') }}</label>
            <textarea v-model="outputResult" readonly class="text-input output" :placeholder="t('outputPlaceholder')"></textarea>
          </div>
        </div>
        <div v-else class="image-mode">
          <div class="upload-area" @dragover.prevent @drop.prevent="handleImageDrop" @click="triggerUpload">
            <input ref="fileInput" type="file" accept="image/*" @change="handleImageFile" hidden />
            <p>{{ t('dropImage') }}</p>
            <p class="hint">{{ t('orClickUpload') }}</p>
          </div>
          <div v-if="imagePreview" class="image-preview-section">
            <img :src="imagePreview" alt="Preview" class="preview-image" />
            <button @click="copyBase64" class="btn-copy">{{ t('copyBase64') }}</button>
          </div>
          <div class="input-group">
            <label>Base64</label>
            <textarea v-model="imageBase64" readonly class="text-input output base64-output"></textarea>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import NavComponent from '../components/NavComponent.vue'

const lang = inject('lang')
const mode = ref('text')
const textInput = ref('')
const outputResult = ref('')
const fileInput = ref(null)
const imagePreview = ref('')
const imageBase64 = ref('')

const translations = {
  zh: { title: 'Base64 转换器', subtitle: '文本与 Base64 互相转换，图片转 Base64', textMode: '文本模式', imageMode: '图片模式', input: '输入', output: '输出', encode: '编码', decode: '解码', clear: '清空', textPlaceholder: '输入要编码或解码的文本', outputPlaceholder: '结果将显示在这里', dropImage: '拖拽图片到此处', orClickUpload: '或点击上传', copyBase64: '复制 Base64' },
  en: { title: 'Base64 Converter', subtitle: 'Convert between text and Base64, image to Base64', textMode: 'Text Mode', imageMode: 'Image Mode', input: 'Input', output: 'Output', encode: 'Encode', decode: 'Decode', clear: 'Clear', textPlaceholder: 'Enter text to encode or decode', outputPlaceholder: 'Result will appear here', dropImage: 'Drop image here', orClickUpload: 'or click to upload', copyBase64: 'Copy Base64' }
}
function t(key) { return translations[lang.value]?.[key] || key }

function encodeText() {
  try {
    outputResult.value = btoa(unescape(encodeURIComponent(textInput.value)))
  } catch (e) {
    outputResult.value = 'Error: ' + e.message
  }
}

function decodeText() {
  try {
    outputResult.value = decodeURIComponent(escape(atob(textInput.value)))
  } catch (e) {
    outputResult.value = 'Error: ' + e.message
  }
}

function clearAll() {
  textInput.value = ''
  outputResult.value = ''
}

function triggerUpload() { fileInput.value?.click() }

function handleImageDrop(e) {
  const file = e.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) processImage(file)
}

function handleImageFile(e) {
  const file = e.target.files[0]
  if (file) processImage(file)
}

function processImage(file) {
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
    imageBase64.value = e.target.result
  }
  reader.readAsDataURL(file)
}

function copyBase64() {
  navigator.clipboard.writeText(imageBase64.value)
}
</script>

<style scoped>
.base64-tool { min-height: 100vh; background: var(--bg-primary); }
.tool-container { max-width: 900px; margin: 0 auto; padding: var(--space-12) var(--space-6); }
.tool-header { text-align: center; margin-bottom: var(--space-12); }
.tool-title { font-size: var(--text-4xl); font-weight: var(--font-bold); color: var(--text-primary); margin-bottom: var(--space-4); }
.tool-subtitle { font-size: var(--text-lg); color: var(--text-muted); }
.tool-main { display: flex; flex-direction: column; gap: var(--space-6); }
.tabs { display: flex; gap: var(--space-2); }
.tabs button { padding: var(--space-3) var(--space-6); background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md) var(--radius-md) 0 0; color: var(--text-primary); cursor: pointer; transition: all var(--transition-fast); }
.tabs button.active { background: var(--accent-primary); color: var(--ds-black); border-color: var(--accent-primary); }
.input-group { display: flex; flex-direction: column; gap: var(--space-2); }
.input-group label { font-size: var(--text-sm); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; }
.text-input { width: 100%; min-height: 150px; padding: var(--space-4); background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text-primary); font-family: 'JetBrains Mono', monospace; font-size: var(--text-sm); resize: vertical; }
.text-input.output { background: var(--bg-tertiary); }
.text-input.base64-output { min-height: 100px; word-break: break-all; }
.convert-actions { display: flex; gap: var(--space-2); }
.btn-action { flex: 1; padding: var(--space-3); background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text-primary); cursor: pointer; transition: all var(--transition-fast); }
.btn-action:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
.image-mode { display: flex; flex-direction: column; gap: var(--space-6); }
.upload-area { border: 2px dashed var(--border-subtle); border-radius: var(--radius-lg); padding: var(--space-8); text-align: center; cursor: pointer; transition: all var(--transition-normal); }
.upload-area:hover { border-color: var(--accent-primary); background: var(--ds-gold-pale); }
.upload-area p { color: var(--text-secondary); }
.upload-area .hint { font-size: var(--text-sm); color: var(--text-muted); }
.image-preview-section { text-align: center; }
.preview-image { max-width: 300px; max-height: 300px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); }
.btn-copy { margin-top: var(--space-4); padding: var(--space-3) var(--space-6); background: var(--accent-primary); color: var(--ds-black); border: none; border-radius: var(--radius-md); cursor: pointer; transition: all var(--transition-fast); }
.btn-copy:hover { transform: translateY(-2px); box-shadow: var(--shadow-gold); }
</style>
