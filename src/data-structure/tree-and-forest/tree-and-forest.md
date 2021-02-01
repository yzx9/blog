---
title: 树和森林
date: 2021-1-2 14:00:00
categories:
  - Computer Science
  - Data Structure
  - Tree
tags: 
  - Data Structure
---

# 树和森林

## 树（Tree）

树是 n (n>=0) 个结点的有限集合 T. 当 n=0 时，称为空树; 当 n>0 时，集合满足下列条件:

1. 有且仅有一个特定的称为根（root）的结点，它没有直接前驱，但有零个或多个直接后继
2. 当 n>1 时，其余结点可分为 m（m>0）个互不相交的有限集 $T_1, T_2, ... T_m$，其中每一个集合本身又是一棵树，并且称为根的子树

将树视为特殊的无向图，有：图的出度等于入度；又树中除根结点外，入度均为1，故有：
$$
n_0 + n_1 + n_2 + \dots + n_k = 0 * n_0 + 1 * n_1 + 2 * n_2 + \dots + k * n_k + 1
$$
其中 $n_i$ 表示度数为 $i$ 的结点。

**二叉树（Binary Tree）**：度不大于 2 的有序树（左右节点有序）

**满二叉树**：深度为 k 且有 $2^k-1$ 个结点的二叉树

**完全二叉树**：深度为 k，结点数为 n 的二叉树，当且仅当其 1 ~ n 都与深度为 k 的满二叉树中编号从 1 ~ n 的结点一一对应时，则称之为完全二叉树


### 性质

**性质一**：二叉树第 i 层上至多有 $2^{i-1}$ 个结点

**性质二**：深度为 k 的二叉树至多有 $2^k-1$ 个结点

**性质三**：对任一二叉树 T，若$n_i$表示度为$i$的结点，则有：
$$n_0 + n_1 + n_2 = 0 * n_0 + 1 * n_2 + 2 * n_2 + 1$$
左右消去相同项，化简得：
$$n_0=n_2+1$$
即叶结点个数为二分支节点个数加一。

**性质四**：具有 n 个结点的**完全二叉树**的深度为$floor(log_2n)+1$

**性质五**：具有 n 个结点的**完全二叉树**，按照从上到下，从左到右编号，对任意序号 i 的结点有:

1. 如 $i=1$，则该结点为根结点，无父结点; 如 i>1，则**父结点编号为 $floor(n/2)$**
2. 如 $2i>n$，则该结点无左孩子结点; 如 2i<=n，则该结点**左孩子结点为 $2i$**
1. 如 $2i+1>n$，则该结点无右孩子结点; 如 2i+1<=n，则该结点**右孩子结点为 $2i+1$**

### 存储结构

#### 顺序结构

将二叉树填充空结点使其成为完全二叉树然后按序存储。

优点：索引快，可以在不支持链式存储的语言中实现

缺点：空间利用率低（存储完全二叉树时空间利用率高），动态增长时可能引起resize，

> 顺序结构时首元素建议为`A[1]`，否则不满足计算规律，计算父子元素地址较复杂

#### 链式结构

```cpp
typedef struct Node {
  DataType data;
  struct Node * lchild;
  struct Node * rchild;
} Node，* Tree;
```

### 遍历与线索化


1. 先序遍历：DLR
2. 中序遍历：LDR
3. 后序遍历：LDR

#### 递归实现

```cpp
// 分治思想，复杂度O(n)
void map(Tree root) {
  if (root) {
    // visit(); // 先序遍历
    map(root->lchild);
    // visit(); // 中序遍历
    map(root->rchild);
    // visit(); // 后序遍历
  }
}
```

#### 遍历序列 -> 二叉树

| 序列         | 能否确定唯一二叉树 | 其他                  |
| ------------ | :----------------- | :-------------------- |
| 先序 + 中序  | 是                 |                       |
| 后序 + 中序  | 是                 |                       |
| 先序 + 后序  | 否                 |                       |
| 拓展先序序列 | 是                 | eg：AB.DF..G..C.E.H.. |
| 拓展中序序列 | 否                 |                       |
| 拓展后序序列 | 否                 |                       |

#### 线索化

```C
typedef enum {
  Link,  // 指向子结点
  Thread // 指向线索
} PointerTag;

typedef struct BitNode {
  DataType data;
  struct BitNode *lchild，*rchild;
  PointerTag  Ltag;
  PointerTag  rtal;
} BitNode，*BiTree;

BiTree pre; // 指向刚刚访问过的结点
void InThreading(BiTree p)
{
    if (p == null) return;
    InThreading(p->lchild);
    if (!p->lchild) {
        p->ltag = Thread; // 前驱线索
        p->lchild = pre;  // 左孩子指向前驱
    }
    if (!pre->rchild) {
        pre->rtag = Thread; // 后继线索
        pre->rchild = p;    // 前驱右孩子指向后继(当前结点p)
    }
    pre = p;
    InThreading(p->rchild);
}
```


## 森林（Forest）

森林是 $m (m≥0)$ 棵互不相交的树的集合。任何一棵树，删除了根结点就变成了森林。

### 储存结构

#### 双亲表示法

- 顺序表储存, 子节点 -> 父节点
- 容易找到树根, 查找结点的孩子需要遍历整个数组

```C
typedef struct TNode {
  Data data;
  int parent;
} TNode;

typedef struct {
  TNode tree[MAX];
  int nodenum;
} ParentTree;
```

#### 孩子表示法

- 顺序表储存, 把每个结点的孩子组成孩子链表
- n 个结点由 n 个孩子链表(叶子结点为空链表), 而 n 个结点和 n 个孩子链表的头指针组成顺序表

```C
typedef struct ChildNode {
  int child; // 该孩子结点在线性表位置
  struct ChildNode * next;
} ChildNode;

typedef struct {
  Data data;
  ChildNode * FirstChild;
} DataNode;

typedef struct {
  DataNode nodes[MAX]; // 顺序表
  int root;
  int num;
} ChildTree;
```

#### 孩子兄弟表示法 (树的二叉树表示法)

```C
typedef struct CSNode {
  Data data;
  struct CSNode * FirstChild;
  struct CSNode * Nextsibling;
} CSNode, * CSTree;
```

## 树、二叉树和森林

- 三者可以相互转换且转换结果唯一
- 树 -> 二叉树：根节点无右子树
- 森林 -> 二叉树：根节点有右子树

### Tree -> Binary Tree

1. 连接相邻兄弟结点
2. 删去结点与除第一个孩子外的连线
3. 适当旋转树后, 得到**唯一且根节点无右子树**的二叉树

### Forest -> Binary Tree

1. 每个树 -> 二叉树 $\{T_1, T_2, T_3 \dots \}$
2. 根节点左节点为 $T_1$, 右节点为 $T_2$, $T_2$ 的子节点树为 $\{ T_3 \dots \}$

### Binary Tree -> Tree / Forest

1. 若某节点为父节点的左子孩子, 则将其右孩子, 右孩子的右孩子...与该节点的父节点连接
2. 删去所有结点与右子节点的连接

### 树/森林的遍历

#### 树的遍历

- 先根遍历 <==> 转换后二叉树的前序遍历
- 后根遍历 <==> 转换后二叉树的中序遍历

#### 森林的遍历

森林有先序/中序/后序遍历，与转换后二叉树完全相等