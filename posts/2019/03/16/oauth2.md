---
title: OAuth 2
date: 2019-03-16 10:37:11
categories:
  - Computer Science
tags:
  - Authorization
  - OAuth2
---

# OAuth 2

[RFC6749](http://www.rfcreader.com/#rfc6749)

## 名词定义

- Third-party application

第三方应用程序，本文中又称"客户端"(client) 

- HTTP service

HTTP服务提供商，本文中简称"服务提供商"，即上一节例子中的Google。

- Resource Owner

资源所有者，本文中又称"用户"（user）

- User Agent

用户代理，本文中就是指浏览器。

- Authorization server

认证服务器，即服务提供商专门用来处理认证的服务器

- Resource server

资源服务器，即服务提供商存放用户生成的资源的服务器。它与认证服务器，可以是同一台服务器，也可以是不同的服务器。

## Authorization Code Mode

### 1. 用户访问客户端 (Client)

### 2. 客户端将用户导向至认证服务器(Authorization Server)

信息通过 url 明文传输, 对用户可见

- response_type : code
- client_id
- redirect_uri
- scope(可选)
- state(可选)
  - 用于保持请求和响应状态
  - 防止跨站请求伪造（CSRF）攻击
  - 服务器会将其与 code 一起带回

### 3. 用户授权

#### 用户拒绝授权

自定义

#### client_id / redirect_uri 错误
- 不重定向
- 显示错误消息

#### client_id, redirect_uri 正确但其他参数错误
- 重定向
- 附带错误参数
  - error
    - invalid_request

        请求缺少参数，包含无效参数，多次包含参数，或者无效。

    - access_denied

        用户或授权服务器拒绝该请求

    - unauthorized_client

        不允许客户端使用此方法请求授权代码，例如，如果机密客户端尝试使用隐式授权类型。

    - unsupported_response_type

        服务器不支持使用此方法获取授权代码，例如，如果授权服务器从未实现隐式授权类型。

    - invalid_scope

        请求的范围无效或未知。

    - server_error

        服务器可以使用此错误代码重定向，而不是向用户显示500内部服务器错误页面。

    - temporarily_unavailable 

        如果服务器正在进行维护，或者不可用，则可以返回此错误代码，而不是使用503 Service Unavailable状态代码进行响应。

  - error_description
  - error_uri
  - state

### 4. 认证服务器将用户重定向回客户端

- Authorization Code

特点: 一次性使用, 有效时间短, 只需要认证服务器读懂, url 传输
  
非常适用 JWS，可以直接使用 JWT

  - 标准规定为 10 分钟

  - 大部分网站为 30 - 60 秒

- state 原样带回

### 5. 申请令牌

客户端通过 Authorization Code 和 Redirect URI 向认证服务器申请 token

该过程在后台进行, 对用户不可见, 用户拿不到 token

### 6. 认证服务器发放 Token

**access_token**

- **token_type** bearer, mac

[OAuth 2.0: Bearer Token Usage](https://www.cnblogs.com/XiongMaoMengNan/p/6785155.html)

- **expires_in** 失效时间，秒

- **refresh_token**

- **scope (可选)**

- **other**

HTTP Header 中设置 Cache-Control: no-store 可以提高安全性

### 7. 访问资源(Resource)

with access token

### 8. 刷新令牌

with refresh token

## Implicit Mode

主要用于无服务器端的应用

涉及的角色包括: 用户(Resource Owner), UA(User Agent), 授权服务器, 资源服务器。

### 1. 用户访问客户端(Client)

### 2. 客户端将用户导向至认证服务器(Authorization Server)

- response_type: token
- client_id
- redirect_uri
- scope(可选)
- state(可选)

### 3. 用户授权

### 4. 认证服务器重定向回客户端

URI 的 hash 部分包含令牌

### 5. 浏览器访问资源服务器，获取 script 解析 token

这一步不带 token

### 6. 将 token 发送给 client

通常只有 access token, 不发放 refresh token

## resource owner password credentials

1. 用户将 username, password 交给 client
2. client 申请令牌
3. 发放 token

## client credentials

1. 客户端申请 token

- granttype : clientcredentials

- scope（可选）

2. 发放 token
