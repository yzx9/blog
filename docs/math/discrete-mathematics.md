# 离散数学

## 命题逻辑

### 命题

命题是用陈述句表示的一个判断结果唯一的判断语句。

>- ”除地球外的星球没有生命"是命题，但真值未知
>
>- “3-x=5”不是命题，真值不唯一
>
>- “几点了？”不是命题，疑问句
>
>- “多漂亮的花啊！”不是命题，感叹句
>- “我只给所有不给自己理发的人理发”不是命题，悖论

#### 命题变量

表示命题的符号称为命题变量，通常用 $p, q, r...$ 表示命题变量。命题变量没有真值，只有表示一个明确的命题后才有真值。

##### 命题常元

代表特定简单命题，真值确定。

##### 命题变元

代表任意命题，取值1（真）或2（假）的变量。

> TODO：命题变量和命题变元等价吗？

### 联结词

命题分为简单命题（原子命题）和复合命题，命题可以通过英文字母或英文字母和联结词来表示，称为命题符号化。

常用联结词有否定 $\neg$、合取 $\wedge$、析取 $\vee$、蕴涵 $\rightarrow$ 和等价 $\leftrightarrow$ 联结词，其他联结词还有与非 $\uparrow$、或非 $\downarrow$ 和异或 $\oplus$。上述联结词真值表如下：

| $p$  | $q$  | $\neg p$ | $p\wedge q$ | $p\vee q$ | $p\rightarrow q$ | $p\leftrightarrow q$ | $p \uparrow q$ | $p \downarrow q$ | $q \oplus q$ |
| :--: | :--: | :------: | :--: | :--: | :--: | :------------------: | :------------------: | :------------------: | :------------------: |
|  T   |  T   | F | T | T | T |          T           |          F          |          F          |          F          |
|  T   |  F   | F | F | T | F |          F           |          T          |          F          |          T          |
|  F   |  T   | T | F | T | T |          F           |          T          |          F          |          T          |
|  F   |  F   | T | F | F | T |          T           |          T          |          T          |          F          |

设 $S$ 是一个联结词集合，如果任何 $n(n>1)$ 元真值函数都可以由仅含 $S$ 的联结词构成的公式表示，则称 $S$ 是联结词的**完备集**。

由完备集定义可知，$S = \{ \vee, \wedge, \rightarrow, \leftrightarrow, \uparrow, \downarrow \}$ 是一个联结词的完备集，但是我们想要达成一个完备集的条件并不需要这么多联结词，例如下列集合均是完备集：

1. $S=\{ \neg, \vee \}$
2. $S=\{ \neg, \wedge \}$
3. $S=\{ \neg, \rightarrow \}$
4. $S=\{ \uparrow \}$
5. $S=\{ \downarrow \}$

其中，4和5也被称作最小联结词集。

#### 否定联结词

设 $p$ 表示任意一个命题，$\neg p$ 表示一个新命题"非p”。命题 $\neg p$ 称为 $p$ 的否定命题。

#### 合取联结词

设 $p, q$ 表示任意两个命题，$p\wedge q$ 表示一个复合命题“p且q”。当且仅当 $p, q$ 的真值同时为真，$p\wedge q$ 才为真。

#### 析取联结词

设 $p, q$ 表示任意两个命题，$p\vee q$ 表示一个复合命题“p或q”。当且仅当 $p, q$ 的真值同时为假，$p\vee q$ 才为假。

在自然语言中，存在”兼容性“或和“非兼容性或”，如“灯泡不亮是灯泡或线路有问题”是兼容性或，而“派小王或小李中一人出差”是非兼容性或，二者不能同时发生。

析取联结词表示兼容性或，如果要表示非兼容性或，可以通过复合命题 $(p\wedge \neg q)\vee (\neg p \wedge q)$ 表示，记作异或 $\oplus$。

#### 蕴涵联结词

设 $p, q$ 表示任意两个命题，$p\rightarrow q$ 表示一个复合命题“如果 $p$，则 $q$”。当且仅当 $p$ 的真值为真且 $q$ 的真值为假，$p\rightarrow q$ 才为假。

蕴涵式 $p\rightarrow q$ 中，$p$ 为蕴涵前件，$q$ 为蕴涵后件，$p$ 是 $q$ 的充分条件，$q$ 是 $p$ 的必要条件。同时，蕴涵联结符满足蕴涵律：$p\rightarrow q \Leftrightarrow \neg p \vee q$。

> 假设 $p$ 表示天气晴朗，$q$ 表示我们去海滩
>
> - 如果天气晴朗，我们去海滩 $\Leftrightarrow$ $p\rightarrow q$
> - 仅当天气晴朗，我们去海滩 $\Leftrightarrow$ $q\rightarrow p$

#### 等价联结词

设 $p, q$ 表示任意两个命题，$p\leftrightarrow q$ 表示一个复合命题“ $p$当且仅当$q$”。当且仅当 $p, q$ 的真值同时为真或同时为假时候，$p\leftrightarrow q$ 才为真。等价式 $p\leftrightarrow q$ 表示 $p$ 是 $q$ 的充分必要条件。

#### 与非联结词

设 $p, q$ 表示任意两个命题，$p\uparrow q$ 表示一个复合命题“ $p$ 和 $q$ 的与非”。当且仅当 $p, q$ 的真值同时为真时，$p \uparrow q$ 才为假。与非式可以由复合命题$\neg (q \wedge q)$表示。

> 注意：与非不满足结合律

#### 或非联结词

设 $p, q$ 表示任意两个命题，$p\downarrow q$ 表示一个复合命题“ $p$ 和 $q$ 的或非”。当且仅当 $p, q$ 的真值同时为假时，$p \downarrow q$ 才为真。或非式可以由复合命题$\neg (q \vee q)$表示。

> 注意：或非不满足结合律

#### 异或联结词

设 $p, q$ 表示任意两个命题，$p \oplus q$ 表示一个复合命题“ $p$ 和 $q$ 的异或”。当且仅当 $p, q$ 的真值恰有一个为真，$p \oplus q$ 才为真。不难发现，异或式就是自然语言中的不兼容性或，可以由复合命题 $(p\wedge \neg q)\vee (\neg p \wedge q)$ 表示，可以由 $\neg (p \rightarrow q)$表示。

### 命题公式及其分类

#### 定义

1. 每一个命题常元和命题变元都是命题公式
2. 给定一个命题公式 $X$，那么 $X$ 的否定 $\neg X$ 也是一个命题公式。
3. 给定两个命题公式 $A$ 和 $B$，以及二元联结词 $b$，那么 $X\ b\ Y$ 也是一个命题公式。 

由此可知，由有限个命题常元或命题变元、联结词和括号所组成的符号串都是命题公式。

#### 命题公式的真值

一个含有命题变元的命题变元的真值是不确定的。只有当公式中的所有命题变元被指定特定的命题时，命题公式才成为命题，其真值才唯一。

若含有 $n$ 个命题变元的命题公式$A$所含有的全部命题变元为 $p_1, p_2, ..., p_n$，给 $p_1, p_2, ..., p_n$ 指定一组真值，称为对$A$的一个**解释**或**赋值**。使$A$的真值为真的赋值称为**成真赋值**，使 $A$ 的真值为假的赋值称为**成假赋值**。

将$A$的所有可能赋值序列（共 $2^n$ 种）与真值列表表示，称为  $A$  的**真值表**。

#### 命题公式的分类

设$A$为一个命题公式
1.若$A$在它的各种赋值下取值均为真，则称$A$为**重言式**或**永真式**。
2.若$A$在它的各种赋值下取值均为假，则称$A$为**矛盾式**或**永假式**。
3.若至少存在一种赋值使$A$的真值为真，则称$A$为**可满足式**。

> 显然，永真式也是可满足式

### 命题演算的关系式

#### 等价式

设 $A$ 和 $B$ 为两个命题公式，如果 $A$ 和 $B$ 在任何相同赋值下，有相同的真值（即有相同的真值表），那么称命题 $A$ 和命题 $B$ 等价，互为**等价式**，记作 $A\Leftrightarrow B$。

利用已知的等价关系式，将其中的子公式中用和他等价的公式置换可以推出其他一些等价关系式，这一过程称为**命题的等价运算**。

#### 基本等值式

| 名称       |             形式一             |      形式二       |
| ---------- | :----------------------------: | :---------------: |
| 双重否定律 | $\neg \neg p\Leftrightarrow p$ |         -         |
| 同一律     |   $p\vee 0\Leftrightarrow p$   | $p\wedge 1\Leftrightarrow$ p |
| 零元律     |       $p\wedge 1 \Leftrightarrow 1$        | $p \wedge 0 \Leftrightarrow 0$ |
| 等幂律     |       $p\vee p\Leftrightarrow p$       | $p \wedge p \Leftrightarrow p$ |
| 交换律     |       $p\vee q\Leftrightarrow q\vee p$       | $p\wedge q\Leftrightarrow q\wedge p$ |
| 结合律     |       $(p\vee q)\vee r\Leftrightarrow p\vee (q\vee r)$       | $(p\wedge q)\wedge r\Leftrightarrow p\wedge (q\wedge r)$ |
| 德摩根律   |       $\neg (p\vee q)\Leftrightarrow \neg p \wedge \neg q$       | $\neg (p\wedge q)\Leftrightarrow \neg p \vee \neg q$ |
| 吸收律     |       $p \vee (p \wedge q) \Leftrightarrow p$       | $p \wedge (p \vee q) \Leftrightarrow p$ |
| 分配律 | $p \vee (q \wedge r) \Leftrightarrow (p \vee q) \wedge (p \vee r)$ | $p \wedge (q \vee r)\Leftrightarrow (p \wedge q)\vee (p \wedge r)$ |
| 排中律 | $p \vee \neg p \Leftrightarrow 1$ | - |
| 矛盾律 | $p \wedge \neg p \Leftrightarrow 0$ | - |
| 蕴涵等值式 | $p \rightarrow q \Leftrightarrow \neg p \vee q$ | - |
| 等价等值式 | $p \leftrightarrow q \Leftrightarrow (p \rightarrow q) \wedge (q \rightarrow p)$ | - |
| 假言易位 | $p \rightarrow q \Leftrightarrow \neg p \rightarrow \neg q$ | - |
| 等价否定等值式 | $p \leftrightarrow q \Leftrightarrow \neg p \rightarrow \neg q$ | - |
| 归谬论 | $(p \rightarrow q) \wedge (p \rightarrow \neg q) \Leftrightarrow \neg p$ | - |

### 例题

#### 判断公式：$p \leftrightarrow (p \vee q \vee r)$的类型，请写出过程

$$
\begin{aligned}
p \leftrightarrow (p \vee q \vee r)
&\Leftrightarrow \neg p \vee (p \vee q \vee r)\\
&\Leftrightarrow \neg p \vee p \vee q \vee r\\
&\Leftrightarrow 1 \vee q \vee r\\
&\Leftrightarrow 1\\
\end{aligned}
$$

#### 化简公式：$\neg (p \vee r) \vee (\neg p \wedge q)$

$$
\begin{aligned}
\neg (p \vee r) \vee (\neg p \wedge q)
& \Leftrightarrow (\neg p \wedge \neg r) \vee (\neg p \wedge q)\\
& \Leftrightarrow \neg p \wedge (\neg r \vee q)
\end{aligned}
$$

> 错解：
> 
> $$
> \begin{aligned}
> \neg (p \vee r) \vee (\neg p \wedge q)
> & \Leftrightarrow (\neg p \wedge \neg r) \vee (\neg p \wedge q)\\
> & \Leftrightarrow ((\neg p \wedge \neg r) \vee \neg p)\wedge ((\neg p \wedge \neg r) \vee q)\\
> & \Leftrightarrow \neg p \wedge (\neg p \wedge \neg r \vee q)\\
> & \Leftrightarrow \neg p
> \end{aligned}
> $$
> 
> 第三步时，括号不能去掉
