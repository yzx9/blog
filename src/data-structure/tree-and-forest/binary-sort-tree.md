---
title: 二叉排序树
date: 2021-1-2 14:00:00
categories:
  - computer science
  - data structure
  - tree
tags: 
  - data structure
---

## 二叉排序树

查找：$O(log_2 n)$，最差可能退化到 $O(n)$

### 删除结点 p

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

