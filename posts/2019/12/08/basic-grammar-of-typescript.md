---
date: 2019-12-8
updated: 2019-12-8
categories:
  - Computer Science
  - Front End
tags:
  - Typescript
---

# Typescript 基本语法

[TypeScript Language Specification](https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md)

## Type

### Enum

```typescript
enum Tristate {
  False,
  True = 2,
  Unknown,
}

const lie = Tristate.False

// compiled, 生成一个全局变量
var Tristate
;(function (Tristate) {
  Tristate[(Tristate["False"] = 0)] = "False"
  Tristate[(Tristate["True"] = 2)] = "True"
  Tristate[(Tristate["Unknown"] = 3)] = "Unknown"
})(Tristate || (Tristate = {}))

var lie = Tristate.False
```

**const enum :** 编译后不包含全局变量, 而是直接替换为值, 减少寻址过程 `var lie = 0`, 可以添加编译选项`--preserveConstEnums`生成全局变量

### Interface

- 不以 I 开头, 因为并不仅仅是接口
- Duck typing

```typescript
interface Point {
  x: number
  y: number
}

class MyPoint implements Point {
  x: number
  y: number // Same as Point
}
```

```typescript
interface Crazy {
  new (): {
    hello: number
  }
}

class CrazyClass implements Crazy {
  constructor() {
    return { hello: 123 }
  }
}

// Because
const crazy = new CrazyClass() // crazy would be { hello:123 }
```

### Type Alias

```typescript
type Shape = Square | Rectangle
type Pet = Cat & Dog

type Point = {
  x: number
  y: number
}

type Pointable = {
  (): Point
}
```

### Inference and Type Alias

### 相同

- extends / union
- implements

### 不同

- type
  - alias
  - union
    - interface cannot extends union type
    - class cannot implements union type
  - &
  - typeof
- interface
  - extends
  - declaration merging
    - 公开 API 必须使用 interface

## 类型操作关键词

- !
- ?
- readonly
- keyof
- typeof
- in
- infer
- extends

```typescript
type Words = "a" | "b" | "c"
type W<T> = T extends Words ? true : false
type WA = W<"a"> // -> true
type WD = W<"d"> // -> false
```

## 泛型

### base usage

- `function<T>: T {}`
- `<T>(input: T) => void`
- `interface<T> {}`
- `type<T> = T | { [key: string] : string }`

### infer

### 内置操作类型

[TypeScript 强大的类型别名](https://juejin.im/post/5c2f87ce5188252593122c98)

## tsconfig.json

## @types

## Features

- minfication #8
