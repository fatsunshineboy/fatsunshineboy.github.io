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