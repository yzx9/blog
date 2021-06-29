---
date: 2021-6-19
updated: 2021-6-19
categories:
  - Computer Science
tags:
  - Rust
---

# Rust 与 Ownership

所有权系统是 Rust 最具特色的地方，其理念并不复杂：任何变量都有所有权，没有所有权就不能用它。但是其理念深刻左右了 Rust 处处设计。

## 简单的生命周期

一个变量最简单的生命周期应该包含了 `before created`、`created`、`droped`

```rust
{                      // s 在这里无效, 它尚未声明
    let s = "hello";   // 从此处起，s 是有效的
    // 使用 s
}                      // 此作用域已结束，s 不再有效
```

这个变量将在堆上创建一个变量区域，当离开作用域后被释放。代码常常不是这么理想，现在我们需要将一个变量赋值给另一个变量。

```rust
let s1 = String::from("hello");
let s2 = s1;
println!("{}, world!", s1);
```

然后编译它：

```shell
error[E0382]: use of moved value: `s1`
 --> src/main.rs:5:28
  |
2 |     let s2 = s1;
  |         -- value moved here
3 |     println!("{}, world!", s1);
  |                            ^^ value used here after move
  |
  = note: move occurs because `s1` has type `std::string::String`, which does
  not implement the `Copy` trait
```

啊哈！其他语言中最常见的代码也能报错？仔细看看，我们会发现编译器提示我们变量已经被移动（Move），这就是 Rust 的神奇之处，`x` 创建了一个引用类型，赋值时候只是简单的按位复制了这个指针。理所当然的，值类型可以被复制：

```rust
let x = 5;
let y = x;
println!("{} + {} = {}", x, y, x+y);
```

实际上，Rust 实现了两个 trait: `Copy` and `Drop`，两者不可同时实现。

最后，我们来看一个例子：

```rust
fn main() {
    let s = String::from("hello");  // s 进入作用域

    takes_ownership(s);             // s 的值移动到函数里 ...
                                    // ... 所以到这里不再有效

    let x = 5;                      // x 进入作用域

    makes_copy(x);                  // x 应该移动函数里，
                                    // 但 i32 是 Copy 的，所以在后面可继续使用 x

} // 这里, x 先移出了作用域，然后是 s。但因为 s 的值已被移走，
  // 所以不会有特殊操作

fn takes_ownership(some_string: String) { // some_string 进入作用域
    println!("{}", some_string);
} // 这里，some_string 移出作用域并调用 `drop` 方法。占用的内存被释放

fn makes_copy(some_integer: i32) { // some_integer 进入作用域
    println!("{}", some_integer);
} // 这里，some_integer 移出作用域。不会有特殊操作
```

## 引用与借用

使用变量调用一个函数后就不能再使用它往往不是我们所期望的，我们可以将其再次返回，使得所有权回到我们手上：

```rust
let s1 = String::from("hello");
let s2 = takes_and_returns(s1);
```

不过更好的方法是使用引用`&`，它们允许你使用值但不获取其所有权，将变量借给其他函数用用：

```rust
let s1 = String::from("hello");
borrow(&s1);
```

不过既然是借用的，当然不允许修改它，不过你也可以创建一个可变引用`&mut`：

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

引用多了，就不对劲了。引用在各种情况下都挺好用的，看起来也和其他语言一样了，直到……

```rust
let mut s = String::from("hello");

let r1 = &mut s;
let r2 = &mut s;

println!("{}, {}", r1, r2);
```

```shell
error[E0499]: cannot borrow `s` as mutable more than once at a time
 --> src/main.rs:5:14
  |
4 |     let r1 = &mut s;
  |              ------ first mutable borrow occurs here
5 |     let r2 = &mut s;
  |              ^^^^^^ second mutable borrow occurs here
6 |
7 |     println!("{}, {}", r1, r2);
  |                        -- first borrow later used here
```

Rust 并不允许同时存在多个可变引用，它会导致数据竞争，这是一些帮助你提早发现问题的限制：

- 对于一块内存，同时只能有一个可写引用存在
- 对于一块内存，同时可以有多个只读引用存在
- 对于一块内存，在有一个可写引用存在的时候，不能有其它引用存在，无论只读或者可写。
- 引用的原始对象必须在引用存在的生命期一直有效

> **数据竞争**（*data race*）类似于竞态条件，它可由这三个行为造成：
>
> - 两个或更多指针同时访问同一数据。
> - 至少有一个指针被用来写入数据。
> - 没有同步数据访问的机制。

## 生命周期

让我们来试着来创建一个引用，并返回它。

```rust
fn main() {
    let reference_to_nothing = dangle();
}

fn dangle() -> &String {
    let s = String::from("hello");
    &s
}
```

这在 C++ 中是可行的，你可以返回这个指针，只不过这块内存依然会被释放，直到你使用访问这块内存并陷入一个 runtime error。

```shell
error[E0106]: missing lifetime specifier
 --> main.rs:5:16
  |
5 | fn dangle() -> &String {
  |                ^ expected lifetime parameter
  |
  = help: this function's return type contains a borrowed value, but there is
  no value for it to be borrowed from
  = help: consider giving it a 'static lifetime
```

TODO

## Q&A

### 是否存在安全的静态（全局）变量？

不存在，访问和修改可变静态变量都是 **不安全** 的，因为编译器没有足够信息确定多线程间的访问/修改顺序，无法计算其生命周期。

```rust
static mut COUNTER: u32 = 0;

fn add_to_count(inc: u32) {
    unsafe {
        COUNTER += inc;
    }
}

fn main() {
    add_to_count(3);

    unsafe {
        println!("COUNTER: {}", COUNTER);
    }
}
```



> TODO: 线程安全智能指针

### 是否存在异步安全的引用变量？其内存如何安排？

## Reference

- [Rust 程序设计语言 - Rust 程序设计语言 简体中文版 (kaisery.github.io)](https://kaisery.github.io/trpl-zh-cn/title-page.html)