---
title: JavaScript 学习笔记
titleEn: JavaScript Study Notes
desc: JavaScript 核心概念学习笔记
descEn: JavaScript core concepts learning notes
date: 2023-01-29
tags: [前端，JavaScript]
cover: /images/gallery/20260328202313_1.jpg
readingTime: 15
---

# JavaScript 学习笔记

JavaScript 是前端开发的核心语言，深入理解其原理对于成为一名优秀的前端工程师至关重要。

## 变量与作用域

### var / let / const

```javascript
// var - 函数作用域，可重复声明
var a = 1;
var a = 2; // OK

// let - 块级作用域，不可重复声明
let b = 1;
// let b = 2; // Error

// const - 块级作用域，常量
const c = 3;
// c = 4; // Error

// 暂时性死区
console.log(x); // ReferenceError
let x = 1;
```

## 闭包

闭包是函数能够访问并"记住"其外部作用域变量的能力。

```javascript
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

## Promise 和 async/await

```javascript
// Promise
fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// async/await
async function getData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

## ES6+ 特性

### 解构赋值

```javascript
const [a, b] = [1, 2];
const { name, age } = person;
```

### 展开运算符

```javascript
const arr = [1, ...[2, 3], 4];
const obj = { ...obj1, ...obj2 };
```

### 模板字符串

```javascript
const greeting = `Hello, ${name}!`;
```

### 可选链

```javascript
const city = user?.address?.city;
```

### 空值合并

```javascript
const port = config.port ?? 8080;
```

## 总结

JavaScript 是一门不断进化的语言，学习它是一个持续的过程。
