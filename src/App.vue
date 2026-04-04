<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { ref, provide, onMounted, watch, reactive } from 'vue'

// 加载配置
const config = ref({
  site: { title: 'fatsunshineboy', subtitle: '连接 · 创造 · 前行' },
  theme: { moonImage: '/images/moon-hd.jpg' },
  navigation: [],
  features: { likeButton: true, timefall: true, chiralNetwork: true, bbDetector: true }
})

const lang = ref(localStorage.getItem('lang') || 'zh')
const theme = ref(localStorage.getItem('theme') || 'dark')
const posts = ref([])

// 加载配置
async function loadConfig() {
  try {
    const res = await fetch('/config/site.json')
    config.value = await res.json()
  } catch (e) {
    console.log('Using default config')
  }
}

// 加载文章
async function loadPosts() {
  try {
    const res = await fetch('/data/posts.json')
    const data = await res.json()
    posts.value = data.posts || []
  } catch (e) {
    console.error('Failed to load posts:', e)
    posts.value = []
  }
}

// 监听变化
watch(lang, (val) => {
  localStorage.setItem('lang', val)
  document.documentElement.lang = val
})

watch(theme, (val) => {
  localStorage.setItem('theme', val)
  document.documentElement.setAttribute('data-theme', val)
})

provide('config', config)
provide('lang', lang)
provide('theme', theme)
provide('posts', posts)

onMounted(() => {
  document.documentElement.lang = lang.value
  document.documentElement.setAttribute('data-theme', theme.value)
  loadConfig()
  loadPosts()
})
</script>

<style>
#app {
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
