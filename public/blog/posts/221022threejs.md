---
title: Three.js 学习笔记
titleEn: Three.js Study Notes
desc: Three.js 学习笔记与基础概念
descEn: Three.js learning notes and basic concepts
date: 2022-10-22
tags: [前端，Three.js，3D，WebGL]
cover: /images/gallery/20260328210911_1.jpg
readingTime: 12
---

# Three.js 学习笔记

Three.js 是一个强大的 WebGL 库，让我能够在网页上创建 3D 场景。

## 基础概念

### 场景搭建

```javascript
import * as THREE from 'three';

// 场景 - 容器
const scene = new THREE.Scene();

// 相机 - 视角
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.z = 5;

// 渲染器 - 绘制
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 几何体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```

## 常用几何体

| 几何体 | 描述 |
|--------|------|
| BoxGeometry | 立方体 |
| SphereGeometry | 球体 |
| PlaneGeometry | 平面 |
| CylinderGeometry | 圆柱 |
| TorusGeometry | 圆环 |

## 材质类型

- **MeshBasicMaterial** - 基础材质（不受光照影响）
- **MeshLambertMaterial** - Lambert 材质（漫反射）
- **MeshPhongMaterial** - Phong 材质（高光）
- **MeshStandardMaterial** - 标准材质（PBR）
- **MeshPhysicalMaterial** - 物理材质（更真实的 PBR）

## 光照

```javascript
// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);
```

## 控制器

使用 OrbitControls 实现相机控制：

```javascript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
```

## 总结

Three.js 大大降低了 3D 网页开发的门槛，通过简单的 API 就能创建出精美的 3D 效果。
