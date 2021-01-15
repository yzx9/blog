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

  nav: [],
  themeConfig: {
    search: true,

    repo: "nsznsznjsz/notebook",
    docsDir: "docs",
    docsBranch: "master",

    nextLinks: true,
    prevLinks: true,

    editLinks: false,
    editLinkText: "Edit this page",
    lastUpdated: "Last updated",

    smoothScroll: true,

    sidebarDepth: 1,
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
      collapsable: false,
      title: "计算机科学与技术",
      path: "/cs/",
      children: getCSSidebar(),
    },
  ]
}

function getCSSidebar() {
  return [
    ...getNetworkSidebar(),
    ...getComputerOrganizationSidebar(),
    ...getDataStructureSidebar(),
    {
      title: "杂谈",
      children: [
        {
          title: "Git Angular 规范",
          path: "/cs/others/angularjs-git-commit-message-conventions",
        },
      ],
    },
  ]
}

function getNetworkSidebar() {
  const url = (url) => `/cs/network/${url}`
  return [
    {
      title: "计算机网络",
      path: "/cs/network/",
      children: [
        { title: "TCP", path: url("tcp") },
        { title: "HTTP", path: url("http") },
      ],
    },
  ]
}

function getComputerOrganizationSidebar() {
  const url = (url) => `/cs/computer-organization/${url}`
  return [
    {
      title: "计算机组成原理",
      path: "/cs/computer-organization/",
      children: [
        {
          title: "取指周期",
          path: url("instruction-fetch"),
        },
      ],
    },
  ]
}

function getDataStructureSidebar() {
  const url = (url) => `/cs/data-structure/${url}`
  const tree = (url) => `/cs/data-structure/tree-and-forest/${url}`
  return [
    {
      title: "数据结构",
      path: "/cs/data-structure/",
      sidebarDepth: 2,
      children: [
        { title: "线性表", path: url("linear-list") },
        {
          title: "树和森林",
          path: url("tree-and-forest"),
          children: [
            { title: "二叉排序树", path: tree("binary-sort-tree") },
            { title: "二叉平衡树", path: tree("avl-tree") },
            { title: "哈夫曼树与哈夫曼编码", path: tree("huffman-tree") },
            // { title: "B树", path: tree("b-tree") },
          ],
        },
        { title: "串", path: url("string") },
        { title: "图", path: url("graph") },
        { title: "哈希", path: url("hash") },
        { title: "排序", path: url("sort") },
      ],
    },
  ]
}
