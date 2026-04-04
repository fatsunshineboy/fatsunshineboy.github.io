<template>
  <div class="color-scheme-tool">
    <NavComponent />

    <!-- 背景装饰 -->
    <div class="chiral-bg">
      <div v-for="i in 5" :key="i" class="chiral-orb" :style="orbStyle[i]"></div>
    </div>

    <div class="tool-container">
      <header class="tool-header">
        <h1 class="tool-title">
          <span class="title-icon">🎨</span>
          {{ t('title') }}
        </h1>
        <p class="tool-subtitle">{{ t('subtitle') }}</p>
      </header>

      <main class="tool-main">
        <!-- 主题预设区 -->
        <section class="presets-section">
          <h2 class="section-title">
            <span class="section-icon">◈</span>
            {{ t('deathStrandingThemes') }}
          </h2>
          <div class="preset-grid">
            <div
              v-for="(preset, key) in dsPresets"
              :key="key"
              class="preset-card"
              :class="{ active: activePreset === key }"
              @click="applyPreset(key)"
            >
              <div class="preset-colors">
                <div
                  v-for="color in preset.colors"
                  :key="color"
                  class="preset-color-swatch"
                  :style="{ backgroundColor: color }"
                ></div>
              </div>
              <span class="preset-name">{{ t(preset.name) }}</span>
            </div>
          </div>
        </section>

        <!-- 自定义控制区 -->
        <section class="custom-section">
          <div class="controls-card">
            <div class="control-header">
              <h3>{{ t('customGenerator') }}</h3>
              <button @click="toggleAdvanced" class="btn-advanced">
                {{ advancedOpen ? '▼' : '▶' }} {{ t('advanced') }}
              </button>
            </div>

            <div class="control-grid">
              <div class="control-group">
                <label class="control-label">
                  <span class="label-icon">🎯</span>
                  {{ t('baseColor') }}
                </label>
                <div class="color-picker-wrapper">
                  <input type="color" v-model="baseColor" @input="generateScheme" class="color-input-large" />
                  <span class="color-hex-display">{{ baseColor }}</span>
                </div>
              </div>

              <div class="control-group">
                <label class="control-label">
                  <span class="label-icon">◈</span>
                  {{ t('mode') }}
                </label>
                <select v-model="schemeMode" @change="generateScheme" class="select-input">
                  <option value="complementary">{{ t('complementary') }}</option>
                  <option value="analogous">{{ t('analogous') }}</option>
                  <option value="triadic">{{ t('triadic') }}</option>
                  <option value="split-complementary">{{ t('splitComplementary') }}</option>
                  <option value="tetradic">{{ t('tetradic') }}</option>
                  <option value="monochromatic">{{ t('monochromatic') }}</option>
                </select>
              </div>

              <div v-if="advancedOpen" class="control-group advanced">
                <label class="control-label">
                  <span class="label-icon">🔆</span>
                  {{ t('saturation') }}
                </label>
                <input type="range" v-model="saturationMod" @input="generateScheme" min="-50" max="50" class="range-input" />
                <span class="range-value">{{ saturationMod > 0 ? '+' : '' }}{{ saturationMod }}%</span>
              </div>

              <div v-if="advancedOpen" class="control-group advanced">
                <label class="control-label">
                  <span class="label-icon">💡</span>
                  {{ t('lightness') }}
                </label>
                <input type="range" v-model="lightnessMod" @input="generateScheme" min="-50" max="50" class="range-input" />
                <span class="range-value">{{ lightnessMod > 0 ? '+' : '' }}{{ lightnessMod }}%</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 生成结果区 -->
        <section class="result-section">
          <div class="result-header">
            <h3 class="result-title">{{ t('generatedScheme') }}</h3>
            <div class="result-actions">
              <button @click="saveToFavorites" class="btn-action" :class="{ saved: isSaved }" :disabled="!canSave">
                <span class="btn-icon">{{ isSaved ? '♥' : '♡' }}</span>
                {{ isSaved ? t('saved') : t('save') }}
              </button>
              <button @click="exportScheme" class="btn-action">
                <span class="btn-icon">↓</span>
                {{ t('export') }}
              </button>
              <button @click="copyAllColors" class="btn-action">
                <span class="btn-icon">📋</span>
                {{ t('copyAll') }}
              </button>
            </div>
          </div>

          <div class="scheme-result">
            <div
              v-for="(color, index) in schemeColors"
              :key="index"
              class="color-card"
              :style="{ backgroundColor: color }"
              @click="copyColor(color, index)"
            >
              <div class="color-info">
                <span class="color-hex">{{ color }}</span>
                <span class="color-rgb">{{ getRgb(color) }}</span>
                <span class="color-hsl">{{ getHsl(color) }}</span>
              </div>
              <div class="color-actions">
                <span class="copy-hint">{{ t('clickToCopy') }}</span>
                <div class="color-index">{{ index + 1 }}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 收藏区 -->
        <section v-if="favorites.length > 0" class="favorites-section">
          <h2 class="section-title">
            <span class="section-icon">♥</span>
            {{ t('favorites') }} ({{ favorites.length }})
          </h2>
          <div class="favorites-grid">
            <div
              v-for="(fav, idx) in favorites"
              :key="idx"
              class="favorite-card"
              @click="loadFavorite(fav)"
            >
              <div class="fav-colors">
                <div
                  v-for="color in fav.colors"
                  :key="color"
                  class="fav-swatch"
                  :style="{ backgroundColor: color }"
                ></div>
              </div>
              <button @click.stop="removeFavorite(idx)" class="btn-remove" :title="t('remove')">✕</button>
            </div>
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
const baseColor = ref('#c4a35a')
const schemeMode = ref('complementary')
const schemeColors = ref([])
const activePreset = ref(null)
const advancedOpen = ref(false)
const saturationMod = ref(0)
const lightnessMod = ref(0)
const favorites = ref([])
const isSaved = ref(false)
const toast = ref({ show: false, message: '', type: 'success', icon: '✓' })

// 死亡搁浅主题预设
const dsPresets = {
  bridges: {
    name: 'theme.bridges',
    colors: ['#0a0a0a', '#1a1a1d', '#c4a35a', '#d4903c', '#f5f5f5']
  },
  timefall: {
    name: 'theme.timefall',
    colors: ['#0d1b2a', '#1b263b', '#415a77', '#778da9', '#e0e1dd']
  },
  hologram: {
    name: 'theme.hologram',
    colors: ['#0a0e1a', '#1a2332', '#4a90a4', '#64c8ff', '#f0f8ff']
  },
  beach: {
    name: 'theme.beach',
    colors: ['#2d132c', '#801336', '#c72c41', '#ee4540', '#fba534']
  },
  chiral: {
    name: 'theme.chiral',
    colors: ['#0d0d0d', '#1a1a2e', '#16213e', '#0f3460', '#e94560']
  },
  golden: {
    name: 'theme.golden',
    colors: ['#1a1a1d', '#3e3e42', '#8b7355', '#c4a35a', '#f5f5f5']
  },
  midnight: {
    name: 'theme.midnight',
    colors: ['#0a0a0f', '#1a1a2e', '#2d2d44', '#4a4a6a', '#7a7a9a']
  },
  amber: {
    name: 'theme.amber',
    colors: ['#1a120b', '#3d2817', '#6b4423', '#c4a35a', '#f5deb3']
  }
}

const translations = {
  zh: {
    title: '配色方案生成器',
    subtitle: '生成和谐的色彩组合，灵感来自死亡搁浅',
    deathStrandingThemes: '死亡搁浅主题',
    'theme.bridges': '布里吉斯组织',
    'theme.timefall': '时间雨',
    'theme.hologram': '全息投影',
    'theme.beach': '海滩',
    'theme.chiral': '开罗尔网络',
    'theme.golden': '金色绳索',
    'theme.midnight': '午夜',
    'theme.amber': '琥珀',
    customGenerator: '自定义生成器',
    advanced: '高级选项',
    baseColor: '基准颜色',
    mode: '配色模式',
    complementary: '互补色',
    analogous: '类似色',
    triadic: '三元色',
    splitComplementary: '分裂互补色',
    tetradic: '四元色',
    monochromatic: '单色',
    saturation: '饱和度调整',
    lightness: '明度调整',
    generatedScheme: '生成的配色方案',
    clickToCopy: '点击复制',
    save: '收藏',
    saved: '已收藏',
    export: '导出',
    copyAll: '复制全部',
    favorites: '我的收藏',
    remove: '移除',
    presetApplied: '已应用预设',
    colorCopied: '颜色已复制',
    allCopied: '所有颜色已复制',
    schemeSaved: '方案已收藏',
    schemeExported: '方案已导出'
  },
  en: {
    title: 'Color Scheme Generator',
    subtitle: 'Generate harmonious color combinations inspired by Death Stranding',
    deathStrandingThemes: 'Death Stranding Themes',
    'theme.bridges': 'Bridges',
    'theme.timefall': 'Timefall',
    'theme.hologram': 'Hologram',
    'theme.beach': 'The Beach',
    'theme.chiral': 'Chiral Network',
    'theme.golden': 'Golden Strand',
    'theme.midnight': 'Midnight',
    'theme.amber': 'Amber',
    customGenerator: 'Custom Generator',
    advanced: 'Advanced Options',
    baseColor: 'Base Color',
    mode: 'Mode',
    complementary: 'Complementary',
    analogous: 'Analogous',
    triadic: 'Triadic',
    splitComplementary: 'Split-Complementary',
    tetradic: 'Tetradic',
    monochromatic: 'Monochromatic',
    saturation: 'Saturation',
    lightness: 'Lightness',
    generatedScheme: 'Generated Scheme',
    clickToCopy: 'Click to copy',
    save: 'Save',
    saved: 'Saved',
    export: 'Export',
    copyAll: 'Copy All',
    favorites: 'Favorites',
    remove: 'Remove',
    presetApplied: 'Preset applied',
    colorCopied: 'Color copied',
    allCopied: 'All colors copied',
    schemeSaved: 'Scheme saved',
    schemeExported: 'Scheme exported'
  }
}

function t(key) { return translations[lang.value]?.[key] || key }

// 预计算装饰球样式
const orbStyle = computed(() => {
  const styles = {}
  for (let i = 1; i <= 5; i++) {
    styles[i] = {
      left: `${15 + i * 18}%`,
      animationDelay: `${i * 0.5}s`,
      animationDuration: `${4 + i}s`
    }
  }
  return styles
})

const canSave = computed(() => schemeColors.value.length > 0 && !isSaved.value)

function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
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

function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360 / 360
  s = Math.max(0, Math.min(100, s)) / 100
  l = Math.max(0, Math.min(100, l)) / 100
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
  const r = Math.round(hue2rgb(p, q, h + 1/3) * 255)
  const g = Math.round(hue2rgb(p, q, h) * 255)
  const b = Math.round(hue2rgb(p, q, h - 1/3) * 255)
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
}

function generateScheme() {
  const [h, s, l] = hexToHsl(baseColor.value)
  const colors = []
  const satAdj = saturationMod.value
  const lightAdj = lightnessMod.value

  switch (schemeMode.value) {
    case 'complementary':
      colors.push(
        hslToHex(h, s + satAdj, l + lightAdj),
        hslToHex(h + 180, s + satAdj, l + lightAdj)
      )
      break
    case 'analogous':
      colors.push(
        hslToHex(h - 30, s + satAdj, l + lightAdj),
        hslToHex(h, s + satAdj, l + lightAdj),
        hslToHex(h + 30, s + satAdj, l + lightAdj)
      )
      break
    case 'triadic':
      colors.push(
        hslToHex(h, s + satAdj, l + lightAdj),
        hslToHex(h + 120, s + satAdj, l + lightAdj),
        hslToHex(h + 240, s + satAdj, l + lightAdj)
      )
      break
    case 'split-complementary':
      colors.push(
        hslToHex(h, s + satAdj, l + lightAdj),
        hslToHex(h + 150, s + satAdj, l + lightAdj),
        hslToHex(h + 210, s + satAdj, l + lightAdj)
      )
      break
    case 'tetradic':
      colors.push(
        hslToHex(h, s + satAdj, l + lightAdj),
        hslToHex(h + 90, s + satAdj, l + lightAdj),
        hslToHex(h + 180, s + satAdj, l + lightAdj),
        hslToHex(h + 270, s + satAdj, l + lightAdj)
      )
      break
    case 'monochromatic':
      for (let i = -2; i <= 2; i++) {
        colors.push(hslToHex(h, s + satAdj, Math.min(95, Math.max(10, l + i * 10 + lightAdj))))
      }
      break
  }
  schemeColors.value = colors
  isSaved.value = false
}

function applyPreset(key) {
  activePreset.value = key
  const preset = dsPresets[key]
  if (preset.colors.length > 0) {
    baseColor.value = preset.colors[0]
  }
  showToast(t('presetApplied'), 'success', '✓')
  generateScheme()
}

function toggleAdvanced() {
  advancedOpen.value = !advancedOpen.value
}

function getRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${r}, ${g}, ${b})`
}

function getHsl(hex) {
  const [h, s, l] = hexToHsl(hex)
  return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`
}

function copyColor(color, index) {
  navigator.clipboard.writeText(color)
  showToast(`${t('colorCopied')} ${index + 1}`, 'success', '📋')
}

function copyAllColors() {
  const allColors = schemeColors.value.join(', ')
  navigator.clipboard.writeText(allColors)
  showToast(t('allCopied'), 'success', '📋')
}

function saveToFavorites() {
  if (schemeColors.value.length === 0) return
  favorites.value.push({
    mode: schemeMode.value,
    colors: [...schemeColors.value],
    baseColor: baseColor.value,
    savedAt: Date.now()
  })
  isSaved.value = true
  localStorage.setItem('colorSchemeFavorites', JSON.stringify(favorites.value))
  showToast(t('schemeSaved'), 'success', '♥')
}

function loadFavorite(fav) {
  schemeMode.value = fav.mode
  baseColor.value = fav.baseColor
  schemeColors.value = fav.colors
  generateScheme()
  showToast(t('presetApplied'), 'success', '✓')
}

function removeFavorite(idx) {
  favorites.value.splice(idx, 1)
  localStorage.setItem('colorSchemeFavorites', JSON.stringify(favorites.value))
}

function exportScheme() {
  const css = `:root {\n${schemeColors.value.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`
  const json = JSON.stringify({
    mode: schemeMode.value,
    baseColor: baseColor.value,
    colors: schemeColors.value,
    exportedAt: new Date().toISOString()
  }, null, 2)

  const blob = new Blob([`/* Death Stranding Color Scheme */\n\n${css}\n\n/* JSON Format:\n${json}\n*/`], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `color-scheme-${schemeMode.value}-${Date.now()}.txt`
  a.click()
  URL.revokeObjectURL(url)
  showToast(t('schemeExported'), 'success', '↓')
}

function showToast(message, type = 'success', icon = '✓') {
  toast.value = { show: true, message, type, icon }
  setTimeout(() => { toast.value.show = false }, 2000)
}

onMounted(() => {
  const saved = localStorage.getItem('colorSchemeFavorites')
  if (saved) {
    try {
      favorites.value = JSON.parse(saved)
    } catch (e) {
      console.error('Failed to load favorites')
    }
  }
  generateScheme()
})
</script>

<style scoped>
.color-scheme-tool {
  min-height: 100vh;
  background: var(--bg-primary);
  position: relative;
  overflow-x: hidden;
}

/* 开罗尔背景动画 */
.chiral-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.chiral-orb {
  position: absolute;
  bottom: -100px;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, var(--ds-timefall) 0%, transparent 70%);
  border-radius: 50%;
  animation: chiral-rise linear infinite;
  filter: blur(20px);
}

@keyframes chiral-rise {
  0% {
    transform: translateY(0) scale(0.5);
    opacity: 0;
  }
  10% {
    opacity: 0.3;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(-100vh) scale(1.5);
    opacity: 0;
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
  font-size: var(--text-3xl);
  filter: drop-shadow(0 0 10px var(--ds-gold-glow));
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
  font-size: var(--text-lg);
}

/* 预设区 */
.presets-section {
  background: linear-gradient(135deg, rgba(26, 26, 29, 0.8), rgba(45, 45, 48, 0.8));
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.preset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: var(--space-4);
}

.preset-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.preset-card:hover {
  border-color: var(--accent-primary);
  transform: translateY(-2px);
}

.preset-card.active {
  border-color: var(--accent-primary);
  box-shadow: 0 0 20px rgba(196, 163, 90, 0.3);
}

.preset-colors {
  display: flex;
  height: 60px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  margin-bottom: var(--space-2);
}

.preset-color-swatch {
  flex: 1;
  transition: flex var(--transition-fast);
}

.preset-color-swatch:hover {
  flex: 1.5;
}

.preset-name {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  text-align: center;
  letter-spacing: 0.05em;
}

/* 自定义控制区 */
.controls-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.control-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
}

.control-header h3 {
  font-size: var(--text-lg);
  color: var(--text-primary);
}

.btn-advanced {
  font-size: var(--text-sm);
  color: var(--accent-primary);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  transition: all var(--transition-fast);
}

.btn-advanced:hover {
  color: var(--accent-hover);
}

.control-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.control-group.advanced {
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-subtle);
}

.control-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.label-icon {
  font-size: var(--text-base);
}

.color-picker-wrapper {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.color-input-large {
  width: 60px;
  height: 45px;
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast);
}

.color-input-large:hover {
  border-color: var(--accent-primary);
}

.color-hex-display {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-sm);
  color: var(--accent-primary);
}

.select-input {
  padding: var(--space-3) var(--space-4);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

.select-input:focus {
  border-color: var(--accent-primary);
}

.range-input {
  width: 100%;
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  appearance: none;
  cursor: pointer;
}

.range-input::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  background: var(--accent-primary);
  border-radius: 50%;
  cursor: pointer;
  transition: transform var(--transition-fast);
}

.range-input::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.range-value {
  font-size: var(--text-xs);
  color: var(--accent-primary);
  text-align: right;
}

/* 结果区 */
.result-section {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
  gap: var(--space-4);
}

.result-title {
  font-size: var(--text-lg);
  color: var(--text-primary);
}

.result-actions {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.btn-action {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-action:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.btn-action.saved {
  background: var(--accent-primary);
  color: var(--ds-black);
  border-color: var(--accent-primary);
}

.btn-action:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-icon {
  font-size: var(--text-base);
}

.scheme-result {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  justify-content: center;
}

.color-card {
  width: 160px;
  height: 220px;
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: var(--space-4);
  cursor: pointer;
  transition: all var(--transition-normal);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.color-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.4) 100%);
  pointer-events: none;
}

.color-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border-color: var(--accent-primary);
}

.color-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  z-index: 1;
}

.color-hex {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--ds-white);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'JetBrains Mono', monospace;
}

.color-rgb,
.color-hsl {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'JetBrains Mono', monospace;
}

.color-actions {
  margin-top: var(--space-3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  z-index: 1;
}

.copy-hint {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.5);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.color-card:hover .copy-hint {
  opacity: 1;
}

.color-index {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: var(--ds-white);
}

/* 收藏区 */
.favorites-section {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--space-4);
}

.favorite-card {
  position: relative;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.favorite-card:hover {
  border-color: var(--accent-primary);
  transform: translateY(-2px);
}

.fav-colors {
  display: flex;
  height: 80px;
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.fav-swatch {
  flex: 1;
}

.btn-remove {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all var(--transition-fast);
}

.favorite-card:hover .btn-remove {
  opacity: 1;
}

.btn-remove:hover {
  background: #ef4444;
  border-color: #ef4444;
  color: var(--ds-white);
}

/* Toast */
.toast {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%) translateY(0);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--accent-primary);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  z-index: var(--z-tooltip);
  animation: toast-slide-in 0.3s ease;
}

.toast.success {
  border-color: var(--accent-primary);
}

.toast.error {
  border-color: #ef4444;
}

.toast-icon {
  font-size: var(--text-lg);
  color: var(--accent-primary);
}

.toast-message {
  font-size: var(--text-sm);
  color: var(--text-primary);
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

@keyframes toast-slide-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .tool-container {
    padding: var(--space-8) var(--space-4);
  }

  .preset-grid,
  .favorites-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }

  .control-grid {
    grid-template-columns: 1fr;
  }

  .result-actions {
    width: 100%;
  }

  .btn-action {
    flex: 1;
    justify-content: center;
  }
}
</style>
