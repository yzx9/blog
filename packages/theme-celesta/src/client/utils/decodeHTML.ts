// TODO: remove SSR flag
declare const __VUEPRESS_SSR__: boolean

export function decodeHTML(input: string) {
  if (__VUEPRESS_SSR__ === true) return input
  const doc = new DOMParser().parseFromString(input, "text/html")
  return doc.documentElement.textContent
}
