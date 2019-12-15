module.exports = {
  base: "/notebook/network/",
  title: "Great internet",
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
