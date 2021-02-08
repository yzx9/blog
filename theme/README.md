# Vuepress Theme Celesta

> Blog theme for Vuepress

## Usage

First, you should install this theme:

```bash
npm install vuepress-theme-celesta
# OR
yarn add vuepress-theme-celesta
```

Second, apply theme in your config:

```js
// .vuepress/config.ts
export default {
  theme: "vuepress-theme-celesta",
}
```

Last, create `[your source dir]/index.md` and set `frontmatter.home` to `true`: 
```bash
echo "---\nhome:true\n---" > [your-source-dir]/index.md
```

Then, enjor your blog!

## Memorandum

1. Don't create posts with the same title
2. Don't forget create homepage
3. You can use folders to categorize posts

## Config

```js
// .vuepress/config.ts
export default {
  head: [
    [
      "link", // add fonts
      {
        rel: "stylesheet",
        href: "//fonts.googleapis.com/css?family=Monda:300,300italic,400,400italic,700,700italic|Roboto Slab:300,300italic,400,400italic,700,700italic|Microsoft YaHei:300,300italic,400,400italic,700,700italic|Kaushan Script:300,300italic,400,400italic,700,700italic|PT Mono:300,300italic,400,400italic,700,700italic&amp;subset=latin,latin-ext"
      }
    ]
  ],

  theme: "vuepress-theme-celesta",
  themeConfig: {
    categories: {
      categoryRaw: "My category", // set categories locale map if needed
    },
    tags: {
      "Tag Raw": "My tag", // set tags locale map if needed
    },

    locale: { // Or you can set map for each locale
      "/": {
        categories: {
          categoryRaw: "My locale category",
        },
        tags: {
          "Tag Raw": "My locale tag",
        },
      },
      "/zh-CN/": {
        categories: {
          categoryRaw: "一个分类",
        },
        tags: {
          "Tag Raw": "一个标签",
        },
      } 
    }
  },
}
```

## Frontmatter

### Updated

Format: yyyy-MM-dd

```yaml
---
updated: 1970-1-1
---
```

### Categories

Categories is affiliation, which means that the following configuration indicates that `category_2` is a subclass of `category_2`: 

```yaml
categories:
  - category_1
  - category_2
```

If you want to apply multiple category hierarchies, use a list of names instead of a single name. If we sees any categories defined this way on a post, it will treat each category for that post as its own independent hierarchy.

```yaml
categories:
  - [category_1_1, category_1_2]
  - [category_2]
```

Or mix:

```yaml
categories:
  - [category_1_1, category_1_2]
  - category_2
```
