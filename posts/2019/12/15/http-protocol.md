---
title: HTTP协议
date: 2019-12-15 10:45:02
updated: 2019-12-15 10:45:02
categories:
  - Computer Science
  - Network
tags: 
  - HTTP
---

# HTTP

## 基本结构

### Request

![http request](./assets/http-request.png)

> 1. 换行为 \r\n (CRLF)
> 2. header 与 body 间存在 blank line

```
GET /search?hl=zh-CN&source=hp&q=domety&aq=f&oq= HTTP/1.1  
Accept: image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/vnd.ms-excel, application/vnd.ms-powerpoint, 
application/msword, application/x-silverlight, application/x-shockwave-flash, */*  
Referer: <a href="http://www.google.cn/">http://www.google.cn/</a>  
Accept-Language: zh-cn  
Accept-Encoding: gzip, deflate  
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; TheWorld)  
Host: <a href="http://www.google.cn">www.google.cn</a>  
Connection: Keep-Alive  
Cookie: PREF=ID=80a06da87be9ae3c:U=f7167333e2c3b714:NW=1:TM=1261551909:LM=1261551917:S=ybYcq2wpfefs4V9g; NID=31=ojj8d-IygaEtSxLgaJmqSjVhCspkviJrB6omjamNrSm8lZhKy_yMfO2M4QMRKcH1g0iQv9u-2hfBW7bUFwVh7pGaRUb0RnHcJU37y-FxlRugatx63JLv7CWMD6UB_O_r  
```

#### method

语义规定，无强约束

```
GET // 页面访问, 一般不包含 body, 数据以 url 形式出现在 <request-line>
POST // 表单提交
PUT
DELETE
HEAD
OPTIONS // CORS
CONNECT // 现在多用于 HTTPS/WebSocket
TRACE // 据说用于调试
```

#### head

```
User-Agent // 产生请求的浏览器类型
Referer // 当前请求页面的来源页面的地址
Connection: Keep-Alive
Cookie

// 客户端可识别的内容类型列表。
Accept
Accept-Language
Accept-Encoding

// 请求的主机名，允许多个域名同处一个IP地址，即虚拟主机。
Host

// body 格式
Content-Type
Content-Length
```

### Response

```
HTTP/1.1 200 OK
Date: Sat, 31 Dec 2005 23:59:59 GMT
Content-Type: text/html;charset=ISO-8859-1
Content-Length: 122

<html>
  <head>
    <title>Wrox Homepage</title>
  </head>
  <body>
    <!-- body goes here -->
  </body>
</html>
```

#### status code

- 1xx: 临时回应，希望客户端继续处理

- 2xx: 200 OK
- 3xx: 请求目标有变化，希望客户端进一步处理

  - 301 永久性跳转
  - 302 临时性跳转
  - **304** 客户端本地已经有缓存的版本，并且在 Request 中告诉了服务端，当服务端通过时间或 tag 发现没有更新的时候，就会返回一个不含 body 的 304 状态

- 4xx: 客户端请求错误
  - 400 Bad Request
  - 403 无权限
  - 404 页面不存在
  - 418 It’s a teapot. 

- 5xx: 服务器处理错误
  - 500 服务器错误
  - 503 服务器暂时性错误

#### status text

相同状态码不一定具有相同 status text

## HTTP1.1

HTTP1.1 为目前使用最广泛的 HTTP 协议

### 与 HTTP1.0 的区别
1. **缓存处理**: `E-tag`, `If-Unmodified-Since`, `If-Match`, `If-None-Match`
2. **带宽优化及网络连接的使用**: 允许请求资源某个部分, 响应 206 (Partial Content), 引入`range`头域
3. **错误通知管理**: 新增 24 个错误状态响应码
4. **Host头处理**: 支持同一IP地址上的多个虚拟主机, 如果请求中没有`Host`头域, 报告 400 Bad Request
5. **长连接**: 支持长连接 (Persistent Connection) 和请求的流水线 (Pipelining) 处理, 默认开启`Connection: keep-alive`

> HTTP1.1 Pipelining, 若干个请求排队串行化单线程请求, 后面请求需要等待前面请求返回, 可能存在线头阻塞

![Roundup on Parallel Connections](./assets/http-parallel-connect.jpg)

来源: [Roundup on Parallel Connections](http://www.stevesouders.com/blog/2008/03/20/roundup-on-parallel-connections/)

## HTTPS

1. HTTPS 协议协议需要到 CA 申请证书
2. HTTP 直接运行在 TCP 上, HTTPS 运行在 SSL/TLS 上, SSL/TLS 运行在 TCP 上, 所有传输内容均经过加密
3. 默认端口不同, HTTP 默认端口为 80, HTTPS 默认端口为 443
4. HTTPS 可以有效防止运营商劫持

## 网速优化

影响HTTP网络请求的主要因素有**带宽**和**延迟**, 伴随着网络基础设施建设, 带宽已经得到了极大的提升, 影响网速的主要因素成为了延迟, 延迟主要有三种:

### 浏览器阻塞 (HOL blocking)

浏览器会因为一些原因阻塞请求.

浏览器对于同一域名, 同时最多四个请求 (根据浏览器内核版本不同有所差异)

### DNS查询 (DNS Lookup)

利用 DNS 缓存优化

### 建立连接 (Initial connection)

HTTP 基于 TCP, 浏览器最快也需要在第三次握手才能捎带 HTTP 报文, 会导致每次请求都经历**三次握手**和**慢启动**, 其中三次握手在高延迟场景下较明显, 慢启动对于文件类大请求影响较大

> 最初的 TCP 在连接建立成功后会向网络中发送大量的数据包, 这样很容易导致网络中路由器缓存空间耗尽, 从而发生拥塞. 因此新建立的连接不能够一开始就大量发送数据包, 而只能根据网络情况逐步增加每次发送的数据量, 以避免上述现象的发生. 

> 慢启动会让原本就具有突发性和短时性的 HTTP 连接变得十分低效

## HTTP2.0

![HTTP History](./assets/http-history.jpg)

### SPDY

谷歌于 2012 年提出了 SPDY 方案, 优化 HTTP1.X 请求延时, 解决了 HTTP1.X 的安全性, SPDY 位于 HTTP 下, TCP 和 SSL 上, 兼容 HTTP, 同时可以使用已有 SSL 功能

1. **降低延迟**, 通过多路复用 (multiplexin) 共享 TCP 连接, 解决 HOL blockin
2. **请求优先级**, 防止 multiplexing 导致的关键请求被阻塞问题
3. **header 压缩**
4. **基于HTTPS的加密协议传输**
5. **服务器端推送 (Server Push)**

### HTTP2.0 基于 SPDY

区别:
1. HTTP2.0 支持明文传输, 而 SPDY 强制 HTTPS
2. HTTP2.0 header 压缩算法采用 HPACK, 而 SPDY 采用 deflate

### Features

1. **二进制格式 (Binary Format)**
2. **多路复用 (MultiPlexing)**
3. **header 压缩** 通讯双方各自 cache 一份 header fields 表
4. **服务器端推送 (Server Push)**

> 在不改动 HTTP/1.x 的语义、方法、状态码、URI 以及首部字段….. 的情况下, HTTP/2 是如何做到「突破 HTTP1.1 的性能限制，改进传输性能，实现低延迟和高吞吐量」的 ?
> 关键之一就是在 应用层(HTTP/2)和传输层(TCP or UDP)之间增加一个二进制分帧层。
> ![HTTP/2 Binary Framing](./assets/http2.0-binary-framing.jpg)
:::

### MultiPlexing 与 Pipelining 区别?

![Different between MultiPlexing and Pipelining](./assets/multi-plexing-and-pipelining.jpg)
