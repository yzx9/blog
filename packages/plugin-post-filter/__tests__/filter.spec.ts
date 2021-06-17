import { createBuildApp, createPage } from "@vuepress/core"
import { createPostFilter } from "../src/filter"

describe("post filter", () => {
  test("should be filter by boolean", async () => {
    const app = createBuildApp({ source: "" })

    const drafts = await Promise.all([
      createPage(app, { path: "draft1", frontmatter: { true: true } }),
      createPage(app, { path: "draft2", frontmatter: { false: false } }),
    ])
    const posts = await Promise.all([
      createPage(app, { path: "post1", frontmatter: { true: false } }),
      createPage(app, { path: "post2", frontmatter: { false: true } }),
      createPage(app, { path: "post3", frontmatter: { true: 0 } }),
      createPage(app, { path: "post4", frontmatter: { true: "" } }),
    ])
    const pages = [...drafts, ...posts]

    const filter = createPostFilter({
      true: true,
      false: false,
    })

    expect(pages.filter(filter)).toEqual(posts)
  })

  test("should be filter by number", async () => {
    const app = createBuildApp({ source: "" })

    const drafts = await Promise.all([
      createPage(app, { path: "draft1", frontmatter: { number: 0 } }),
    ])
    const posts = await Promise.all([
      createPage(app, { path: "post1", frontmatter: { number: true } }),
      createPage(app, { path: "post2", frontmatter: { number: 1 } }),
      createPage(app, { path: "post3", frontmatter: { number: "" } }),
    ])
    const pages = [...drafts, ...posts]

    const filter = createPostFilter({ number: 0 })

    expect(pages.filter(filter)).toEqual(posts)
  })

  test("should be filter by string", async () => {
    const app = createBuildApp({ source: "" })

    const drafts = await Promise.all([
      createPage(app, { path: "draft1", frontmatter: { string: "" } }),
    ])
    const posts = await Promise.all([
      createPage(app, { path: "post1", frontmatter: { string: true } }),
      createPage(app, { path: "post2", frontmatter: { string: 1 } }),
      createPage(app, { path: "post3", frontmatter: { string: "123" } }),
    ])
    const pages = [...drafts, ...posts]

    const filter = createPostFilter({ string: "" })

    expect(pages.filter(filter)).toEqual(posts)
  })
})
