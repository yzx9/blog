declare module "vue" {
  export interface GlobalComponents {
    RouterLink: typeof import("vue-router")["RouterLink"]
    RouterView: typeof import("vue-router")["RouterView"]
    Content: typeof import("@vuepress/client")["Content"]
    ClientOnly: typeof import("@vuepress/client")["ClientOnly"]
  }
}

export {}
