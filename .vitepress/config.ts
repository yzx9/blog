import { defineConfigWithTheme } from "vitepress"
import { withMermaid } from "vitepress-plugin-mermaid"
import { type Config } from "vitepress-theme-celesta"

const translations: Record<string, string> = {
  "Computer Science": "计算机科学",
  "Computer Organization": "计算机组成",
  "Computer Graphics": "计算机图形学",
  "Data Structure": "数据结构",
  "Software Engineering": "软件工程",
  Architecture: "架构",
  Tree: "树",
  Network: "计算机网络",
  Performance: "性能",
  Authorization: "认证",

  "Front End": "前端",
  Browser: "浏览器",
  Compiler: "编译原理",
  Grammar: "语法",
  Automata: "自动机",

  Life: "日常",
  Coffee: "咖啡",
  Course: "课程",

  Math: "数学",
  "Discrete Mathematical": "离散数学",
}

export default withMermaid(
  defineConfigWithTheme<Config>({
    head: [["link", { rel: "icon", href: "/icon.ico" }]],
    markdown: {
      math: true,
    },
    locales: {
      root: {
        label: "中文",
        lang: "zh",
        title: "Zexin Yuan's blog",
        description: "Technique && Life",
        themeConfig: {
          author: "Zexin Yuan",
          tag: translations,
          category: translations,
        },
      },
    },
  })
)
