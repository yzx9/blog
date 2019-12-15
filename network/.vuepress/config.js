module.exports = {
  base: "/notebook/network/",
  title: "Great internet",
  dest: "dist/network",
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
    sidebar: ["/http.md"]
  }
};
