---
title: 线性表
date: 2019-10-24 19:30:32
updated: 2019-10-24 19:30:32
categories:
  - Computer Science
  - Data Structure
  - Linear List
tags: 
  - Data Structure
---

# 线性表

**定义**: 在数据元素的非空有限集合中, 除第一个元素无直接前驱, 最后一个元素无直接后继节点外, 每个元素都有唯一的直接前驱和直接后继节点.

## ADT

```C
initList(L)
getLength(L)
get(L, i)
insert(L, i , e)
del(L, i, e)
locate(L, e)
destroy(L)
clear(L)
isEmpty(L)
```

## 顺序储存(数组)

- 可索引
- 插入, 删除慢
- 长度受限

## 链式储存

- 插入, 删除快
- 无法索引
- 查询慢

### 循环链表

- 将最后一个指针指向表头节点
- 从每个节点都可以访问整个列表
- 查找前驱节点复杂度为 O(n)

### 双向链表

- 每个节点都保存指向前驱节点和后继节点的指针
- 查找前驱节点复杂度为 O(1)

### 静态链表

- 适用于没有指针/引用的语言
- 用大数组模拟内存分配, 记录下一个节点的 index

## 查找

1. 顺序查找法

`Data data[SIZE + 1]`
data[0] 为监视哨, 存放查找元素关键字

2. 二分法

   - 顺序结构存储
   - 按大小有序排列

3. 分块查找法

   - 块内无序
   - 块与块之间有序

# Queue

限定性线性表, FIFO

```C
init(Q)
isEmpty(Q)
isFull(Q)
clear(Q)
getHead(Q)
getLength(Q)
push(Q)
shift(Q)
```

## 应用

打印杨辉三角

**优先队列是二叉堆实现**

## 实现

队头指针: front

队尾指针: rear

### 链队列

特殊情况: front === rear

### 循环队列 (数组实现)

当 rear < front 时, 说明出现循环

push 时, 当 rear + 1 === MAX_SIZE 时, 令 rear = 0

# Stack

栈是一种限定性线性表, 遵循 LIFO

```C
init(S)
clear(S)
isEmpty(S)
isFull(S)
push(S, x)
pop(S)
getTop(S)
```

## 应用

- Hanoi
- 递归调用栈 (优化: TCO, 蹦床函数)
- 表达式求值

## 实现

### 顺序栈

```C
#define Stack_Size 50
typedef struct {
  Element data[Stack_Size];
  int top;
} Stack;
```

### 链栈

```C
#define Stack_Size 50
typedef struct {
  Element data;
  StackNode * next;
} StackNode;
```
