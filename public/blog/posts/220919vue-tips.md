---
title: Vue 开发注意事项
titleEn: Vue Development Tips
desc: Vue 项目开发中的常见问题和最佳实践
descEn: Common issues and best practices in Vue project development
date: 2022-09-19
tags: [前端，Vue，框架]
cover: /images/gallery/20260328162904_1.jpg
readingTime: 6
---

# Vue 开发注意事项

## 组件通信

### 父子组件通信

```vue
<!-- 父组件 -->
<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const parentData = ref('hello')
function handleUpdate(val) {
  parentData.value = val
}
</script>

<template>
  <Child :value="parentData" @update="handleUpdate" />
</template>
```

### 兄弟组件通信

使用事件总线或状态管理（Vuex/Pinia）

## 性能优化

### 1. 使用 v-show 替代 v-if

当需要频繁切换时，v-show 性能更好

### 2. 列表渲染添加 key

```vue
<div v-for="item in items" :key="item.id">{{ item.name }}</div>
```

### 3. 异步组件

```javascript
const AsyncComponent = defineAsyncComponent(() => 
  import('./HeavyComponent.vue')
);
```

## 常见陷阱

### 响应式丢失

```javascript
// 错误
const state = reactive({ nested: { value: 1 } })
state.nested = { value: 2 } // 失去响应式

// 正确
state.nested.value = 2
```

### watch 监听对象

```javascript
// 深度监听
watch(myObj, (newVal) => {}, { deep: true })

// 或者监听特定属性
watch(() => myObj.prop, (newVal) => {})
```

## 最佳实践

1. 使用 Composition API 组织逻辑
2. 合理拆分组件
3. 使用 TypeScript 提高可维护性
4. 编写单元测试
