---
date: 2021-3-11 17:12:23
updated: 2021-3-11 17:12:23
categories:
  - Computer Science
  - Coding Style
tags:
  - Clean Code
  - Naming
---

# 代码整洁之道——命名

1. Choose descriptive and unambiguous names.
2. Make meaningful distinction.
3. Use pronounceable names.
4. Use searchable names.
5. Replace magic numbers with named constants.
6. Avoid encodings. Don't append prefixes or type information.

## 有意义的命名

选取一个命名首先应该是一个有意义的命名，并且是一个没有误导性的名称：

- `accountList` 不是一个好名称，最好不要用一个`list`来表示一个列表，即使它真的是一个列表，它对程序员有特殊的意义，至少`accounts`都比它好
- `a1` `a2` 也不是个好名称，除了循环变量常常是 `i` `j` `k` 外，尽量用一个有意义的名字
- `nameString` 更离谱了，难不成 `name` 会是个浮点数？对了，还有 `Variable` `Info`……
- `HolyHandGrenade` 说实话我查了会儿词典才懂得这和 `DeleteItems` 是一个意思，别用这类与文化紧密相关的命名（也许哪天是个老外维护你的代码呢
- `HP` 是什么呢，会是惠普吗？别用一个缩写了（中文名首字母就更难受了），别太在意名称的长短，现在谁的编辑器没有变量改名和智能推导呢？

## 描述性的命名与重构

使用一个描述性的名称，

## 适当的语境与单词顺序

为了达意，你还可以为你的命名加上一个语境，例如 `AddrFirstName`、 `AddrLastName`和`AddrState`，除了可以帮助你快速了解这个字段，还可以让你的编辑器帮助你补齐字段。为了达成这一目标，你可以重新组织你的单词顺序：

```text
// Bad
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue

// Good
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

你可能会疑惑：

> “为什么我们给组件命名时不多遵从自然语言呢？”

在自然的英文里，形容词和其它描述语通常都出现在名词之前，否则需要使用连接词。比如：

- Coffee _with_ milk
- Soup _of the_ day
- Visitor _to the_ museum

如果你愿意，你完全可以在组件名里包含这些连接词，但是单词的顺序很重要。 因为编辑器通常会按字母顺序组织文件，所以现在组件之间的重要关系一目了然。

不过也别加上无用的语境，例如每个变量都加上你的公司缩写 `GSD(Gas Station Deluxe)`，即使你很爱他 :)

## 总结

从写下第一行代码开始，命名就不断纠缠着程序员，作为”两大难题“之一，命名显得格外重要，它值得你画上一些时间去修改变量或者函数的名字，项目的下一个接手者会感谢你的。

最后，不妨上 [CODELF](https://unbug.github.io/codelf/) 搜搜看，看看其他人都是怎么命名的吧。

> There are only two hard things in Computer Science: cache invalidation and naming things.
>
> -- Phil Karlton

## References

- Robert C. Martin. Clean code

- Evan You. [Order of words in component names](https://v3.vuejs.org/style-guide/#order-of-words-in-component-names-strongly-recommended)
