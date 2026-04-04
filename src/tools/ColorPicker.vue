<template>
  <div class="color-picker-tool">
    <NavComponent />

    <!-- 背景装饰 -->
    <div class="aurora-bg">
      <div v-for="i in 3" :key="i" class="aurora-band" :style="auroraStyle[i]"></div>
    </div>

    <div class="tool-container">
      <header class="tool-header">
        <h1 class="tool-title">
          <span class="title-icon">◈</span>
          {{ t('title') }}
        </h1>
        <p class="tool-subtitle">{{ t('subtitle') }}</p>
      </header>

      <main class="tool-main">
        <!-- 主取色区 -->
        <section class="picker-section">
          <div class="main-display" :style="{ backgroundColor: currentColor }">
            <div class="display-overlay">
              <div class="color-name-display">{{ getColorName(currentColor) }}</div>
            </div>
          </div>

          <div class="color-info-panel">
            <div class="color-preview-ring" :style="{ backgroundColor: currentColor }">
              <div class="ring-inner"></div>
            </div>

            <div class="color-inputs">
              <div class="input-group">
                <label class="input-label">
                  <span class="label-icon">◼</span>
                  HEX
                </label>
                <input v-model="hexValue" @change="updateFromHex" class="color-input hex" />
                <button @click="copyToClipboard(currentColor)" class="btn-copy-small" :title="t('copy')">📋</button>
              </div>

              <div class="input-group">
                <label class="input-label">
                  <span class="label-icon">◉</span>
                  RGB
                </label>
                <input v-model="rgbValue" @change="updateFromRgb" class="color-input rgb" />
                <button @click="copyToClipboard(rgbValue)" class="btn-copy-small" :title="t('copy')">📋</button>
              </div>

              <div class="input-group">
                <label class="input-label">
                  <span class="label-icon">◐</span>
                  HSL
                </label>
                <input v-model="hslValue" @change="updateFromHsl" class="color-input hsl" />
                <button @click="copyToClipboard(hslValue)" class="btn-copy-small" :title="t('copy')">📋</button>
              </div>
            </div>
          </div>

          <div class="picker-actions">
            <button ref="pickerBtn" class="btn-picker" @click="startPicking" :class="{ picking: isPicking }">
              <svg class="picker-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <span>{{ isPicking ? t('picking') : t('pickColor') }}</span>
            </button>
            <p class="picker-hint">{{ t('hint') }}</p>
          </div>
        </section>

        <!-- 调色盘 -->
        <section class="palette-section">
          <h2 class="section-title">
            <span class="section-icon">◈</span>
            {{ t('palette') }}
          </h2>

          <div class="palette-grid">
            <div
              v-for="row in paletteColors"
              :key="row[0]"
              class="palette-row"
            >
              <div
                v-for="color in row"
                :key="color"
                class="palette-swatch"
                :style="{ backgroundColor: color }"
                @click="selectColor(color)"
                :class="{ selected: currentColor === color }"
              >
                <span v-if="currentColor === color" class="swatch-check">✓</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 颜色和谐 -->
        <section class="harmony-section">
          <h2 class="section-title">
            <span class="section-icon">◐</span>
            {{ t('harmonies') }}
          </h2>

          <div class="harmony-tabs">
            <button
              v-for="mode in harmonyModes"
              :key="mode.value"
              :class="{ active: harmonyMode === mode.value }"
              @click="harmonyMode = mode.value; generateHarmonies()"
              class="harmony-tab"
            >
              {{ t(mode.label) }}
            </button>
          </div>

          <div class="harmony-colors">
            <div
              v-for="(color, index) in harmonyColors"
              :key="index"
              class="harmony-card"
              :style="{ backgroundColor: color }"
              @click="selectColor(color)"
            >
              <div class="harmony-info">
                <span class="harmony-hex">{{ color }}</span>
                <span class="harmony-ratio">{{ getLuminance(color) }}</span>
              </div>
              <div class="harmony-label">{{ t(harmonyLabels[index]) }}</div>
            </div>
          </div>
        </section>

        <!-- 颜色历史 -->
        <section class="history-section">
          <h2 class="section-title">
            <span class="section-icon">♥</span>
            {{ t('history') }} ({{ colorHistory.length }})
          </h2>

          <div v-if="colorHistory.length > 0" class="history-grid">
            <div
              v-for="(color, index) in colorHistory"
              :key="index"
              class="history-item"
              :style="{ backgroundColor: color }"
              @click="selectColor(color)"
              @contextmenu.prevent="removeColor(index)"
            >
              <span class="history-hex">{{ color }}</span>
              <button class="btn-remove-history" @click.stop="removeColor(index)">×</button>
            </div>
          </div>

          <div v-else class="history-empty">
            <span class="empty-icon">◦</span>
            <p>{{ t('noHistory') }}</p>
          </div>

          <div v-if="colorHistory.length > 0" class="history-actions">
            <button @click="exportPalette" class="btn-action">
              <span class="btn-icon">↓</span>
              {{ t('exportPalette') }}
            </button>
            <button @click="clearHistory" class="btn-action danger">
              <span class="btn-icon">×</span>
              {{ t('clearHistory') }}
            </button>
          </div>
        </section>

        <!-- 收藏面板 -->
        <section class="favorites-section">
          <h2 class="section-title">
            <span class="section-icon">♡</span>
            {{ t('favorites') }} ({{ favorites.length }})
          </h2>

          <div v-if="favorites.length > 0" class="favorites-grid">
            <div
              v-for="(fav, index) in favorites"
              :key="index"
              class="favorite-card"
            >
              <div class="fav-preview" :style="{ backgroundColor: fav.color }"></div>
              <div class="fav-info">
                <input v-model="fav.name" class="fav-name" :placeholder="t('unnamed')" />
                <span class="fav-hex">{{ fav.color }}</span>
              </div>
              <button @click="selectColor(fav.color)" class="btn-use">
                <span class="btn-icon">↗</span>
                {{ t('use') }}
              </button>
              <button @click="removeFavorite(index)" class="btn-delete">
                <span class="btn-icon">×</span>
              </button>
            </div>
          </div>

          <div v-else class="favorites-empty">
            <span class="empty-icon">♡</span>
            <p>{{ t('noFavorites') }}</p>
          </div>

          <div class="fav-actions">
            <button @click="addToFavorites" class="btn-gold" :disabled="!currentColor">
              <span class="btn-icon">♡</span>
              {{ t('saveToFavorites') }}
            </button>
          </div>
        </section>
      </main>
    </div>

    <!-- Toast 提示 -->
    <transition name="toast">
      <div v-if="toast.show" class="toast" :class="toast.type">
        <span class="toast-icon">{{ toast.icon }}</span>
        <span class="toast-message">{{ toast.message }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import NavComponent from '../components/NavComponent.vue'

const lang = inject('lang')
const pickerBtn = ref(null)
const currentColor = ref('#c4a35a')
const colorHistory = ref([])
const favorites = ref([])
const isPicking = ref(false)
const harmonyMode = ref('complementary')
const harmonyColors = ref([])
const toast = ref({ show: false, message: '', type: 'success', icon: '✓' })

// 预设调色盘
const paletteColors = [
  ['#0a0a0a', '#1a1a1d', '#2d2d30', '#3e3e42', '#4a4a5a', '#5a5a6a'],
  ['#c4a35a', '#d4903c', '#8b7355', '#6b5a3a', '#a08050', '#e0c080'],
  ['#6495ed', '#4a7cba', '#3a5a8a', '#2a4a6a', '#5a7a9a', '#7a9aba'],
  ['#f5f5f5', '#e5e5e5', '#d5d5d5', '#c5c5c5', '#b5b5b5', '#a5a5a5'],
  ['#2d132c', '#801336', '#c72c41', '#ee4540', '#fba534', '#ffda3e']
]

const harmonyModes = [
  { value: 'complementary', label: 'h.comp' },
  { value: 'analogous', label: 'h.analogous' },
  { value: 'triadic', label: 'h.triadic' },
  { value: 'split', label: 'h.split' },
  { value: 'monochromatic', label: 'h.mono' }
]

const harmonyLabels = ['base', 'h1', 'h2', 'h3', 'h4', 'h5']

const translations = {
  zh: {
    title: '全屏取色器',
    subtitle: '从屏幕任意位置吸取颜色，支持多种格式',
    pickColor: '吸取颜色',
    picking: '正在取色...',
    hint: '点击按钮后，在页面任意位置点击即可取色',
    copy: '复制',
    palette: '调色盘',
    harmonies: '和谐配色',
    'h.comp': '互补',
    'h.analogous': '类似色',
    'h.triadic': '三元',
    'h.split': '分裂互补',
    'h.mono': '单色',
    base: '基色',
    h1: '颜色 1',
    h2: '颜色 2',
    h3: '颜色 3',
    h4: '颜色 4',
    h5: '颜色 5',
    history: '颜色历史',
    noHistory: '暂无历史颜色',
    clearHistory: '清空历史',
    exportPalette: '导出调色板',
    favorites: '收藏夹',
    noFavorites: '暂无收藏',
    saveToFavorites: '收藏当前颜色',
    use: '使用',
    unnamed: '未命名',
    colorCopied: '颜色已复制',
    colorSaved: '颜色已收藏',
    paletteExported: '调色板已导出'
  },
  en: {
    title: 'Color Picker',
    subtitle: 'Pick colors from anywhere on screen',
    pickColor: 'Pick Color',
    picking: 'Picking...',
    hint: 'Click button then click anywhere to pick a color',
    copy: 'Copy',
    palette: 'Palette',
    harmonies: 'Color Harmonies',
    'h.comp': 'Complementary',
    'h.analogous': 'Analogous',
    'h.triadic': 'Triadic',
    'h.split': 'Split-Comp',
    'h.mono': 'Monochromatic',
    base: 'Base',
    h1: 'Color 1',
    h2: 'Color 2',
    h3: 'Color 3',
    h4: 'Color 4',
    h5: 'Color 5',
    history: 'History',
    noHistory: 'No history colors',
    clearHistory: 'Clear History',
    exportPalette: 'Export Palette',
    favorites: 'Favorites',
    noFavorites: 'No favorites',
    saveToFavorites: 'Save to Favorites',
    use: 'Use',
    unnamed: 'Unnamed',
    colorCopied: 'Color copied',
    colorSaved: 'Color saved',
    paletteExported: 'Palette exported'
  }
}

function t(key) {
  return translations[lang.value]?.[key] || key
}

// 极光背景样式
const auroraStyle = computed(() => {
  return {
    1: {
      left: '10%',
      animationDelay: '0s',
      background: 'radial-gradient(ellipse at center, rgba(100, 149, 237, 0.15) 0%, transparent 70%)'
    },
    2: {
      left: '50%',
      animationDelay: '2s',
      background: 'radial-gradient(ellipse at center, rgba(196, 163, 90, 0.1) 0%, transparent 70%)'
    },
    3: {
      left: '90%',
      animationDelay: '4s',
      background: 'radial-gradient(ellipse at center, rgba(100, 200, 255, 0.12) 0%, transparent 70%)'
    }
  }
})

const hexValue = computed({
  get: () => currentColor.value,
  set: (val) => { currentColor.value = val }
})

const rgbValue = computed(() => {
  const hex = currentColor.value.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  return `rgb(${r}, ${g}, ${b})`
})

const hslValue = computed(() => {
  const hex = currentColor.value.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16) / 255
  const g = parseInt(hex.substr(2, 2), 16) / 255
  const b = parseInt(hex.substr(4, 2), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
})

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return [h * 360, s * 100, l * 100]
}

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100
  let r, g, b
  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

function generateHarmonies() {
  const hex = currentColor.value
  const [h, s, l] = rgbToHsl(...hexToRgb(hex))

  switch (harmonyMode.value) {
    case 'complementary':
      harmonyColors.value = [hex, hslToHex((h + 180) % 360, s, l)]
      break
    case 'analogous':
      harmonyColors.value = [
        hslToHex((h - 30 + 360) % 360, s, l),
        hex,
        hslToHex((h + 30) % 360, s, l)
      ]
      break
    case 'triadic':
      harmonyColors.value = [
        hex,
        hslToHex((h + 120) % 360, s, l),
        hslToHex((h + 240) % 360, s, l)
      ]
      break
    case 'split':
      harmonyColors.value = [
        hex,
        hslToHex((h + 150) % 360, s, l),
        hslToHex((h + 210) % 360, s, l)
      ]
      break
    case 'monochromatic':
      harmonyColors.value = [
        hslToHex(h, s, Math.max(0.1, l - 0.2)),
        hslToHex(h, s, l - 0.1),
        hex,
        hslToHex(h, s, l + 0.1),
        hslToHex(h, s, Math.min(0.9, l + 0.2))
      ]
      break
  }
}

function hslToHex(h, s, l) {
  const [r, g, b] = hslToRgb(h, s, l)
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
}

function getLuminance(hex) {
  const [r, g, b] = hexToRgb(hex)
  const a = [r, g, b].map(v => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  const lum = a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
  return lum.toFixed(2)
}

function getColorName(hex) {
  // 简单的颜色命名
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  if (r > 200 && g > 200 && b > 200) return 'White'
  if (r < 50 && g < 50 && b < 50) return 'Black'
  if (r > 180 && g < 100 && b < 100) return 'Red'
  if (r > 180 && g > 180 && b < 100) return 'Yellow'
  if (r < 100 && g > 180 && b < 100) return 'Green'
  if (r < 100 && g < 100 && b > 180) return 'Blue'
  if (r > 180 && g < 100 && b > 180) return 'Magenta'
  if (r > 180 && g > 150 && b < 100) return 'Orange'
  if (r > 150 && g > 150 && b > 150) return 'Light Gray'
  if (r < 100 && g < 100 && b < 100) return 'Dark Gray'
  return 'Custom Color'
}

function updateFromHex() {
  if (/^#[0-9A-F]{6}$/i.test(hexValue.value)) {
    addToHistory(hexValue.value)
    generateHarmonies()
  }
}

function updateFromRgb() {
  const match = rgbValue.value.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
  if (match) {
    currentColor.value = rgbToHex(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]))
    addToHistory(currentColor.value)
    generateHarmonies()
  }
}

function updateFromHsl() {
  const match = hslValue.value.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
  if (match) {
    const [r, g, b] = hslToRgb(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]))
    currentColor.value = rgbToHex(r, g, b)
    addToHistory(currentColor.value)
    generateHarmonies()
  }
}

function selectColor(color) {
  currentColor.value = color
  generateHarmonies()
}

function addToHistory(color) {
  if (!colorHistory.value.includes(color)) {
    colorHistory.value.unshift(color)
    if (colorHistory.value.length > 24) {
      colorHistory.value.pop()
    }
    localStorage.setItem('colorPickerHistory', JSON.stringify(colorHistory.value))
  }
}

function removeColor(index) {
  colorHistory.value.splice(index, 1)
  localStorage.setItem('colorPickerHistory', JSON.stringify(colorHistory.value))
}

function clearHistory() {
  colorHistory.value = []
  localStorage.removeItem('colorPickerHistory')
}

function addToFavorites() {
  const name = prompt(lang.value === 'zh' ? '输入颜色名称：' : 'Enter color name:')
  favorites.value.unshift({
    color: currentColor.value,
    name: name || `Color ${favorites.value.length + 1}`
  })
  localStorage.setItem('colorPickerFavorites', JSON.stringify(favorites.value))
  showToast(t('colorSaved'), 'success', '♡')
}

function removeFavorite(index) {
  favorites.value.splice(index, 1)
  localStorage.setItem('colorPickerFavorites', JSON.stringify(favorites.value))
}

function exportPalette() {
  const css = `:root {\n${colorHistory.value.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`
  const blob = new Blob([`/* Color Palette */\n\n${css}\n`], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `color-palette-${Date.now()}.txt`
  a.click()
  URL.revokeObjectURL(url)
  showToast(t('paletteExported'), 'success', '↓')
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
  showToast(t('colorCopied'), 'success', '📋')
}

function showToast(message, type = 'success', icon = '✓') {
  toast.value = { show: true, message, type, icon }
  setTimeout(() => { toast.value.show = false }, 2000)
}

async function startPicking() {
  if ('EyeDropper' in window) {
    try {
      isPicking.value = true
      const EyeDropperClass = window.EyeDropper
      const eyeDropper = new EyeDropperClass()
      const result = await eyeDropper.open()
      currentColor.value = result.sRGBHex
      addToHistory(result.sRGBHex)
      generateHarmonies()
    } catch (e) {
      console.log('取色取消')
    } finally {
      isPicking.value = false
    }
  } else {
    showToast(lang.value === 'zh' ? '请使用 Chrome 或 Edge 浏览器' : 'Browser not supported', 'error', '⚠')
  }
}

onMounted(() => {
  const savedHistory = localStorage.getItem('colorPickerHistory')
  const savedFavorites = localStorage.getItem('colorPickerFavorites')
  if (savedHistory) {
    colorHistory.value = JSON.parse(savedHistory)
  }
  if (savedFavorites) {
    favorites.value = JSON.parse(savedFavorites)
  }
  generateHarmonies()
})
</script>

<style scoped>
.color-picker-tool {
  min-height: 100vh;
  background: var(--bg-primary);
  position: relative;
  overflow-x: hidden;
}

/* 极光背景 */
.aurora-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.aurora-band {
  position: absolute;
  top: -50%;
  width: 40%;
  height: 200%;
  filter: blur(80px);
  animation: aurora-wave 15s ease-in-out infinite;
  opacity: 0.5;
}

@keyframes aurora-wave {
  0%, 100% {
    transform: translateX(0) rotate(0deg);
  }
  50% {
    transform: translateX(50px) rotate(5deg);
  }
}

.tool-container {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-12) var(--space-6);
}

.tool-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.tool-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.title-icon {
  color: var(--accent-primary);
  font-size: var(--text-3xl);
}

.tool-subtitle {
  font-size: var(--text-lg);
  color: var(--text-muted);
}

.tool-main {
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
}

/* 章节标题 */
.section-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-4);
  letter-spacing: 0.1em;
}

.section-icon {
  color: var(--accent-primary);
}

/* 主取色区 */
.picker-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.main-display {
  height: 250px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s;
}

.display-overlay {
  text-align: center;
  padding: var(--space-6);
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-md);
}

.color-name-display {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--ds-white);
  letter-spacing: 0.2em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.color-info-panel {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding: var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}

.color-preview-ring {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.ring-inner {
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background: inherit;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.color-inputs {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.input-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.label-icon {
  font-size: var(--text-sm);
  color: var(--accent-primary);
}

.color-input {
  padding: var(--space-3);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-sm);
  transition: border-color var(--transition-fast);
}

.color-input:focus {
  border-color: var(--accent-primary);
  outline: none;
}

.btn-copy-small {
  padding: var(--space-2);
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: var(--text-base);
}

.btn-copy-small:hover {
  border-color: var(--accent-primary);
  background: var(--ds-gold-pale);
}

.picker-actions {
  text-align: center;
}

.btn-picker {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-8);
  background: var(--accent-primary);
  color: var(--ds-black);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.btn-picker:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-gold);
}

.btn-picker.picking {
  background: var(--ds-stone);
  cursor: wait;
}

.picker-icon {
  animation: spin 2s linear infinite;
}

.btn-picker.picking .picker-icon {
  animation: none;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.picker-hint {
  margin-top: var(--space-3);
  font-size: var(--text-sm);
  color: var(--text-muted);
}

/* 调色盘区 */
.palette-section {
  padding: var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}

.palette-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.palette-row {
  display: flex;
  gap: var(--space-2);
}

.palette-swatch {
  flex: 1;
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.palette-swatch:hover {
  transform: scale(1.05);
  border-color: var(--accent-primary);
}

.palette-swatch.selected {
  border-color: var(--accent-primary);
  box-shadow: 0 0 20px var(--ds-gold-glow);
}

.swatch-check {
  color: var(--ds-white);
  font-size: var(--text-xl);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* 和谐配色区 */
.harmony-section {
  padding: var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}

.harmony-tabs {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
}

.harmony-tab {
  padding: var(--space-2) var(--space-4);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: var(--text-sm);
}

.harmony-tab:hover {
  border-color: var(--accent-primary);
  color: var(--text-primary);
}

.harmony-tab.active {
  background: var(--accent-primary);
  color: var(--ds-black);
  border-color: var(--accent-primary);
}

.harmony-colors {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.harmony-card {
  flex: 1;
  min-width: 120px;
  height: 150px;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: var(--space-4);
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
}

.harmony-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.harmony-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  z-index: 1;
}

.harmony-hex {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--ds-white);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'JetBrains Mono', monospace;
}

.harmony-ratio {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.6);
}

.harmony-label {
  margin-top: var(--space-2);
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* 历史区 */
.history-section {
  padding: var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}

.history-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.history-item {
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  position: relative;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.history-item:hover {
  transform: scale(1.05);
  border-color: var(--accent-primary);
}

.history-hex {
  font-size: 9px;
  color: var(--ds-white);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  font-family: 'JetBrains Mono', monospace;
  background: rgba(0, 0, 0, 0.5);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
}

.btn-remove-history {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: var(--ds-white);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-fast);
  font-size: var(--text-sm);
}

.history-item:hover .btn-remove-history {
  opacity: 1;
}

.btn-remove-history:hover {
  background: #ef4444;
}

.history-empty,
.favorites-empty {
  text-align: center;
  padding: var(--space-12);
  color: var(--text-muted);
}

.empty-icon {
  font-size: var(--text-4xl);
  display: block;
  margin-bottom: var(--space-4);
  opacity: 0.5;
}

.history-actions,
.fav-actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

.btn-action {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: var(--text-sm);
}

.btn-action:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.btn-action.danger:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.btn-icon {
  font-size: var(--text-base);
}

/* 收藏区 */
.favorites-section {
  padding: var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.favorite-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.favorite-card:hover {
  border-color: var(--accent-primary);
}

.fav-preview {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  flex-shrink: 0;
}

.fav-info {
  flex: 1;
  min-width: 0;
}

.fav-name {
  display: block;
  width: 100%;
  padding: var(--space-1);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-size: var(--text-sm);
  margin-bottom: var(--space-1);
}

.fav-name:focus {
  outline: none;
  border-color: var(--accent-primary);
}

.fav-hex {
  font-size: 10px;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
}

.btn-use,
.btn-delete {
  padding: var(--space-2);
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-use:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.btn-delete:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.btn-gold {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  background: var(--accent-primary);
  color: var(--ds-black);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-weight: var(--font-semibold);
}

.btn-gold:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-gold);
}

.btn-gold:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--accent-primary);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  z-index: var(--z-tooltip);
  animation: toast-in 0.3s ease;
}

.toast-icon {
  font-size: var(--text-lg);
}

.toast-message {
  font-size: var(--text-sm);
  color: var(--text-primary);
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

/* 响应式 */
@media (max-width: 768px) {
  .color-inputs {
    grid-template-columns: 1fr;
  }

  .color-info-panel {
    flex-direction: column;
  }

  .harmony-colors {
    flex-direction: column;
  }

  .harmony-card {
    min-width: 100%;
  }

  .history-grid,
  .favorites-grid {
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  }
}
</style>
