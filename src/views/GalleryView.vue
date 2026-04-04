<template>
  <div class="gallery-view">
    <!-- 角落装饰 -->
    <CornerDecor />

    <!-- 导航 -->
    <NavComponent />

    <!-- 时间雨 -->
    <TimefallContainer :enabled="config?.features?.timefall?.enabled" :particle-count="60" />

    <!-- 页面标题 -->
    <header class="gallery-header">
      <h1 class="gallery-title">{{ lang === 'zh' ? '图片墙' : 'Gallery' }}</h1>
      <p class="gallery-subtitle">{{ lang === 'zh' ? '精选截图收藏' : 'Featured Screenshots' }}</p>
      <div class="header-actions">
        <button class="btn btn-primary" @click="triggerUpload">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <span>{{ lang === 'zh' ? '上传图片' : 'Upload' }}</span>
        </button>
        <input type="file" ref="fileInput" accept="image/*" multiple @change="handleUpload" style="display:none">
      </div>
    </header>

    <!-- 全息图片墙 -->
    <section class="gallery-section">
      <div class="holo-grid"></div>
      <div class="scan-line"></div>

      <div class="holo-container">
        <div class="holo-card" v-for="(image, index) in allImages" :key="image.id"
             @click="openLightbox(index)"
             @mousemove="handleCardMove($event, index)"
             @mouseleave="handleCardLeave(index)">
          <div class="holo-frame">
            <div class="holo-image" :style="{ backgroundImage: `url(${image.src})` }"></div>
            <div class="holo-overlay">
              <div class="holo-info">
                <span class="holo-date">{{ formatDate(image.date) }}</span>
                <span class="holo-size">{{ image.size }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="allImages.length === 0" class="empty-state">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <p>{{ lang === 'zh' ? '暂无图片' : 'No images yet' }}</p>
          <button class="btn btn-primary" @click="triggerUpload">
            {{ lang === 'zh' ? '上传第一张图片' : 'Upload first image' }}
          </button>
        </div>
      </div>
    </section>

    <!-- 点赞按钮 -->
    <LikeButton storage-key="ds_gallery_count" liked-storage-key="ds_gallery_liked" :initial-count="1337" />

    <!-- 灯箱 -->
    <div class="lightbox" v-if="lightboxOpen" @click="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <button class="lightbox-nav lightbox-prev" @click.stop="prevImage" v-if="allImages.length > 1">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <button class="lightbox-nav lightbox-next" @click.stop="nextImage" v-if="allImages.length > 1">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
      <div class="lightbox-content" @click.stop>
        <img :src="currentImage?.src" :alt="currentImage?.title" class="lightbox-image">
        <div class="lightbox-info">
          <h3 class="lightbox-title">{{ currentImage?.title || 'Screenshot' }}</h3>
          <div class="lightbox-actions">
            <button class="lightbox-like" @click="likeCurrentImage">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" :class="{ liked: currentImageLiked }">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>{{ currentImage?.likes || 0 }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import NavComponent from '../components/NavComponent.vue'
import TimefallContainer from '../components/TimefallContainer.vue'
import CornerDecor from '../components/CornerDecor.vue'
import LikeButton from '../components/LikeButton.vue'

const lang = inject('lang')
const config = inject('config')

// 状态
const images = ref([])
const uploadedImages = ref([])
const lightboxOpen = ref(false)
const currentImageIndex = ref(0)
const fileInput = ref(null)
const cardTransforms = ref({})

// 所有图片
const allImages = computed(() => [...images.value, ...uploadedImages.value])

// 当前图片
const currentImage = computed(() => allImages.value[currentImageIndex.value])

// 当前图片是否被点赞
const currentImageLiked = computed(() => {
  const img = currentImage.value
  if (!img) return false
  const liked = localStorage.getItem(`ds_img_${img.id}`)
  return liked === 'true'
})

// 触发上传
function triggerUpload() {
  fileInput.value?.click()
}

// 处理上传
function handleUpload(event) {
  const files = event.target.files
  if (!files.length) return

  Array.from(files).forEach(file => {
    const reader = new FileReader()
    reader.onload = e => {
      uploadedImages.value.push({
        id: 'upload_' + Date.now() + Math.random(),
        src: e.target.result,
        title: file.name.replace(/\.[^/.]+$/, ''),
        likes: 0,
        isUpload: true
      })
    }
    reader.readAsDataURL(file)
  })

  event.target.value = ''
}

// 打开灯箱
function openLightbox(index) {
  currentImageIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

// 关闭灯箱
function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

// 上一张
function prevImage() {
  currentImageIndex.value = (currentImageIndex.value - 1 + allImages.value.length) % allImages.value.length
}

// 下一张
function nextImage() {
  currentImageIndex.value = (currentImageIndex.value + 1) % allImages.value.length
}

// 卡片移动
function handleCardMove(event, index) {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width
  const y = (event.clientY - rect.top) / rect.height
  const rotateY = (x - 0.5) * 20
  const rotateX = (0.5 - y) * 15
  cardTransforms.value[index] = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px)`
  card.style.transform = cardTransforms.value[index]
}

// 卡片离开
function handleCardLeave(index) {
  const card = event.currentTarget
  card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'
  cardTransforms.value[index] = ''
}

// 格式化日期
function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 加载图片
async function loadImages() {
  try {
    const res = await fetch('/data/gallery.json')
    const data = await res.json()
    images.value = data.images || []
  } catch (err) {
    console.error('Failed to load gallery:', err)
    // 使用占位图片
    images.value = Array.from({ length: 12 }, (_, i) => ({
      id: `placeholder_${i}`,
      src: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect fill="#1a1a1d" width="400" height="250"/><text fill="#c4a35a" font-family="sans-serif" font-size="16" x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">Screenshot ${i + 1}</text></svg>`)}`,
      title: `Screenshot ${i + 1}`,
      likes: Math.floor(Math.random() * 500)
    }))
  }
}

// 键盘导航
function handleKeydown(event) {
  if (!lightboxOpen.value) return
  if (event.key === 'Escape') closeLightbox()
  if (event.key === 'ArrowLeft') prevImage()
  if (event.key === 'ArrowRight') nextImage()
}

onMounted(() => {
  loadImages()
  document.addEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.gallery-view {
  position: relative;
  min-height: 100vh;
  padding-top: 80px;
}

/* 页面头部 */
.gallery-header {
  text-align: center;
  padding: var(--space-12) var(--space-6);
  position: relative;
  z-index: 10;
}

.gallery-title {
  font-size: var(--text-5xl);
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.gallery-subtitle {
  font-size: var(--text-lg);
  color: var(--text-muted);
  letter-spacing: 0.15em;
}

.header-actions {
  margin-top: var(--space-6);
  display: flex;
  justify-content: center;
  gap: var(--space-4);
}

/* 画廊区域 */
.gallery-section {
  position: relative;
  min-height: 600px;
  padding: var(--space-8);
}

.holo-grid {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(100, 200, 255, 0.03) 1px, transparent 1px),
    linear-gradient(rgba(100, 200, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
  transform: perspective(500px) rotateX(30deg);
  transform-origin: bottom;
}

@keyframes gridMove {
  0% { transform: perspective(500px) rotateX(30deg) translateY(0); }
  100% { transform: perspective(500px) rotateX(30deg) translateY(50px); }
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--ds-hologram-edge);
  animation: scanDown 4s linear infinite;
  box-shadow: 0 0 10px var(--ds-hologram-edge);
  z-index: 5;
}

@keyframes scanDown {
  0% { top: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.holo-container {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  padding: var(--space-8);
  perspective: 1000px;
}

.holo-card {
  position: relative;
  aspect-ratio: 16/10;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
  animation: holoFloat 6s ease-in-out infinite;
}

.holo-card:nth-child(1) { animation-delay: 0s; }
.holo-card:nth-child(2) { animation-delay: 1s; }
.holo-card:nth-child(3) { animation-delay: 2s; }
.holo-card:nth-child(4) { animation-delay: 0.5s; }
.holo-card:nth-child(5) { animation-delay: 1.5s; }
.holo-card:nth-child(6) { animation-delay: 2.5s; }

@keyframes holoFloat {
  0%, 100% { transform: translateY(0) rotateY(0deg); }
  25% { transform: translateY(-10px) rotateY(5deg); }
  75% { transform: translateY(-10px) rotateY(-5deg); }
}

.holo-card:hover {
  z-index: 100;
}

.holo-frame {
  position: absolute;
  inset: 0;
  border: 2px solid var(--ds-hologram-edge);
  background: var(--ds-hologram);
  box-shadow:
    0 0 20px var(--ds-hologram-edge),
    inset 0 0 20px var(--ds-hologram);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.holo-frame::before {
  content: '';
  position: absolute;
  inset: -50%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    var(--ds-hologram-edge) 50%,
    transparent 70%
  );
  animation: holoScan 3s linear infinite;
}

@keyframes holoScan {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(100%) rotate(45deg); }
}

.holo-image {
  position: absolute;
  inset: 10px;
  background-size: cover;
  background-position: center;
  opacity: 0.85;
}

.holo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: linear-gradient(to top, rgba(10, 10, 10, 0.95), transparent);
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.holo-card:hover .holo-overlay {
  transform: translateY(0);
}

.holo-info {
  display: flex;
  gap: 15px;
}

.holo-date, .holo-size {
  font-size: var(--text-xs);
  color: var(--text-primary);
  letter-spacing: 0.1em;
}

.holo-size {
  color: var(--accent-primary);
}

/* 空状态 */
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: var(--space-16);
  color: var(--text-muted);
}

.empty-state svg {
  margin: 0 auto var(--space-4);
  opacity: 0.5;
}

.empty-state p {
  margin-bottom: var(--space-6);
}

/* 灯箱 */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.98);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  animation: fadeIn 0.3s ease;
}

.lightbox-close {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
  background: rgba(26, 26, 29, 0.9);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.lightbox-close:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
  background: rgba(26, 26, 29, 0.9);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.lightbox-nav:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.lightbox-prev { left: 30px; }
.lightbox-next { right: 30px; }

.lightbox-content {
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
}

.lightbox-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border: 1px solid var(--border-subtle);
}

.lightbox-info {
  text-align: center;
  padding: var(--space-4);
}

.lightbox-title {
  font-size: var(--text-lg);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.lightbox-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
}

.lightbox-like {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--border-subtle);
  background: rgba(26, 26, 29, 0.9);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.lightbox-like:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.lightbox-like svg.liked {
  color: var(--accent-primary);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 响应式 */
@media (max-width: 768px) {
  .holo-container {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 15px;
  }

  .lightbox-nav {
    width: 50px;
    height: 50px;
  }

  .lightbox-prev { left: 10px; }
  .lightbox-next { right: 10px; }
}
</style>
