## CSS 初始化

```css
* {
  margin: 0;
  padding: 0;
}
.clearfix:before,
.clearfix:after {
  content: "";
  display: table; /* 触发bfc 防止外边距合并 */
}
.clearfix::after {
  clear: both; /* 清除浮动 */
}
.clearfix {
  *zoom: 1; /* *代表IE6/7能识别的属性,zoom就是IE浏览器清除浮动的方式 */
}
ul {
  list-style: none;
}
```

## 文字间间隔

不要直接设置宽度，设置左右的 `padding`

## absolution 定位

1. 如果父亲没有定位，子级会根据浏览器边框（document 文档）定位

2. 如果父级有定位，子级会依据最近的已经定位（绝对、固定或相对定位的）父元素（祖先）进行定位

## 子绝父相的由来

1. 相对定位 占有位置，不脱标

2. 绝对位置 不占有位置，完全脱标

## 常用固定清除

1. outline:0/none 清除轮廓

2. resize:none 阻止文本域拖拽

## 清除浮动

1. 额外标签法

在浮动元素末尾添加一个空标签，在 style 中加 clear：both

2. 父级加 overflow

父级选择器添加 overflow：hidden/scroll/auto

3. after 伪元素

原理类似第一种方法

4. after 和 before 双伪元素

## 渐变

```css
background-color： liner-gradient（）

background-color： radial-gradient（）

/* 要渐变重复可改成  */
repeating-liner-gradient（）
```

## 动画延迟可以设置为负数

这样一打开页面就已经在播放动画

## 外边距合并

1. 上下元素外边距合并

![2](./../../.vuepress/public/imgs/front/front_learn/css_learn/2.png)

2. 嵌套块级元素垂直外边距的合并

![1](./../../.vuepress/public/imgs/front/front_learn/css_learn/1.png)

## 媒体查询

1. 内部样式表内部

```css
@media screen and (min-device-width:400px){
​ .div {
/* ​代码 */
​ }
}
```

2. 内部样式表的 style 内部

![3](./../../.vuepress/public/imgs/front/front_learn/css_learn/3.png)

3. 外部样式表

![3](./../../.vuepress/public/imgs/front/front_learn/css_learn/4.png)


## BFC

[文章来源](https://zhuanlan.zhihu.com/p/25321647)

一、常见定位方案
在讲 BFC 之前，我们先来了解一下常见的定位方案，定位方案是控制元素的布局，有三种常见方案:

普通流 (normal flow)
在普通流中，元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行，除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定。

浮动 (float)
在浮动布局中，元素首先按照普通流的位置出现，然后根据浮动的方向尽可能的向左边或右边偏移，其效果与印刷排版中的文本环绕相似。

绝对定位 (absolute positioning)
在绝对定位布局中，元素会整体脱离普通流，因此绝对定位元素不会对其兄弟元素造成影响，而元素具体的位置由绝对定位的坐标决定。

二、BFC 概念
Formatting context(格式化上下文) 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

那么 BFC 是什么呢？

BFC 即 Block Formatting Contexts (块级格式化上下文)，它属于上述定位方案的普通流。

具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

三、触发 BFC

只要元素满足下面任一条件即可触发 BFC 特性：

1. body 根元素
2. 浮动元素：float 除 none 以外的值
3. 绝对定位元素：position (absolute、fixed)
4. display 为 inline-block、table-cells、flex
5. overflow 除了 visible 以外的值 (hidden、auto、scroll)

四、BFC 特性及应用
1. 同一个 BFC 下外边距会发生折叠

```html
<head>
div{
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
}
</head>
<body>
    <div></div>
    <div></div>
</body>
```

![](../../.vuepress/public/imgs/front/front_learn/css_learn/BFC06.png)

从效果上看，因为两个 div 元素都处于同一个 BFC 容器下 (这里指 body 元素) 所以第一个 div 的下边距和第二个 div 的上边距发生了重叠，所以两个盒子之间距离只有 100px，而不是 200px。

首先这不是 CSS 的 bug，我们可以理解为一种规范，如果想要避免外边距的重叠，可以将其放在不同的 BFC 容器中。

```html
<div class="container">
    <p></p>
</div>
<div class="container">
    <p></p>
</div>
```

```css
.container {
    overflow: hidden;
}
p {
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
}
```

这时候，两个盒子边距就变成了 200px

![](../../.vuepress/public/imgs/front/front_learn/css_learn/BFC05.png)

2. BFC 可以包含浮动的元素（清除浮动）

我们都知道，浮动的元素会脱离普通文档流，来看下下面一个例子

```html
<div style="border: 1px solid #000;">
    <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```
![](../../.vuepress/public/imgs/front/front_learn/css_learn/BFC04.png)

由于容器内元素浮动，脱离了文档流，所以容器只剩下 2px 的边距高度。如果使触发容器的 BFC，那么容器将会包裹着浮动元素。 
```html
<div style="border: 1px solid #000;overflow: hidden">
    <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```
效果如图：
![](../../.vuepress/public/imgs/front/front_learn/css_learn/BFC03.png)

3. BFC 可以阻止元素被浮动元素覆盖

先来看一个文字环绕效果：
![](../../.vuepress/public/imgs/front/front_learn/css_learn/BFC02.png)

```html
<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #eee">我是一个没有设置浮动, 
也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;</div>
```

这时候其实第二个元素有部分被浮动元素所覆盖，(但是文本信息不会被浮动元素所覆盖) 如果想避免元素被覆盖，可触第二个元素的 BFC 特性，在第二个元素中加入 overflow: hidden，就会变成：
![](../../.vuepress/public/imgs/front/front_learn/css_learn/BFC01.png)

这个方法可以用来实现两列自适应布局，效果不错，这时候左边的宽度固定，右边的内容自适应宽度(去掉上面右边内容的宽度)。