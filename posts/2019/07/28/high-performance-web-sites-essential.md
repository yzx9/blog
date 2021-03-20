---
date: 2019-7-28
updated: 2019-7-28
categories:
  - Computer Science
  - Front End
tags:
  - Performance
---

# 高性能网站建设指南

## JavaScript

### 精简

- 精简 (删除空格, 删除换行等)
- 混淆 (改变变量名)
  - 技术不成熟
  - Class 属性不可混淆
  - 函数内局部变量可混淆
- Tree-Sharking
  - Webpack 2 支持
  - rollup 原生支持

### 阻塞

- **放在底部** 可改变 DOM 树结构
- **defer** H4, load 后加载
- **async** H5, 下载完加载
  \<link /> 后紧跟 \<script /> 可能阻塞脚本下载
- 多个 script 标签可并行下载, 浏览器会模拟线性加载

### 去重
- 定义全局变量
		
### 使 Ajax 可缓存

### 外联

- 可缓存
- 加载必须脚本, 动态加载剩余脚本

## CSS

### 放在头部
- 白屏
- FOUC（无样式内容的闪烁）
- 流式渲染

### 避免表达式

CSS还有表达式？？？

### 精简

- 0px -> 0
- #660066 -> #606
- 合并相同类，去除无用类 
  [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)

### 外联

内联更快, 但外联可重用/缓存,且可以预下载

## HTTP

### Expires 头

设长期，通过全量更新弃用

### 配置 ETag

或者删除

### gzip
  
> IE 5.5 不支持？？？

### 减少请求

- CSS Sprites
- 合并脚本和样式表

### 并行请求

- JS阻塞

- HTTP1.1 为每个主机名 2个并行

  主动降级为HTTP1.0能获取4个并行数, 但失去了持久连接Keep-Alive并不一定划算

- 使用DNS的CNAME将组件配置到多个主机名上

  推荐为 2个
## Other

### CDN

个人网站用也许更慢

### 减少DNS查询
  
- 配置TTL
- 配置Keep-Alive

### 避免重定向

避免无意识的重定向

比如 URL 从 http://iyzx.xin => http://iyzx.xin/

`a href`

设置为 # 会导致跳至顶端

e.preventDefault()

javascript:; <=> javascript:void(0);
      
## 追踪流量

- 内部流量

referer

- 出战流量

  - 重定向包装
  - 信标: 监听点击事件

## References

- Steve Souders. High Performance Web Sites: Essential Knowledge for Front-End Engineers. 电子工业出版社
