---
date: 2019-10-28
updated: 2019-10-28
categories:
  - Computer Science
  - Front End
tags:
  - Browser
---

# 浏览器同源政策

## 判断方式

1. 协议相同
2. 域名相同
3. 端口相同
   
### Cookie、LocalStorage 和 IndexDB 无法读取

Cookie 只有同源的网页才能共享

- 如果一级域名相同, 可以将两个页面设置相同的 domain 共享 Cookie

``` JS
document.domain = 'example.com'; // 指定Cookie的所属域名为一级域名
```

### DOM 无法获得

以下代码受到限制

``` JS
document.getElementById("myIFrame").contentWindow.document
window.parent.document.body
```
    
### 解决方法

#### 一级域名相同

``` JS
document.domain = 'example.com'; // 两个网站都需要设置, 且完全相等
```

#### 一级域名不相同
      
##### 片段识别符

**原理**: 只改变片段标识符，不会引起页面刷新

1. 父窗口写 `URL#hash`
2. 子窗口监听 hashchange


##### window.name

**原理**: window.name容量很大，可以放置非常长的字符串

**缺点**: 必须监听子窗口window.name属性的变化，影响网页性能

1. 父窗口打开子窗口，写入 name
2. 子窗口写入name，跳转至父窗口同域名网页


##### cross-document messaging

``` JS
postMessage('Hello World!', 'http://bbb.com')

window.addEventListener('message', handleMessage)

event = {
  source, // 发送消息的窗口
  origin, // 消息发向的网址
  data // 消息内容
}
```

## AJAX 请求不能发送

### JSONP

添加一个\<script>元素，向服务器请求JSON数据

缺点: 只能发送 GET 请求

### WebSocket

设置 origin

### CORS

#### 简单请求

**条件**

1. 三种类型之一: HEAD, GET, POST
2. 只允许以下头信息: Accept, Accept-Language, Content-Language, Last-Event-ID
3. Content-Type: 限于三个值
   - application/x-www-form-urlencoded
   - multipart/form-data
   - text/plain

#### 非简单请求