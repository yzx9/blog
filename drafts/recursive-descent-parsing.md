---
title: 递归下降分析
tags:
  - Grammar
categories:
  - Computer Science
  - Principle of Compiler
---

## 自顶向下分析



## 回溯

文法中多个产生式存在公共前缀，

### 预测分析

### 提取左公因子

改写产生式来推迟决定产生式，

## 左递归

左递归分为直接左递归和间接左递归。直接左递归是指某个产生式有形如 $A \rightarrow A a$ 的形式，在最左推导中，我们总是重复选择该推导式，导致分析器陷入死循环。间接左递归指的是多个产生式串联形成左递归。

### 消除直接左递归

对于产生式 $A \rightarrow Aa|\beta$，我们可以通过文法转换将其转换为两个产生式 $A \rightarrow \beta A'; A' \rightarrow aA'|\epsilon$，事实上，我们将左递归转换成了右递归。消除直接左递归需要付出代价，即引入新的非终结符和 ε-产生式。

### 消除间接左递归

消除间接左递归可以通过将产生式代入，形成直接左递归，然后消除直接左递归即可。
$$
\begin{align}
S &\rightarrow Aa|b \tag{1.1} \\
A &\rightarrow Ac|Sd|\epsilon \tag{1.2} \\
\\
S &\rightarrow Aa|b \tag{2.1} \\
A &\rightarrow Ac|Aad|bd|\epsilon \tag{2.2} & mix(1.1)(1.2) \\
\\
S &\rightarrow Aa|b \tag{3.1} \\
A &\rightarrow bdA' \tag{3.2} \\
A &\rightarrow cA'|adA'|\epsilon \tag{3.3} \\
\end{align}
$$


