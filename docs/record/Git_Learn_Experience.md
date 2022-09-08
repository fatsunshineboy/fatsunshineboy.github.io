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
#配置别名
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
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

5.推送到远程仓库
$ git push [远程仓库别名] <branch>
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
注意^与~之间的区别，当存在多个分支时，^可以用来选择分支，HEAD~i永远只选择第i级父节点的第一个分支，以此类推；HEAD^=HEAD^1=HEAD~1；如果没有分支，只有一条主线，则HEAD^^^=HEAD^1^1^1=HEAD~3，如果该级节点有第二个分支，则表示为：HEAD^^^2 = HEAD~2^2
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

## Bug修改
1. 创建新分支修复bug，此时正在开发的分支有工作没有提交，使用`git stash`将当前工作储存
2. 在哪个分支上改Bug，就在哪个分支创建临时分支，完成后合并分支，删除临时分支
3. `git stash list`查看之前保存的工作现场
4. 恢复工作现场
> 一是用`git stash apply`恢复，但是恢复后，stash内容并不删除，需要用`git stash drop`来删除;  
另一种方式是用`git stash pop`，恢复的同时把stash内容也删了
5. 将修改的Bug的那次提交复制给其他分支`git cherry-pick <commit_id>`

## 分支管理
1. 分支关联
```bash
#如果省略远程分支名，则表示将本地分支推送与之存在"追踪关系"的远程分支（通常两者同名），
#如果该远程分支不存在，则会被新建，但本地和远程没有关联
$ git push <远程主机名> <本地分支名>:<远程分支名>
$ git pull <远程主机名> <远程分支>:<本地分支>

#在远程创建一个与本地branch_name同名的分支并追踪
$ git push --set-upstream origin branch_name
$ git push -u origin branch_name

#如果省略本地分支名，则表示删除指定的远程分支，因为这等同于推送一个空的本地分支到远程分支。
$ git push origin :master # 等同于 $ git push origin --delete master

#创建本地分支跟踪分支<本地分支名>，并从远程分支<远程主机名>/<远程分支名>拉取代码。
git branch --track <本地分支名> <远程主机名>/<远程分支名>
git switch -c <本地分支名> <远程主机名>/<远程分支名>
git checkout -b <本地分支名> <远程主机名>/<远程分支名>

#远程新建了一个分支，本地没有该分支，命令会在本地新建分支branch_name，并自动跟踪
$ git checkout --track origin/branch_name

#建立当前分支与指定远程分支的追踪关系，但不会拉取代码。参数"-u"和"--set-upstream-to"同样用处。
$ git branch -u <远程主机名>/<远程分支名>
$ git branch --set-upstream-to <远程主机名>/<远程分支名>
```

2. 分支操作命令

| 分支操作        | 命令                                                    |
| ------------- | ------------------------------------------------------------ |
| 创建分支      | `git branch <name>`<br/>创建叫name的分支，但仍然停留在当前分支。 |
| 删除分支      | `git branch -d <name>`：参数为-D则为强制删除。<br/>`git push origin --delete <name>` ：删除远程仓库的叫name的分支，同名的本地分支并不会被删除，所以还需要单独删除本地同名分支<br/>`git branch -dr <remote>/<branch-name>`：没有删除远程分支，只是删除 git branch -r 列表中的追踪分支。一般只有git push命令可以修改远程仓库。<br/> |
| 切换分支      | `git switch <name>`<br/>`git checkout <name>`                |
| 创建+切换分支 | `git switch -c <name>`<br/>`git checkout -b <name>`<br/>上方两条命令一个意思：如果分支存在则只切换分支。不存在则创建叫name的分支，然后切换到该分支。相当于两条命令：`git branch <name>`，`git checkout <name>` |
| 查看分支      | `git branch`：查看本地分支，当前分支前面会标一个*号。<br/>`git branch -r`：查看远程分支。<br/>`git branch -a`：查看本地分支和远程分支，远程分支会用红色表示出来（如果你开了颜色支持的话）。<br/>`git branch -vv`：查看本地分支对应的远程分支。 |
| 重命名分支    | git branch -m oldName newName                                |

## 开发小结
1. 关联远程仓库时，调用`git branch -vv`查看分支关联状态，确保分支建立联系  
`git branch --set-upstream-to <远程仓库别名>/<远程仓库分支>`

## 应用场景
### “Fork + Pull”协作模式
存在一个"公共主库"，最新代码都是从"公共主库"拉取，fork了一个"公共主库的项目"到自己的账号下为"自己拥有的远程仓库"，以后提交代码前都是从"公共主库"拉取最新代码。我们只能向"自己拥有的远程仓库"推送代码，只有在经过项目组其他成员的review后我们才能从"自己拥有的远程仓库"向"公共仓库"提交合并请求，实现最后的代码合并。这样做能实现能减少多人开发代码提交冲突，而且我们提交代码只是向自己账号下的fork仓库提交不存在提交冲突。每次的开发需求都创建一个特定的开发分支，通过分支区分代码，方便代码回滚。
```bash
# Git 修改指定远程仓库的push地址
git remote set-url --push <远程仓库别名> <远程仓库URL>
```
1. 仓库管理员 设置代码审查
>设置指定人员为某仓库默认的代码审核/测试人员后，每当有新的Pull Request以此仓库内分支为目标分支时，系统会通知指定人员前去审查提交的Pull Request（也就是改动的代码内容），同时也可以设置合并Pull Request的门槛（例如是否需要全部指定人员同意才可以合并）。

2. 开发者 提交Pull Request
>开发者通过 Fork仓库的分支向源仓库的分支 或 同仓库内的工作分支向源分支 提交Pull Request的方式来发起一个代码审查的请求，以达到更新源分支的代码的目的。

3. 审查者 进行代码审核/测试
>指定人员查看开发者提交的Pull Request内容，并决定是否同意接受该开发者的改动。

4. 仓库管理员 合并 Pull Request
>仓库的管理人员在审查者同意后，即可通过合并Pull Request的方式把开发者的文件改动内容同步到源分支。

### 多分支模式
- master ： 生产分支，即该分支与当前生产代码版本一致。  
- develop ： 开发分支，该分支为当前开发版本分支，每个里程碑结点都须先合并到master，再进行后续开发。  
- hotfix ：补丁分支，该分支用于修复生产BUG，在修复问题前，从master分支派生而来，修复完成后，将该分支分别合并到 master和develop分支。  
![多分支开发模式](/imgs/record/git_problem/多分支开发模式.png)

1. 项目git仓库创建完成后，基于 master分支 创建 develop分支，项目团队的功能开发均在develop分支上进行；  
2. 产品首次发布生产版本时，先将 develop分支 的代码合并到master分支，并从合并后的master分支打包项目部署生产。  
3. 产品后续功能迭代开发继续在develop分支进行。  
4. 当生产版本发现重大BUG需要紧急修复时，基于当前master分支创建hotfix分支，并在hotfix分支上修复该BUG。hotfix分支上完成BUG修复后，将该分支代码分别合并到master分支和develop分支。合并完成后，master分支代码打包发布生产修复BUG；develop分支继续后续功能开发。  
:::warning
注意：每次生产发布关键版本，建议对该版本打tag，以便代码控制和版本对比。  
:::

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
#提交所有修改的快照。这个选项只考虑git中已经添加的文件
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
6. git stash  
git stash 命令使你能够在不提交当前分支的情况下切换分支，保存未完成的工作
```bash
#保存工作内容
$ git stash
#检查存储的藏品
$ git stash list
#恢复工作内容
$ git stash apply <stash id>
#恢复工作内容(保存记录会从git stash list删除)
$ git stash pop
#查看文件在藏匿前和藏匿后的变化
$ git stash show
#显示文件的变化内容
$ git stash show -p
#删除保存内容的对列
$ git stash drop <stash id>
#清空保存内容的对列
$ git stash clear
#工作藏在某一新分支上
$ git stash branch <Branch Name>
```
### Git命令图解
![git命令](/imgs/record/git_problem/git流程.png)


