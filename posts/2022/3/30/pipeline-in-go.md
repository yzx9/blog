---
date: 2022-03-30
updated: 2022-03-30
author: Celeste
location: Shanghai University, Shanghai
tags:
  - Go
  - Concurrency
categories:
  - Computer Science
  - Language
  - Go
---

# Pipeline in Go

## Pipeline

Pipeline 在计算机科学中指的是一组将数据输入、执行操作、输出的 Stage。使用 Pipeline 可以有效的拆分长函数逻辑，并且拥有惰性求值、组合等特性。这是一个 Pipeline 的例子：

```go
// generate an int stream from integers
func generator(done <-chan interface{}, integers ...int) <-chan int {
    intStream := make(chan int)
    go func() {
        defer close(intStream)
        for _, i := range integers {
            select {
            case <-done:
                return
            case intStream <- i:
            }
        }
    }()
}

// Pipeline stage
func multiply(
    done <-chan interface{},
    intStream <-chan int,
    multiplier int,
)<-chan int {
    multipiedStream := make(chan int)
    go func() {
        defer close(multipiedStream)
        for i := range intStream {
            select {
            case <-done:
                return
            case multipiedStream<-i*multiplier:
            }
        }
    }
}

func add(
    done <-chan interface{},
    intStream <-chan int,
    additive int,
)<-chan int {
    // ...
}

// Compose pipeline
done := make(chan interface{})
defer close(done)

intStream := generator(done, 1, 2, 3, 4)
pipeline := multiply(done, add(done, multiply(done, intStream, 2), 1), 2)

for v := range pipeline {
    // Consume value
}
```

## 防止 goroutine 泄漏

goroutine 有几种方式被终止：

- 当它完成了他的工作
- 因为不可恢复的错误，它不能继续工作
- 当它被告知需要终止工作

前两种是隐藏在算法中的，最后的是一种推荐的通信模式，考虑一个简单的 goroutine 泄漏：

```go
doWork := func(strings <-chan string) <-chan interface{} {
    completed := make(chan interface{})
    go func() {
        defer close(completed)
        for s := range strings {
            fmt.Println(s)
        }
    }
    return completed
}

doWork(nil) // strings is nil
```

这一 Case 中，由于 `strings`是 nil，doWork 无法正常完成导致泄漏。更严重的是，如果我们试图 join 这两个 goroutine，会导致程序死锁。一个有效的应对这种问题的方法是在父子 goroutine 之间建立信号通道，让父 goroutine 可以向子 goroutine 发送取消信号：

```go
doWork := func(
    done <-chan interface{},
    strings <-chan string
) <-chan interface{} {
    terminated := make(chan interface{})
    go func() {
        defer close(completed)
        for {
            select {
            case s := <-strings:
                fmt.Println(s)
            case <-done:
                return
            }
        }
    }
    return terminated
}

done := make(chan interface{})
terminated := doWork(done, nil)

go func(){
    time.Sleep(1 * time.Second)
    close(done)
}()

<-terminated
```

### or-channel

有时候，你可能想要组合多个 done chanel 合并成一个单一的 done channel，一个有效的方法是使用 or-channel：

```go
// compose multiple done channel
func or(channels ...<-chan interface{}) <-chan interface{} {
    switch len(channels) {
    case 0:
        return nil
    case 1:
        return channels[0]
    }

    orDone := make(chan interface{})
    go func() {
        defer close(orDone)

        switch len(channels) {
        case 2:
            select {
            case <-channels[0]:
            case <-channels[1]:
            }
        default:
            select {
            case <-channels[0]:
            case <-channels[1]:
            case <-channels[2]:
            case <-or(append(channels[3:], orDone)...)
            }
        }
    }

    return orDone
}
```

这个函数可以有效组合 done channel：

```go
start := time.Now()
<-or(
    time.After(1 * time.Second),
    time.After(1 * time.Minute),
    time.After(1 * time.Hour),
)
fmt.Printf("done after %v", time.Since(start)) // 1s
```

我们以创建更多 goroutine 为代价，实现了简洁性。但是 goroutine 一个优点是能够**快速创建、调度和运行**，Go 语言也鼓励我们使用 goroutine 来正确建模问题。

## Repeat Generator

_下列代码节选自《Go 语言并发之道》，但升级为泛型版本（Go 1.18）_

Repeat 生成器用于重复初始值，直到结束。

```go
func repeat[T any](
    done <-chan interface{},
    values ...T
) <-chan T {
    valueStream := make(chan T)
    go func() {
        defer close(valueStream)
        for {
            for _, v := range values {
                select {
                case <-done:
                    return
                case valueStream<-v:
                }
            }
        }
    }()

    return valueStream
}
```

Repeat 生成器会不断重复值，直到你告诉它停止。Take stage 常常用于与 Repeat 一起使用：

```go
func take[T any](
    done <-chan interface{},
    valueStream <-chan T,
    num int,
) <-chan T {
    takeStream := make(chan T)
    go func() {
        defer close(takeStream)
        for i:=0; i<num; i++ {
            select {
            case <-done:
                return
            case takeStream<-valueStream:
            }
        }
    }()

    return takeStream
}

done := make(chan interface{})
defer close(done)
for num := range take(done, repeat(done, 1), 1) {
    // Consume value
}
```

这一例子中，生成器可以生成无限的 1，但是我们只取了前 N 个，而生成器也只生成了 N+1 个实例，然后等待关闭。

RepeatFn 生成器是 Repeat 生成器的升级版：

```go
func RepeatFn[T any](
    done <-chan interface{},
    fn func() T,
) <-chan T {
    valueStream := make(chan T)
    go func() {
        defer close(valueStream)
        for {
            select {
            case <-done:
                return
            case valueStream<-fn():
            }
        }
    }()

    return valueStream
}
```

## 扇入扇出

扇入（Fan In）、扇出（Fan Out）是计算机中的两个术语，主要指的是模块之间的层次调用情况。Pipeline 有时候因为计算复杂性、IO 或其他作业的 Stage 阻塞，短板决定了整个系统的吞吐率。但 Pipeline 的一个显著优势就是可以轻松的调整每个 Stage 的扇入扇出数，来提高吞吐率。

在一个 Stage 满足下列条件时，你可以考虑使用扇出模式：

- 不依赖于之前 Stage 计算的值（相对顺序独立性）
- 运行需要很长时间（持续时间）

```go
numFinders := runtime.NumCPU()
finders := make([]<-chan )
func fanOut[T any, K any](
    done <-chan interface{},
    stage func(done <-chan interface{}, valueStream <-chan T) <-chan K,
    valueStream <-chan T,
    num int,
) []<-chan K {
    channels := make([]<-chan K, num)
    for i := 0; i < num; i++ {
        channels[i] = stage(done, valueStream)
    }

    return channels
}
```

使用扇出模式 Stage 的下游，可以使用扇入模式合并多个 channel：

```go
func fanIn[T any](
    done <-chan interface{},
    channels ...<-chan T,
) <-chan T {
    var wg sync.WaitGroup
    multipleStream := make(chan T)

    multiplex := func(c <-chan T) {
        defer wg.Done()
        for i := range c {
            select {
            case <-done:
                return
            case multipiedStream<-i:
            }
        }
    }

    wg.Add(len(channels))
    for _, c := range channels {
        go multiplex(c)
    }

    go func() {
        wg.Wait()
        close(multipiedStream)
    }()

    return multipiedStream
}
```

## Reference

- Concurrency in Go. Katherine Cox-Buday
