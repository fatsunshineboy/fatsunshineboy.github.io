---
title: VuePress学习笔记
time: 2022-9-8
---

## 代码块的引用
通过下述的语法导入已经存在的文件中的代码段：</br>
``` md
<<< @/filepath{highlightLines}
<!-- @ 默认值是 process.cwd() -->
```
## markdown-it的配置
todo

## 插值语法
在.md文件中可以用两个大括号的插值语法
:::v-pre
{{ 1 + 1}}
:::
会被编译成`{{1+1}}`</br>
显示原始大括号可以用</br>
> `:::v-pre`
> :::v-pre
> `{{原始大括号}}`
> :::
> `:::`

## Vuepress编写组件示例

