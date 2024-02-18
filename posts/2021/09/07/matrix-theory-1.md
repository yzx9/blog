---
date: 2021-09-07
updated: 2021-09-07
author: Celeste
location: Shanghai University, Shanghai, China
tags:
  - Matrix Theory
categories:
  - Math
  - Algebra
---

# 高等代数基础

高等代数 = 线性代数（Linear  algebra）+ 多项式（Polynomial algebra）

## Rank（秩）

Rank（排序），常见定义最高非零子式的阶数，但如果来看一个矩阵乘法 $PAQ = \begin{pmatrix}I_r & 0 \\ 0 & 0\end{pmatrix}$，其中，$I_r$ 中 I 为 Identity，表示一个恒元，而 r 就是表示其阶数，也就是秩。

>相抵：$PAQ$
>
>相合：$P'AP$
>
>相似：$P^{-1}AP$

## 为什么0不能呢做除数

$$
ab = 1 \Rightarrow b = 1/a
$$

由上式来看除法，乘除法是一个逆运算。当 $a = 0$ 时，我们找不到一个 $b$ 使第一个乘法式成立，0 自然也就不能作为除法的除数了。

## Mapping

数学的本质是映射，以加法为例，实际上是将数集 $V$ 映射到 $V$，也就是 $V \times V \rightarrow V$：

$$
(\alpha, \beta) \rightarrow \gamma:=(\alpha, \beta)
$$

仅仅是一个映射并不足够定义加法，需要满足下列约束：

$$
\begin{aligned}
\alpha + \beta &= \beta + \alpha \\
\alpha + (\beta + \gamma) &= (\alpha + \beta) + \gamma \\
\alpha + 0 &= \alpha \\
\alpha + \beta &= 0
\end{aligned}
$$

将对象从集 $V$ 扩展到向量空间 $F \times V \rightarrow V$：
$$
\begin{aligned}
(\kappa, \alpha) \rightarrow \beta := \kappa\alpha
\end{aligned}
$$
约束：
$$
\begin{aligned}
(\kappa + \iota)\alpha &= \kappa\alpha + \iota\alpha \\
(\kappa \iota)\alpha &= \kappa(\iota\alpha) \\
\kappa(\alpha + \beta) &= \kappa\alpha + \iota\alpha \\
\iota \alpha &= \alpha
\end{aligned}
$$

## 线性变换存在定理

