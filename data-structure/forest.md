# Tree and forest

[[toc]]

## 储存结构

### 双亲表示法

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

### 孩子表示法

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

### 孩子兄弟表示法 (树的二叉树表示法)

```C
typedef struct CSNode {
  Data data;
  struct CSNode * FirstChild;
  struct CSNode * Nextsibling;
} CSNode, * CSTree;
```

## Tree, Forest and Binary Tree

- 唯一
- 树 -> 二叉树: 根节点无右子树
- 森林 -> 二叉树: 根节点有右子树

### Tree -> Binary Tree

1. 连接相邻兄弟结点
2. 删去结点与除第一个孩子外的连线
3. 适当旋转树后, 得到**唯一且根节点无右子树**的二叉树

### Forest -> Binary Tree

1. 每个树 -> 二叉树 {T1, T2, T3...}
2. 根节点左节点为 T1, 右节点为 T2, T2 的子节点树为 {T3...}

### Binary Tree -> Tree / Forest

1. 若某节点为父节点的左子孩子, 则将其右孩子, 右孩子的右孩子...与该节点的父节点连接
2. 删去所有结点与右子节点的连接

## 树/森林的遍历

### 树的遍历

- 先根遍历 <==> 转换后二叉树的前序遍历
- 后根遍历 <==> 转换后二叉树的中序遍历

### 森林的遍历

- 先序遍历, 中序遍历, 后序遍历
- 与转换后二叉树完全相等
