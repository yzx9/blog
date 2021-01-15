module.exports = {
  base: "/notebook/",
  lang: "zh-CN",
  title: "Personal Notebook",
  description:
    "A notebook - one day it might be cover everything in one area or the world.",

  plugins: [
    [
      "vuepress-plugin-mathjax",
      {
        target: "svg",
        macros: {
          "*": "\\times",
        },
      },
    ],
  ],

  themeConfig: {
    repo: "nsznsznjsz/notebook",
    docsDir: "docs",
    docsBranch: "master",

    nextLinks: true,
    prevLinks: true,

    editLinks: false,
    editLinkText: "Edit this page",
    lastUpdated: "Last updated",

    smoothScroll: true,

    search: true,
    nav: [
      {
        text: "计算机科学与技术",
        link: "/cs/",
        items: [
          { text: "计算机组成原理", link: "/cs/computer-organization/" },
          { text: "数据结构", link: "/cs/data-structure/" },
          { text: "计算机网络", link: "/cs/network/" },
          { text: "杂谈", link: "/cs/others/" },
        ],
      },
    ],

    sidebar: {
      "/cs/computer-organization/": getComputerOrganizationSidebar(),
      "/cs/data-structure/": getDataStructureSidebar(),
      "/cs/network/": getNetworkSidebar(),
      "/cs/": getCSSidebar(),
      "/": getHomepageSidebar(),
    },
  },
}

function getHomepageSidebar() {
  return [
    {
      title: "计算机科学与技术",
      path: "/cs/",

      sidebarDepth: 2,
      children: getCSSidebar(),
    },
  ]
}

function getCSSidebar() {
  return [
    ...getComputerOrganizationSidebar(),
    ...getDataStructureSidebar(),
    ...getNetworkSidebar(),
    {
      title: "杂谈",
      path: "/cs/others/",
      sidebarDepth: 2,
      children: ["/cs/others/angularjs-git-commit-message-conventions"],
    },
  ]
}

function getNetworkSidebar() {
  const url = (url) => `/cs/network/${url}`
  return [
    {
      title: "计算机网络",
      path: "/cs/network/",
      sidebarDepth: 2,
      children: [url("tcp"), url("http")],
    },
  ]
}

function getComputerOrganizationSidebar() {
  const url = (url) => `/cs/computer-organization/${url}`
  return [
    {
      title: "计算机组成原理",
      path: "/cs/computer-organization/",
      sidebarDepth: 2,
      children: [url("instruction-fetch")],
    },
  ]
}

function getDataStructureSidebar() {
  const url = (url) => `/cs/data-structure/${url}`
  const tree = (name) => url(`tree-and-forest/${name}`)
  return [
    {
      title: "数据结构",
      path: "/cs/data-structure/",
      sidebarDepth: 2,
      children: [
        url("linear-list"),
        {
          title: "树和森林",
          path: url("tree-and-forest"),
          children: [
            tree("binary-sort-tree"),
            tree("avl-tree"),
            tree("huffman-tree"),
            // tree("b-tree")
          ],
        },
        url("string"),
        url("graph"),
        url("hash"),
        url("sort"),
      ],
    },
  ]
}
