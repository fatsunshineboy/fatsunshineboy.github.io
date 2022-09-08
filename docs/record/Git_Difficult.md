## git push -u
参数解析：

首先对于 git push,有这样一段描述：

``` 
-u

–set-upstream

For every branch that is up to date or successfully pushed, add upstream (tracking) reference,
used by argument-less git-pull(1) and other commands. For more information, see branch.<name>.
merge in git-config(1)
```

在这个描述中，可以看到 -u 参数与下面这个变量相关

`branch.<name>.merge`

`branch.<name>.merge`与`branch.<name>.remote`一起定义给定分支的上游分支（upstream）。它告诉git fetch/git pull要合并哪个分支，还可以影响git push.

而upstream是指其他人将从中获取的主要存储库，例如您的GitHub存储库。-u选项自动为您设置上游，将您的仓库链接到一个中央仓库。这样，将来Git会“知道”您要推送到的位置以及您要从哪里提取的信息，因此您可以使用git pull或git push不使用参数。

当您git pull从分支进行操作而未指定源远程或分支时，git会查看 `branch.<name>.merge` 设置以了解从何处提取。而正是git push -u 命令为您要推送的分支设置此信息。

至此，简单来说，带上-u 参数其实就相当于记录了push到远端分支的默认值，这样当下次我们还想要继续push的这个远端分支的时候推送命令就可以简写成git push即可。

其实，执行添加了-u 参数的命令 `git push -u origin master`就相当于是执行了`git push origin master` 和`git branch --set-upstream master origin/master`。

所以，在进行推送代码到远端分支，且之后希望持续向该远程分支推送，则可以在推送命令中添加 -u 参数，简化之后的推送命令输入。

[文章来源](https://www.php.cn/tool/git/493447.html)

## git clone 分支问题
:::warning
调用`git branch`发现只有默认分支,网上有博客说`git clone url`就是`git clone -b master url`的缩写,也就是说本地只会有默认分支，还得自己手动创建关联其他分支。笔者认为git clone的时候已经把所有分支拉取下来了，只是本地没有创建分支,通过`git checkout <branch_name>`可以在本地新建分支，并且自动拉取跟踪远程分支，但这个拉取并不是实时从远程仓库中来的，而是在git clone的时候就已经拉去过来的，可以用test仓库做个实验
:::
```bash
#先clone一个仓库
$ git clone git@github.com:fatsunshineboy/test.git
Cloning into 'test'...
remote: Enumerating objects: 122, done.
remote: Counting objects: 100% (122/122), done.
remote: Compressing objects: 100% (77/77), done.
remote: Total 122 (delta 27), reused 100 (delta 19), pack-reused 0
Receiving objects: 100% (122/122), 22.48 KiB | 7.49 MiB/s, done.
Resolving deltas: 100% (27/27), done.
#调用 git branch -a 查看分支
$ git branch -a
* main
  remotes/origin/HEAD -> origin/main
  remotes/origin/main
  remotes/origin/master
  remotes/origin/test
  remotes/origin/test123
  remotes/origin/test456
```
本地只有main分支，这个时候在github上手动给test分支添加一个test.md文件并提交
![git疑难杂点](/imgs/record/git_idea/clone的疑难杂点.png)
```bash
#这个时候调用git checkout master
$ git checkout master
Switched to a new branch 'master'
branch 'master' set up to track 'origin/master'.
#查看文件列表
$ ls
12.txt  123.md  123.txt  test.txt
```
test.md并没有被拉取下来，说明没有从远程拉取。而且，在一般情况下，直接调用`git checkout branch`，如果branch不存在应该报错，git clone情况下，如果远程仓库有同名分支，就会新建并且跟踪远程分支。
>猜测会不会是git checkout先从本地寻找分支，找不到去远程仓库寻找分支，结果验证失败，说明还是git clone的时候肯定把远程分支拉取下来了。
验证如下：
> ```bash
> #在本地初始化仓库
> $ git init
> Initialized empty Git repository in C:/Users/15203/Desktop/新建文件夹 (3)/.git/
> #绑定远程仓库
> $ git remote add origin git@github.com:fatsunshineboy/test.git
> #先拉取下master分支
> $ git pull origin master
> #切换一个本地没有但远程仓库有的分支，如main
> $ git checkout main
> error: pathspec 'main' did not match any file(s) known to git
> ```
> 说明checkout不会从根据远程仓库的分支创建新分支，但是在`git clone`的仓库中例外

再换一个方法证明一下，如果`git clone url`就是`git clone -b master url`的缩写，我们在clone的时候就直接用`git clone -b master url`，看这个时候`git checkout <branch_name>`会不会起作用
```bash
#调用git clone -b [分支] <远程仓库URL>
$ git clone -b main git@github.com:fatsunshineboy/test.git
#打开github，在test分支上新加一个checkout.md
#这个时候在调用git checkout <branch>
$ git checkout master
Switched to branch 'master'
Your branch is up to date with 'origin/master'.
#本地仍然不会增加checkout.md
```

总结一下</br>
git clone或者git clone -b在本地都只会展现一个分支，调用`git checkout <branch_name>`时（本地没有这个分支，并且本地的这个仓库是由git clone而来），如果远程有指定分支，就会在本地新建并且拉取跟踪这个分支，但是这个分支并不是远程最新（不是类似于git pull）的，而是调用`git clone`时仓库的状态