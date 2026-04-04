import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './styles/death-stranding.css'

// 路由配置
const routes = [
  { path: '/', name: 'home', component: () => import('./views/HomeView.vue') },
  { path: '/blog', name: 'blog', component: () => import('./views/BlogView.vue') },
  { path: '/blog/:id', name: 'post', component: () => import('./views/PostView.vue') },
  { path: '/gallery', name: 'gallery', component: () => import('./views/GalleryView.vue') },
  { path: '/tools', name: 'tools', component: () => import('./views/ToolsView.vue') },
  { path: '/about', name: 'about', component: () => import('./views/AboutView.vue') },
  // 工具子路由
  { path: '/tools/color-picker', name: 'tool-color-picker', component: () => import('./tools/ColorPicker.vue') },
  { path: '/tools/color-scheme', name: 'tool-color-scheme', component: () => import('./tools/ColorScheme.vue') },
  { path: '/tools/gradient-generator', name: 'tool-gradient-generator', component: () => import('./tools/GradientGenerator.vue') },
  { path: '/tools/json-formatter', name: 'tool-json-formatter', component: () => import('./tools/JSONFormatter.vue') },
  { path: '/tools/markdown-editor', name: 'tool-markdown-editor', component: () => import('./tools/MarkdownEditor.vue') },
  { path: '/tools/image-compressor', name: 'tool-image-compressor', component: () => import('./tools/ImageCompressor.vue') },
  { path: '/tools/base64-converter', name: 'tool-base64-converter', component: () => import('./tools/Base64Converter.vue') },
  { path: '/tools/regex-tester', name: 'tool-regex-tester', component: () => import('./tools/RegexTester.vue') },
  { path: '/tools/css-generator', name: 'tool-css-generator', component: () => import('./tools/CSSGenerator.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
