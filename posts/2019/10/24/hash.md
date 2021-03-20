---
title: 哈希
date: 2019-10-24 19:30:32
updated: 2019-10-24 19:30:32
categories:
  - Computer Science
  - Data Structure
  - Hash
tags:
  - Data Structure
---

# 哈希

## 哈希函数

原则:

1. 便于计算
2. 地址分布均匀

方法:

1. 数字分析法
2. 平方取中法
3. 分段叠加法
4. 除留余数法
5. 伪随机数法

## 解决冲突

### 开放定址法

1. 线性探测再散列: $d_i=1, 2, 3..., m-1$
2. 二次探测再散列: $d_i=1^2, -1^2, 2^2, -2^2, 3^3, -3^3 ...$
3. 伪随机探测再散列: $d_i=Pseudorandom\ Sequence$

### 再哈希

构造多个哈希函数

### 链地址法

数组 + 链表

### 公共溢出区

基本表 + 溢出区

## 性能分析

装填因子:

$$\alpha = \frac{number}{length}$$

### 线性探测再散列

$$
\begin{aligned}
ASL_{succ}\approx\frac{1}{2}(1+\frac{1}{1-\alpha})       \\
ASL_{unsucc}\approx\frac{1}{2}(1+\frac{1}{(1-\alpha)^2}) \\
\end{aligned}
$$

### 伪随机探测再散列, 二次探测再散列, 再哈希法

$$
\begin{aligned}
ASL_{succ}\approx-\frac{1}{\alpha}\ln(1-\alpha) \\
ASL_{unsucc}\approx-\frac{1}{1-\alpha}          \\
\end{aligned}
$$

### 链址法

$$
\begin{aligned}
ASL_{succ}\approx1+\frac{\alpha}{2}   \\
ASL_{unsucc}\approx\alpha+e^{-\alpha} \\
\end{aligned}
$$
