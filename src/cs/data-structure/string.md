---
title: 串
---

# String

[[toc]]

```C
assign(chars)
insert(S, pos, T) // 插入串
del(S, pos, len)
copy(T)
compare(S, T)
getLength(S)
clear(S)
cat(S, T) // 连接
subString(S, pos, len)
subIndex(S, T, pos) // 若 T 为 S 子串, 返回 T 在 S[pos] 后第一次出现的索引
destory(S)
```

## 实现

### 定长串

```C
typedef struct {
  char ch[MAX_SIZE];
  int len;
} String
```

### 链串

线性字符串

```C
typedef struct {
  char * ch;
  int len;
} String
```

### 块链串

```C
typedef struct Block {
  char ch[BOLOCK_SIZE];
  struct Block * next;
} Block;

typedef struct {
  Block * head;
  Block * tail;
  int len;
} String
```

## 模式匹配

- Brute-Force 算法 (回溯)
- KMP (无回溯)
