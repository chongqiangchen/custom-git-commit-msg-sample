# 简易版 规范 git commit msg cli

## 格式

- template: `type: [name] #cardNo content` (if no cardNo, then it can be #N/A)
- example: `test: [mike] #333 add edge case for login test`

`type` only can be one of these types and their meaning as show follow:

- _feat_: new feature
- _test_: add or change some test case
- _refactor_: refactor of the code and not change the behavior of code itself
- _style_: format the code style, such as indent of code, not related to code itself
- _chore_: changes to the build process or code infrastructure
- _fix_: fix the bug
- _docs_: documentation related, such add content to documentation or add some comments
- _revert_: revert the previous commit
- _temporary_: temporary change something maybe for pipeline
- _hotfix_: fix the bug for emergency

## 安装：

```
 npm install -g cgc
```

## 初始化 默认参数

```
> cgc d name
```

## 使用

> 使用 cgc 命令 代替 git commit -m ""

```
> git add xxx
> cgc
```

## github

[https://github.com/chongqiangchen/custom-git-commit-msg-sample](custom-git-commit-msg-sample)
