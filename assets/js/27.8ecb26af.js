(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{340:function(t,s,a){"use strict";a.r(s);var n=a(10),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("尚硅谷Axios教程笔记\n"),s("a",{attrs:{href:"https://www.bilibili.com/video/BV1wr4y1K7tq",target:"_blank",rel:"noopener noreferrer"}},[t._v("文章来源"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"axios-的理解和使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#axios-的理解和使用"}},[t._v("#")]),t._v(" axios 的理解和使用")]),t._v(" "),s("h3",{attrs:{id:"axios-是什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#axios-是什么"}},[t._v("#")]),t._v(" axios 是什么?")]),t._v(" "),s("blockquote",[s("ol",[s("li",[t._v("前端最流行的 ajax 请求库")]),t._v(" "),s("li",[t._v("react/vue 官方都推荐使用 axios 发 ajax 请求")]),t._v(" "),s("li",[s("a",{attrs:{href:"https://github.com/axios/axios",target:"_blank",rel:"noopener noreferrer"}},[t._v("文档"),s("OutboundLink")],1)])])]),t._v(" "),s("h3",{attrs:{id:"axios-特点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#axios-特点"}},[t._v("#")]),t._v(" axios 特点")]),t._v(" "),s("blockquote",[s("ol",[s("li",[t._v("基于 xhr + promise 的异步 ajax 请求库")]),t._v(" "),s("li",[t._v("浏览器端/node 端都可以使用")]),t._v(" "),s("li",[t._v("支持请求／响应拦截器")]),t._v(" "),s("li",[t._v("支持请求取消")]),t._v(" "),s("li",[t._v("请求/响应数据转换")]),t._v(" "),s("li",[t._v("批量发送多个请求")])])]),t._v(" "),s("h3",{attrs:{id:"axios-常用语法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#axios-常用语法"}},[t._v("#")]),t._v(" axios 常用语法")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 通用/最本质的发任意类型请求的方式")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("axios")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("config"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 可以只指定 url 发 get 请求")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("axios")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" config"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 等同于 axios(config)")]),t._v("\naxios"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("request")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("config"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 发 get 请求")]),t._v("\naxios"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" config"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 发 delete 请求")]),t._v("\naxios"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("delete")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" config"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 发 post 请求")]),t._v("\naxios"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("post")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" config"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 发 put 请求")]),t._v("\naxios"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("put")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" config"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 请求的默认全局配置")]),t._v("\naxios"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("defaults"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("xxx\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 添加请求拦截器")]),t._v("\naxios"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("interceptors"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 添加响应拦截器")]),t._v("\naxios"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("interceptors"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("response"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建一个新的 axios(它没有下面的功能)")]),t._v("\naxios"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("create")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("config"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 用于创建取消请求的错误对象")]),t._v("\naxios"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Cancel")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 用于创建取消请求的 token 对象")]),t._v("\naxios"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("CancelToken")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 是否是一个取消请求的错误")]),t._v("\naxios"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isCancel")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 用于批量执行多个异步请求")]),t._v("\naxios"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("all")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("promises"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 用来指定接收所有成功数据的回调函数的方法")]),t._v("\naxios"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("spread")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"难点语法的理解和使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#难点语法的理解和使用"}},[t._v("#")]),t._v(" 难点语法的理解和使用")]),t._v(" "),s("p",[s("strong",[t._v("axios.create(config)")])]),t._v(" "),s("ol",[s("li",[s("p",[t._v("根据指定配置创建一个新的 axios, 也就就每个新 axios 都有自己的配置")])]),t._v(" "),s("li",[s("p",[t._v("新 axios 只是没有取消请求和批量发请求的方法, 其它所有语法都是一致的")])]),t._v(" "),s("li",[s("p",[t._v("为什么要设计这个语法?")])])]),t._v(" "),s("p",[t._v("(1) 需求: 项目中有部分接口需要的配置与另一部分接口需要的配置不太一样, 如何处理")]),t._v(" "),s("p",[t._v("(2) 解决: 创建 2 个新 axios, 每个都有自己特有的配置, 分别应用到不同要求的接口请求中")]),t._v(" "),s("p",[s("strong",[t._v("拦截器函数")])]),t._v(" "),s("p",[t._v("ajax 请求的回调函数的调用顺序")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("说明: 调用 axios()并不是立即发送 ajax 请求, 而是需要经历一个较长的流程")])]),t._v(" "),s("li",[s("p",[t._v("流程: 请求拦截器 2 => 请求拦截器 1 => 发 ajax 请求 => 响应拦截器 1 => 响应拦截器 2 => 请求的回调")])]),t._v(" "),s("li",[s("p",[t._v("注意: 此流程是通过 promise 串连起来的, 请求拦截器传递的是 config, 响应拦截器传递的是 response")])])]),t._v(" "),s("p",[s("strong",[t._v("取消请求")])]),t._v(" "),s("p",[t._v("基本流程:")]),t._v(" "),s("ol",[s("li",[t._v("配置 cancelToken 对象")]),t._v(" "),s("li",[t._v("缓存用于取消请求的 cancel 函数")]),t._v(" "),s("li",[t._v("在后面特定时机调用 cancel 函数取消请求")]),t._v(" "),s("li",[t._v("在错误回调中判断如果 error 是 cancel, 做相应处理")]),t._v(" "),s("li",[t._v("在请求一个接口前, 取消前面一个未完成的请求")])]),t._v(" "),s("h2",{attrs:{id:"axios-源码分析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#axios-源码分析"}},[t._v("#")]),t._v(" axios 源码分析")]),t._v(" "),s("h3",{attrs:{id:"源码目录结构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#源码目录结构"}},[t._v("#")]),t._v(" 源码目录结构")]),t._v(" "),s("div",{staticClass:"language-markdown extra-class"},[s("pre",{pre:!0,attrs:{class:"language-markdown"}},[s("code",[t._v("├── /dist/                          # 项目输出目录\n├── /lib/                           # 项目源码目录\n│ ├── /adapters/                    # 定义请求的适配器 xhr、http\n│ │ ├── http.js                     # 实现 http 适配器(包装 http 包)\n│ │ └── xhr.js                      # 实现 xhr 适配器(包装 xhr 对象)\n│ ├── /cancel/                      # 定义取消功能\n│ ├── /core/                        # 一些核心功能\n│ │ ├── Axios.js                    # axios 的核心主类\n│ │ ├── dispatchRequest.js          # 用来调用 http 请求适配器方法发送请求的函数\n│ │ ├── InterceptorManager.js       # 拦截器的管理器\n│ │ └── settle.js                   # 根据 http 响应状态，改变 Promise 的状态\n│ ├── /helpers/                     # 一些辅助方法\n│ ├── axios.js                      # 对外暴露接口\n│ ├── defaults.js                   # axios 的默认配置\n│ └── utils.js                      # 公用工具\n├── package.json                    # 项目信息\n├── index.d.ts                      # 配置 TypeScript 的声明文件\n└── index.js                        # 入口文件\n")])])]),s("h3",{attrs:{id:"axios-与-axios-的关系"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#axios-与-axios-的关系"}},[t._v("#")]),t._v(" axios 与 Axios 的关系?")]),t._v(" "),s("ol",[s("li",[t._v("从语法上来说: axios 不是 Axios 的实例")]),t._v(" "),s("li",[t._v("从功能上来说: axios 是 Axios 的实例")]),t._v(" "),s("li",[t._v("axios 是 Axios.prototype.request 函数 bind()返回的函数")]),t._v(" "),s("li",[t._v("axios 作为对象有 Axios 原型对象上的所有方法, 有 Axios 对象上所有属性")])]),t._v(" "),s("h3",{attrs:{id:"instance-与-axios-的区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#instance-与-axios-的区别"}},[t._v("#")]),t._v(" instance 与 axios 的区别?")]),t._v(" "),s("ol",[s("li",[t._v("相同:")])]),t._v(" "),s("p",[t._v("(1) 都是一个能发任意请求的函数: request(config)")]),t._v(" "),s("p",[t._v("(2) 都有发特定请求的各种方法: get()/post()/put()/delete()")]),t._v(" "),s("p",[t._v("(3) 都有默认配置和拦截器的属性: defaults/interceptors")]),t._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[t._v("不同:")])]),t._v(" "),s("p",[t._v("(1) 默认配置很可能不一样")]),t._v(" "),s("p",[t._v("(2) instance 没有 axios 后面添加的一些方法: create()/CancelToken()/all()")]),t._v(" "),s("h3",{attrs:{id:"axios-运行的整体流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#axios-运行的整体流程"}},[t._v("#")]),t._v(" axios 运行的整体流程?")]),t._v(" "),s("ol",[s("li",[t._v("整体流程:")])]),t._v(" "),s("p",[t._v("request(config) ==> dispatchRequest(config) ==> xhrAdapter(config)")]),t._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[t._v("request(config):")])]),t._v(" "),s("p",[t._v("将请求拦截器 / dispatchRequest() / 响应拦截器 通过 promise 链串连起来,返回 promise")]),t._v(" "),s("ol",{attrs:{start:"3"}},[s("li",[t._v("dispatchRequest(config):")])]),t._v(" "),s("p",[t._v("转换请求数据 ===> 调用 xhrAdapter()发请求 ===> 请求返回后转换响应数据. 返回 promise")]),t._v(" "),s("ol",{attrs:{start:"4"}},[s("li",[t._v("xhrAdapter(config):")])]),t._v(" "),s("p",[t._v("创建 XHR 对象, 根据 config 进行相应设置, 发送特定请求, 并接收响应数据,返回 promise")]),t._v(" "),s("h3",{attrs:{id:"axios-的请求响应拦截器是什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#axios-的请求响应拦截器是什么"}},[t._v("#")]),t._v(" axios 的请求响应拦截器是什么?")]),t._v(" "),s("ol",[s("li",[t._v("请求拦截器:")])]),t._v(" "),s("p",[t._v("在真正发送请求前执行的回调函数")]),t._v(" "),s("p",[t._v("可以对请求进行检查或配置进行特定处理")]),t._v(" "),s("p",[t._v("成功的回调函数, 传递的默认是 config(也必须是)")]),t._v(" "),s("p",[t._v("失败的回调函数, 传递的默认是 error")]),t._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[t._v("响应拦截器")])]),t._v(" "),s("p",[t._v("在请求得到响应后执行的回调函数")]),t._v(" "),s("p",[t._v("可以对响应数据进行特定处理")]),t._v(" "),s("p",[t._v("成功的回调函数, 传递的默认是 response")]),t._v(" "),s("p",[t._v("失败的回调函数, 传递的默认是 error")]),t._v(" "),s("h3",{attrs:{id:"axios-的请求响应数据转换器是什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#axios-的请求响应数据转换器是什么"}},[t._v("#")]),t._v(" axios 的请求响应数据转换器是什么?")]),t._v(" "),s("ol",[s("li",[t._v("请求转换器: 对请求头和请求体数据进行特定处理的函数")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("utils"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isObject")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setContentTypeIfUnset")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("headers"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'application/json;charset=utf-8'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[t._v("响应转换器: 将响应体 json 字符串解析为 js 对象或数组的函数")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("response"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("parse")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("response"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"response-的整体结构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#response-的整体结构"}},[t._v("#")]),t._v(" response 的整体结构")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    status"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    statusText"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    headers"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    config"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    request\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"error-的整体结构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#error-的整体结构"}},[t._v("#")]),t._v(" error 的整体结构")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    message"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    response"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"如何取消未完成的请求"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何取消未完成的请求"}},[t._v("#")]),t._v(" 如何取消未完成的请求?")]),t._v(" "),s("ol",[s("li",[t._v("当配置了 cancelToken 对象时, 保存 cancel 函数")])]),t._v(" "),s("p",[t._v("(1) 创建一个用于将来中断请求的 cancelPromise")]),t._v(" "),s("p",[t._v("(2) 并定义了一个用于取消请求的 cancel 函数")]),t._v(" "),s("p",[t._v("(3) 将 cancel 函数传递出来")]),t._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[t._v("调用 cancel()取消请求")])]),t._v(" "),s("p",[t._v("(1) 执行 cacel 函数, 传入错误信息 message")]),t._v(" "),s("p",[t._v("(2) 内部会让 cancelPromise 变为成功, 且成功的值为一个 Cancel 对象")]),t._v(" "),s("p",[t._v("(3) 在 cancelPromise 的成功回调中中断请求, 并让发请求的 proimse 失败,")]),t._v(" "),s("p",[t._v("失败的 reason 为 Cancel 对象")])])}),[],!1,null,null,null);s.default=e.exports}}]);