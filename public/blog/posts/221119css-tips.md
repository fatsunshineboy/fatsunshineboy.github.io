---
title: CSS 技巧总结
titleEn: CSS Tips and Tricks
desc: CSS 布局与效果技巧
descEn: CSS layout and effect tips
date: 2022-11-19
tags: [前端，CSS]
cover: /images/gallery/20260328211251_1.jpg
readingTime: 8
---

# CSS 技巧总结

CSS 是网页样式的基础，掌握这些技巧可以让你的页面更加美观和易用。

## Flexbox 布局

```css
.container {
  display: flex;
  flex-direction: row;
  justify-content: center; /* 主轴对齐 */
  align-items: center; /* 交叉轴对齐 */
  gap: 16px; /* 间距 */
}

.item {
  flex: 1; /* 弹性增长 */
  flex-shrink: 0; /* 不收缩 */
}
```

## Grid 布局

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  gap: 20px;
}
```

## 常见效果

### 居中

```css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 椭圆裁剪

```css
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}
```

### 文本截断

```css
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.multi-line-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### 毛玻璃效果

```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### 渐变背景

```css
.gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 总结

CSS 看似简单，但要精通需要大量的实践和经验积累。
