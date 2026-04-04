---
title: Git 学习笔记
titleEn: Git Study Notes
desc: Git 版本控制学习笔记
descEn: Git version control learning notes
date: 2025-01-05
tags: [工具，Git]
cover: /images/gallery/20260328211225_1.jpg
readingTime: 8
---

# Git 学习笔记

Git 是版本控制的核心工具，掌握 Git 命令对于团队协作和代码管理至关重要。

## 基础命令

### 配置

```bash
# 设置用户名
git config --global user.name "Your Name"

# 设置邮箱
git config --global user.email "your@email.com"

# 查看配置
git config --list
```

### 初始化和克隆

```bash
# 初始化仓库
git init

# 克隆仓库
git clone https://github.com/user/repo.git
```

### 提交更改

```bash
# 查看状态
git status

# 添加文件
git add file.txt
git add .  # 添加所有文件

# 提交
git commit -m "Add new feature"

# 查看历史
git log
git log --oneline --graph
```

### 分支管理

```bash
# 创建分支
git branch feature-branch

# 切换分支
git checkout feature-branch
git switch feature-branch  # Git 2.23+

# 创建并切换
git checkout -b feature-branch

# 合并分支
git checkout main
git merge feature-branch

# 删除分支
git branch -d feature-branch
```

### 远程操作

```bash
# 添加远程仓库
git remote add origin https://github.com/user/repo.git

# 推送
git push origin main

# 拉取
git pull origin main
```

## 常用工作流

### Feature Branch

```bash
git checkout -b feature/login
git add .
git commit -m "Add login feature"
git push origin feature/login
# Create PR on GitHub
git checkout main
git merge feature/login
```

### 撤销操作

```bash
# 撤销工作区修改
git checkout -- file.txt

# 撤销暂存
git reset HEAD file.txt

# 撤销提交（保留更改）
git reset --soft HEAD~1

# 撤销提交（丢弃更改）
git reset --hard HEAD~1
```

## 总结

Git 是开发者必备的技能，熟练使用 Git 可以提高工作效率和代码质量。
