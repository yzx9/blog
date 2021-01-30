function throttle<T extends any[], R>(fn: (...args: T) => R, interval: number) {
  let last = 0

  return function (this: any, ...args: T) {
    const now = Date.now()

    if (now - last >= interval) {
      last = now
      return fn.apply(this, args)
    }
  }
}

export { throttle }
