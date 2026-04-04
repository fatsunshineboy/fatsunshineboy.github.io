<template>
  <div class="css-tool">
    <NavComponent />

    <!-- 背景装饰 -->
    <div class="holographic-bg">
      <div v-for="i in 3" :key="i" class="hologram-ring" :style="ringStyle[i]"></div>
    </div>

    <div class="tool-container">
      <header class="tool-header">
        <h1 class="tool-title">
          <span class="title-icon">⬡</span>
          {{ t('title') }}
        </h1>
        <p class="tool-subtitle">{{ t('subtitle') }}</p>
      </header>

      <main class="tool-main">
        <!-- 标签切换 -->
        <div class="tabs-wrapper">
          <div class="tabs">
            <button
              :class="{ active: generator === 'shadow' }"
              @click="generator = 'shadow'"
              class="tab-btn"
            >
              <span class="tab-icon">◈</span>
              {{ t('shadow') }}
            </button>
            <button
              :class="{ active: generator === 'border' }"
              @click="generator = 'border'"
              class="tab-btn"
            >
              <span class="tab-icon">◯</span>
              {{ t('borderRadius') }}
            </button>
            <button
              :class="{ active: generator === 'animation' }"
              @click="generator = 'animation'"
              class="tab-btn"
            >
              <span class="tab-icon">⟳</span>
              {{ t('animation') }}
            </button>
            <button
              :class="{ active: generator === 'gradient' }"
              @click="generator = 'gradient'"
              class="tab-btn"
            >
              <span class="tab-icon">▤</span>
              {{ t('gradient') }}
            </button>
            <button
              :class="{ active: generator === 'filter' }"
              @click="generator = 'filter'"
              class="tab-btn"
            >
              <span class="tab-icon">◫</span>
              {{ t('filter') }}
            </button>
          </div>
        </div>

        <!-- 阴影生成器 -->
        <div v-if="generator === 'shadow'" class="generator-section">
          <div class="section-header">
            <h2>{{ t('boxShadowGenerator') }}</h2>
            <div class="preset-buttons">
              <button @click="applyShadowPreset('soft')" class="btn-preset">{{ t('soft') }}</button>
              <button @click="applyShadowPreset('medium')" class="btn-preset">{{ t('medium') }}</button>
              <button @click="applyShadowPreset('strong')" class="btn-preset">{{ t('strong') }}</button>
              <button @click="applyShadowPreset('glow')" class="btn-preset">{{ t('glow') }}</button>
            </div>
          </div>

          <div class="settings-grid">
            <div class="setting-item">
              <label class="setting-label">
                <span class="label-icon">↔</span>
                {{ t('offsetX') }}
              </label>
              <input type="range" v-model.number="shadowX" @input="updateCSS" min="-100" max="100" class="range-input" />
              <span class="range-display">{{ shadowX }}px</span>
            </div>
            <div class="setting-item">
              <label class="setting-label">
                <span class="label-icon">↕</span>
                {{ t('offsetY') }}
              </label>
              <input type="range" v-model.number="shadowY" @input="updateCSS" min="-100" max="100" class="range-input" />
              <span class="range-display">{{ shadowY }}px</span>
            </div>
            <div class="setting-item">
              <label class="setting-label">
                <span class="label-icon">◐</span>
                {{ t('blur') }}
              </label>
              <input type="range" v-model.number="shadowBlur" @input="updateCSS" min="0" max="100" class="range-input" />
              <span class="range-display">{{ shadowBlur }}px</span>
            </div>
            <div class="setting-item">
              <label class="setting-label">
                <span class="label-icon">◫</span>
                {{ t('spread') }}
              </label>
              <input type="range" v-model.number="shadowSpread" @input="updateCSS" min="-50" max="50" class="range-input" />
              <span class="range-display">{{ shadowSpread }}px</span>
            </div>
            <div class="setting-item">
              <label class="setting-label">
                <span class="label-icon">🎨</span>
                {{ t('color') }}
              </label>
              <input type="color" v-model="shadowColor" @input="updateCSS" class="color-input" />
            </div>
            <div class="setting-item">
              <label class="setting-label checkbox-label">
                <input type="checkbox" v-model="shadowInset" @change="updateCSS" class="checkbox-input" />
                {{ t('inset') }}
              </label>
            </div>
          </div>

          <div class="preview-container">
            <div class="preview-box" :style="shadowPreviewStyle"></div>
            <div class="preview-label">{{ t('preview') }}</div>
          </div>
        </div>

        <!-- 圆角生成器 -->
        <div v-if="generator === 'border'" class="generator-section">
          <div class="section-header">
            <h2>{{ t('borderRadiusGenerator') }}</h2>
            <div class="preset-buttons">
              <button @click="applyBorderPreset('square')" class="btn-preset">{{ t('square') }}</button>
              <button @click="applyBorderPreset('rounded')" class="btn-preset">{{ t('rounded') }}</button>
              <button @click="applyBorderPreset('pill')" class="btn-preset">{{ t('pill') }}</button>
              <button @click="applyBorderPreset('blob')" class="btn-preset">{{ t('blob') }}</button>
            </div>
          </div>

          <div class="border-controls">
            <div class="border-visual">
              <svg viewBox="0 0 200 200" class="border-svg">
                <rect
                  :x="20 + borderRadiusTL / 2"
                  :y="20 + borderRadiusTL / 2"
                  :width="160 - borderRadiusTL - borderRadiusTR"
                  :height="160 - borderRadiusTL - borderRadiusBL"
                  :rx="Math.min(borderRadiusTL, borderRadiusTR, borderRadiusBL) / 2"
                  :ry="Math.min(borderRadiusTL, borderRadiusTR, borderRadiusBL) / 2"
                  class="border-rect"
                  :style="borderRectStyle"
                />
                <!-- 控制点 -->
                <circle cx="40" cy="40" r="8" class="control-point tl" :style="{ transform: `translate(${borderRadiusTL}px, ${borderRadiusTL}px)` }" />
                <circle cx="160" cy="40" r="8" class="control-point tr" :style="{ transform: `translate(${-borderRadiusTR}px, ${borderRadiusTR}px)` }" />
                <circle cx="160" cy="160" r="8" class="control-point br" :style="{ transform: `translate(${-borderRadiusBR}px, ${-borderRadiusBR}px)` }" />
                <circle cx="40" cy="160" r="8" class="control-point bl" :style="{ transform: `translate(${borderRadiusBL}px, ${-borderRadiusBL}px)` }" />
              </svg>
            </div>

            <div class="border-sliders">
              <div class="slider-group">
                <label>{{ t('topLeft') }}</label>
                <input type="range" v-model.number="borderRadiusTL" @input="updateCSS" min="0" max="100" class="range-input" />
                <span class="range-display">{{ borderRadiusTL }}px</span>
              </div>
              <div class="slider-group">
                <label>{{ t('topRight') }}</label>
                <input type="range" v-model.number="borderRadiusTR" @input="updateCSS" min="0" max="100" class="range-input" />
                <span class="range-display">{{ borderRadiusTR }}px</span>
              </div>
              <div class="slider-group">
                <label>{{ t('bottomRight') }}</label>
                <input type="range" v-model.number="borderRadiusBR" @input="updateCSS" min="0" max="100" class="range-input" />
                <span class="range-display">{{ borderRadiusBR }}px</span>
              </div>
              <div class="slider-group">
                <label>{{ t('bottomLeft') }}</label>
                <input type="range" v-model.number="borderRadiusBL" @input="updateCSS" min="0" max="100" class="range-input" />
                <span class="range-display">{{ borderRadiusBL }}px</span>
              </div>
            </div>
          </div>

          <div class="preview-container">
            <div class="preview-box border-preview" :style="borderPreviewStyle"></div>
            <div class="preview-label">{{ t('preview') }}</div>
          </div>
        </div>

        <!-- 动画生成器 -->
        <div v-if="generator === 'animation'" class="generator-section">
          <div class="section-header">
            <h2>{{ t('animationGenerator') }}</h2>
            <div class="preset-buttons">
              <button @click="applyAnimPreset('pulse')" class="btn-preset">{{ t('pulse') }}</button>
              <button @click="applyAnimPreset('bounce')" class="btn-preset">{{ t('bounce') }}</button>
              <button @click="applyAnimPreset('spin')" class="btn-preset">{{ t('spin') }}</button>
              <button @click="applyAnimPreset('fade')" class="btn-preset">{{ t('fade') }}</button>
            </div>
          </div>

          <div class="settings-grid">
            <div class="setting-item">
              <label class="setting-label">
                <span class="label-icon">⏱</span>
                {{ t('duration') }}
              </label>
              <input type="range" v-model.number="animDuration" @input="updateCSS" min="0.1" max="5" step="0.1" class="range-input" />
              <span class="range-display">{{ animDuration.toFixed(1) }}s</span>
            </div>
            <div class="setting-item">
              <label class="setting-label">
                <span class="label-icon">◐</span>
                {{ t('timing') }}
              </label>
              <select v-model="animTiming" @change="updateCSS" class="select-input">
                <option value="ease">ease</option>
                <option value="linear">linear</option>
                <option value="ease-in">ease-in</option>
                <option value="ease-out">ease-out</option>
                <option value="ease-in-out">ease-in-out</option>
                <option value="cubic-bezier(0.68, -0.55, 0.265, 1.55)">cubic-bezier (弹跳)</option>
              </select>
            </div>
            <div class="setting-item">
              <label class="setting-label">
                <span class="label-icon">🔁</span>
                {{ t('iteration') }}
              </label>
              <select v-model="animIteration" @change="updateCSS" class="select-input">
                <option value="infinite">infinite</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </div>
            <div class="setting-item">
              <label class="setting-label">
                <span class="label-icon">◱</span>
                {{ t('direction') }}
              </label>
              <select v-model="animDirection" @change="updateCSS" class="select-input">
                <option value="normal">normal</option>
                <option value="reverse">reverse</option>
                <option value="alternate">alternate</option>
                <option value="alternate-reverse">alternate-reverse</option>
              </select>
            </div>
          </div>

          <div class="anim-controls">
            <button @click="toggleAnimation" class="btn-play">
              <span class="btn-icon">{{ isAnimating ? '⏸' : '▶' }}</span>
              {{ isAnimating ? t('stop') : t('play') }}
            </button>
            <button @click="resetAnimation" class="btn-reset">
              <span class="btn-icon">↺</span>
              {{ t('reset') }}
            </button>
          </div>

          <div class="preview-container">
            <div class="preview-box anim-preview" :style="animPreviewStyle" :class="{ 'is-animating': isAnimating }"></div>
            <div class="preview-label">{{ t('preview') }}</div>
          </div>
        </div>

        <!-- 渐变生成器 -->
        <div v-if="generator === 'gradient'" class="generator-section">
          <div class="section-header">
            <h2>{{ t('gradientGenerator') }}</h2>
            <div class="preset-buttons">
              <button @click="applyGradientPreset('sunrise')" class="btn-preset">{{ t('sunrise') }}</button>
              <button @click="applyGradientPreset('ocean')" class="btn-preset">{{ t('ocean') }}</button>
              <button @click="applyGradientPreset('forest')" class="btn-preset">{{ t('forest') }}</button>
              <button @click="applyGradientPreset('sunset')" class="btn-preset">{{ t('sunset') }}</button>
            </div>
          </div>

          <div class="gradient-controls">
            <div class="gradient-type">
              <label>
                <input type="radio" v-model="gradientType" value="linear" @change="updateCSS" />
                {{ t('linear') }}
              </label>
              <label>
                <input type="radio" v-model="gradientType" value="radial" @change="updateCSS" />
                {{ t('radial') }}
              </label>
            </div>

            <div v-if="gradientType === 'linear'" class="angle-control">
              <label>{{ t('angle') }}: {{ gradientAngle }}°</label>
              <input type="range" v-model.number="gradientAngle" @input="updateCSS" min="0" max="360" class="range-input" />
            </div>

            <div class="color-stops">
              <div
                v-for="(stop, index) in gradientStops"
                :key="index"
                class="stop-item"
              >
                <input type="color" v-model="stop.color" @input="updateCSS" class="stop-color" />
                <input type="range" v-model.number="stop.position" @input="updateCSS" min="0" max="100" class="stop-position" />
                <span class="stop-pos">{{ stop.position }}%</span>
                <button @click="removeStop(index)" class="btn-remove-stop" v-if="gradientStops.length > 2">×</button>
              </div>
              <button @click="addColorStop" class="btn-add-stop">+ {{ t('addColor') }}</button>
            </div>
          </div>

          <div class="preview-container">
            <div class="preview-box gradient-preview" :style="gradientPreviewStyle"></div>
            <div class="preview-label">{{ t('preview') }}</div>
          </div>
        </div>

        <!-- 滤镜生成器 -->
        <div v-if="generator === 'filter'" class="generator-section">
          <div class="section-header">
            <h2>{{ t('filterGenerator') }}</h2>
            <div class="preset-buttons">
              <button @click="applyFilterPreset('vintage')" class="btn-preset">{{ t('vintage') }}</button>
              <button @click="applyFilterPreset('dramatic')" class="btn-preset">{{ t('dramatic') }}</button>
              <button @click="applyFilterPreset('cool')" class="btn-preset">{{ t('cool') }}</button>
              <button @click="applyFilterPreset('warm')" class="btn-preset">{{ t('warm') }}</button>
            </div>
          </div>

          <div class="settings-grid">
            <div class="setting-item">
              <label class="setting-label">
                <span class="label-icon">☀</span>
                {{ t('brightness') }}
              </label>
              <input type="range" v-model.number="filterBrightness" @input="updateCSS" min="0" max="200" class="range-input" />
              <span class="range-display">{{ filterBrightness }}%</span>
            </div>
            <div class="setting-item">
              <label class="setting-label">
                <span class="label-icon">◑</span>
                {{ t('contrast') }}
              </label>
              <input type="range" v-model.number="filterContrast" @input="updateCSS" min="0" max="200" class="range-input" />
              <span class="range-display">{{ filterContrast }}%</span>
            </div>
            <div class="setting-item">
              <label class="setting-label">
                <span class="label-icon">◈</span>
                {{ t('saturation') }}
              </label>
              <input type="range" v-model.number="filterSaturation" @input="updateCSS" min="0" max="200" class="range-input" />
              <span class="range-display">{{ filterSaturation }}%</span>
            </div>
            <div class="setting-item">
              <label class="setting-label">
                <span class="label-icon">◎</span>
                {{ t('hueRotate') }}
              </label>
              <input type="range" v-model.number="filterHueRotate" @input="updateCSS" min="0" max="360" class="range-input" />
              <span class="range-display">{{ filterHueRotate }}°</span>
            </div>
            <div class="setting-item">
              <label class="setting-label">
                <span class="label-icon">▣</span>
                {{ t('sepia') }}
              </label>
              <input type="range" v-model.number="filterSepia" @input="updateCSS" min="0" max="100" class="range-input" />
              <span class="range-display">{{ filterSepia }}%</span>
            </div>
            <div class="setting-item">
              <label class="setting-label">
                <span class="label-icon">◌</span>
                {{ t('blur') }}
              </label>
              <input type="range" v-model.number="filterBlur" @input="updateCSS" min="0" max="20" class="range-input" />
              <span class="range-display">{{ filterBlur }}px</span>
            </div>
          </div>

          <div class="preview-container">
            <div class="preview-box filter-preview" :style="filterPreviewStyle">
              <div class="filter-sample-content">
                <div class="sample-shape"></div>
                <span class="sample-text">Filter</span>
              </div>
            </div>
            <div class="preview-label">{{ t('preview') }}</div>
          </div>
        </div>

        <!-- CSS 输出 -->
        <div class="css-output">
          <div class="output-header">
            <label>{{ t('cssCode') }}</label>
            <div class="output-actions">
              <button @click="copyCSS" class="btn-copy">
                <span class="btn-icon">📋</span>
                {{ t('copy') }}
              </button>
            </div>
          </div>
          <div class="code-wrapper">
            <pre><code>{{ cssCode }}</code></pre>
          </div>
        </div>
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
import { ref, computed, inject } from 'vue'
import NavComponent from '../components/NavComponent.vue'

const lang = inject('lang')
const generator = ref('shadow')
const cssCode = ref('')
const toast = ref({ show: false, message: '', type: 'success', icon: '✓' })

// 阴影
const shadowX = ref(10)
const shadowY = ref(10)
const shadowBlur = ref(20)
const shadowSpread = ref(0)
const shadowColor = ref('#c4a35a')
const shadowInset = ref(false)

// 圆角
const borderRadiusTL = ref(20)
const borderRadiusTR = ref(20)
const borderRadiusBR = ref(20)
const borderRadiusBL = ref(20)
const Math = window.Math

// 动画
const animDuration = ref(1)
const animTiming = ref('ease')
const animIteration = ref('infinite')
const animDirection = ref('normal')
const isAnimating = ref(true)
const currentAnimName = ref('pulse')

// 渐变
const gradientType = ref('linear')
const gradientAngle = ref(135)
const gradientStops = ref([
  { color: '#c4a35a', position: 0 },
  { color: '#8b7355', position: 50 },
  { color: '#3e3e42', position: 100 }
])

// 滤镜
const filterBrightness = ref(100)
const filterContrast = ref(100)
const filterSaturation = ref(100)
const filterHueRotate = ref(0)
const filterSepia = ref(0)
const filterBlur = ref(0)

const translations = {
  zh: {
    title: 'CSS 生成器',
    subtitle: '可视化生成 CSS 代码，死亡搁浅风格',
    shadow: '阴影',
    borderRadius: '圆角',
    animation: '动画',
    gradient: '渐变',
    filter: '滤镜',
    boxShadowGenerator: '盒阴影生成器',
    borderRadiusGenerator: '圆角生成器',
    animationGenerator: '动画生成器',
    gradientGenerator: '渐变生成器',
    filterGenerator: '滤镜生成器',
    offsetX: 'X 偏移',
    offsetY: 'Y 偏移',
    blur: '模糊',
    spread: '扩散',
    color: '颜色',
    inset: '内阴影',
    topLeft: '左上',
    topRight: '右上',
    bottomRight: '右下',
    bottomLeft: '左下',
    duration: '时长',
    timing: '缓动',
    iteration: '循环',
    direction: '方向',
    stop: '停止',
    play: '播放',
    reset: '重置',
    cssCode: 'CSS 代码',
    copy: '复制',
    preview: '预览',
    soft: '柔和',
    medium: '中等',
    strong: '强烈',
    glow: '发光',
    square: '方形',
    rounded: '圆角',
    pill: '胶囊',
    blob: '水滴',
    pulse: '脉冲',
    bounce: '弹跳',
    spin: '旋转',
    fade: '淡入',
    sunrise: '日出',
    ocean: '海洋',
    forest: '森林',
    sunset: '日落',
    linear: '线性',
    radial: '径向',
    angle: '角度',
    addColor: '添加颜色',
    brightness: '亮度',
    contrast: '对比度',
    saturation: '饱和度',
    hueRotate: '色相旋转',
    sepia: '褐色',
    vintage: '复古',
    dramatic: '戏剧',
    cool: '冷色',
    warm: '暖色',
    cssCopied: 'CSS 已复制'
  },
  en: {
    title: 'CSS Generator',
    subtitle: 'Visually generate CSS code, Death Stranding style',
    shadow: 'Shadow',
    borderRadius: 'Border Radius',
    animation: 'Animation',
    gradient: 'Gradient',
    filter: 'Filter',
    boxShadowGenerator: 'Box Shadow Generator',
    borderRadiusGenerator: 'Border Radius Generator',
    animationGenerator: 'Animation Generator',
    gradientGenerator: 'Gradient Generator',
    filterGenerator: 'Filter Generator',
    offsetX: 'Offset X',
    offsetY: 'Offset Y',
    blur: 'Blur',
    spread: 'Spread',
    color: 'Color',
    inset: 'Inset',
    topLeft: 'Top Left',
    topRight: 'Top Right',
    bottomRight: 'Bottom Right',
    bottomLeft: 'Bottom Left',
    duration: 'Duration',
    timing: 'Timing',
    iteration: 'Iteration',
    direction: 'Direction',
    stop: 'Stop',
    play: 'Play',
    reset: 'Reset',
    cssCode: 'CSS Code',
    copy: 'Copy',
    preview: 'Preview',
    soft: 'Soft',
    medium: 'Medium',
    strong: 'Strong',
    glow: 'Glow',
    square: 'Square',
    rounded: 'Rounded',
    pill: 'Pill',
    blob: 'Blob',
    pulse: 'Pulse',
    bounce: 'Bounce',
    spin: 'Spin',
    fade: 'Fade',
    sunrise: 'Sunrise',
    ocean: 'Ocean',
    forest: 'Forest',
    sunset: 'Sunset',
    linear: 'Linear',
    radial: 'Radial',
    angle: 'Angle',
    addColor: 'Add Color',
    brightness: 'Brightness',
    contrast: 'Contrast',
    saturation: 'Saturation',
    hueRotate: 'Hue Rotate',
    sepia: 'Sepia',
    vintage: 'Vintage',
    dramatic: 'Dramatic',
    cool: 'Cool',
    warm: 'Warm',
    cssCopied: 'CSS copied'
  }
}

function t(key) { return translations[lang.value]?.[key] || key }

// 装饰环样式
const ringStyle = computed(() => {
  const styles = {}
  for (let i = 1; i <= 3; i++) {
    styles[i] = {
      animationDelay: `${i * 0.8}s`,
      animationDuration: `${6 + i}s`
    }
  }
  return styles
})

const shadowPreviewStyle = computed(() => ({
  boxShadow: `${shadowInset.value ? 'inset ' : ''}${shadowX.value}px ${shadowY.value}px ${shadowBlur.value}px ${shadowSpread.value}px ${shadowColor.value}`
}))

const borderPreviewStyle = computed(() => ({
  borderRadius: `${borderRadiusTL.value}px ${borderRadiusTR.value}px ${borderRadiusBR.value}px ${borderRadiusBL.value}px`
}))

const borderRectStyle = computed(() => ({
  rx: `${Math.min(borderRadiusTL.value, borderRadiusTR.value, borderRadiusBL.value) / 2}px`,
  ry: `${Math.min(borderRadiusTL.value, borderRadiusTR.value, borderRadiusBL.value) / 2}px`
}))

const animPreviewStyle = computed(() => ({
  animation: isAnimating.value
    ? `${currentAnimName.value} ${animDuration.value}s ${animTiming.value} ${animIteration.value} ${animDirection.value}`
    : 'none'
}))

const gradientPreviewStyle = computed(() => {
  const stops = gradientStops.value.map(s => `${s.color} ${s.position}%`).join(', ')
  if (gradientType.value === 'linear') {
    return { background: `linear-gradient(${gradientAngle.value}deg, ${stops})` }
  } else {
    return { background: `radial-gradient(circle, ${stops})` }
  }
})

const filterPreviewStyle = computed(() => ({
  filter: `brightness(${filterBrightness.value}%) contrast(${filterContrast.value}%) saturate(${filterSaturation.value}%) hue-rotate(${filterHueRotate.value}deg) sepia(${filterSepia.value}%) blur(${filterBlur.value}px)`
}))

function updateCSS() {
  if (generator.value === 'shadow') {
    cssCode.value = `box-shadow: ${shadowInset.value ? 'inset ' : ''}${shadowX.value}px ${shadowY.value}px ${shadowBlur.value}px ${shadowSpread.value}px ${shadowColor.value};`
  } else if (generator.value === 'border') {
    cssCode.value = `border-radius: ${borderRadiusTL.value}px ${borderRadiusTR.value}px ${borderRadiusBR.value}px ${borderRadiusBL.value}px;`
  } else if (generator.value === 'animation') {
    cssCode.value = `animation: ${currentAnimName.value} ${animDuration.value}s ${animTiming.value} ${animIteration.value} ${animDirection.value};`
  } else if (generator.value === 'gradient') {
    const stops = gradientStops.value.map(s => `${s.color} ${s.position}%`).join(', ')
    if (gradientType.value === 'linear') {
      cssCode.value = `background: linear-gradient(${gradientAngle.value}deg, ${stops});`
    } else {
      cssCode.value = `background: radial-gradient(circle, ${stops});`
    }
  } else if (generator.value === 'filter') {
    cssCode.value = `filter: brightness(${filterBrightness.value}%) contrast(${filterContrast.value}%) saturate(${filterSaturation.value}%) hue-rotate(${filterHueRotate.value}deg) sepia(${filterSepia.value}%) blur(${filterBlur.value}px);`
  }
}

// 阴影预设
function applyShadowPreset(preset) {
  const presets = {
    soft: { x: 0, y: 4, blur: 12, spread: 0, color: '#00000040' },
    medium: { x: 0, y: 8, blur: 24, spread: -4, color: '#00000060' },
    strong: { x: 0, y: 20, blur: 40, spread: -8, color: '#00000080' },
    glow: { x: 0, y: 0, blur: 30, spread: 5, color: '#c4a35a80' }
  }
  const p = presets[preset]
  shadowX.value = p.x
  shadowY.value = p.y
  shadowBlur.value = p.blur
  shadowSpread.value = p.spread
  shadowColor.value = p.color
  updateCSS()
}

// 圆角预设
function applyBorderPreset(preset) {
  const presets = {
    square: { tl: 0, tr: 0, br: 0, bl: 0 },
    rounded: { tl: 12, tr: 12, br: 12, bl: 12 },
    pill: { tl: 50, tr: 50, br: 50, bl: 50 },
    blob: { tl: 30, tr: 70, br: 60, bl: 40 }
  }
  const p = presets[preset]
  borderRadiusTL.value = p.tl
  borderRadiusTR.value = p.tr
  borderRadiusBR.value = p.br
  borderRadiusBL.value = p.bl
  updateCSS()
}

// 动画预设
function applyAnimPreset(anim) {
  currentAnimName.value = anim
  const durations = { pulse: 1.5, bounce: 0.6, spin: 1, fade: 2 }
  animDuration.value = durations[anim] || 1
  updateCSS()
}

// 渐变预设
function applyGradientPreset(preset) {
  const presets = {
    sunrise: [
      { color: '#ff6b6b', position: 0 },
      { color: '#feca57', position: 50 },
      { color: '#ff9ff3', position: 100 }
    ],
    ocean: [
      { color: '#667eea', position: 0 },
      { color: '#764ba2', position: 100 }
    ],
    forest: [
      { color: '#134e5e', position: 0 },
      { color: '#71b280', position: 100 }
    ],
    sunset: [
      { color: '#ee9ca7', position: 0 },
      { color: '#ffdde1', position: 100 }
    ]
  }
  gradientStops.value = presets[preset]
  gradientType.value = 'linear'
  gradientAngle.value = 135
  updateCSS()
}

// 滤镜预设
function applyFilterPreset(preset) {
  const presets = {
    vintage: { brightness: 110, contrast: 85, saturation: 70, hue: 0, sepia: 40, blur: 0 },
    dramatic: { brightness: 90, contrast: 150, saturation: 80, hue: 0, sepia: 0, blur: 0 },
    cool: { brightness: 100, contrast: 110, saturation: 80, hue: 180, sepia: 0, blur: 0 },
    warm: { brightness: 105, contrast: 100, saturation: 120, hue: 30, sepia: 20, blur: 0 }
  }
  const p = presets[preset]
  filterBrightness.value = p.brightness
  filterContrast.value = p.contrast
  filterSaturation.value = p.saturation
  filterHueRotate.value = p.hue
  filterSepia.value = p.sepia
  filterBlur.value = p.blur
  updateCSS()
}

function toggleAnimation() {
  isAnimating.value = !isAnimating.value
}

function resetAnimation() {
  isAnimating.value = false
  setTimeout(() => { isAnimating.value = true }, 50)
}

function addColorStop() {
  const newStop = { color: '#ffffff', position: 50 }
  gradientStops.value.push(newStop)
  updateCSS()
}

function removeStop(index) {
  if (gradientStops.value.length > 2) {
    gradientStops.value.splice(index, 1)
    updateCSS()
  }
}

function copyCSS() {
  navigator.clipboard.writeText(cssCode.value)
  showToast(t('cssCopied'), 'success', '📋')
}

function showToast(message, type = 'success', icon = '✓') {
  toast.value = { show: true, message, type, icon }
  setTimeout(() => { toast.value.show = false }, 2000)
}

// 初始化
updateCSS()
</script>

<style scoped>
.css-tool {
  min-height: 100vh;
  background: var(--bg-primary);
  position: relative;
  overflow-x: hidden;
}

/* 全息背景动画 */
.holographic-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.hologram-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  border: 2px solid var(--ds-hologram-edge);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: hologram-pulse linear infinite;
  opacity: 0.1;
}

@keyframes hologram-pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}

.tool-container {
  position: relative;
  z-index: 1;
  max-width: 1000px;
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
  animation: pulse 3s ease-in-out infinite;
}

.tool-subtitle {
  font-size: var(--text-lg);
  color: var(--text-muted);
}

.tool-main {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

/* 标签页 */
.tabs-wrapper {
  overflow-x: auto;
  margin-bottom: var(--space-6);
}

.tabs {
  display: flex;
  gap: var(--space-2);
  min-width: max-content;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: var(--text-sm);
  letter-spacing: 0.1em;
}

.tab-btn:hover {
  background: var(--ds-gold-pale);
}

.tab-btn.active {
  background: var(--accent-primary);
  color: var(--ds-black);
  border-color: var(--accent-primary);
}

.tab-icon {
  font-size: var(--text-base);
}

/* 生成器区块 */
.generator-section {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
  gap: var(--space-4);
}

.section-header h2 {
  font-size: var(--text-xl);
  color: var(--text-primary);
  letter-spacing: 0.1em;
}

.preset-buttons {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.btn-preset {
  padding: var(--space-2) var(--space-4);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-preset:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  background: var(--ds-gold-pale);
}

/* 设置网格 */
.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.setting-label {
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
  color: var(--accent-primary);
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
  box-shadow: 0 0 10px var(--ds-gold-glow);
}

.range-input::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.range-display {
  font-size: var(--text-xs);
  color: var(--accent-primary);
  font-family: 'JetBrains Mono', monospace;
}

.color-input {
  width: 60px;
  height: 40px;
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  border-radius: var(--radius-md);
}

.checkbox-label {
  flex-direction: row;
  cursor: pointer;
}

.checkbox-input {
  accent-color: var(--accent-primary);
  width: 18px;
  height: 18px;
}

.select-input {
  padding: var(--space-2) var(--space-4);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  cursor: pointer;
}

/* 圆角控制 */
.border-controls {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--space-6);
  margin-bottom: var(--space-6);
}

.border-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.border-svg {
  width: 200px;
  height: 200px;
}

.border-rect {
  fill: none;
  stroke: var(--accent-primary);
  stroke-width: 2;
  transition: all var(--transition-normal);
}

.control-point {
  fill: var(--accent-primary);
  stroke: var(--ds-white);
  stroke-width: 2;
}

.border-sliders {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

.slider-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.slider-group label {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

/* 动画控制 */
.anim-controls {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  margin-bottom: var(--space-6);
}

.btn-play,
.btn-reset {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  background: var(--accent-primary);
  color: var(--ds-black);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-play:hover,
.btn-reset:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-gold);
}

.btn-reset {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.btn-icon {
  font-size: var(--text-lg);
}

/* 渐变控制 */
.gradient-controls {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.gradient-type {
  display: flex;
  gap: var(--space-6);
}

.gradient-type label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  color: var(--text-secondary);
}

.gradient-type input[type="radio"] {
  accent-color: var(--accent-primary);
}

.angle-control {
  margin-bottom: var(--space-4);
}

.color-stops {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.stop-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.stop-color {
  width: 50px;
  height: 35px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.stop-position {
  flex: 1;
  height: 6px;
}

.stop-pos {
  width: 50px;
  text-align: right;
  font-size: var(--text-sm);
  color: var(--accent-primary);
  font-family: 'JetBrains Mono', monospace;
}

.btn-remove-stop,
.btn-add-stop {
  padding: var(--space-2) var(--space-4);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-remove-stop:hover,
.btn-add-stop:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.btn-remove-stop {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 预览容器 */
.preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-6);
  padding-top: var(--space-6);
  border-top: 1px solid var(--border-subtle);
}

.preview-box {
  width: 200px;
  height: 200px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
}

.border-preview {
  background: linear-gradient(135deg, var(--accent-primary), var(--ds-stone));
}

.anim-preview {
  background: linear-gradient(135deg, var(--accent-primary), var(--ds-charcoal));
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fade {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.preview-label {
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* 滤镜预览 */
.filter-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.filter-sample-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.sample-shape {
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, var(--accent-primary), var(--ds-gold-warm), var(--ds-white));
  border-radius: 50%;
}

.sample-text {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--ds-white);
  letter-spacing: 0.2em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

/* CSS 输出 */
.css-output {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  margin-top: var(--space-6);
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-3);
}

.output-header label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.output-actions {
  display: flex;
  gap: var(--space-2);
}

.btn-copy {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-copy:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.code-wrapper {
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}

.code-wrapper pre {
  margin: 0;
  overflow-x: auto;
}

.code-wrapper code {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-sm);
  color: var(--accent-primary);
  display: block;
  white-space: pre-wrap;
  word-break: break-all;
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
  color: var(--accent-primary);
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
  .tool-container {
    padding: var(--space-8) var(--space-4);
  }

  .border-controls {
    grid-template-columns: 1fr;
  }

  .border-sliders {
    grid-template-columns: 1fr;
  }

  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style>
