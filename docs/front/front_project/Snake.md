---
title: 贪吃蛇
time: 2022-9-11
---

# 贪吃蛇

## 项目介绍

网页端的贪吃蛇小游戏，目前实现的功能主要是开始游戏，重新开始，暂停，排行榜。

技术栈：Vue3 + Pinia + Element Plus + TypeScript

初学 ts 的作品，写的有点糟糕

[视频参考](https://www.bilibili.com/video/BV1Xy4y1v7S2)

[线上地址](https://fatsunshineboy.github.io/snake/)

[github地址](https://github.com/fatsunshineboy/game/tree/snake)

作品展示：

<iframe src="https://fatsunshineboy.github.io/snake/" scroll="auto" frameborder="0" width="100%" height="850px"></iframe>

## 经验

动态图片路径问题

第一种方法在开发环境下可以正常使用，但在生产环境下找不到图片，可以采用第二中方法

1. 官方建议
```ts
const getImageUrl = function (name: string) {
    return new URL(`../assets/image/${name}.png`, import.meta.url).href;
}

let playBG = "url(" + getImageUrl('game') + ")"
```

2. import 方法
```ts
import headUrl from "../assets/image/snake/right.png";
// headUrl 就是图片的路径，直接使用变量
```
