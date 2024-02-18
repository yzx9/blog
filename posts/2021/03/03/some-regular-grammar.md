---
date: 2021-3-3
updated: 2021-3-8
location: Guang Ze, Fu Jian, China
categories: 
  - Computer Science
  - Compiler
todos:
  - DFA
---

# 一些正则语法及其自动机

## 识别标识符

$$
\begin{align}
digit &\rightarrow 0|1|\dots |9 \\
letter\_ &\rightarrow A|B|\dots |Z|a|b|\dots |z|\_ \\
id &\rightarrow letter_(letter_|digit)*
\end{align}
$$

## 识别无符号数

$$
\begin{align}
digit &\rightarrow 0|1|\dots |9 \\
digits &\rightarrow digit* \\
optionalFraction &\rightarrow .digits|\epsilon \\
optionalExponent &\rightarrow (E(+|-|\epsilon ) digits)| \epsilon \\
number &\rightarrow digits\ optionalFraction\ optionalExponent
\end{align}
$$

## 识别各进制无符号数

$$
\begin{align}
DEC &\rightarrow (1|2|\dots |9)(0|1|\dots |9)*|0 \\
OCT &\rightarrow (1|2|\dots |7)(0|1|\dots |7)*|0 \\
HEX &\rightarrow (1|2|\dots 9|a|\dots |f|A|\dots |F)(0|1|\dots |a|\dots |f|A|\dots |F)*|0
\end{align}
$$

## 识别注释

$$
\begin{align}
blockComment &\rightarrow /\backslash * [\backslash s \backslash S]* \backslash */ \\
lineComment &\rightarrow // [\backslash s \backslash S]* \backslash n
\end{align}
$$

