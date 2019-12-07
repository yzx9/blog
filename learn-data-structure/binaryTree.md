# Binary Tree

[[toc]]

## 定义

### Tree

树是 n (n>=0) 个结点的有限集合 T. 当 n=0 时, 称为空树; 当 n>0 时, 集合满足下列条件:

1. 有且仅有一个特定的称为根（root）的结点, 它没有直接前驱, 但有零个或多个直接后继
2. 当 n>1 时，其余结点可分为 m（m>0)个互不相交的有限集 T1, T2, ...., Tm, 其中每一个集合本身又是一棵树，并且称为根的子树

### 二叉树

度不大于 2 的有序树

### 满二叉树

深度为 k 且有 $2^k-1$ 个结点的二叉树

### 完全二叉树

深度为 k, 结点数为 n 的二叉树, 当且仅当其 1~n 都与深度为 k 的满二叉树中编号从 1~n 的结点一一对应时, 则称之为完全二叉树

## 性质

1. 二叉树第 i 层上至多有 $2^{i-1}$ 个结点
2. 深度为 k 的二叉树至多有 $2^k-1$ 个结点
3. 对任一二叉树 T, 若终端节点数为 $n_0$, 而其度数为 2 的结点数为 $n_2$, 则 $n_0=n_2+1$
4. 具有 n 个结点的**完全二叉树**的深度为$floor(log_2n)+1$
5. 具有 n 个结点的**完全二叉树**, 按照 上->下, 左->右 编号, 对任意序号 i 的结点有:

   1. 如 i=1, 则该节点为根节点, 无父结点; 如 i>1, 则**父节点编号为 $floor(n/2)$**
   2. 如 2i>n, 则该节点无左孩子结点; 如 2i<=n, 则该节点**左孩子结点为 2i**
   3. 如 2i+1>n, 则该节点无右孩子结点; 如 2i+1<=n, 则该节点**右孩子结点为 2i+1**

## 实现

### 顺序结构 (完全二叉树)

优点: 空间利用高, 索引快

缺点: resize, 非完全二叉树最差情况下 $k$ 个结点需要 $2^k-1$ 个空间

### 链式结构

```C
typedef struct Node {
  DataType data;
  struct Node * lchild;
  struct Node * rchild;
} Node, * Tree;
```

## 遍历与线索化

| lchild | data | rchild |
| ------ | ---- | ------ |


1. 先序遍历: DLR
2. 中序遍历: LDR
3. 后序遍历: LDR

复杂度均为 O(n)

### 统计叶子结点

**分治思想**

```C
int leaf(Tree root) {
  if (root == null) {
    return 0;
  } else if (root->lchild == null && root->rchild == null) {
    return 1;
  } else {
    return leaf(root->lchild) + leaf(root->rchild);
  }
}
```

### 遍历序列 -> 二叉树

| 序列         | 能否确定唯一二叉树 | 其他                  |
| ------------ | :----------------: | --------------------- |
| 先序 + 中序  |         是         |                       |
| 后序 + 中序  |         是         |                       |
| 先序 + 后序  |         否         |                       |
| 拓展先序序列 |         是         | eg: AB.DF..G..C.E.H.. |
| 拓展中序序列 |         否         |                       |
| 拓展后序序列 |         否         |                       |

### 线索化

```C
typedef enum {
  Link,   // 指向子结点
  Thread  // 指向线索
} PointerTag;

typedef struct BitNode {
  Data data;
  struct BitNode *lchild, *rchild;
  PointerTag  Ltag;
  PointerTag  rtal;
} BitNode, *BiTree;

BiTree pre; // 指向刚刚访问过的结点
void InThreading(BiTree p)
{
    if (p == null) return;
    InThreading(p->lchild);
    if (!p->lchild) {
        p->ltag = Thread; // 前驱线索
        p->lchild = pre; // 左孩子指向前驱
    }
    if (!pre->rchild) {
        pre->rtag = Thread; // 后继线索
        pre->rchild = p; // 前驱右孩子指向后继(当前结点p)
    }
    pre = p;
    InThreading(p->rchild);
}
```

## 哈夫曼树

- 路径长度(PL), 带权路径长度(WPL)
- 定义: n 个带权叶子结点构成的所有二叉树中带权路径长度最短的二叉树

### 构造步骤(贪心)

1. **初始化**: 由 n 个权值构造二叉树森林$\{ T_1, T_2, T_3... \}$
2. **找最小树**: 在森林中选择根节点权值最小的两棵树, 构造新二叉树, 根节点权值为左右子树根节点权值之和
3. **删除与加入**: 在森林中删除选中的两棵树, 加入新树
4. **判断**: 重复 2~3, 直到只剩一棵树

### 储存结构

|               | 数量 |
| ------------- | ---- |
| 叶子          | n    |
| 结点          | 2n+1 |
| 度为 1 的结点 | 0    |
| 度为 2 的结点 | n-1  |

- 可用长度为 2n-1 的数组储存
- 1~n 为叶子

### 哈夫曼编码

- 以使用频率为权重
- 左节点编 1, 右节点编 0

## 二叉排序树

查找: $O(log_n)$, 最差可能退化到 $O(n)$

删除结点 p

```C
// f 为 p 的父结点
// s 为中序序列中 p 的前驱结点
// q 为 s 的父结点

// one way
f->lchild = p->lchild;
s->rchild = p->rchild;
free(p);

// another way
p->data = s->data;
q->rchild = s->lchild;
free(s);
```

## 平衡二叉树

### 失衡

- **LL**: 对失衡结点顺时针旋转
- **LR**: 对失衡结点左孩子结点逆时针旋转, 对失衡结点顺时针旋转
- **RR / RL**: 与上述对称

## B 树 (m 路查找树)

TODO
