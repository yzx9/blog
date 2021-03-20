---
title: Json Web Token
date: 2019-03-16 11:37:11
categories:
  - Computer Science
tags:
  - Authorization
---

# Json Web Token

**主要用途** 身份认证, 签名数据, 可以防止被篡改, 但不能储存未加密数据

**同类技术** session 复制, session 持久化

[Auth0](https://jwt.io/)

[RFC 7519](https://tools.ietf.org/html/rfc7519)

## 结构

Header.Playload.Signature

### Header

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Payload

https://www.iana.org/assignments/jwt/jwt.xhtml

### Signature

```js
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  your-256-bit-secret
)
```

### HTTP Header

Authorization: Bearer <token>

## 优点

- 自包含: 降低数据库请求次数
- 不用担心 CORS
- 服务器无状态，易横向扩展

## 缺点

- 包含认证信息，因此一旦信息泄露，任何人都可以获得令牌的所有权限
  - 有效期不宜太长
  - 重要操作时应验证身份
  - HTTPS

- 服务器无状态，无法撤销令牌
- 签名数据可以防止篡改，但不能储存未加密数据

## 应用

- OAuth2.0 的 Authorization Code
- 信息传输，用于检验信息是否被篡改
- 登录状态保持
- OpenID Connect

[Using Tokens with User Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html)

[Microsoft identity platform ID tokens](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-token-and-claims)
 
[Tokens used by Auth0](https://auth0.com/docs/tokens)
