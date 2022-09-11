## node.js

1. 下载node.js（通过node -v可以查询是否安装成功）
2. 在终端输入node init --yes
3. 安装express | node i express
4. 基础框架
```js
// 1.引入express
const express = require('express');
// 2.创建应用对象
const app = express();
// 3.创建路由规则
app.get('/', (request, response) => {
​    response.send('Hello express!')
});
// 4.监听端口启动服务
app.listen(8000, () => {
​    console.log("服务已启动,8000端口监听中...");
})
```
5、在集成终端执行 node js文件

## 服务器端

### 服务器端返回数据

`respnse.send()`//只能返回字符串，如果是对象要转换，`json.stringify()`

客户端接受也是字符串，想要获取对象有两种方法

```js
// 1、json.parse(xhr.response)
// 2、设置xhr的相应格式
xhr.responseType = 'json';	
//之后接受的类型都会自动转化为对象
```

### 更改服务器端的js文件，不需要重启服务

1. 在命令行安装npm install -g nodemon

2. 在集成终端用nodemon js文件来启动

### IE缓存问题

在末尾加个时间戳

```js
xhr.open('GET', 'http://127.0.0.1:8000/server'+Date.now());
```

### 超时与网络异常
```js
// 服务器端
setTimeout(()=>{
​	//代码
}
// 2秒没返回就取消
xhr.timeout = 2000;
xhr.onTimeout = function(){}
// 网络异常
xhr.onerror = function(){}
```

### 取消请求
```js
x.abort()
```

### 强刷
ctrl + F5

### 防止引入代码报错
```js
crossorigin = "anonymous"

var xhttp;
if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    } else {
    // code for IE6, IE5
     xhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
//老版本的 Internet Explorer（IE5 和 IE6）使用 ActiveX 对象
```

## XMLHttpRequest 对象方法

| 方法                                          | 描述                                                         |
| :-------------------------------------------- | :----------------------------------------------------------- |
| new XMLHttpRequest()                          | 创建新的 XMLHttpRequest 对象                                 |
| abort()                                       | 取消当前请求                                                 |
| getAllResponseHeaders()                       | 返回头部信息                                                 |
| getResponseHeader()                           | 返回特定的头部信息                                           |
| open(*method*, *url*, *async*, *user*, *psw*) | 规定请求method：请求类型 GET 或 POSTurl：文件位置async：true（异步）或 false（同步）user：可选的用户名称psw：可选的密码 |
| send()                                        | 将请求发送到服务器，用于 GET 请求                            |
| send(*string*)                                | 将请求发送到服务器，用于 POST 请求                           |
| setRequestHeader()                            | 向要发送的报头添加标签/值对                                  |

## XMLHttpRequest 对象属性

| 属性               | 描述                                                         |
| :----------------- | :----------------------------------------------------------- |
| onreadystatechange | 定义当 readyState 属性发生变化时被调用的函数                 |
| readyState         | 保存 XMLHttpRequest 的状态。0：请求未初始化1：服务器连接已建立2：请求已收到3：正在处理请求4：请求已完成且响应已就绪 |
| responseText       | 以字符串返回响应数据                                         |
| responseXML        | 以 XML 数据返回响应数据                                      |
| status             | 返回请求的状态号200: "OK"403: "Forbidden"404: "Not Found"如需完整列表请访问 [Http 消息参考手册](https://www.w3school.com.cn/tags/html_ref_httpmessages.asp) |
| statusText         | 返回状态文本（比如 "OK" 或 "Not Found"）                     |