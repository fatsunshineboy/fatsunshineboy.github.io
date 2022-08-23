<!-- 集中式和分布式的区别是：```本地是否有完整的版本库历史``` -->
## Git基础
### Git安装   
- windows从git官网[下载安装程序](https://git-scm.com/downloads)  
- Linux安装
```bash
$ sudo apt-get install git
```
### Git配置
```bash
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```
### Git使用
```bash
1. 创建版本库
$ git init

2. 把文件添加到仓库
$ git add [file1] [file2] ...

3. 把文件提交到本地仓库
$ git commit [file1] [file2] ... -m [message]

4. 关联远程仓库
$ git remote add [远程仓库别名] <远程仓库URL>

5.推送到远程仓库(-u把本地分支和远程分支关联)
$ git push -u [远程仓库别名] <branch>
```

## Git修改文件
### 版本回退
```bash
#版本回退
$ git reset --hard HEAD^
$ git reset --hard <commit_id>
#记录每一次命令(防止回退错误)
$ git reflog
```
:::tip
注意^与~之间的区别，当存在多个分支时，^可以用来选择分支，HEAD~i永远只选择第i级父节点的第一个分支，HEAD~i^2选择第i级父节点的第二个分支，以此类推；HEAD^=HEAD^1=HEAD~1；如果没有分支，只有一条主线，则HEAD^^^=HEAD^1^1^1=HEAD~3，如果该级节点有第二个分支，则表示为：HEAD^^^2 = HEAD~2^2
```
G   H   I   J
 \ /     \ /
  D   E   F
   \  |  / \
    \ | /   |
     \|/    |
      B     C
       \   /
        \ /
         A
A =      = A^0
B = A^   = A^1     = A~1
C = A^2  = A^2
D = A^^  = A^1^1   = A~2
E = B^2  = A^^2
F = B^3  = A^^3
G = A^^^ = A^1^1^1 = A~3
H = D^2  = B^^2    = A^^^2  = A~2^2
I = F^   = B^3^    = A^^3^
J = F^2  = B^3^2   = A^^3^2
```
:::

### 撤销修改
场景1：修改了工作区某个文件的内容，但没有添加到暂存区，想直接丢弃工作区的修改时，用命令`git restore <filename>`

场景2：当修改了工作区某个文件的内容，还添加到了暂存区时，想丢弃所有修改，分两步，第一步用命令`git restore --staged <filnamne>`，就回到了场景1，第二步按场景1操作。

场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，使用版本回退
:::tip
1. `--source`可以指定文件 `git restore <filename> --source HEAD <filename>`
2. 在未给定 source 的情况下，如果使用 `--staged` ，从 `HEAD` 恢复(覆盖)暂存区，否则从暂存区恢复(覆盖)工作区
:::

### 撤销删除
1. 删除文件
> **1. 手动在工作区删除文件**  
> 使用`git rm <filename>`和`git add<filename>`效果一样，都将添加到暂存区  
> **2. 直接使用`git rm <filename>`**   
> 会自动删除工作区的文件，并且直接添加到暂存区
2. 撤销删除
> 方法同[撤销修改](#撤销修改)

## Git常用命令
1. git add
```bash
#一次性添加所有可用的文件
$ git add -A
$ git add .
#增加更新和新创建的文件,忽略删除的文件
$ git add --ignore-removal .
#增加修改和删除的文件,忽略新创建的文件
$ git add -u
#通过通配符添加文件
$ git add *.java
#Git撤销add
$ git reset <filename>
```

2. git commit
```bash
#提交所有修改的快照。这个选项只考虑Git中已经添加的文件
$ git commit -a
#修改最后一次的提交信息
$ git commit -amend
```
::: tip
1. `git commit`   
如果没有设置 -m 选项，Git 默认会打开 [vim](Linux命令行.md#_6-vim) 提交信息

2. `git commit -a` 可以跳过`git add [file]`  
`git commit -a` 只能提交已经存在的文件，提交新建的文件时会失败
:::

3. git status
```bash
$ git status #查看显示工作目录和暂存区的状态
$ git status -s #紧凑的格式输出状态
```
:::tip
1. `git status`不显示已经commit到项目历史中去的信息,查看项目历史的信息要使用`git log`  
2. `git status -s`  
新添加的未跟踪文件前面有 ?? 标记，新添加到暂存区中的文件前面有 A 标记，修改过的文件前面有 M 标记。
M 有两个可以出现的位置，出现在右边的 M 表示该文件被修改了但是还没放入暂存区，出现在靠左边的 M 表示该文件被修改了并放入了暂存区。
:::

4. git diff
```bash
#显示暂存区和工作区的差异
$ git diff
#显示暂存区和本地仓库的差异
$ git diff --staged || $ git diff --cached [file]
#显示工作区和本地仓库的差异(HEAD 指向的是本地仓库中最新提交的版本)
$ git diff HEAD
#显示两个提交之间的差异
$ git diff <commit1-sha> <commit2-sha>
#Git Diff 比较分支差异
$ git diff <branch 1> < branch 2>
```
:::tip
1. `$ git diff HEAD^`  
比较 workspace 与最新commit的前一次commit的差异  
2. `$ git diff HEAD~2`  
比较 workspace 与上2次提交的差异，相当于 git diff HEAD~2 HEAD~0，注意两个HEAD的位置，diff显示的结果表示 后一个(HEAD~0) 相对于 前一个的修改(HEAD~2)
:::
5. git log
### Git命令图解
![git命令](/imgs/record/git_problem/git流程.png)

## Git可能遇到的问题
### ssh: connect to host github.com port 22: Connection refused
1. 修改.ssh的配置文件
```bash
vim ~/.ssh/config

Host github.com  
User xxxxx@xx.com  
Hostname ssh.github.com  
PreferredAuthentications publickey  
IdentityFile ~/.ssh/id_rsa  
Port 443
``` 
:::warning
可能依然报错
:::
2. 首先到 ipaddress 输入 github.com 查找到其IP地址  
将查到的IP地址和网址映射放到你的本地 hosts 文件中即可，例子：140.82.112.4 github.com  
PS: windows 下 host 默认地址： C:\Windows\System32\drivers\etc

```bash
#如果省略远程分支名，则表示将本地分支推送与之存在"追踪关系"的远程分支（通常两者同名），
#如果该远程分支不存在，则会被新建。
$ git push <远程主机名> <本地分支名>:<远程分支名>
$ git pull <远程主机名> <远程分支>:<本地分支>
# 如果省略本地分支名，则表示删除指定的远程分支，因为这等同于推送一个空的本地分支到远程分支。
$ git push origin :master
# 等同于
$ git push origin --delete master
```