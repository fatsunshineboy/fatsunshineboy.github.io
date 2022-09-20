---
# sidebar: auto
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
12. 
枚举,罗列所有可能的情况,并且使意义明了

使用枚举我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。 TypeScript支持数字的和基于字符串的枚举。

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

TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

- 定义规范
- 接口中所有的属性不能有实际值
- 接口只定义对象的接口，而不考虑实际值
- 在接口中的所有方法都是抽象方法

**只读属性**

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly来指定只读属性:
```ts
interface Point {
    readonly x: number;
    readonly y: number;
}
```

你可以通过赋值一个对象字面量来构造一个Point。 赋值后， x和y再也不能被改变了。

```ts
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
```

**类静态部分与实例部分的区别**

当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：

```ts
interface ClockConstructor {
    new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
```

这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内。

因此，我们应该直接操作类的静态部分。 看下面的例子，我们定义了两个接口， ClockConstructor为构造函数所用和ClockInterface为实例方法所用。 为了方便我们定义一个构造函数 createClock，它用传入的类型创建实例。

```ts
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

因为 `createClock` 的第一个参数是 `ClockConstructor` 类型，在 createClock(AnalogClock, 7, 32) 里，会检查 AnalogClock 是否符合构造函数签名。


## 类

:::tip
派生类包含了一个构造函数，它必须调用 super()，它会执行基类的构造函数。而且，在构造函数里访问 this 的属性之前，我们一定要调用 super()。这个是TypeScript强制执行的一条重要规则。
:::

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
    constructor(public name: string, public age: number){}
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

## 函数

### this

this和箭头函数

JavaScript里，this的值在函数被调用的时候才会指定。 这是个既强大又灵活的特点，但是你需要花点时间弄清楚函数调用的上下文是什么。 但众所周知，这不是一件很简单的事，尤其是在返回一个函数或将函数当做参数传递的时候。

下面看一个例子：

```js
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return function() {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

可以看到 `createCardPicker` 是个函数，并且它又返回了一个函数。 如果我们尝试运行这个程序，会发现它并没有弹出对话框而是报错了。 因为 `createCardPicker` 返回的函数里的 `this` 被设置成了 `window` 而不是deck对象。 因为我们只是独立的调用了 `cardPicker()`。 顶级的非方法式调用会将 `this` 视为`window`。 （注意：在严格模式下，`this` 为 undefined 而不是 window）。

为了解决这个问题，我们可以在函数被返回时就绑好正确的 this。 这样的话，无论之后怎么使用它，都会引用绑定的 ‘deck’ 对象。 我们需要改变函数表达式来使用 ECMAScript 6 箭头语法。 箭头函数能保存函数创建时的 this 值，而不是调用时的值：

```js
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

更好事情是，TypeScript会警告你犯了一个错误，如果你给编译器设置了 --noImplicitThis 标记。 它会指出 `this.suits[pickedSuit]` 里的 this 的类型为 any。

this参数
不幸的是，`this.suits[pickedSuit]` 的类型依旧为 any。 这是因为 this 来自对象字面量里的函数表达式。 修改的方法是，提供一个显式的 this 参数。 this 参数是个假的参数，它出现在参数列表的最前面：

```js
function f(this: void) {
    // make sure `this` is unusable in this standalone function
}
```

让我们往例子里添加一些接口，Card 和 Deck，让类型重用能够变得清晰简单些：

```js
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

现在TypeScript知道createCardPicker期望在某个Deck对象上调用。 也就是说 this是Deck类型的，而非any，因此--noImplicitThis不会报错了。

## 高级类型

**交叉类型**

交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。 例如， Person & Serializable & Loggable同时是 Person 和 Serializable 和 Loggable。 就是说这个类型的对象同时拥有了这三种类型的成员。

我们大多是在混入（mixins）或其它不适合典型面向对象模型的地方看到交叉类型的使用。 （在JavaScript里发生这种情况的场合很多！） 下面是如何创建混入的一个简单例子：

```ts
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
        // ...
    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
```

