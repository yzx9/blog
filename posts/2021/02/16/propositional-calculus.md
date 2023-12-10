---
title: 命题逻辑
date: 2021-2-16 16:42:00
updated: 2021-3-5 20:00:05
categories:
  - math
  - discrete mathematical
tags:
  - discrete mathematical
---

## 命题

命题是用陈述句表示的一个判断结果唯一的判断语句。

> - ”除地球外的星球没有生命"是命题，但真值未知
> - “3-x=5”不是命题，真值不唯一
> - “几点了？”不是命题，疑问句
> - “多漂亮的花啊！”不是命题，感叹句
> - “我只给所有不给自己理发的人理发”不是命题，悖论

### 命题变量

我们可以将一个命题符号化，通常用 $p, q, r, \dots$ 表示。代表特定简单命题且真值确定的符号称为**命题常元**，而代表任意命题且取值不确定的符号称为**命题变元**，表示一个取值 1（真）或 0（假）的变量。命题变元没有真值，只有表示一个明确的命题后才有真值。

## 联结词

命题分为简单命题（原子命题）和复合命题，命题可以通过英文字母或英文字母和联结词来表示，称为命题符号化。

常用联结词有否定 $\lnot$、合取 $\land$、析取 $\lor$、蕴涵 $\rightarrow$ 和等价 $\leftrightarrow$ 联结词，其他联结词还有与非 $\uparrow$、或非 $\downarrow$ 和异或 $\oplus$。上述联结词真值表如下：

|  $p$  |  $q$  | $\lnot p$ | $p\land q$ | $p\lor q$ | $p\rightarrow q$ | $p\leftrightarrow q$ | $p \uparrow q$ | $p \downarrow q$ | $q \oplus q$ |
| :---: | :---: | :-------: | :--------: | :-------: | :--------------: | :------------------: | :------------: | :--------------: | :----------: |
|   T   |   T   |     F     |     T      |     T     |        T         |          T           |       F        |        F         |      F       |
|   T   |   F   |     F     |     F      |     T     |        F         |          F           |       T        |        F         |      T       |
|   F   |   T   |     T     |     F      |     T     |        T         |          F           |       T        |        F         |      T       |
|   F   |   F   |     T     |     F      |     F     |        T         |          T           |       T        |        T         |      F       |

设 $S$ 是一个联结词集合，如果任何 $n(n>1)$ 元真值函数都可以由仅含 $S$ 的联结词构成的公式表示，则称 $S$ 是联结词的**完备集**。

由完备集定义可知，$S = \{ \lor, \land, \rightarrow, \leftrightarrow, \uparrow, \downarrow \}$ 是一个联结词的完备集，但是我们想要达成一个完备集的条件并不需要这么多联结词，例如下列集合均是完备集：

1. $S=\{ \lnot, \lor \}$
2. $S=\{ \lnot, \land \}$
3. $S=\{ \lnot, \rightarrow \}$
4. $S=\{ \uparrow \}$
5. $S=\{ \downarrow \}$

其中，4 和 5 也被称作最小联结词集。

### 否定联结词

设 $p$ 表示任意一个命题，$\lnot p$ 表示一个新命题"非 p”。命题 $\lnot p$ 称为 $p$ 的否定命题。

### 合取联结词

设 $p, q$ 表示任意两个命题，$p\land q$ 表示一个复合命题“p 且 q”。当且仅当 $p, q$ 的真值同时为真，$p\land q$ 才为真。

### 析取联结词

设 $p, q$ 表示任意两个命题，$p\lor q$ 表示一个复合命题“p 或 q”。当且仅当 $p, q$ 的真值同时为假，$p\lor q$ 才为假。

在自然语言中，存在”兼容性“或和“非兼容性或”，如“灯泡不亮是灯泡或线路有问题”是兼容性或，而“派小王或小李中一人出差”是非兼容性或，二者不能同时发生。

析取联结词表示兼容性或，如果要表示非兼容性或，可以通过复合命题 $(p\land \lnot q)\lor (\lnot p \land q)$ 表示，记作异或 $\oplus$。

### 蕴涵联结词

设 $p, q$ 表示任意两个命题，$p\rightarrow q$ 表示一个复合命题“如果 $p$，则 $q$”。当且仅当 $p$ 的真值为真且 $q$ 的真值为假，$p\rightarrow q$ 才为假。

蕴涵式 $p\rightarrow q$ 中，$p$ 为蕴涵前件，$q$ 为蕴涵后件，$p$ 是 $q$ 的充分条件，$q$ 是 $p$ 的必要条件。同时，蕴涵联结符满足蕴涵律：$p\rightarrow q \Leftrightarrow \lnot p \lor q$。

> 假设 $p$ 表示天气晴朗，$q$ 表示我们去海滩
>
> - 如果天气晴朗，我们去海滩 $\Leftrightarrow$ $p\rightarrow q$
> - 仅当天气晴朗，我们去海滩 $\Leftrightarrow$ $q\rightarrow p$

### 等价联结词

设 $p, q$ 表示任意两个命题，$p\leftrightarrow q$ 表示一个复合命题“ $p$当且仅当$q$”。当且仅当 $p, q$ 的真值同时为真或同时为假时候，$p\leftrightarrow q$ 才为真。等价式 $p\leftrightarrow q$ 表示 $p$ 是 $q$ 的充分必要条件。

### 与非联结词

设 $p, q$ 表示任意两个命题，$p\uparrow q$ 表示一个复合命题“ $p$ 和 $q$ 的与非”。当且仅当 $p, q$ 的真值同时为真时，$p \uparrow q$ 才为假。与非式可以由复合命题$\lnot (q \land q)$表示。

> 注意：与非不满足结合律

### 或非联结词

设 $p, q$ 表示任意两个命题，$p\downarrow q$ 表示一个复合命题“ $p$ 和 $q$ 的或非”。当且仅当 $p, q$ 的真值同时为假时，$p \downarrow q$ 才为真。或非式可以由复合命题$\lnot (q \lor q)$表示。

> 注意：或非不满足结合律

### 异或联结词

设 $p, q$ 表示任意两个命题，$p \oplus q$ 表示一个复合命题“ $p$ 和 $q$ 的异或”。当且仅当 $p, q$ 的真值恰有一个为真，$p \oplus q$ 才为真。不难发现，异或式就是自然语言中的不兼容性或，可以由复合命题 $(p\land \lnot q)\lor (\lnot p \land q)$ 表示，可以由 $\lnot (p \rightarrow q)$表示。

## 命题公式及其分类

### 定义

1. 每一个命题常元和命题变元都是命题公式
2. 给定一个命题公式 $X$，那么 $X$ 的否定 $\lnot X$ 也是一个命题公式。
3. 给定两个命题公式 $A$ 和 $B$，以及二元联结词 $b$，那么 $X\ b\ Y$ 也是一个命题公式。

由此可知，由有限个命题常元或命题变元、联结词和括号所组成的符号串都是命题公式。

### 命题公式的真值

一个含有命题变元的命题变元的真值是不确定的。只有当公式中的所有命题变元被指定特定的命题时，命题公式才成为命题，其真值才唯一。

若含有 $n$ 个命题变元的命题公式$A$所含有的全部命题变元为 $p_1, p_2, ..., p_n$，给 $p_1, p_2, ..., p_n$ 指定一组真值，称为对$A$的一个**解释**或**赋值**。使$A$的真值为真的赋值称为**成真赋值**，使 $A$ 的真值为假的赋值称为**成假赋值**。

将$A$的所有可能赋值序列（共 $2^n$ 种）与真值列表表示，称为 $A$ 的**真值表**。

### 命题公式的分类

设$A$为一个命题公式

1. 若$A$在它的各种赋值下取值均为真，则称$A$为**重言式**或**永真式**。
2. 若$A$在它的各种赋值下取值均为假，则称$A$为**矛盾式**或**永假式**。
3. 若至少存在一种赋值使$A$的真值为真，则称$A$为**可满足式**。

> 显然，永真式也是可满足式

## 命题演算的关系式

### 等价式

设 $A$ 和 $B$ 为两个命题公式，如果 $A$ 和 $B$ 在任何相同赋值下，有相同的真值（即有相同的真值表），那么称命题 $A$ 和命题 $B$ 等价，互为**等价式**，记作 $A\Leftrightarrow B$。

利用已知的等价关系式，将其中的子公式中用和他等价的公式置换可以推出其他一些等价关系式，这一过程称为**命题的等价运算**。

### 基本等值式

| 名称           | 形式一                                                                          | 形式二                                                          |
| -------------- | :------------------------------------------------------------------------------ | :-------------------------------------------------------------- |
| 双重否定律     | $\lnot \lnot p \Leftrightarrow p$                                               | -                                                               |
| 同一律         | $p \lor 0 \Leftrightarrow p$                                                    | $p \land 1 \Leftrightarrow$ p                                   |
| 零元律         | $p \land 1 \Leftrightarrow 1$                                                   | $p \land 0 \Leftrightarrow 0$                                   |
| 等幂律         | $p \lor p \Leftrightarrow p$                                                    | $p \land p \Leftrightarrow p$                                   |
| 交换律         | $p \lor q \Leftrightarrow q \lor p$                                             | $p \land q \Leftrightarrow q \land p$                           |
| 结合律         | $(p \lor q) \lor r \Leftrightarrow p \lor (q \lor r)$                           | $(p \land q) \land r \Leftrightarrow p \land (q \land r)$       |
| 德摩根律       | $\lnot (p \lor q) \Leftrightarrow \lnot p \land \lnot q$                        | $\lnot (p \land q) \Leftrightarrow \lnot p \lor \lnot q$        |
| 吸收律         | $p \lor (p \land q) \Leftrightarrow p$                                          | $p \land (p \lor q) \Leftrightarrow p$                          |
| 分配律         | $p \lor (q \land r) \Leftrightarrow (p \lor q) \land (p \lor r)$                | $p \land (q \lor r)\Leftrightarrow (p \land q)\lor (p \land r)$ |
| 排中律         | $p \lor \lnot p \Leftrightarrow 1$                                              | -                                                               |
| 矛盾律         | $p \land \lnot p \Leftrightarrow 0$                                             | -                                                               |
| 蕴涵等值式     | $p \rightarrow q \Leftrightarrow \lnot p \lor q$                                | -                                                               |
| 等价等值式     | $p \leftrightarrow q \Leftrightarrow (p \rightarrow q) \land (q \rightarrow p)$ | -                                                               |
| 假言易位       | $p \rightarrow q \Leftrightarrow \lnot p \rightarrow \lnot q$                   | -                                                               |
| 等价否定等值式 | $p \leftrightarrow q \Leftrightarrow \lnot p \rightarrow \lnot q$               | -                                                               |
| 归谬论         | $(p \rightarrow q) \land (p \rightarrow \lnot q) \Leftrightarrow \lnot p$       | -                                                               |

## 范式

### 析取范式（DNF）

一个命题具有 $A_1 \lor A_2 \lor \dots \lor A_n$ 的形式，其中 $A_1, A_2, \dots, A_n$ 都是由命题变元或其否定所组成的合取式，则该公式为析取范式。

以下公式都是 DNF：

- $A \lor B$
- $A$
- $(A \land B)\lor C$
- $(A\land \lnot B\land \lnot C)\lor (\lnot D\land E\land F)$

以下公式不是 DNF，但是可以化为 DNF：

- $\lnot (A\lor B) \Leftrightarrow \lnot A \land \lnot B$
- $A\lor (B\land (C\lor D)) \Leftrightarrow A \lor (B \land C) \lor (B \land C)$

所有命题公式都可以转换成 DNF 的等价公式。这种变换基于了关于逻辑等价的规则：双重否定律、德·摩根定律和分配律。

因为所有逻辑公式都可以转换成合取范式的等价公式，DNF 并不唯一，证明经常基于所有公式都是 DNF 的假定。但是在某些情况下，这种到 DNF 的转换可能导致公式的指数性爆涨。例如，把下述非 DNF 公式转换成 DNF 生成有 $2^{n}$ 个子句的公式：

$$
(X_{1}\lor Y_{1})\land (X_{2}\lor Y_{2})\land \dots \land (X_{n}\lor Y_{n})
$$

### 合取范式（CNF）

一个命题具有 $A_1 \land A_2 \land \dots \land A_n$ 的形式，其中 $A_1, A_2, \dots, A_n$ 都是由命题变元或其否定所组成的析取式，则该公式为合取范式。

以下公式都是 CNF：

- $A \land B$
- $\lnot A \land (B \lor C)$
- $(A \lor B) \land (\lnot B \land C \land \lnot D) \land (D \lor \lnot E)$
- $(\lnot \lor C)$

以下公式不是 CNF，但是可以化为 CNF：

- $\lnot (B \lor C) \Leftrightarrow \lnot B \land \lnot C$
- $(A \land B) \lor C \Leftrightarrow (A \lor C) \land (B \lor C)$
- $A \land (B \lor (D \land E)) \Leftrightarrow A \land (B \lor D) \land (B \lor E)$

和 DNF 一样，所有命题公式都可以转换成 CNF 的等价公式且不唯一，但可能导致公式的指数性暴涨。

### 主析取范式

#### 极小项

含有 $n$ 个命题变元的合取式中，若每个命题变元与其否定不同时出现，而二者之一必出现且仅出现一次，这样的合取式称为**极小项**。每个极小项在它的 $2^n$ 个赋值中，仅有一个是成真赋值。

##### 索引极小项

含有 $n$ 个命题变元的公式，其不同的极小项和极大项的个数均为 $2^n$ 个，可以表示为 $m_0, m_1, \dots ,m_{2^n-1}$。一般的，你可以指派给每个极小项（确保以同样的次序写变量，通常按字母序），基于极小项的二进制值的一个索引（补项 $A'$ 被当作二进制 0，而非补项 $A$ 被当作二进制 1），例如 $\lnot A \land B \land \lnot C$ 记作 二进制 $m_{010}$，十进制 $m_2$。不难发现，每个极小项的二进制下标即为该极小项的成真赋值。

#### 定义

如果一个析取范式的每个合取式都是极小项，那么这个范式是**主析取范式**。任何命题公式的主析取范式都是存在且唯一的。

#### 通过展开求极小项

1. 求 $A$ 的析取范式 $A'$；

2. 若 $A$ 的某合取式 $B$ 不是极小项，则补入没有出现的变元；

3. 消去重复出现的命题变项、矛盾式及重复出现的极小项，所得即是 $A$ 的主析取范式。

例如 $p_i$ 不在 $B$ 中，则将 $B$ 展开：

$$
\begin{aligned}
B \Leftrightarrow & B \land 1 \\
\Leftrightarrow & B \land (p_i \lor \lnot p_i) \\
\Leftrightarrow & (B \land p_i) \lor (B \land \lnot p_i)
\end{aligned}
$$

#### 通过真值表求极小项

求 $p \land q \lor r$ 的主析取范式：

1. 写出真值表

   |   p   |   q   |   r   | $p \land q \lor r$ |
   | :---: | :---: | :---: | :----------------: |
   |   0   |   0   |   0   |         0          |
   |   0   |   0   |   1   |         1          |
   |   0   |   1   |   0   |         0          |
   |   0   |   1   |   1   |         1          |
   |   1   |   0   |   0   |         0          |
   |   1   |   0   |   1   |         1          |
   |   1   |   1   |   0   |         1          |
   |   1   |   1   |   1   |         1          |

2. 得出极小项： $p \land q \lor r \Leftrightarrow m_1, m_3, m_5, m_6, m_7 \Leftrightarrow \sum \left(1, 3, 5, 6, 7 \right)$

### 主合取范式

#### 极大项

含有 $n$ 个命题变元的析取式中，若每个命题变元与其否定不同时出现，而二者之一必出现且仅出现一次，这样的析取式称为**极大项**。每个极大项在它的 $2^n$ 个赋值中，仅有一个是成假赋值。

##### 索引极大项

含有 $n$ 个命题变元的公式，其极大项表示为 $M_0, M_1 , \dots ,M_{2^n-1}$。索引极大项是求项的补的次序的索引，即下标为该项的成假赋值。例如 $\lnot A \lor B \lor \lnot C$ 记作二进制 $M_{101}$，十进制 $M_5$。

#### 定义

如果一个析取范式的每个析取式都是极小项，那么这个范式是**主合取范式**。任何命题公式的主合取范式都是存在且唯一的。

#### 求主合取范式

相似于主析取范式求解步骤。

### 对偶化

可以轻易的使用德·摩根定律验证，极小项的补是各自补的极大项。

例如，求命题公式 $(p \lor (q \land r)) \rightarrow (p \land q \land r)$ 的主合取范式：

$$
\begin{aligned}
& (p \lor (q \land r)) \rightarrow (p \land q \land r) \\
\Leftrightarrow & (\lnot p \land (\lnot q \lor \lnot r)) \lor (p \land q \land r)\\
\Leftrightarrow & (\lnot p \land \lnot q) \lor (\lnot p \land \lnot r) \lor (p \land q \land r)\\
\Leftrightarrow & (\lnot p \land \lnot q \land r) \lor (\lnot p \land \lnot q \land \lnot r) \lor (\lnot p \land q \land \lnot r) \lor (\lnot p \land \lnot q \land \lnot r) \lor (p \land q \land r)\\
\Leftrightarrow & (p \land q \land r) \lor (\lnot p \land \lnot q \land r) \lor (\lnot p \land q \land \lnot r) \lor (\lnot p \land \lnot q \land \lnot r)\\
\Leftrightarrow & \sum \left(0, 1, 2, 7 \right)\\
\Leftrightarrow & m_0 \lor m_1 \lor m_2 \lor m_7 &\text{主析取范式}\\
\Leftrightarrow & \prod(3,4,5,6) \\
\Leftrightarrow & M3 \land M_4 \land M_5 \land M_6 &\text{主合取范式}
\end{aligned}
$$

## 命题演算的推理

证明可以由前提 $A$ 推得结论 $B$，即证明 $A \rightarrow B$ 为永真式，记作 $A \Rightarrow B$

### 推理定律

| 定律       | 形式                                                                       |
| ---------- | -------------------------------------------------------------------------- |
| 化简       | $p \land q \Rightarrow p$                                                  |
| 附加       | $p \Rightarrow p \lor q$                                                   |
| 假言推理   | $p, p \rightarrow q \Rightarrow q$                                         |
| 拒取式     | $\lnot q, p \rightarrow q \Rightarrow \lnot p$                             |
| 合取式     | $p, q \Rightarrow p \land q$                                               |
| 归结式     | $p \lor q, \lnot p \lor r \Rightarrow q \lor r$                            |
| 析取三段论 | $\lnot p, p \lor q \Rightarrow q$                                          |
| 假言三段论 | $p \rightarrow q, p \rightarrow r \Rightarrow p \rightarrow r$             |
| 等价三段论 | $p \leftrightarrow q, q \leftrightarrow r \Rightarrow p \leftrightarrow r$ |
| 构造性两难 | $p \rightarrow q, r \rightarrow s, p \lor r \Rightarrow q \lor s$          |

### 推理定理

#### 前提引入规则

在推导的过程中，可随时引入前提集合中的任意一个前提。

#### 结论引入规则

在推导的过程中所得到的结论都可做为后续推到的前提。

#### 置换规则

在推导的过程中，命题公式的子公式都可以用等值的公式置换。

#### CP 规则（附加前提规则）

- 若 $H_1, H_2, \dots, H_m, P$ 推出 $Q$，则 $H_1, H_2, \dots, H_m$ 可以推出 $P \rightarrow Q$
- 若 $H_1, H_2, \dots, H_m$ 推出 $P \rightarrow Q$，则 $H_1, H_2, \dots, H_m, P$ 可以推出 $Q$

### 推理证明方法

#### 真值表法

要证明 $A \Rightarrow B$，可以列出其真值表，证明 $A \rightarrow B$ 是重言式即得证

#### 等价演算法

要证明 $A \Rightarrow B$，可以通过等价演算，证明 $A \rightarrow B$ 为重言式即得证

#### 演绎法

要证明 $A \Rightarrow B$，可以从前提出发，依据推理规则、推理定律和基本等价式推导出结论来。

###### 示例

证明 $\lnot r \rightarrow s$ 是 $p \rightarrow (q \rightarrow r), p \land q$ 的结论

$$
\begin{align}
& p \and q & \text{前提引入} \tag{1} \\
& p & \text{（1）化简} \tag{2} \\
& p \rightarrow (q \rightarrow r) & \text{前提引入} \tag{3} \\
& q \rightarrow r & \text{（2）（4）假言推理} \tag{4} \\
& q & \text{（1）化简} \tag{5} \\
& r & \text{（3）（5）假言推理} \tag{6} \\
& r \lor s & \text{（6）附加} \tag{7} \\
& \lnot r \rightarrow s & \text{（7）置换规则} \tag{8} \\
& \therefore \text{得证} \\
\end{align}
$$

##### 附加前提证明法（CP 规则）

通过 CP 规则将附加前提引入，然后运用演绎法推得结论。

###### 示例

证明 $r \rightarrow s$ 是 $p \rightarrow (q \rightarrow s), \lnot r \lor p, q$ 的结论\*\*

$$
\begin{align}
& \lnot r \lor p & \text{前提引入} \tag{1} \\
& r \rightarrow p & \text{（1）置换规则} \tag{2} \\
& r & \text{附加前提引入} \tag{3} \\
& p & \text{（2）（3）假言推理} \tag{4} \\
& p \rightarrow (q \rightarrow s) & \text{前提引入} \tag{5} \\
& q \rightarrow s & \text{（4）（5）假言推理} \tag{6} \\
& q & \text{前提引入} \tag{7} \\
& s & \text{（6）（7）假言推理} \tag{8} \\
& \therefore \text{由CP规则，即得证}
\end{align}
$$

#### 间接推演法（归谬法）

要证明 $A \Rightarrow B$，可以从要推出的结论的否定出发，运用演绎法推得矛盾结论得证明方法。

###### 示例

证明 $\lnot p$ 是 $p \rightarrow \lnot q, p \land \lnot r, r \land \lnot s$ 的结论

$$
\begin{align}
& \lnot \lnot p & \text{否定结论引入} \tag{1} \\
& p & \text{(1)双重否定} \tag{2} \\
& p \rightarrow \lnot q & \text{前提引入} \tag{3} \\
& \lnot q & \text{(2)(3)假言推理} \tag{4} \\
& q \lor \lnot r & \text{前提引入} \tag{5} \\
& \lnot q \rightarrow \lnot r & \text{(5)置换规则} \tag{6} \\
& \lnot r & \text{(4)(6)假言推理} \tag{7} \\
& r \land \lnot s & \text{前提引入} \tag{8} \\
& r & \text{(8)化简} \tag{9} \\
& \therefore \text{(7)(9)矛盾，故得证}
\end{align}
$$

第（7）步也可以由（4）（5）步析取三段论得到，省略第（6）步

#### 归结证明法

归结规则： $(p \lor q) \land (\lnot p \lor r) \Rightarrow q \lor r$

- 前提和结论必须被表示为子句
- 对于非子句的语句，可以用一个或多个

## 例题

### 判断公式：$p \leftrightarrow (p \lor q \lor r)$ 的类型，请写出过程

$$
\begin{aligned}
& p \leftrightarrow (p \lor q \lor r) \\
\Leftrightarrow &\lnot p \lor (p \lor q \lor r) \\
\Leftrightarrow &\lnot p \lor p \lor q \lor r \\
\Leftrightarrow &1 \lor q \lor r \\
\Leftrightarrow &1 \\
&\therefore \text{该公式为重言式}
\end{aligned}
$$

### 化简公式：$\lnot (p \lor r) \lor (\lnot p \land q)$

$$
\begin{aligned}
& \lnot (p \lor r) \lor (\lnot p \land q) \\
\Leftrightarrow & (\lnot p \land \lnot r) \lor (\lnot p \land q)\\
\Leftrightarrow & \lnot p \land (\lnot r \lor q)
\end{aligned}
$$

错解：

$$
\begin{aligned}
& \lnot (p \lor r) \lor (\lnot p \land q) \\
\Leftrightarrow & (\lnot p \land \lnot r) \lor (\lnot p \land q)\\
\Leftrightarrow & ((\lnot p \land \lnot r) \lor \lnot p)\land ((\lnot p \land \lnot r) \lor q) \\
\Leftrightarrow & \lnot p \land (\lnot p \land \lnot r \lor q) &{\text{错误，括号不能去掉}}\\
\Leftrightarrow & \lnot p
\end{aligned}
$$

### 求公式：$(\lnot P \rightarrow Q) \rightarrow (\lnot Q \lor P)$ 的主析取范式

$$
\begin{aligned}
&(\lnot P \rightarrow Q) \rightarrow (\lnot Q \lor P) \\
\Leftrightarrow & (\lnot P \land \lnot Q) \lor \lnot Q \lor P \\
\Leftrightarrow & (\lnot P \land \lnot Q) \lor ((P \lor \lnot P) \land \lnot Q) \lor (P \land (Q \lor \lnot Q)) \\
\Leftrightarrow & (P \land Q) \lor (P \land \lnot Q) \lor (\lnot P \land \lnot Q) \\
\Leftrightarrow & m_0 \lor m_1 \lor m_3 \\
\end{aligned}
$$

## References

- [慕课《离散数学》华南理工大学](https://www.xuetangx.com/course/SCUT07011001668/5883127?channel=learn_title)
- [WIKIPEDIA](https://www.wikipedia.org/)
