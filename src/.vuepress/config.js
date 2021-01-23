module.exports = {
  base: process.env.BASE_PATH,
  title: "Celeste's blog",
  description: "Technique && Life",

  plugins: [
    "latest-articles",
    [
      "mathjax",
      {
        target: "svg",
        macros: {
          "*": "\\times",
        },
      },
    ],
  ],

  locales: {
    "/": {
      lang: "zh-CN",
    },
  },

  themeConfig: {
    repo: "nsznsznjsz/blog",
    docsDir: "src",
    docsBranch: "main",

    nextLinks: true,
    prevLinks: true,

    editLinks: true,
    editLinkText: "编辑此页",
    lastUpdated: "上次更新",

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
      {
        text: "杂谈",
        link: "/posts/",
        items: [{ text: "咖啡", link: "/posts/coffee/" }],
      },
    ],

    sidebar: {
      "/cs/computer-organization/": getComputerOrganizationSidebar(),
      "/cs/data-structure/": getDataStructureSidebar(),
      "/cs/network/": getNetworkSidebar(),
      "/cs/": getCSSidebar(),
      "/posts/coffee/": getCoffeeSidebar(),
      "/": getHomepageSidebar(),
    },
  },
}

function getHomepageSidebar() {
  return [
    {
      title: "计算机科学与技术",
      path: "/cs/",
      children: getCSSidebar(),
    },
    {
      title: "杂谈",
      path: "/posts/",
      children: getPostsSidebar(),
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

function getPostsSidebar() {
  return [
    {
      title: "咖啡",
      path: "/posts/coffee/",
      children: getCoffeeSidebar(),
    },
  ]
}

function getCoffeeSidebar() {
  const url = (url) => `/others/coffee/${url}`
  return []
}
