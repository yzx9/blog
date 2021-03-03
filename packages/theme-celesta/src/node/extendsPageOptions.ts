const blocklist = [/^index.md$/, /^README.md$/]

export const extendsPageOptions = (filePath: string) => {
  if (!blocklist.some((reg) => reg.test(filePath))) {
    return {
      frontmatter: {
        permalinkPattern: "/posts/:slug.html",
      },
    }
  }
  return {}
}
