# Vuepress-plugin-post-filter

> Post filter plugin for vuepress-next

## Usage

```bash
npm install vuepress-plugin-post-filter
# OR
yarn add vuepress-plugin-post-filter
```

```js
// .vueprss/config.ts
export default {
  plugins: ["vuepress-plugin-post-filter"]
}
```

Set frontmatter in your draft:

```yaml
---
draft: true
# OR
published: false
---
```

Now, your draft will not publish when building.


## Config

```js
// .vueprss/config.ts
export default {
  plugins: [
    [
      "vuepress-plugin-post-filter",
      {
        frontmatter: {
          draft: true,
          published: false
        },
        prodOnly: true,
      }
    ]
  ]
}
```
