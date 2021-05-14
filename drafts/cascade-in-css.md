---
date: 2021-5-5
update: 2021-5-5
categories:
  - Computer Science
  - Front End
tags:
  - CSS
---

# CSS中的优先级

稍微复杂的层叠样式表（CSS，Cascade Style Sheet）中都存在多条规则同时选中同一个元素的情况。CSS采用层叠规则（Cascade）处理该问题，从其名字便可以看出重要性。

## 位置决定优先级

行内样式 > 样式表样式 > 

## 改变优先级：!important

!important 是 CSS 中唯一可以在改变优先级的语法，在任意语法后加上 !important 可以将其直接提高到最高级，但是你应该少使用它，复杂的样式表中使用 !important 常常会影响到其他样式。实际上，多数你觉得需要通过 !important 的样式可以重构解决，还有很多样式失效是因为不理解 CSS 原理。

不得不改变优先级的情况通常是想要覆盖库的默认样式，这时候你应该优先考虑通过选择器提高优先级。可以试试通过加一个选择器或是重复选择器来提高优先级，是的，多数选择器重复后并不影响其选择范围，但是会提高优先级。

> 除了 !important，在 SASS/SCSS 中我们常常可以看见在变量名后跟着 !default，用来表示如果已经存在该变量，则不再重复声明。但是很遗憾，这一语法是 SCSS 语法，并不是 CSS 语法，不能用于 CSS 变量，在编译后将会全部消失。

## 距离并不影响 CSS 优先级

在DOM树中的距离并不会影响 CSS 的优先级，假设有下列样式声明：

```css
body h1 { color: yellow; }
html h1 { color: red; }
```

作用于如下 DOM 树：

```html
<html>
  <body>
    <h1>Here is a title!</h1>
  </body>
</html>
```

浏览器会将其渲染成红色，而不是受到第一条规则的影响。个人理解这一现象是因为 Style Engine 位于 CSS Parser 之后，而 Parser 并不知道 DOM 树相关信息。

## 总结

1. 标注为 !important 的用户样式
2. 标注为 !important 的作者样式
3. 用户样式
4. 作者样式
5. 浏览器默认样式

