# Vuepress Theme Celesta

> Blog Theme for Vuepress

## Usage

First, install `vuepress-theme-celesta`:

```bash
npm install @celesta/vuepress-theme-celesta
# OR
yarn add @celesta/vuepress-theme-celesta
```

Second, apply theme in your config:

```js
// .vuepress/config.ts
export default {
  theme: "vuepress-theme-celesta",
}
```

Then, enjor your blog🎉!

## Memorandum

- Don't create posts with the same title
- Configre your (particles preset)[https://particles.js.org/samples/]

## Config

```js
// .vuepress/config.ts
export default {
  head: [
    [
      "link", // add fonts
      {
        rel: "stylesheet",
        href: "//fonts.googleapis.com/css?family=Monda:300,300italic,400,400italic,700,700italic|Roboto Slab:300,300italic,400,400italic,700,700italic|Microsoft YaHei:300,300italic,400,400italic,700,700italic|Kaushan Script:300,300italic,400,400italic,700,700italic|PT Mono:300,300italic,400,400italic,700,700italic&amp;subset=latin,latin-ext",
      },
    ],
  ],

  theme: "vuepress-theme-celesta",
  themeConfig: {
    particles: "my-particles-preset",
    translations: {
      myCategory: "My category", // set categories locale map if needed
      myTag: "My tag", // set tags locale map if needed
    },

    locale: {
      // Or you can set map for each locale
      "/": {
        translations: {
          myCategory: "My locale category",
          myTag: "My locale tag",
        },
      },
      "/zh-CN/": {
        translations: {
          myCategory: "一个分类",
          myTag: "一个标签",
        },
      },
    },
  },
}
```

## Frontmatter

### Updated

> Last updated time is not a required option, we will use last commit from git if git is enabled and this frontmatter is not ~~
>
> However, updated time from git is not always right and it doesn't take a lots of time to specify it😊

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
