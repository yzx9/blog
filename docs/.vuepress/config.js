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

    sidebarDepth: 2,
    sidebar: {
      "/cs/computer-organization/": getComputerOrganizationSidebar(),
      "/cs/data-structure/": getDataStructureSidebar(),
      "/cs/network/": getNetworkSideber(),
      "/cs/": getCSSidebar(),
      "/": getHomepageSidebar(),
    },
  },
}

function getHomepageSidebar() {
  return [
    {
      collapsable: false,
      title: "Computer Science",
      path: "/cs/",
      children: getCSSidebar(),
    },
  ]
}

function getCSSidebar() {
  return [
    ...getNetworkSideber(),
    ...getComputerOrganizationSidebar(),
    ...getDataStructureSidebar(),
  ]
}

function getNetworkSideber() {
  const url = (url) => `/cs/network/${url}`
  return [
    {
      title: "Network",
      path: "/cs/network/",
      children: [
        { title: "TCP", path: url("tcp") },
        { title: "HTTP", path: url("http") },
      ],
    },
  ]
}

function getComputerOrganizationSidebar() {
  return [
    { title: "Computer Organization", path: "/cs/computer-organization/" },
  ]
}

function getDataStructureSidebar() {
  const url = (url) => `/cs/data-structure/${url}`
  return [
    {
      title: "Data Structure",
      path: "/cs/data-structure/",
      children: [
        { title: "线性表", path: url("linear-list") },
        { title: "二叉树", path: url("binary-tree") },
        { title: "森林", path: url("forest") },
        { title: "串", path: url("string") },
        { title: "图", path: url("graph") },
        { title: "哈希", path: url("hash") },
        { title: "排序", path: url("sort") },
      ],
    },
  ]
}
