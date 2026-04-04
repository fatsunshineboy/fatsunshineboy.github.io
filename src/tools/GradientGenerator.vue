<template>
  <div class="gradient-tool">
    <NavComponent />
    <div class="tool-container">
      <header class="tool-header">
        <h1 class="tool-title">{{ t('title') }}</h1>
        <p class="tool-subtitle">{{ t('subtitle') }}</p>
      </header>
      <main class="tool-main">
        <div class="controls">
          <div class="control-group">
            <label>{{ t('type') }}</label>
            <select v-model="gradientType" @change="updateGradient" class="select-input">
              <option value="linear">{{ t('linear') }}</option>
              <option value="radial">{{ t('radial') }}</option>
            </select>
          </div>
          <div class="control-group" v-if="gradientType === 'linear'">
            <label>{{ t('angle') }}: {{ angle }}°</label>
            <input type="range" v-model.number="angle" min="0" max="360" @input="updateGradient" class="range-input" />
          </div>
          <div class="control-group">
            <label>{{ t('colors') }}</label>
            <div class="color-stops">
              <div v-for="(stop, index) in colorStops" :key="index" class="stop-item">
                <input type="color" v-model="stop.color" @input="updateGradient" class="color-input" />
                <input type="range" v-model.number="stop.position" min="0" max="100" @input="updateGradient" class="range-input-small" />
                <button v-if="colorStops.length > 2" @click="removeStop(index)" class="btn-remove">×</button>
              </div>
            </div>
            <button @click="addStop" class="btn-add">{{ t('addColor') }}</button>
          </div>
        </div>
        <div class="gradient-preview" :style="{ background: gradientCSS }">
          <div class="css-code">
            <code>{{ gradientCSS }}</code>
            <button @click="copyCSS" class="btn-copy">{{ t('copyCSS') }}</button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import NavComponent from '../components/NavComponent.vue'

const lang = inject('lang')
const gradientType = ref('linear')
const angle = ref(135)
const colorStops = ref([{ color: '#c4a35a', position: 0 }, { color: '#1a1a1d', position: 100 }])
const gradientCSS = ref('')

const translations = {
  zh: { title: '渐变生成器', subtitle: '创建线性渐变和径向渐变', type: '类型', linear: '线性渐变', radial: '径向渐变', angle: '角度', colors: '颜色', addColor: '添加颜色', copyCSS: '复制 CSS' },
  en: { title: 'Gradient Generator', subtitle: 'Create linear and radial gradients', type: 'Type', linear: 'Linear', radial: 'Radial', angle: 'Angle', colors: 'Colors', addColor: 'Add Color', copyCSS: 'Copy CSS' }
}
function t(key) { return translations[lang.value]?.[key] || key }

function updateGradient() {
  const stops = colorStops.value.map(s => `${s.color} ${s.position}%`).join(', ')
  if (gradientType.value === 'linear') {
    gradientCSS.value = `linear-gradient(${angle.value}deg, ${stops})`
  } else {
    gradientCSS.value = `radial-gradient(circle, ${stops})`
  }
}

function addStop() {
  colorStops.value.push({ color: '#ffffff', position: 50 })
  updateGradient()
}

function removeStop(index) {
  colorStops.value.splice(index, 1)
  updateGradient()
}

function copyCSS() {
  navigator.clipboard.writeText(`background: ${gradientCSS.value};`)
}

onMounted(() => { updateGradient() })
</script>

<style scoped>
.gradient-tool { min-height: 100vh; background: var(--bg-primary); }
.tool-container { max-width: 900px; margin: 0 auto; padding: var(--space-12) var(--space-6); }
.tool-header { text-align: center; margin-bottom: var(--space-12); }
.tool-title { font-size: var(--text-4xl); font-weight: var(--font-bold); color: var(--text-primary); margin-bottom: var(--space-4); }
.tool-subtitle { font-size: var(--text-lg); color: var(--text-muted); }
.tool-main { display: flex; flex-direction: column; gap: var(--space-8); }
.controls { display: flex; justify-content: center; gap: var(--space-8); flex-wrap: wrap; }
.control-group { display: flex; flex-direction: column; gap: var(--space-2); align-items: center; }
.control-group label { font-size: var(--text-sm); color: var(--text-muted); }
.select-input { padding: var(--space-2) var(--space-4); background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-primary); }
.range-input { width: 150px; }
.range-input-small { width: 80px; }
.color-input { width: 50px; height: 35px; border: none; cursor: pointer; border-radius: var(--radius-sm); }
.color-stops { display: flex; gap: var(--space-2); flex-wrap: wrap; justify-content: center; }
.stop-item { display: flex; align-items: center; gap: var(--space-2); }
.btn-add, .btn-copy { padding: var(--space-2) var(--space-4); background: var(--accent-primary); color: var(--ds-black); border: none; border-radius: var(--radius-sm); cursor: pointer; transition: all var(--transition-fast); }
.btn-add:hover, .btn-copy:hover { transform: translateY(-2px); box-shadow: var(--shadow-gold); }
.btn-remove { width: 24px; height: 24px; background: var(--bg-tertiary); color: var(--text-muted); border: none; border-radius: 50%; cursor: pointer; }
.btn-remove:hover { background: #ef4444; color: white; }
.gradient-preview { height: 300px; border-radius: var(--radius-lg); border: 1px solid var(--border-subtle); display: flex; align-items: flex-end; padding: var(--space-4); }
.css-code { display: flex; gap: var(--space-2); align-items: center; background: rgba(0,0,0,0.8); padding: var(--space-3); border-radius: var(--radius-md); width: 100%; }
.css-code code { flex: 1; font-family: 'JetBrains Mono', monospace; font-size: var(--text-xs); color: var(--accent-primary); word-break: break-all; }
</style>
