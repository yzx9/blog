---
date: 2022-03-30
updated: 2022-03-30
author: Celeste
location: Shanghai University, Shanghai
tags:
  - Go
categories:
  - Computer Science
  - Language
  - Go
---

# 将错误视为一等公民

Go 的哲学中将错误视为一等公民。在普通函数中，通常将错误作为最后一个返回值来传递错误。在并发程序中，错误处理更加困难。当一个并发进程独立于其父进程或兄弟进程运行时发生错误，它往往 **缺少足够的上下文(Context)** 来处理错误。

一般来说，你的并发进程应该把他们的错误发送到你的程序的另一部分，它拥有程序更完整的状态，可以做出更明智的决定。一个直接的方法是在构建 goroutine 的返回值时，将错误与结果类型紧密结合，并通过**相同的通信线**传递，就像常规的同步函数一样：

```go
type Result {
    Error error
    Response *http.Response
}

func checkStatus(done <-chan interface{}, urls... string) <-chan Result {
    // ...
}
```

将错误视为一等公民有效的将错误处理从生产者 goroutine 中转移到了消费者甚至是 main goroutine，以便做出更明智的决定。

## Read More

- [Cleaner, more elegant, and wrong](https://devblogs.microsoft.com/oldnewthing/20040422-00/?p=39683)
- [Cleaner, more elegant, and harder to recognize](https://devblogs.microsoft.com/oldnewthing/20050114-00/?p=36693)

## References
