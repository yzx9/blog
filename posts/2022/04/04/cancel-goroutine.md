---
date: 2022-04-04
updated: 2022-04-04
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

# 如何取消 goroutine

goroutine 有几种方式被终止：

- 当它完成了他的工作
- 因为不可恢复的错误，它不能继续工作
- 当它被告知需要终止工作

前两种是隐藏在算法中的，最后的是一种推荐的通信模式，pipeline 中使用这一模式来控制 stage。

## Done Channel

考虑一个简单的 goroutine 泄漏：

```go
doWork := func(strings <-chan string) <-chan any {
    completed := make(chan any)
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
    done <-chan any,
    strings <-chan string
) <-chan any {
    terminated := make(chan any)
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

done := make(chan any)
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
func or(channels ...<-chan any) <-chan any {
    switch len(channels) {
    case 0:
        return nil
    case 1:
        return channels[0]
    }

    orDone := make(chan any)
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

### or-done-channel

考虑另一种情况，Stage 从上游接受一个 done 信号，又从系统其他地方接受了一个不受 done 信号控制的 channel，or-done 可以有效处理这种情况：

```go
func orDone[T any](done <-chan any, c <-chan T) <-chan T {
    valueStream := make(chan T)
    go func() {
        defer close(valueStream)
        for {
            select {
            case <-done:
                return
            case v, ok := <-c:
                if !ok {
                    return
                }

                select {
                case <-done:
                case valueStream<-v:
                }
            }
        }
    }()
    return valueStream
}
```

使用 orDone 结合 done 和 channel 后可以回归简单的 `for-range`：

```go
for val := range orDone(done, myChan) {
    // do something
}
```

## Context

在并发程序中，由于超时、取消或系统其他部分故障等原因往往需要抢占操作。done channel 是一个很好的方法来取消所有阻塞的并发操作，但是它不能携带一些额外的信息。Go 1.7 引入了一个标准模式——Context 包——来解决这个问题。

```go
type Context {
    // 如果已经超时，返回 Deadline
    // 如果未超时，返回 ok == false
    Deadline() (deadline time.Time, ok bool)

    // 返回一个 done channel，连续调用返回相同值
    Done() <-chan struct{}

    // 如果 done channel 未关闭，返回 nil
    // 如果 done channel 已经关闭，返回 non-nil，解释为什么关闭
    Err() error

    // 添加 request-scoped 信息
    Value(key interface{}) interface{}
}
```

不难发现，Context 类型中没有提供任何能够改变 Context 的操作，因此接受 Context 的函数无法改变上下文状态。子函数只可以通过包裹 Context 来创建新的上下文，系统提供了几个方法：

```go
func Background() Context   // empty context
func TODO() Context         // placehodler

func WithCancel(parent Context) (Context, CancelFunc)
func WithDeadline(parent Context, deadline time.Time) (Context, CancelFunc)
func WithTimeout(parent Context, timeout time.Duration) (Context, CancelFunc)
func WithValue(parent Context, key, val interface{}) (Context, CancelFunc)
```

如果你的函数需要以某种方式取消下游函数，那么它可以调用其中一个函数，并传递给它的子元素。而如果你的函数不需要修改取消动作，那么函数只需要传递给定上下文。如果不知道传递什么 Context 时候，使用`TODO`来创建一个占位符，而不是传递 nil。

除了超时和取消，Context 还提供了一种传递信息的方法`WithValue`，只有很少的限制：

- 键值（Key）必须具有可比性，也就是可以使用`==`比较；
- 返回值必须是线程安全的。

`WithValue` 用来传递一些线程或者请求相关的信息非常好用，但是不要用于添加可选的函数变量。另外，`WithValue`方法不具备类型安全，因此社区对于这个包一直存在争议。一个能够提供部分类型安全的方法是使用自定义类型：

```go
func main() {
    ProcessRequest("jane", "abc123")
}

type ctxKey int

const (
    ctxUserID   ctxKey = iota
    ctAuthToken
)

func UserID(c context.Context) string {
    return c.Value(ctxUserID).(string)
}

func AuthToken(c context.Context) string {
    return c.Value(ctxAuthToken).(string)
}

func ProcessRequest(userID, authToken string) {
    ctx := context.Background()
    ctx = context.WithValue(ctx, ctxUserID, userID)
    ctx = context.WithValue(ctx, ctxAuthToken, authToken)
    HandleResponse(ctx)
}

func HandleResponse(ctx context.Context) {
    fmt.Printf(
        "handling response for %v (auth: %v)",
        UserID(ctx),
        AuthToken(ctx),
    )
}
```

这种方法最大的问题在于别的包内的函数无法轻易访问 Context，因此使用 context 传递值之前需要谨慎思考，并参考以下意见：

- 值应该位于进程或 API 边界内
- 值应该是不可变的
- 值应该趋于简单类型
- 值应该是数据，而不是方法或类型
- 值应该用于修饰操作，而不是驱动操作

## Reference

- Concurrency in Go. Katherine Cox-Buday
- [context package](https://pkg.go.dev/context#Context)
