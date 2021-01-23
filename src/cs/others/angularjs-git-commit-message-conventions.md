---
title: Git Angular 规范
---

# AngularJS Git Commit Message Conventions

> via: [Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.uyo6cb12dt6w)

Git 中每次 commit，都需要书写 commit message：

```bash
git commit -m "hello world"
```

每次使用 `git log` 时，一份清晰的commit message 可以帮助我们快速找到所需的 commit，AngularJS Git Commit Message Conventions 就是帮助你写好它。

## 目标

- 提供更多的历史信息，方便浏览
- 允许过滤 commit 便于查找
- 可以通过脚本生成 Change log

## 格式

Message 由 Header、Body（Optional）和 Footer（Optional）组成，通过空行连接：

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

同时，每行不应超过100字符，这是避免自动换行影响美观。

### Message Header

Header 只有一行，由 type、scope（optional）和 subject 组成。

#### type

规定的类型如下：

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（formatting）
- refactor：重构
- test：增加测试
- chore：构建过程或辅助工具的变动，例如 deps、ci

还有一种特殊情况

- revert：撤销以前的 commit，后面跟着被撤销 Commit 的 Header。

```
revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

Body部分的格式是固定的，必须写成`This reverts commit <hash>.`

如果当前 commit 与被撤销的 commit，在同一次发布（release）里面，那么它们都不会出现在 Change log 里面。如果两者在不同的发布，那么当前 commit，会出现在 Change log 的`Reverts`小标题下面。

#### scope

项目的范围，或是用于关联 Issue（#1)。

#### subject

对于 change 的一行简短的描述

- use imperative, present tense: “change” not “changed” nor “changes”
- don't capitalize first letter
- no dot (.) at the end

### Message Body

### Message Footer

主要用于标记破坏性更新和关闭Issue

#### BREAKING CHANGES

```
BREAKING CHANGE: isolate scope bindings definition has changed and
    the inject option for the directive controller injection was removed.
    
    To migrate the code follow the example below:
    
    Before:
    
    scope: {
      myAttr: 'attribute',
      myBind: 'bind',
      myExpression: 'expression',
      myEval: 'evaluate',
      myAccessor: 'accessor'
    }
    
    After:
    
    scope: {
      myAttr: '@',
      myBind: '@',
      myExpression: '&',
      // myEval - usually not useful, but in cases where the expression is assignable, you can use '='
      myAccessor: '=' // in directive's template change myAccessor() to myAccessor
    }
    
    The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```

#### Referencing Issues

关闭一个 Issue：

```
Closes #234
```

或是同时关闭多个 Issues：

```
Closes #123, #245, #992
```

### Examples

```
feat($browser): onUrlChange event (popstate/hashchange/polling)

Added new event to $browser:
- forward popstate event if available
- forward hashchange event if popstate not available
- do polling when neither popstate nor hashchange available

Breaks $browser.onHashChange, which was removed (use onUrlChange instead)
```

```
fix($compile): couple of unit tests for IE9

Older IEs serialize html uppercased, but IE9 does not...
Would be better to expect case insensitive, unfortunately jasmine does
not allow to user regexps for throw expectations.

Closes #392
Breaks foo.bar api, foo.baz should be used instead
```

```
feat(directive): ng:disabled, ng:checked, ng:multiple, ng:readonly, ng:selected

New directives for proper binding these attributes in older browsers (IE).
Added coresponding description, live examples and e2e tests.

Closes #351
```

```
style($location): add couple of missing semi colons
```

```
docs(guide): updated fixed docs from Google Docs

Couple of typos fixed:
- indentation
- batchLogbatchLog -> batchLog
- start periodic checking
- missing brace
```

```
feat($compile): simplify isolate scope bindings

Changed the isolate scope binding options to:
  - @attr - attribute binding (including interpolation)
  - =model - by-directional model binding
  - &expr - expression execution binding

This change simplifies the terminology as well as
number of choices available to the developer. It
also supports local name aliasing from the parent.

BREAKING CHANGE: isolate scope bindings definition has changed and
the inject option for the directive controller injection was removed.

To migrate the code follow the example below:

Before:

scope: {
  myAttr: 'attribute',
  myBind: 'bind',
  myExpression: 'expression',
  myEval: 'evaluate',
  myAccessor: 'accessor'
}

After:

scope: {
  myAttr: '@',
  myBind: '@',
  myExpression: '&',
  // myEval - usually not useful, but in cases where the expression is assignable, you can use '='
  myAccessor: '=' // in directive's template change myAccessor() to myAccessor
}

The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```

## 插件

### Commitizen

> via: [Github](https://github.com/commitizen/cz-cli)

Commitizen 用于帮助书写合格的 commit message，安装如下：

```bash
npm install -g commitizen
```

然后，在项目目录里，运行下面的命令，使其支持 Angular 的 Commit message 格式。

```bash
commitizen init cz-conventional-changelog --save --save-exact
```

最后，将`git commit`改为使用`git cz`即可。

![commitizen](./imgs/commitizen.png)

### validate-commit-msg

> via: [npm](https://www.npmjs.com/package/validate-commit-msg)

validate-commit-msg 用于校验 commit message 是否符合规则，安装如下：

```bash
npm install --save-dev validate-commit-msg
```

然后可以通过 git hooks 来调用，例如 husky：

```bash
npm install husky --save-dev
```

并添加 hook：

```json
// package.json
{
  "husky": {
    "hooks": {
      "commitmsg": "validate-commit-msg"
    }
  }
}
```

### conventional-changelog

> via: [Github](https://github.com/conventional-changelog/conventional-changelog)

用于生成 Change log，步骤如下：

```bash
npm install -g conventional-changelog
cd my-project
conventional-changelog -p angular -i CHANGELOG.md -w
```