---
date: 2021-3-5
updated: 2021-3-5
author: Celeste
location: Shanghai Normal University
---

# 确定的自顶向下分析方法

## 非终结符的后继符号集

可能在某个句型中紧跟在 A 后边的终结符 a 的集合，记为 $Follow(A)$ 。如果 $A$ 是某个句型的最右符号，则将结束符 "\$" 添加到 $FOLLOW(A)$ 中。

## 产生式的可选集

 产生式 $A\rightarrow \beta$ 的可选集是指可以选用该产生式进行推导时，对应的输入符号的集合，记为 $SELECT(A\rightarrow \beta)$

- $SELECT(A\rightarrow a\beta)=\{a\}$
- $SELECT(A\rightarrow \epsilon = FOLLOW(A))$

## 串首终结符集

串首第一个符号，并且是终结符，简称串首终结符。

给定一个文法符号串 $\alpha$，$\alpha$ 的串首终结符为可以从 $\alpha$ 推导出的所有串首终结符的集合，记为 $FIRST(\alpha)$。如果 $a{\Rightarrow}^* \epsilon$，那么 $\epsilon$ 也在 $FIRST(\alpha)$ 中。

- if $\epsilon \in FIRST(\alpha)$ , then $SELECT(A \rightarrow \alpha)=FIRST(A)$
- if $\epsilon \notin FIRST(\alpha)$ , then $SELECT(A \rightarrow \alpha)=(FIRST(A)-\{\epsilon\}) \cup FOLLOW(A)$

## S_文法

S_文法，简单的确定性文法，Korenjak & Hopcroft，1966。

- 每个产生式的右部都以终结符开始
- 同一非终结符的各个候选式的首终结符都不同

在 S_文法中，由于每一产生式的可选集不相交，因此我们可以根据输入选择唯一的产生式，保证分析的确定性。

## q_文法

- 每个产生式的右部或为 ε，或以终结符开始
- 具有相同左部的产生式有不相交的可选集

因此，q_文法不含右部以非终结符打头的产生式

###### 什么时候使用 ε 产生式？

当某终结符 A 与当前输入符 a 不匹配时，若存在产生式 $A\rightarrow \epsilon $，则检查 a 是否可以出现在 A 的后面，来决定是否使用 ε 产生式；若不存在产生式 $A\rightarrow \epsilon $，则报错

## LL(1) 文法

LL(1) 文法指的是从左向右扫描输入，产生最左推导，并且在每一步中只需要向前看一个输入符号来决定语法分析动作。

假设文法 G 是 LL(1) 的，当且仅当 G 的任意两个具有相同左部的产生式 $A \rightarrow\alpha|\beta$ 满足下面的条件：

- 如果 $\alpha$ 和 $\beta$ 均不能推导出 $\epsilon$，则 $FIRST(\alpha) \cap FIRST(\beta)=\emptyset$
- $\alpha$ 和 $\beta$ 至多有一个能推导出 $\epsilon$
- 如果 $\alpha {\Rightarrow}^* \epsilon$，则 $FIRST(\beta) \cap FOLLOW(A)=\emptyset$
- 如果 $\beta {\Rightarrow}^* \epsilon$，则 $FIRST(\alpha) \cap FOLLOW(A)=\emptyset$

实际上，上述条件都是为了限制文法中同一非终结符的各个产生式的可选集互不相交，因此可以为LL(1)文法构造预测分析器