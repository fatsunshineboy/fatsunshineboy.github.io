## ssh: connect to host github.com port 22: Connection refused
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

## git init 后调用 git branch 无反应
git的分支必须指向一个commit，没有任何commit就没有任何分支。提交第一个commit后git自动创建master分支

## git初始化远程仓库，分支名字不同
创建一个仓库，添加README.md和license  
GitHub会默认把main作为默认的branch  
![GitHub会默认把main作为默认的branch ](/imgs/record/git_problem/git_main.png)

### 本地新建仓库  
`git init` 初始化
执行 `git remote add origin <远程仓库名>` 与远程仓库建立连接  
`git add .`  
`git commit -m "first commit"`  
::: tip
单引号可能会报错
:::
Github为我们创建的默认分支是main，push到这个分支  
执行`git push origin main`报错  
```
error: src refspec main does not match any
error: failed to push some refs to 'https://github.com/fatsunshineboy/test.git'
```

### 问题原因
> git初始化创建的分支是master，而github的默认分支是main

### 分支命名冲突解决方法
将本地分支改名为`main`  
`git branch -m master main`  
此时执行`git push origin main`又会报错
```
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/fatsunshineboy/test.git'
```
原因
> 在github仓库的main分支中有这两个文件，而在我们本地的仓库并没有这两个文件，如果我们执行这次commit，那么可能导致这两个文件丢失。

### 提交失败解决方法
1. `git push origin main --force`
:::warning
注意，这会导致远程仓库的此分支被覆盖
[git reset回退版本](https://www.runoob.com/git/git-reset.html)  
使用一次force之后，后面就不用了
:::

2. `git fetch origin` 获取初始提交  
` git rebase origin/mian`   
[git rebase](https://www.yiibai.com/git/git_rebase.html)
```
Current branch main is up to date.
```
`git push example main`  

3. `git fetch origin`  
`git merge origin/main`
```
Already up to date.
```
`git push example main`

:tada::tada::tada:

## 每次git push origin master 时都需要输入用户名和密码
```bash
#因为配置的时候使用的是https协议，所以每次都需要输入.。可以通过两种方式免密
# 第一种方式。改成 ssh 方式
git remote -v  查看远程连接
git remote rm origin  删除远程连接
git remote add origin git@github.com:yourName/repositoryname.git

# 第二种方式。通过配置设置 https 免密码输入
git config --global credential.helper osxkeychain
```