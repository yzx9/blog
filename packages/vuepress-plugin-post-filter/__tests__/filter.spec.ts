import { createApp, createPage } from "@vuepress/core"
import { createPostFilter } from "../src/filter"

describe("post filter", () => {
  test("should be filter by boolean", async () => {
    const app = createApp({ source: "" })

    const drafts = await Promise.all([
      createPage(app, { frontmatter: { true: true } }),
      createPage(app, { frontmatter: { false: false } }),
    ])
    const posts = await Promise.all([
      createPage(app, { frontmatter: { true: false } }),
      createPage(app, { frontmatter: { false: true } }),
      createPage(app, { frontmatter: { true: 0 } }),
      createPage(app, { frontmatter: { true: "" } }),
    ])
    const pages = [...drafts, ...posts]

    const filter = createPostFilter({
      true: true,
      false: false,
    })

    expect(pages.filter(filter)).toEqual(posts)
  })

  test("should be filter by number", async () => {
    const app = createApp({ source: "" })

    const drafts = await Promise.all([
      createPage(app, { frontmatter: { number: 0 } }),
    ])
    const posts = await Promise.all([
      createPage(app, { frontmatter: { number: true } }),
      createPage(app, { frontmatter: { number: 1 } }),
      createPage(app, { frontmatter: { number: "" } }),
    ])
    const pages = [...drafts, ...posts]

    const filter = createPostFilter({ number: 0 })

    expect(pages.filter(filter)).toEqual(posts)
  })

  test("should be filter by string", async () => {
    const app = createApp({ source: "" })

    const drafts = await Promise.all([
      createPage(app, { frontmatter: { string: "" } }),
    ])
    const posts = await Promise.all([
      createPage(app, { frontmatter: { string: true } }),
      createPage(app, { frontmatter: { string: 1 } }),
      createPage(app, { frontmatter: { string: "123" } }),
    ])
    const pages = [...drafts, ...posts]

    const filter = createPostFilter({ string: "" })

    expect(pages.filter(filter)).toEqual(posts)
  })
})
