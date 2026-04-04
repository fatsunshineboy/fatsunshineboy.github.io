<template>
  <div class="home-view">
    <!-- 角落装饰 -->
    <CornerDecor />

    <!-- 导航 -->
    <NavComponent />

    <!-- 开罗尔网络 -->
    <ChiralNetwork
      v-if="config.features.chiralNetwork?.enabled"
      ref="chiralNetwork"
    />

    <!-- 首屏 Hero -->
    <section class="hero-section">
      <!-- 背景图 -->
      <div class="hero-bg-image" :style="{ backgroundImage: `url('${moonImageUrl}')` }"></div>

      <!-- 标题容器 -->
      <div class="title-container">
        <h1 class="brand-title">{{ config.site.title }}</h1>
        <p class="brand-subtitle">{{ config.site.subtitle }}</p>
        <div class="strand-line"></div>
      </div>
    </section>

    <!-- 点赞按钮 -->
    <LikeButton />
  </div>
</template>

<script setup>
import { computed, onMounted, inject } from 'vue'
import NavComponent from '../components/NavComponent.vue'
import ChiralNetwork from '../components/ChiralNetwork.vue'
import CornerDecor from '../components/CornerDecor.vue'
import LikeButton from '../components/LikeButton.vue'

const lang = inject('lang')
const posts = inject('posts')
const config = inject('config')

// 月亮图片
const moonImageUrl = computed(() => {
  const moonPath = config.value.theme.moonImage || '/images/moon-hd.jpg'
  return moonPath
})

// 加载
onMounted(() => {
  document.title = `${lang.value === 'zh' ? '首页' : 'Home'} | fatsunshineboy`
})
</script>

<style scoped>
.home-view {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* ========== Hero Section ========== */
.hero-section {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* 背景图 */
.hero-bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

/* 标题容器 - 确保在背景图之上 */
.title-container {
  position: relative;
  z-index: 3;
}

.brand-title {
  position: relative;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--ds-white);
  text-transform: uppercase;
  text-shadow: 0 0 50px rgba(196, 163, 90, 0.6), 0 0 100px rgba(196, 163, 90, 0.3);
  animation: emerge 2.5s ease-out forwards;
  z-index: 2;
}

@keyframes emerge {
  0% { opacity: 0; transform: translateY(40px) scale(0.95); filter: blur(15px); }
  100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

.brand-subtitle {
  display: block;
  font-size: clamp(0.875rem, 2vw, 1.125rem);
  color: var(--ds-mist);
  letter-spacing: 0.8em;
  margin-top: var(--space-4);
  text-transform: uppercase;
  animation: fadeIn 2s ease-out 0.5s forwards;
  opacity: 0;
}

.strand-line {
  width: 150px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
  margin: var(--space-6) auto;
  position: relative;
  animation: fadeIn 2s ease-out 0.8s forwards;
  opacity: 0;
}

.strand-line::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: var(--accent-primary);
  border-radius: 50%;
}


@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 响应式 */
@media (max-width: 768px) {
  .brand-title {
    font-size: 2.5rem;
  }
}
</style>
