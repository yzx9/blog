module.exports = {
  base: "/learn-internet/",
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
    sidebar: []
  }
};
