---
date: 2022-04-02
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

# Pipeline in Go

_代码节选自《Go 语言并发之道》，但升级为泛型版本（Go 1.18）_

## Pipeline

流水线（Pipeline）在计算机科学中指的是一组将数据输入、执行操作、输出的 Stage 组合。使用流水线可以有效的拆分长函数逻辑，加快程序运行，并且拥有惰性求值、组合等特性。这是一个流水线的例子：

```go
// generate an int stream from integers
func generator(done <-chan any, integers ...int) <-chan int {
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
    done <-chan any,
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
    done <-chan any,
    intStream <-chan int,
    additive int,
)<-chan int {
    // ...
}

// Compose pipeline
done := make(chan any)
defer close(done)

intStream := generator(done, 1, 2, 3, 4)
pipeline := multiply(done, add(done, multiply(done, intStream, 2), 1), 2)

for v := range pipeline {
    // Consume value
}
```

_done channel 是一种推荐的 channel 控制方法，详见[如何取消 goroutine](../04/cancel-goroutine.md)_

## Repeat Generator

Repeat 生成器用于重复初始值，直到结束。

```go
func repeat[T any](
    done <-chan any,
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
    done <-chan any,
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

done := make(chan any)
defer close(done)
for num := range take(done, repeat(done, 1), 1) {
    // Consume value
}
```

这一例子中，生成器可以生成无限的 1，但是我们只取了前 N 个，而生成器也只生成了 N+1 个实例，然后等待关闭。

RepeatFn 生成器是 Repeat 生成器的升级版：

```go
func RepeatFn[T any](
    done <-chan any,
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

扇入（Fan In）、扇出（Fan Out）是计算机中的两个术语，主要指的是模块之间的层次调用情况。Pipeline 有时候因为计算复杂性、IO 或其他作业的 Stage 而阻塞，短板决定了整个系统的吞吐率。但流水线的一个显著优势就是可以轻松的调整每个 Stage 的扇入扇出数，来提高吞吐率。

在一个 Stage 满足下列条件时，你可以考虑使用扇出模式：

- 不依赖于之前 Stage 计算的值（相对顺序独立性）
- 运行需要很长时间（持续时间）

```go
numFinders := runtime.NumCPU()
finders := make([]<-chan )
func fanOut[T any, K any](
    done <-chan any,
    stage func(done <-chan any, valueStream <-chan T) <-chan K,
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
    done <-chan any,
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

## Tee Channel

有时候你可能想要复制流水线的内容，将其发送到不同位置，类 Unix 系统中提供了 `tee` 命令来，Tee Channel 也是一样：

```go
func tee[T any](
    done <-chan any,
    in <-chan T,
) (_, _ <-chan T) {
    out1 := make(chan T)
    out2 := make(chan T)
    go func() {
        defer close(out1)
        defer close(out2)
        for val := range orDone(done, in) {
            var out1, out2 = out1, out2 // scoped vars
            for i := 0; i < 2; i++ {
                select {
                case <-done:
                case out1<-val:
                    out1 = nil
                case out2<-val:
                    out2 = nil
                }
            }
        }
    }()
    return out1, out2
}
```

## 桥接 Channel

某些情况下，我们可能希望从一系列 channel 中消费产生值：

```go
<-chan <-chan T
```

这种 channel 与扇入模式合并 channel 的切片中又有些不同，桥接技术可以应用于这一问题：

```go
func bridge[T any](
    done <-chan any,
    chanStream <-chan <-chan T,
) <-chan T {
	valueStream := make(chan T)
	go func() {
		defer close(valueStream)
		for {
			select {
			case <-done:
				return
			case c, ok := <-chanStream:
				if !ok {
					return
				}

				for val := range c {
					select {
					case <-done:
					case valueStream <- val:
					}
				}
			}

		}
	}()
	return valueStream
}
```

下列是一个并行接收的桥接器，代价是更多的 goroutine：

```go
func bridge[T any](
	done <-chan any,
	chanStream <-chan <-chan T,
) <-chan T {
	valueStream := make(chan T)
	go func() {
		defer close(valueStream)
		c, ok := <-chanStream
		if !ok {
			return
		}

		bridgeStream := bridge(done, chanStream)
		for {
			select {
			case <-done:
				return
			case val, ok := <-c:
				if ok {
					valueStream <- val
				} else if bridgeStream != nil {
					c = nil
				} else {
					return
				}
			case val, ok := <-bridgeStream:
				if ok {
					valueStream <- val
				} else if c != nil {
					bridgeStream = nil
				} else {
					return
				}
			}
		}
	}()
	return valueStream
}
```

## 队列

在流水线的加上队列排队通常是最后的优化手段，太早添加队列可能会隐藏同步问题，例如死锁或活锁。添加队列往往不能够达到加速程序的目的，流水线的速度由最慢的 Stage 决定，如果你的程序被某一个 Stage 阻塞，你应该考虑拆分 Stage，使每一个 Stage 运行时间大致相同，或是使用扇入扇出模式加速。

队列的真正用途是将解耦 Stage，使一个 Stage 的运行时间不会影响到另一个 Stage 的运行时间。队列能够加速流水线的唯二情况是：

- 如果在一个 Stage 批处理请求可以节省时间；
  - bufio 将数据先写入分块的内存，然后将块写入硬盘；
  - 算法可以通过向后看或排序来优化；
- 如果在一个 Stage 中产生的延迟会在系统中产生一个反馈回环；
  - 在 pipeline 入口处加入队列，以上游请求滞后为代价，使请求尽快被接受，避免阻塞上游；

不应该在计算密集型 Stage 前加入缓存，那并不能达到加速效果，只会改变程序行为。

```go
func buffer[T any](
    done <-chan any,
    length int,
    c <-chan T,
) <-chan T {
    valueStream := make(chan T, length)
    go func() {
        defer close(valueStream)
        for {
            select {
            case <-done:
                return
            case v, ok := c:
                if !ok {
                    return
                }
                valueStream <- v
            }
        }
    }()
    return valueStream
}
```

### 利特尔法则

利特尔法则（Little's Law）可以在一个稳定的、非抢占式的系统中，通过足够的采样，预测需求率。利特尔法则不受到货流程分配、服务分配、服务顺序，或任何其他因素影响。

$$
L = \lambda W
$$

其中，$L$ 表示系统中平均负载数，$\lambda$ 表示负载的平均到达速率，$W$ 表示负载在系统中花费的平均时间。

利特尔法则告诉我们，我们在流水线中增加队列，本质上是在加大平均负载率 $L$，也就是加大负载的平均到达速率，或者是加大负载在系统中花费的平均时间，因此队列不会有助于减少负载在系统中花费的时间。利特尔法则忽略了一种情况，也就是处理失败的情况，这种情况同样也是使用队列时需要防范的。

## Reference

- Concurrency in Go. Katherine Cox-Buday
