---
date: 2019-12-8
updated: 2019-12-8
categories:
  - Computer Science
  - Front End
tags:
  - Vue
---

# Vue 2

## 语法

### 属性

- data
  - 原生属性
    - 特殊: class, style
  - data
  
- props
  - VUE 如何监听子组件改变 Props?

- vuex

### 事件

- 普通事件
  - $emit 是否存在返回值
- 修饰符事件

### 插槽

- 普通插槽
- 作用域插槽
  - 相同名称的插槽是合并还是覆盖

### View -> Model

MVVM

## 数据驱动

### new Vue

```typescript
megerConfiguration()

initLifecycle(vm) {
  initEvents(vm)
  initRender(vm)
  callHook(vm, 'beforeCreate')
  initInjections(vm) // resolve injections before data/props
  initState(vm)
  initProvide(vm) // resolve provide after data/props
  callHook(vm, 'created')
}
```

### $mount

### render

```typescript
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }

      const { render, staticRenderFns } = compileToFunctions(template, {
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  return mount.call(this, el, hydrating)
}
```

### Virtual DOM

CreateElement (VNode)

_update (vnode -> DOM)

## 组件化

### 生命周期

![Vue 生命周期](./assets/lifecycle.png)

### 异步组件

- 注释节点
- forceRender

## 响应式

### render

### Getter / Setter

- Object.defineProperty

**Getter:** Collect as Denpendency

**Setter:** Notify Watcher

  - Array.push 并没有改变引用，Vue 如何监听？
    - https://github.com/vuejs/vue/blob/dev/src/core/observer/array.js#L27

  - Object.observe


### Watcher

**re-render:** Call ComponentRenderFunction

### ComponentRenderFunction

### Virtual DOM

$nextTick
