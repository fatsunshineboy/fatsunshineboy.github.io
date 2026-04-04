---
title: TypeScript 学习笔记
titleEn: TypeScript Study Notes
desc: TypeScript 类型系统学习笔记
descEn: TypeScript type system learning notes
date: 2025-01-20
tags: [前端，TypeScript]
cover: /images/gallery/20260328173836_1.jpg
readingTime: 10
---

# TypeScript 学习笔记

TypeScript 为 JavaScript 添加了类型系统，让代码更加健壮和可维护。

## 基础类型

```typescript
// 基本类型
let str: string = 'hello';
let num: number = 123;
let bool: boolean = true;
let nullable: null = null;
let undefinedVal: undefined = undefined;

// 数组
let arr1: number[] = [1, 2, 3];
let arr2: Array<string> = ['a', 'b', 'c'];

// 元组
let tuple: [string, number] = ['hello', 123];

// 枚举
enum Color { Red, Green, Blue }
const c: Color = Color.Green;
```

## 接口和类型别名

```typescript
// 接口
interface User {
  id: number;
  name: string;
  email?: string; // 可选属性
  readonly createdAt: Date; // 只读属性
}

// 类型别名
type Point = { x: number; y: number };
type Shape = Circle | Rectangle;

// 交叉类型
type Employee = User & {
  employeeId: string;
  department: string;
};
```

## 泛型

```typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>('hello');

// 泛型接口
interface Container<T> {
  value: T;
  getValue(): T;
}

// 泛型约束
function printLength<T extends { length: number }>(item: T) {
  console.log(item.length);
}
```

## 实用技巧

### 类型断言

```typescript
const value = someValue as string;
const dom = document.getElementById('app') as HTMLDivElement;
```

### 类型守卫

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
```

TypeScript 的类型系统非常强大，能够捕获很多运行时的错误。
