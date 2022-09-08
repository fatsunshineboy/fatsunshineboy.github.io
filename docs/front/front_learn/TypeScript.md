---
sidebar: auto
time: 2022-9-3
---

## 类型
1. 字面量赋值
```typescript
let sex: "male" | "female";
// sex的值只能是male或者female
``` 
2. 联合类型
```typescript
let a: boolen | string;
```
3. any</br>
any 表示的是任意类型，设置 any 相当于关闭了 TS 的类型检测
```typescript
// any 类型的值可以赋给任意变量,并且不会报错
let a: any;
let b: string;
b = a;
```
:::warning
声明变量如果不指定类型，则TS解析器会自动判断变量的类型为any（隐式的 any ）
:::
4. unknown
```typescript
// unknown 类型的值不可以赋给任意变量,会报错
let a: unknown;
let b: string;
b = a; //不能将类型“unknown”分配给类型“string”。
// unknown 实际是一个类型安全的any
// 1. 解决方法,先进行类型判断
if (typeof c === "string") {
    d = c;
}
// 2. 类型断言
b = a as string;
```
5. 类型断言</br>
明确地告诉解析器,变量的实际类型
语法:
```typescript
// 1. 变量 as 类型
b = a as string;
// 2. <类型>变量
b = <string>a;
```
6. void</br>
void 表示为空,以函数为例,表示没有返回值
```typescript
// 三种特例
return;
retrun undefined;
return null;
```
7. never</br>
表示永远不会返回结果
代码报错时 [[[]]],立即退出,没有返回值
1. object
```typescript
// 1. 万物皆对象,无意义
let a: object;
// 2.指定对象的内部类型,赋值时必须完全一致
let b = {name: string}
b = {name: "sun"}
b = {name: "sun", age: 18}//报错
// 3.可以在变量后面加 ? 表示此类型为可选属性
let c = {name: string, age?: number}
b = {name: "sun", age: 18} //age可加可不加
// 4.任意属性的任意类型
let d: {name: string, [propNam: string]: any}
d = {name: "sun", age: 18, gender: "男"};//name必须要加,其余随意
// 5.指定函数对象
let e = (a: number, b: number)=>nubmber;
e = function (n1: number, n2: number): nubmber {
    return n1 + n2; 
}
```
9. array
```typescript
let e: string[];
let e: Array<number>;
```
10. tupple</br>
元组,元组就是固定长度的数组
```typescript
let h: [string,string];
h = ['hello', 123]
```
11. enum</br>
枚举,罗列所有可能的情况,并且使意义明了
```typescript
enum Gender{
    Male ,
    Female
}
let i: {name: string, gender: Gender};
i = {
    name: "sun",
    gender: Gender.Male
}
```
12. 类型的别名
```typescript
type myType = 1 | 2 | 3 | 4;
let k: myType;
k = 2;
```

## 接口
定义规范
接口中所有的属性不能有实际值
接口只定义对象的接口，而不考虑实际值
在接口中的所有方法都是抽象方法

## 类
```typescript
class Animal {
    name: string,
    age: number
    constructor(name: string, age: number){
        this.name = name
        this.age = age
    }
}

// 等于
class Animal {
    constructor(public ame: string, public age: number){}
}
```

## 泛型
```javascript
function fn<T>(a: T): T{
    return a;
}
// 调用
fn(a: 10);
fn<string>(a: "Hello");

interface Inter{
    length: number;
}
// T extends Inter 表示泛型 T 必须是Inter的实现类
function fn3<T extends Inter>(a: T): number{
    retrun a.length;
}
```