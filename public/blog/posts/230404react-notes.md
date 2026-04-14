---
title: React 学习笔记
titleEn: React Study Notes
desc: 从 Vue 转向 React 的学习笔记
descEn: Learning notes transitioning from Vue to React
date: 2023-04-04
tags: [前端，React，框架]
cover: /images/gallery/20260328164219_1.jpg
readingTime: 8
---

# React 学习笔记

## JSX 基础

### JSX 本质

```javascript
// JSX
const element = <h1>Hello, {name}</h1>;

// 编译后
const element = React.createElement('h1', null, `Hello, ${name}`);
```

## Hooks

### useState

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### useEffect

```javascript
import { useState, useEffect } from 'react';

function Example() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []); // 空数组 = 只在挂载时执行
  
  return <div>{data}</div>;
}
```

### useMemo & useCallback

```javascript
// 缓存计算结果
const memoizedValue = useMemo(() => computeExpensive(a), [a]);

// 缓存函数引用
const memoizedCallback = useCallback(() => doSomething(a), [a]);
```

## Vue vs React

| Vue | React |
|-----|-------|
| 模板语法 | JSX |
| 响应式系统 | 状态驱动 |
| 双向绑定 | 单向数据流 |
| Options/Composition API | Hooks |

## 总结

React 的函数式编程思想让我对前端开发有了新的认识，Hooks 的设计非常优雅。
