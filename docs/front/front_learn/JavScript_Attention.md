---
# sidebar: auto
title: JavaScript注意事项
time: 2022-9-8
---

## 构造函数
构造函数会有以下几个执行过程：

> 1. 当以 new 关键字调用时，会创建一个新的内存空间，标记为构造函数的实例。
> 2. 函数体内部的 this 指向该内存
> 3. 执行函数体内的代码,给 this 添加属性，就相当于给实例添加属性。
> 4. 默认返回 this
:::tip
由于函数体内部的this指向新创建的内存空间，默认返回 this ，就相当于默认返回了该内存空间。
返回值为普通数据时，返回的是当前实例。返回值为数组或者对象时，返回的是对象或者数组。
:::
为了防止因为忘记使用new关键字而调用构造函数，可以加一些判断条件强行调用new关键字，代码如下：
```js
function Person(name){
  if (!(this instanceof Person)) {
    return new Person(name);
  }
  this.name = name;
  this.say = function(){
    return "I am " + this.name;
  }
}

var person1 = Person('nicole');
console.log(person1.say()); // I am nicole
var person2 = new Person('lisa');
console.log(person2.say()); // I am lisa
```
[文章来源](https://www.jianshu.com/p/7e21e23ffba9)

## 闭包
闭包（closure）是一个函数以及其捆绑的周边环境状态（lexical environment，词法环境）的引用的组合。换而言之，闭包让开发者可以从内部函数访问外部函数的作用域。在 JavaScript 中，闭包会随着函数的创建而被同时创建。

### 词法作用域
请看下面的代码：
```javascript
function init() {
  var name = "Mozilla"; // name 是一个被 init 创建的局部变量
  function displayName() { // displayName() 是内部函数，一个闭包
      alert(name); // 使用了父函数中声明的变量
  }
  displayName();
}
init();
```
init() 创建了一个局部变量 name 和一个名为 displayName() 的函数。displayName() 是定义在 init() 里的内部函数，并且仅在 init() 函数体内可用。请注意，displayName() 没有自己的局部变量。然而，因为它可以访问到外部函数的变量，所以 displayName() 可以使用父函数 init() 中声明的变量 name 。

使用这个 JSFiddle 链接运行该代码后发现， displayName() 函数内的 alert() 语句成功显示出了变量 name 的值（该变量在其父函数中声明）。这个词法作用域的例子描述了分析器如何在函数嵌套的情况下解析变量名。词法（lexical）一词指的是，词法作用域根据源代码中声明变量的位置来确定该变量在何处可用。嵌套函数可访问声明于它们外部作用域的变量。

### 闭包
现在来考虑以下例子 ：
```javascript
function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        alert(name);
    }
    return displayName;
}

var myFunc = makeFunc();
myFunc();
```
运行这段代码的效果和之前 init() 函数的示例完全一样。其中不同的地方（也是有意思的地方）在于内部函数 displayName() 在执行前，从外部函数返回。

第一眼看上去，也许不能直观地看出这段代码能够正常运行。在一些编程语言中，一个函数中的局部变量仅存在于此函数的执行期间。一旦 makeFunc() 执行完毕，你可能会认为 name 变量将不能再被访问。然而，因为代码仍按预期运行，所以在 JavaScript 中情况显然与此不同。

原因在于，JavaScript 中的函数会形成了闭包。 闭包是由函数以及声明该函数的词法环境组合而成的。该环境包含了这个闭包创建时作用域内的任何局部变量。在本例子中，myFunc 是执行 makeFunc 时创建的 displayName 函数实例的引用。displayName 的实例维持了一个对它的词法环境（变量 name 存在于其中）的引用。因此，当 myFunc 被调用时，变量 name 仍然可用，其值 Mozilla 就被传递到alert中。

下面是一个更有意思的示例 — 一个 makeAdder 函数：
```javascript
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```
在这个示例中，我们定义了 makeAdder(x) 函数，它接受一个参数 x ，并返回一个新的函数。返回的函数接受一个参数 y，并返回x+y的值。

从本质上讲，makeAdder 是一个函数工厂 — 他创建了将指定的值和它的参数相加求和的函数。在上面的示例中，我们使用函数工厂创建了两个新函数 — 一个将其参数和 5 求和，另一个和 10 求和。

add5 和 add10 都是闭包。它们共享相同的函数定义，但是保存了不同的词法环境。在 add5 的环境中，x 为 5。而在 add10 中，x 则为 10。

### 实用的闭包
闭包很有用，因为它允许将函数与其所操作的某些数据（环境）关联起来。这显然类似于面向对象编程。在面向对象编程中，对象允许我们将某些数据（对象的属性）与一个或者多个方法相关联。

因此，通常你使用只有一个方法的对象的地方，都可以使用闭包。

在 Web 中，你想要这样做的情况特别常见。大部分我们所写的 JavaScript 代码都是基于事件的 — 定义某种行为，然后将其添加到用户触发的事件之上（比如点击或者按键）。我们的代码通常作为回调：为响应事件而执行的函数。

假如，我们想在页面上添加一些可以调整字号的按钮。一种方法是以像素为单位指定 body 元素的 font-size，然后通过相对的 em 单位设置页面中其它元素（例如header）的字号：
```css
body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 12px;
}

h1 {
  font-size: 1.5em;
}

h2 {
  font-size: 1.2em;
}
```
我们的文本尺寸调整按钮可以修改 body 元素的 font-size 属性，由于我们使用相对单位，页面中的其它元素也会相应地调整。

以下是 JavaScript：
```javascript
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);
```
size12，size14 和 size16 三个函数将分别把 body 文本调整为 12，14，16 像素。我们可以将它们分别添加到按钮的点击事件上。如下所示：
```javascript
document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;
```
```html
<a href="#" id="size-12">12</a>
<a href="#" id="size-14">14</a>
<a href="#" id="size-16">16</a>
```
## 用闭包模拟私有方法
编程语言中，比如 Java，是支持将方法声明为私有的，即它们只能被同一个类中的其它方法所调用。

而 JavaScript 没有这种原生支持，但我们可以使用闭包来模拟私有方法。私有方法不仅仅有利于限制对代码的访问：还提供了管理全局命名空间的强大能力，避免非核心的方法弄乱了代码的公共接口部分。

下面的示例展现了如何使用闭包来定义公共函数，并令其可以访问私有函数和变量。这个方式也称为模块模式（module pattern）：
```javascript
var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }
})();

console.log(Counter.value()); /* logs 0 */
Counter.increment();
Counter.increment();
console.log(Counter.value()); /* logs 2 */
Counter.decrement();
console.log(Counter.value()); /* logs 1 */
```
在之前的示例中，每个闭包都有它自己的词法环境；而这次我们只创建了一个词法环境，为三个函数所共享：Counter.increment，``Counter.decrement 和 Counter.value。

该共享环境创建于一个立即执行的匿名函数体内。这个环境中包含两个私有项：名为 privateCounter 的变量和名为 changeBy 的函数。这两项都无法在这个匿名函数外部直接访问。必须通过匿名函数返回的三个公共函数访问。

这三个公共函数是共享同一个环境的闭包。多亏 JavaScript 的词法作用域，它们都可以访问 privateCounter 变量和 changeBy 函数。

备注： 你应该注意到我们定义了一个匿名函数，用于创建一个计数器。我们立即执行了这个匿名函数，并将他的值赋给了变量Counter。我们可以把这个函数储存在另外一个变量makeCounter中，并用他来创建多个计数器。
```javascript
var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }
};

var Counter1 = makeCounter();
var Counter2 = makeCounter();
console.log(Counter1.value()); /* logs 0 */
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); /* logs 2 */
Counter1.decrement();
console.log(Counter1.value()); /* logs 1 */
console.log(Counter2.value()); /* logs 0 */
```
请注意两个计数器 Counter1 和 Counter2 是如何维护它们各自的独立性的。每个闭包都是引用自己词法作用域内的变量 privateCounter 。

每次调用其中一个计数器时，通过改变这个变量的值，会改变这个闭包的词法环境。然而在一个闭包内对变量的修改，不会影响到另外一个闭包中的变量。

备注： 以这种方式使用闭包，提供了许多与面向对象编程相关的好处 —— 特别是数据隐藏和封装。

在循环中创建闭包：一个常见错误
在 ECMAScript 2015 引入 let 关键字 之前，在循环中有一个常见的闭包创建问题。参考下面的示例：
```html
<p id="help">Helpful notes will appear here</p>
<p>E-mail: <input type="text" id="email" name="email"></p>
<p>Name: <input type="text" id="name" name="name"></p>
<p>Age: <input type="text" id="age" name="age"></p>
```
```javascript
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help);
    }
  }
}

setupHelp();
```
数组 helpText 中定义了三个有用的提示信息，每一个都关联于对应的文档中的 input 的 ID。通过循环这三项定义，依次为相应 input 添加了一个 onfocus 事件处理函数，以便显示帮助信息。

运行这段代码后，您会发现它没有达到想要的效果。无论焦点在哪个 input 上，显示的都是关于年龄的信息。

原因是赋值给 onfocus 的是闭包。这些闭包是由他们的函数定义和在 setupHelp 作用域中捕获的环境所组成的。这三个闭包在循环中被创建，但他们共享了同一个词法作用域，在这个作用域中存在一个变量 item。这是因为变量 item 使用 var 进行声明，由于变量提升，所以具有函数作用域。当 onfocus 的回调执行时，item.help 的值被决定。由于循环在事件触发之前早已执行完毕，变量对象 item（被三个闭包所共享）已经指向了 helpText 的最后一项。

解决这个问题的一种方案是使用更多的闭包：特别是使用前面所述的函数工厂：
```javascript
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function makeHelpCallback(help) {
  return function() {
    showHelp(help);
  };
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
  }
}

setupHelp();
```

这段代码可以如我们所期望的那样工作。所有的回调不再共享同一个环境， makeHelpCallback 函数为每一个回调创建一个新的词法环境。在这些环境中，help 指向 helpText 数组中对应的字符串。

另一种方法使用了匿名闭包：
```javascript
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    (function() {
       var item = helpText[i];
       document.getElementById(item.id).onfocus = function() {
         showHelp(item.help);
       }
    })(); // 马上把当前循环项的 item 与事件回调相关联起来
  }
}

setupHelp();
```
如果不想使用过多的闭包，你可以用 ES2015 引入的 let 或 const 关键词：
```javascript
function showHelp(help) {
  document.getElementById('help').textContent = help;
}

function setupHelp() {
  const helpText = [
    { id: 'email', help: 'Your e-mail address' },
    { id: 'name', help: 'Your full name' },
    { id: 'age', help: 'Your age (you must be over 16)' },
  ];

  for (let i = 0; i < helpText.length; i++) {
    const item = helpText[i];
    document.getElementById(item.id).onfocus = () => {
      showHelp(item.help);
    };
  }
}

setupHelp();
```
这个例子使用 const 而不是 var，因此每个闭包都绑定了块作用域的变量，这意味着不再需要额外的闭包。

另一个可选方案是使用 forEach() 来遍历 helpText 数组并给每一个 <input> 添加一个监听器，如下所示：
```javascript
function showHelp(help) {
  document.getElementById('help').textContent = help;
}

function setupHelp() {
  var helpText = [
    { id: 'email', help: 'Your e-mail address' },
    { id: 'name', help: 'Your full name' },
    { id: 'age', help: 'Your age (you must be over 16)' },
  ];

  helpText.forEach(function (text) {
    document.getElementById(text.id).onfocus = function () {
      showHelp(text.help);
    };
  });
}

setupHelp();
```
### 性能考量
如果不是某些特定任务需要使用闭包，在其它函数中创建函数是不明智的，因为闭包在处理速度和内存消耗方面对脚本性能具有负面影响。

例如，在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。原因是这将导致每次构造器被调用时，方法都会被重新赋值一次（也就是说，对于每个对象的创建，方法都会被重新赋值）。

考虑以下示例：
```javascript
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
  this.getName = function() {
    return this.name;
  };

  this.getMessage = function() {
    return this.message;
  };
}
```
在上面的代码中，我们并没有利用到闭包的好处，因此可以避免使用闭包。修改成如下：
```javascript
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}
MyObject.prototype = {
  getName() {
    return this.name;
  },
  getMessage() {
    return this.message;
  }
};
```
但我们不建议重新定义原型。可改成如下例子：
```javascript
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}
MyObject.prototype.getName = function() {
  return this.name;
};
MyObject.prototype.getMessage = function() {
  return this.message;
};
```
在前面的两个示例中，继承的原型可以为所有对象共享，不必在每一次创建对象时定义方法。</br>
[文章来源](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

## 数组排序

一、普通数组排序　　
　　js中用方法sort()为数组排序。sort()方法有一个可选参数，是用来确定元素顺序的函数。如果这个参数被省略，那么数组中的元素将按照ASCII字符顺序进行排序。如：

```js
var arr = ["a", "b", "A", "B"];
arr.sort();
console.log(arr);//["A", "B", "a", "b"]
因为字母A、B的ASCII值分别为65、66，而a、b的值分别为97、98，所以上面输出的结果是 ["A", "B", "a", "b"] 。
```

　　如果数组元素是数字呢，结果会是怎样？

```js
var arr = [15, 8, 25, 3];
arr.sort();
console.log(arr);//[15, 25, 3, 8]
```
结果是 [15, 25, 3, 8] 。其实，sort方法会调用每个数组项的toString()方法，得到字符串，然后再对得到的字符串进行排序。虽然数值15比3大，但在进行字符串比较时"15"则排在"3"前面。显然，这种结果不是我们想要的，这时，sort()方法的参数就起到了作用，我们把这个参数叫做比较函数。

　　比较函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回0，如果第一个参数应该位于第二个之后则返回一个正数。例子：

```js
var arr = [23, 9, 4, 78, 3];
var compare = function (x, y) {//比较函数
    if (x < y) {
        return -1;
    } else if (x > y) {
        return 1;
    } else {
        return 0;
    }
}
console.log(arr.sort(compare));  
```      

结果为 [3, 4, 9, 23, 78] ，返回了我们想要的结果。如果要按降序排序，比较函数写成这样即可：

```js
var compare = function (x, y) {
    if (x < y) {
        return 1;
    } else if (x > y) {
        return -1;
    } else {
        return 0;
    }
}
```

　　我们并不能用比较函数比较一个不能转化为数字的字符串与数字的顺序：

```js
var arr = ["b", 5];
console.log(arr.sort(compare))
```

结果是 ["b", 5] 。因为比较函数在比较时，会把先把字符串转化为数字，然后再比较，字符串b不能转化为数字，所以就不能比较大小。然而，当不用比较函数时，会比较ASCII值，所以结果是 [5, "b"] 。

二、数组对象排序
　　如果数组项是对象，我们需要根据数组项的某个属性对数组进行排序，要怎么办呢？其实和前面的比较函数也差不多：

```js
var arr = [{name: "zlw", age: 24}, {name: "wlz", age: 25}];
var compare = function (obj1, obj2) {
    var val1 = obj1.name;
    var val2 = obj2.name;
    if (val1 < val2) {
        return -1;
    } else if (val1 > val2) {
        return 1;
    } else {
        return 0;
    }            
} 
console.log(arr.sort(compare));
```

　　输出结果为 [Object { name="wlz", age=25}, Object { name="zlw", age=24}] ，可以看到数组已经按照 name 属性进行了排序。我们可以对上面的比较函数再改造一下：

```js
var compare = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }            
    } 
}
```

如果想按照 age 进行排序， arr.sort(compare("age")) 即可。

　　但是对age属性进行排序时需要注意了，如果age属性的值是数字，那么排序结果会是我们想要的。但很多时候我们从服务器传回来的数据中，属性值通常是字符串。现在我把上面的数组改为：

```js
var arr = [{name: "zlw", age: "24"}, {name: "wlz", age: "5"}];
```

可以看到，我把 age 属性由数字改为了字符串，第二个数组项的 age 值改为了 "5" 。再次调用 arr.sort(compare("age")) 后，结果为：

[Object { name="zlw", age="24"}, Object { name="wlz", age="5"}]
我们的期望是5排在25前面，但是结果不是。这是因为当两个数字字符串比较大小时，会比较它们的ASCII值大小，比较规则是：从第一个字符开始，顺次向后直到出现不同的字符为止，然后以第一个不同的字符的ASCII值确定大小。所以"24"与"5"比较大小时，先比较”2“与"5"的ASCII值，显然”2“的ASCII值比"5"小，即确定排序顺序。

　　现在，我们需要对比较函数再做一些修改：

```js
var compare = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }            
    } 
}
```

在比较函数中，先把比较属性值转化为数字 Number(val1) 再通过 !isNaN(Number(val1)) 判断转化后的值是不是数字(有可能是NaN)，转化后的值如果是数字，则比较转换后的值，这样就可以得到我们想要的结果了， 调用  arr.sort(compare("age")) 得到：

[Object { name="wlz", age="5"}, Object { name="zlw", age="24"}]
可以看到，确实是按正确的方式排序了。

[文章来源](https://www.cnblogs.com/xljzlw/p/3694861.html)