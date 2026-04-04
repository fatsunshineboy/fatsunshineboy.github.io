<template>
  <div class="about-page">
    <!-- 导航 -->
    <NavComponent />

    <!-- 时间雨背景 -->
    <timefall-container v-if="config?.features.timefall?.enabled" />

    <!-- 开罗尔网络背景 -->
    <chiral-network v-if="config?.features.chiralNetwork?.enabled" />

    <!-- 头部英雄区域 -->
    <header class="about-hero">
      <div class="hero-content">
        <!-- 全息头像框 -->
        <div class="holographic-avatar">
          <div class="avatar-ring"></div>
          <div class="avatar-inner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
        </div>

        <h1 class="about-name">fatsunshineboy</h1>
        <p class="about-tagline">Frontend Developer &amp; Digital Creator</p>
        <p class="about-motto">
          <span class="motto-part">Connect</span>
          <span class="motto-dot">·</span>
          <span class="motto-part">Create</span>
          <span class="motto-dot">·</span>
          <span class="motto-part">Move Forward</span>
        </p>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="about-container">
      <!-- 关于我 -->
      <section class="about-section fade-in">
        <div class="section-header">
          <span class="section-icon">◇</span>
          <h2 class="section-title">{{ lang === 'zh' ? '关于我' : 'About Me' }}</h2>
        </div>
        <div class="section-content">
          <p>{{ lang === 'zh' ? '我是一名前端开发者，对技术和设计充满热情。' : 'I am a frontend developer passionate about technology and design.' }}</p>
          <p>{{ lang === 'zh' ? '我相信技术的力量能够连接人们，创造美好的数字体验。' : 'I believe in the power of technology to connect people and create beautiful digital experiences.' }}</p>
          <p>{{ lang === 'zh' ? '这个网站是我的个人空间，用于分享技术笔记、开发工具和学习心得。' : 'This website is my personal space for sharing technical notes, development tools, and learning experiences.' }}</p>
        </div>
      </section>

      <!-- 技术栈 -->
      <section class="about-section fade-in">
        <div class="section-header">
          <span class="section-icon">◆</span>
          <h2 class="section-title">{{ lang === 'zh' ? '技术栈' : 'Tech Stack' }}</h2>
        </div>
        <div class="skills-grid">
          <div class="skill-category">
            <div class="category-header">
              <svg class="category-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
              </svg>
              <h3 class="category-title">{{ lang === 'zh' ? '前端开发' : 'Frontend' }}</h3>
            </div>
            <div class="skill-tags">
              <span class="skill-tag">JavaScript</span>
              <span class="skill-tag">TypeScript</span>
              <span class="skill-tag">Vue.js</span>
              <span class="skill-tag">React</span>
              <span class="skill-tag">Three.js</span>
              <span class="skill-tag">CSS3/SCSS</span>
            </div>
          </div>

          <div class="skill-category">
            <div class="category-header">
              <svg class="category-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6" y2="6"/><line x1="6" y1="18" x2="6" y2="18"/>
              </svg>
              <h3 class="category-title">{{ lang === 'zh' ? '后端技术' : 'Backend' }}</h3>
            </div>
            <div class="skill-tags">
              <span class="skill-tag">Node.js</span>
              <span class="skill-tag">Java</span>
              <span class="skill-tag">MySQL</span>
              <span class="skill-tag">Redis</span>
              <span class="skill-tag">PostgreSQL</span>
            </div>
          </div>

          <div class="skill-category">
            <div class="category-header">
              <svg class="category-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              <h3 class="category-title">{{ lang === 'zh' ? '工具 & 其他' : 'Tools & More' }}</h3>
            </div>
            <div class="skill-tags">
              <span class="skill-tag">Git</span>
              <span class="skill-tag">Webpack</span>
              <span class="skill-tag">Vite</span>
              <span class="skill-tag">Linux</span>
              <span class="skill-tag">Docker</span>
              <span class="skill-tag">Figma</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 联系方式 -->
      <section class="about-section fade-in">
        <div class="section-header">
          <span class="section-icon">○</span>
          <h2 class="section-title">{{ lang === 'zh' ? '联系方式' : 'Contact' }}</h2>
        </div>
        <div class="contact-links">
          <a href="mailto:sunshineboy085@gmail.com" class="contact-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>sunshineboy085@gmail.com</span>
          </a>
          <a href="https://github.com/fatsunshineboy" target="_blank" class="contact-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1 5.09 1 3.9 2.48 3.9 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 15.12V18M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1 5.09 1 3.9 2.48 3.9 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 15.12V18"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
import TimefallContainer from '../components/TimefallContainer.vue'
import ChiralNetwork from '../components/ChiralNetwork.vue'
import NavComponent from '../components/NavComponent.vue'

const lang = inject('lang')
const config = inject('config')

onMounted(() => {
  document.title = `${lang.value === 'zh' ? '关于我' : 'About'} | fatsunshineboy`
})
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background: var(--bg-primary);
  position: relative;
  overflow-x: hidden;
}

/* 英雄区域 */
.about-hero {
  position: relative;
  padding: var(--space-20) var(--space-6);
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, rgba(10, 10, 21, 0.9) 0%, rgba(18, 18, 32, 0.7) 100%);
  border-bottom: 1px solid var(--border-subtle);
}

.hero-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

/* 全息头像 */
.holographic-avatar {
  position: relative;
  width: 140px;
  height: 140px;
  margin: 0 auto var(--space-8);
}

.avatar-ring {
  position: absolute;
  inset: -10px;
  border: 2px solid var(--accent-primary);
  border-radius: 50%;
  animation: pulse-ring 3s ease-in-out infinite;
  opacity: 0.6;
}

.avatar-ring::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(196, 163, 90, 0.3);
  border-radius: 50%;
  animation: pulse-ring 3s ease-in-out infinite 0.5s;
}

.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary));
  border: 2px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 40px rgba(196, 163, 90, 0.2);
}

.avatar-inner svg {
  width: 56px;
  height: 56px;
  color: var(--accent-primary);
}

@keyframes pulse-ring {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.05); opacity: 0.3; }
}

/* 标题文字 */
.about-name {
  font-size: clamp(32px, 6vw, 48px);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
  letter-spacing: 0.05em;
  text-shadow: 0 0 40px rgba(196, 163, 90, 0.3);
}

.about-tagline {
  font-size: var(--text-lg);
  color: var(--text-muted);
  margin-bottom: var(--space-5);
  font-weight: var(--font-light);
}

.about-motto {
  font-size: var(--text-sm);
  color: var(--accent-primary);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}

.motto-dot {
  color: var(--border-subtle);
}

/* 主内容区 */
.about-container {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-12) var(--space-6);
  position: relative;
  z-index: 1;
}

/* 章节样式 */
.about-section {
  margin-bottom: var(--space-12);
  padding: var(--space-8);
  background: rgba(26, 26, 46, 0.6);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(10px);
}

.fade-in {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.fade-in:nth-child(1) { animation-delay: 0.1s; }
.fade-in:nth-child(2) { animation-delay: 0.2s; }
.fade-in:nth-child(3) { animation-delay: 0.3s; }

@keyframes fade-in-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-subtle);
}

.section-icon {
  font-size: var(--text-xl);
  color: var(--accent-primary);
  font-family: monospace;
}

.section-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  letter-spacing: 0.05em;
}

.section-content {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.9;
}

.section-content p {
  margin-bottom: var(--space-4);
}

/* 技能网格 */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-5);
}

.skill-category {
  padding: var(--space-5);
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
}

.skill-category:hover {
  border-color: var(--accent-primary);
  box-shadow: 0 4px 20px rgba(196, 163, 90, 0.1);
  transform: translateY(-2px);
}

.category-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.category-icon {
  color: var(--accent-primary);
}

.category-title {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.skill-tag {
  padding: var(--space-1) var(--space-3);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.skill-tag:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  background: rgba(196, 163, 90, 0.1);
}

/* 联系方式 */
.contact-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.contact-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.contact-link:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  background: rgba(196, 163, 90, 0.05);
}

.contact-link svg {
  color: var(--accent-primary);
}

/* 响应式 */
@media (max-width: 768px) {
  .about-hero {
    padding: var(--space-12) var(--space-4);
  }

  .holographic-avatar {
    width: 100px;
    height: 100px;
  }

  .avatar-inner svg {
    width: 40px;
    height: 40px;
  }

  .about-name {
    font-size: var(--text-2xl);
  }

  .about-container {
    padding: var(--space-6) var(--space-4);
  }

  .about-section {
    padding: var(--space-5);
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
