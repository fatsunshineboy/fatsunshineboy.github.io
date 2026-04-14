---
title: Git 提交规范指南
titleEn: Git Commit Message Convention Guide
desc: 详细介绍Git提交信息的标准格式、类型分类、作用范围及Conventional Commits规范，附带Commitizen等工具推荐
descEn: Comprehensive guide to Git commit message format, types, scopes, and Conventional Commits specification with tool recommendations like Commitizen
date: 2026-04-14
tags: [Git, 提交规范, Conventional Commits, 团队协作]
cover: /images/gallery/20260328212534_1.jpg
readingTime: 8

---

# Git 提交规范（Commit Message Convention）指南

## 一、为什么需要提交规范？

在团队协作开发中，良好的 Git 提交信息（commit message）可以：

- 提高代码可读性
- 方便代码回溯和问题定位
- 支持自动生成 CHANGELOG
- 提升团队协作效率
- 便于代码评审（Code Review）

---

## 二、基本结构

推荐使用如下结构：

```bash
<type>(<scope>): <subject>
<body> 
<footer> 
```

示例：

```
feat(auth): add JWT login support

Implement token-based authentication using JWT.

Closes #123
```

------

## 三、Type（提交类型）

| 类型     | 说明                                   |
| -------- | -------------------------------------- |
| feat     | 新功能（feature）                      |
| fix      | 修复 bug                               |
| docs     | 文档变更                               |
| style    | 代码格式（不影响功能，如空格、分号等） |
| refactor | 重构（既不是新增功能，也不是修复 bug） |
| perf     | 性能优化                               |
| test     | 增加或修改测试                         |
| chore    | 构建过程或辅助工具变动                 |
| build    | 构建系统或依赖变更                     |
| ci       | CI 配置修改                            |
| revert   | 回滚提交                               |

------

## 四、Scope（作用范围）

用于说明本次提交影响的模块，例如：

```
feat(user): add user profile page
fix(api): resolve timeout issue
```

常见 scope 示例：

- user
- auth
- api
- ui
- db
- config

------

## 五、Subject（简要描述）

要求：

- 使用 **动词开头（英文用原形）**
- 首字母小写
- 不超过 50 个字符
- 结尾不加句号

示例：

```
fix login bug
add payment support
update README
```

------

## 六、Body（详细说明）

可选，用于补充说明：

- 为什么做这个改动
- 和之前行为的对比
- 解决了什么问题

示例：

```
fix(auth): correct token expiration logic

Previously, tokens expired immediately due to incorrect timestamp calculation.
This fix ensures proper expiration timing.
```

------

## 七、Footer（页脚）

用于：

### 1. 关联 Issue

```
Closes #123
Fixes #456
```

### 2. 破坏性变更（Breaking Changes）

```
BREAKING CHANGE: remove legacy login API
```

------

## 八、完整示例

```
feat(payment): integrate Stripe payment gateway

Add Stripe API integration for processing payments.
Supports credit card and Apple Pay.

Closes #88
```

------

## 九、推荐规范（Conventional Commits）

推荐遵循 **Conventional Commits** 规范：

👉 https://www.conventionalcommits.org/

优势：

- 自动生成 CHANGELOG
- 支持语义化版本（Semantic Versioning）
- 与 CI/CD 工具无缝集成

------

## 十、配套工具推荐

### 1. Commitizen（交互式提交）

安装：

```
npm install -g commitizen
```

使用：

```
git cz
```

------

### 2. commitlint（校验提交信息）

安装：

```
npm install --save-dev @commitlint/{config-conventional,cli}
```

配置 `commitlint.config.js`：

```
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```

------

### 3. husky（Git Hook）

用于在提交前自动校验：

```
npx husky install
```

------

## 十一、最佳实践总结

- 每次提交只做一件事
- 提交信息清晰、简洁、有意义
- 避免使用模糊描述（如：update、fix bug）
- 保持团队统一规范
- 使用工具自动化约束