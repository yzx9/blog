module.exports = {
  base: "/notebook/learn-internet/",
  title: "Great internet",
  dest: "dist/learn-internet",
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
    sidebar: []
  }
};
