---
title: 图片上传
time: 2022-10-22
---

# 基于vue3的图片上传组件

## 项目介绍

样式参考 [Element Plus](http://element-plus.org/zh-CN/component/upload.html)

[线上地址](https://fatsunshineboy.github.io/upLoadImage/)

作品展示：

<iframe src="https://fatsunshineboy.github.io/upLoadImage/" scroll="auto" frameborder="0" width="100%" height="350px"></iframe>

## 经验

### 上传动态图片宽高的 css 问题
先在 css 里写死固定的大小，设置 `object-fit` 的属性，然后在动态引入图片时可以设置 `width` 属性和 `height` 属性，这样图片会进行缩放适应

:::tip
1. object-fit
> object-fit CSS 属性指定可替换元素（例如：`<img>` 或 `<video>`）的内容应该如何适应到其使用高度和宽度确定的框。
> 用途：固定宽高后，添加图片
> 为图片设置 css 的固定宽高后，通过这个属性设置图片的自适应

2. flex 和 inline-flex 的区别 
flex：将对象作为弹性伸缩盒显示
inline-flex：将对象作为内联弹性伸缩盒显示
flex 当子元素小于父级元素时，父级元素仍会保留
inline-flex 当子元素小于父级元素时，父元素会自适应子元素
:::

### vue 动态设置 css

在根节点上绑定父组件的 props ，相当于在css文件上创建了一个全局变量

:::tip
在css中创建变量，--themeColor:red
使用变量， var(--theme)
:::

```html
<div class="app" :style="{'--width':props?.width,'--primaryColor':props?.primaryColor,}">
```

父组件传给子组件的 prop 值，应该采用短横线分割，如子组件声明的 prop 为 primaryColor，父组件可以传 primary-color

HTML 中的特性名是大小写不敏感的，所有的大写字母都会被浏览器解释成小写字母。

文档指出在 DOM 中使用模板时，驼峰命名法的 prop 名需要使用对应的短横线分隔命名。但是如果是使用字符串模板，则不存在这个限制