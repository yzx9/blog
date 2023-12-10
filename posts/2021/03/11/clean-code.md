---
date: 2021-3-11
updated: 2021-3-11
categories:
  - Computer Science
  - Coding Style
tags:
  - Clean Code
---

# 代码整洁之道

试想一段乱七八糟的代码，`if/else`、 `for` 和 `switch` 反复嵌套，代码需要翻上两三次才能看到底，可能还没有测试代码……

毫无疑问，没有人愿意维护这样一段代码，每个接手它的人，都选择在复杂的分支条件中加上几句代码，而不愿意重构它，这样一段代码，将一个系统拉入深坑，直到没有人再愿意去维护它。虽然工程中告诉我们没有修改才是最稳定的，但是对于一段代码而言，没有重构也就意味着它彻底死去。

![Clean code rules](./assets/clean-code-rules.png)

## 命名

从写下第一行代码开始，命名就不断纠缠着程序员，作为”两大难题“之一，命名显得格外重要。

> There are only two hard things in Computer Science: cache invalidation and naming things.
>
> -- Phil Karlton

选取一个命名首先应该是一个有意义的命名，并且是一个没有误导性的名称：

- `accountList` 不是一个好名称，最好不要用一个`list`来表示一个列表，即使它真的是一个列表，它对程序员有特殊的意义，至少`accounts`都比它好
- `a1` `a2` 也不是个好名称，除了循环变量常常是 `i` `j` `k` 外，尽量用一个有意义的名字
- `nameString` 更离谱了，难不成 `name` 会是个浮点数？对了，还有 `Variable` `Info`……
- `HolyHandGrenade` 说实话我查了会儿词典才懂得这和 `DeleteItems` 是一个意思，别用这类与文化紧密相关的命名（也许哪天是个老外维护你的代码呢
- `HP` 是什么呢，会是惠普吗？别用一个缩写了（中文名首字母就更难受了），别太在意名称的长短，现在谁的编辑器没有变量改名和智能推导呢？

使用一个描述性的名称，

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

 不过也别加上无用的语境，例如每个变量都加上你的公司缩写 `GSD(Gas Station Deluxe)`，即使你很爱他 :)

最后，不妨在 [CODELF](https://unbug.github.io/codelf/) 上搜搜看，看看其他人都是怎么命名的吧。

## 函数

我们希望每一个函数都是一目了然的，但没有人能一开始就写出一段完美的代码，只有不断地重构，才能保证一段代码的生命力。

### Don't Repeat Yourself

##  References

- Robert C. Martin. Clean code

- Evan You. [Order of words in component names](https://v3.vuejs.org/style-guide/#order-of-words-in-component-names-strongly-recommended)
