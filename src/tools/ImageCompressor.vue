<template>
  <div class="image-compressor-tool">
    <NavComponent />
    <div class="tool-container">
      <header class="tool-header">
        <h1 class="tool-title">{{ t('title') }}</h1>
        <p class="tool-subtitle">{{ t('subtitle') }}</p>
      </header>
      <main class="tool-main">
        <div class="upload-area" @dragover.prevent @drop.prevent="handleDrop" @click="triggerUpload">
          <input ref="fileInput" type="file" accept="image/*" @change="handleFile" hidden />
          <div class="upload-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          </div>
          <p>{{ t('dragDrop') }}</p>
          <p class="hint">{{ t('orClick') }}</p>
        </div>
        <div v-if="imageLoaded" class="compressor-settings">
          <div class="setting-group">
            <label>{{ t('quality') }}: {{ quality }}%</label>
            <input type="range" v-model.number="quality" min="1" max="100" @input="compress" class="range-input" />
          </div>
          <div class="setting-group">
            <label>{{ t('format') }}</label>
            <select v-model="outputFormat" @change="compress" class="select-input">
              <option value="image/jpeg">JPEG</option>
              <option value="image/png">PNG</option>
              <option value="image/webp">WebP</option>
            </select>
          </div>
        </div>
        <div v-if="imageLoaded" class="result-container">
          <div class="image-card">
            <h4>{{ t('original') }}</h4>
            <img :src="originalImage" alt="Original" />
            <p class="image-size">{{ originalSize }}</p>
          </div>
          <div class="image-card">
            <h4>{{ t('compressed') }}</h4>
            <img :src="compressedImage" alt="Compressed" />
            <p class="image-size">{{ compressedSize }}</p>
            <p class="save-percent">{{ savePercent }}</p>
          </div>
        </div>
        <div v-if="compressedImage" class="download-actions">
          <button @click="downloadImage" class="btn-download">{{ t('download') }}</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import NavComponent from '../components/NavComponent.vue'

const lang = inject('lang')
const fileInput = ref(null)
const originalImage = ref('')
const compressedImage = ref('')
const originalSize = ref('')
const compressedSize = ref('')
const quality = ref(80)
const outputFormat = ref('image/jpeg')
const imageLoaded = ref(false)
const originalFile = ref(null)

const translations = {
  zh: { title: '图片压缩工具', subtitle: '在线压缩图片，保持质量的同时减小文件大小', dragDrop: '拖拽图片到此处', orClick: '或点击上传', quality: '质量', format: '格式', original: '原图', compressed: '压缩后', download: '下载图片' },
  en: { title: 'Image Compressor', subtitle: 'Compress images online while maintaining quality', dragDrop: 'Drag & drop image here', orClick: 'or click to upload', quality: 'Quality', format: 'Format', original: 'Original', compressed: 'Compressed', download: 'Download' }
}
function t(key) { return translations[lang.value]?.[key] || key }

const savePercent = computed(() => {
  if (!originalSize.value || !compressedSize.value) return ''
  const orig = parseFloat(originalSize.value)
  const comp = parseFloat(compressedSize.value)
  return `-${((orig - comp) / orig * 100).toFixed(1)}%`
})

function triggerUpload() { fileInput.value?.click() }

function handleDrop(e) {
  const file = e.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) processFile(file)
}

function handleFile(e) {
  const file = e.target.files[0]
  if (file) processFile(file)
}

function processFile(file) {
  originalFile.value = file
  originalSize.value = formatSize(file.size)
  const reader = new FileReader()
  reader.onload = (e) => {
    originalImage.value = e.target.result
    imageLoaded.value = true
    compress()
  }
  reader.readAsDataURL(file)
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1024 / 1024).toFixed(2) + ' MB'
}

function compress() {
  if (!originalImage.value) return
  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    compressedImage.value = canvas.toDataURL(outputFormat.value, quality.value / 100)
    const base64Length = compressedImage.value.length - (compressedImage.value.indexOf(',') + 1)
    compressedSize.value = formatSize(Math.round(base64Length * 0.75))
  }
  img.src = originalImage.value
}

function downloadImage() {
  const a = document.createElement('a')
  a.href = compressedImage.value
  a.download = 'compressed-image.' + outputFormat.value.split('/')[1]
  a.click()
}
</script>

<style scoped>
.image-compressor-tool { min-height: 100vh; background: var(--bg-primary); }
.tool-container { max-width: 900px; margin: 0 auto; padding: var(--space-12) var(--space-6); }
.tool-header { text-align: center; margin-bottom: var(--space-12); }
.tool-title { font-size: var(--text-4xl); font-weight: var(--font-bold); color: var(--text-primary); margin-bottom: var(--space-4); }
.tool-subtitle { font-size: var(--text-lg); color: var(--text-muted); }
.tool-main { display: flex; flex-direction: column; gap: var(--space-6); }
.upload-area { border: 2px dashed var(--border-subtle); border-radius: var(--radius-lg); padding: var(--space-12); text-align: center; cursor: pointer; transition: all var(--transition-normal); }
.upload-area:hover { border-color: var(--accent-primary); background: var(--ds-gold-pale); }
.upload-icon { color: var(--accent-primary); margin-bottom: var(--space-4); }
.upload-area p { color: var(--text-secondary); }
.upload-area .hint { font-size: var(--text-sm); color: var(--text-muted); }
.compressor-settings { display: flex; justify-content: center; gap: var(--space-8); flex-wrap: wrap; padding: var(--space-6); background: var(--bg-secondary); border-radius: var(--radius-lg); }
.setting-group { display: flex; flex-direction: column; gap: var(--space-2); align-items: center; }
.setting-group label { font-size: var(--text-sm); color: var(--text-muted); }
.range-input { width: 200px; }
.select-input { padding: var(--space-2) var(--space-4); background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary); }
.result-container { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6); }
@media (max-width: 768px) { .result-container { grid-template-columns: 1fr; } }
.image-card { background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: var(--space-4); text-align: center; }
.image-card h4 { font-size: var(--text-sm); color: var(--text-muted); margin-bottom: var(--space-3); }
.image-card img { max-width: 100%; border-radius: var(--radius-md); }
.image-size { font-size: var(--text-sm); color: var(--text-muted); margin-top: var(--space-2); }
.save-percent { font-size: var(--text-sm); color: #22c55e; font-weight: var(--font-semibold); }
.download-actions { text-align: center; }
.btn-download { padding: var(--space-4) var(--space-8); background: var(--accent-primary); color: var(--ds-black); border: none; border-radius: var(--radius-md); font-size: var(--text-base); font-weight: var(--font-semibold); cursor: pointer; transition: all var(--transition-normal); }
.btn-download:hover { transform: translateY(-2px); box-shadow: var(--shadow-gold); }
</style>
