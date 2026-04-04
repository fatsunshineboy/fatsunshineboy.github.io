<template>
  <div class="like-button" :class="{ liked: isLiked }" @click="toggleLike">
    <svg class="like-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
    <span class="like-count">{{ likeCount.toLocaleString() }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  storageKey: {
    type: String,
    default: 'ds_like_count'
  },
  likedStorageKey: {
    type: String,
    default: 'ds_liked'
  },
  initialCount: {
    type: Number,
    default: 2048
  }
})

const emit = defineEmits(['like', 'unlike'])

const likeCount = ref(props.initialCount)
const isLiked = ref(false)

function toggleLike() {
  isLiked.value = !isLiked.value
  if (isLiked.value) {
    likeCount.value++
    createLikeParticles()
    emit('like', likeCount.value)
  } else {
    likeCount.value--
    emit('unlike', likeCount.value)
  }
  localStorage.setItem(props.likedStorageKey, isLiked.value.toString())
  localStorage.setItem(props.storageKey, likeCount.value.toString())
}

function createLikeParticles() {
  const button = document.querySelector('.like-button')
  if (!button) return

  const rect = button.getBoundingClientRect()
  for (let i = 0; i < 16; i++) {
    const particle = document.createElement('div')
    particle.style.position = 'fixed'
    particle.style.width = '8px'
    particle.style.height = '8px'
    particle.style.background = 'var(--accent-primary)'
    particle.style.borderRadius = '50%'
    particle.style.left = (rect.left + rect.width / 2) + 'px'
    particle.style.top = (rect.top + rect.height / 2) + 'px'
    particle.style.pointerEvents = 'none'
    particle.style.zIndex = '9999'
    particle.style.boxShadow = '0 0 15px var(--accent-primary)'
    document.body.appendChild(particle)

    const angle = (i / 16) * Math.PI * 2
    const velocity = 80 + Math.random() * 60

    setTimeout(() => {
      particle.style.transition = 'all 0.8s ease-out'
      particle.style.transform = `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`
      particle.style.opacity = '0'
    }, 10)

    setTimeout(() => particle.remove(), 800)
  }
}

onMounted(() => {
  const storedLiked = localStorage.getItem(props.likedStorageKey)
  const storedCount = localStorage.getItem(props.storageKey)

  if (storedLiked === 'true') isLiked.value = true
  if (storedCount) likeCount.value = parseInt(storedCount)
})
</script>

<style scoped>
.like-button {
  position: fixed;
  bottom: 30px;
  right: 40px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(26, 26, 29, 0.95);
  backdrop-filter: blur(10px);
  border: 2px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  z-index: var(--z-fixed);
}

.like-button:hover {
  border-color: var(--accent-primary);
  transform: scale(1.1);
  box-shadow: var(--shadow-gold);
}

.like-button.liked {
  border-color: var(--accent-primary);
  background: var(--accent-primary);
}

.like-button.liked .like-icon {
  color: var(--ds-black);
}

.like-icon {
  width: 32px;
  height: 32px;
  color: var(--accent-primary);
  transition: all var(--transition-normal);
}

.like-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background: var(--accent-primary);
  color: var(--ds-black);
  font-size: var(--text-xs);
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 10px;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.like-button:hover .like-count {
  opacity: 1;
}
</style>
