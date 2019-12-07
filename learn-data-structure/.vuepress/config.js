module.exports = {
  base: "/notebook/learn-data-structure/",
  title: "Oh my data structure",
  dest: "dist/learn-data-structure",
  plugins: [
    [
      "vuepress-plugin-mathjax",
      {
        target: "svg",
        macros: {
          "*": "\\times"
        }
      }
    ]
  ],
  themeConfig: {
    lastUpdated: "Last Updated",
    sidebar: [
      "/linear-list.md",
      "/binaryTree.md",
      "/forest.md",
      "/string.md",
      "/graph.md",
      "/hash.md",
      "/sort.md"
    ]
  }
};
