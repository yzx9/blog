const svgClock = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`

export default {
  name: "LastestArticles",
  props: {
    title: {
      type: String,
      default: "最新文章",
    },
    titleTag: {
      type: String,
      default: "h2",
    },
    number: {
      type: Number,
      default: 10,
    },
  },
  render(h) {
    const pages = this.$site.pages
      .filter((a) => a.frontmatter?.publish !== false)
      .filter((a) => a.regularPath.startsWith(this.$page.regularPath))
      .map((a) => ({ ...a, lastUpdated: new Date(a.lastUpdated) }))
      .sort((a, b) => b.lastUpdated - a.lastUpdated)
      .slice(0, this.number)
      .map((a) =>
        h("li", [
          h(
            "div",
            {
              style: {
                marginRight: "20px",
                display: "flex",
                justifyContent: "space-between",
              },
            },
            [
              h("a", a.title),
              h(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "rgba(0,0,0,.54)",
                    fontWeight: 200,
                  },
                },
                [
                  h("span", {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      marginRight: "5px",
                    },
                    domProps: {
                      innerHTML: svgClock,
                    },
                  }),
                  h("span", a.lastUpdated.toLocaleDateString()),
                ]
              ),
            ]
          ),
        ])
      )

    return h("div", [h(this.titleTag, {}, this.title), h("ul", pages)])
  },
}
