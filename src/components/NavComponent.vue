<template>
  <nav class="nav-immersive">
    <button class="hamburger" @click="toggleMenu" :class="{ open: isOpen }" :aria-label="lang === 'zh' ? '导航菜单' : 'Navigation Menu'">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>

    <transition name="menu-slide">
      <div v-if="isOpen" class="nav-menu" :class="{ open: isOpen }">
        <router-link v-for="item in navItems" :key="item.id"
           :to="item.path"
           class="nav-menu-item"
           :class="{ active: $route.path === item.path }"
           @click="handleNavClick">
          <svg class="nav-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" :innerHTML="getIcon(item.icon)" />
          <span class="nav-menu-label">{{ lang === 'zh' ? item.label.zh : item.label.en }}</span>
        </router-link>

        <div class="lang-switch">
          <button :class="{ active: lang === 'zh' }" @click="lang = 'zh'">中文</button>
          <button :class="{ active: lang === 'en' }" @click="lang = 'en'">EN</button>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, computed, inject } from 'vue'

const lang = inject('lang')
const config = inject('config')

const isOpen = ref(false)

const navItems = computed(() => {
  const items = config.value.navigation || []
  return items.filter(item => item.enabled !== false)
})

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function handleNavClick() {
  isOpen.value = false
}

function getIcon(name) {
  const icons = {
    home: '<circle cx="12" cy="12" r="10"/><path d="M12 2a15 15 0 0 0 0 30 15 15 0 0 0 0-30z"/><path d="M2 12h20"/>',
    document: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    images: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    tools: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'
  }
  return icons[name] || icons.home
}
</script>

<style scoped>
.nav-immersive {
  position: fixed;
  top: 30px;
  right: 40px;
  z-index: var(--z-fixed);
}

.hamburger {
  width: 50px;
  height: 50px;
  background: rgba(26, 26, 29, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all var(--transition-normal);
  cursor: pointer;
  border-radius: var(--radius-md);
}

.hamburger:hover {
  border-color: var(--accent-primary);
  box-shadow: var(--shadow-gold);
}

.hamburger.open {
  border-color: var(--accent-primary);
}

.hamburger-line {
  width: 24px;
  height: 2px;
  background: var(--accent-primary);
  transition: all var(--transition-normal);
}

.hamburger.open .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger.open .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger.open .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.nav-menu {
  position: absolute;
  top: 60px;
  right: 0;
  background: rgba(26, 26, 29, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-subtle);
  padding: var(--space-4) 0;
  min-width: 200px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}

.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all var(--transition-normal);
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.nav-menu-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-6);
  cursor: pointer;
  border-left: 2px solid transparent;
  transition: all var(--transition-normal);
  text-decoration: none;
  color: inherit;
}

.nav-menu-item:hover,
.nav-menu-item.active {
  background: var(--ds-gold-pale);
  border-left-color: var(--accent-primary);
  color: var(--accent-primary);
}

.nav-menu-icon {
  width: 20px;
  height: 20px;
  color: var(--accent-primary);
}

.nav-menu-label {
  font-size: var(--text-sm);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.lang-switch {
  display: flex;
  border-top: 1px solid var(--border-subtle);
  margin-top: var(--space-2);
  padding-top: var(--space-2);
}

.lang-switch button {
  flex: 1;
  padding: var(--space-2);
  font-size: var(--text-xs);
  color: var(--text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.lang-switch button:hover,
.lang-switch button.active {
  color: var(--accent-primary);
  background: var(--ds-gold-pale);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .nav-immersive {
    top: 10px;
    right: 10px;
  }

  .nav-menu {
    right: 0;
    min-width: 180px;
  }
}
</style>
