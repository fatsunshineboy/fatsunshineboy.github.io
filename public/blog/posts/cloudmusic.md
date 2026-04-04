---
title: 云音乐项目开发
titleEn: Cloud Music Project Development
desc: 一个仿网易云音乐的全栈项目
descEn: A full-stack project imitating NetEase Cloud Music
date: 2025-02-10
tags: [项目，Vue，Node.js]
cover: /images/gallery/20260328162922_1.jpg
readingTime: 10
---

# 云音乐项目开发

## 项目概述

这是一个仿网易云音乐的全栈项目，包含音乐播放、歌单管理、用户收藏等功能。

## 技术栈

- **前端**: Vue 3 + Vuex + Vue Router + Element Plus
- **后端**: Node.js + Express + NeteaseCloudMusicAPI
- **数据库**: MongoDB

## 核心功能

### 1. 音乐播放器

播放器是音乐应用的核心功能，需要处理播放、暂停、进度控制等。

```javascript
// 播放器核心逻辑
const usePlayer = () => {
  const currentTrack = ref(null);
  const isPlaying = ref(false);
  const progress = ref(0);
  
  const play = (track) => {
    currentTrack.value = track;
    isPlaying.value = true;
  };
  
  const toggle = () => {
    isPlaying.value = !isPlaying.value;
  };
  
  return { currentTrack, isPlaying, progress, play, toggle };
};
```

### 2. 歌单管理

- 创建歌单
- 添加/删除歌曲
- 分享歌单
- 收藏歌单

### 3. 搜索功能

支持多种类型的搜索：
- 歌曲搜索
- 歌手搜索
- 专辑搜索
- 歌单搜索

## 难点与解决方案

### 音频播放连续性

使用 HTML5 Audio API，结合 Vuex 实现全局状态管理，确保页面切换时音乐不中断。

### 歌词同步

```javascript
function parseLyric(lrc) {
  const lines = lrc.split('\n');
  return lines.map(line => {
    const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
    if (match) {
      return {
        time: parseFloat(match[1]) * 60 + parseFloat(match[2]),
        text: match[3].trim()
      };
    }
    return null;
  }).filter(Boolean);
}
```

## 项目总结

通过这个项目，我深入理解了全栈开发的流程，提升了 Vue 和 Node.js 的实战能力。
