export function linkListToArray<T>(
  next: (node: T) => T | null | undefined
): (node: T) => T[]

export function linkListToArray<T>(
  next: (node: T) => T | null | undefined,
  node?: T
): T[]

export function linkListToArray<T>(
  next: (node: T) => T | null | undefined,
  node?: T
) {
  const fn = (node: T) => {
    const arr: T[] = []
    let p: T | null | undefined = node
    while (p) {
      arr.unshift(p)
      p = next(p)
    }
    return arr
  }

  return node ? fn(node) : fn
}
