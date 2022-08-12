(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{280:function(t,a,e){"use strict";e.r(a);var r=e(13),s=Object(r.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#git提交出现的问题"}},[t._v("git提交出现的问题")]),a("ul",[a("li",[a("a",{attrs:{href:"#本地新建仓库"}},[t._v("本地新建仓库")])])])]),a("li",[a("a",{attrs:{href:"#问题原因"}},[t._v("问题原因")])]),a("li",[a("a",{attrs:{href:"#分支命名冲突解决方法"}},[t._v("分支命名冲突解决方法")])]),a("li",[a("a",{attrs:{href:"#提交失败解决方法"}},[t._v("提交失败解决方法")])])])]),a("p"),t._v(" "),a("h2",{attrs:{id:"git提交出现的问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git提交出现的问题"}},[t._v("#")]),t._v(" git提交出现的问题")]),t._v(" "),a("p",[t._v("创建一个仓库，添加README.md和license"),a("br"),t._v("\nGitHub会默认把main作为默认的branch"),a("br"),t._v(" "),a("img",{attrs:{src:"/imgs/record/git_problem/git_main.png",alt:"GitHub会默认把main作为默认的branch "}})]),t._v(" "),a("h3",{attrs:{id:"本地新建仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#本地新建仓库"}},[t._v("#")]),t._v(" 本地新建仓库")]),t._v(" "),a("p",[a("code",[t._v("git init")]),t._v(" 初始化\n执行 "),a("code",[t._v("git remote add origin <远程仓库名>")]),t._v(" 与远程仓库建立连接"),a("br"),t._v(" "),a("code",[t._v("git add .")]),a("br"),t._v(" "),a("code",[t._v('git commit -m "first commit"')])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("单引号可能会报错")])]),t._v(" "),a("p",[t._v("Github为我们创建的默认分支是main，push到这个分支"),a("br"),t._v("\n执行"),a("code",[t._v("git push origin main")]),t._v("报错")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("error: src refspec main does not match any\nerror: failed to push some refs to 'https://github.com/fatsunshineboy/test.git'\n")])])]),a("h2",{attrs:{id:"问题原因"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#问题原因"}},[t._v("#")]),t._v(" 问题原因")]),t._v(" "),a("blockquote",[a("p",[t._v("git初始化创建的分支是master，而github的默认分支是main")])]),t._v(" "),a("h2",{attrs:{id:"分支命名冲突解决方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分支命名冲突解决方法"}},[t._v("#")]),t._v(" 分支命名冲突解决方法")]),t._v(" "),a("p",[t._v("将本地分支改名为"),a("code",[t._v("main")]),a("br"),t._v(" "),a("code",[t._v("git branch -m master main")]),a("br"),t._v("\n此时执行"),a("code",[t._v("git push origin main")]),t._v("又会报错")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v(" ! [rejected]        main -> main (fetch first)\nerror: failed to push some refs to 'https://github.com/fatsunshineboy/test.git'\n")])])]),a("p",[t._v("原因")]),t._v(" "),a("blockquote",[a("p",[t._v("在github仓库的main分支中有这两个文件，而在我们本地的仓库并没有这两个文件，如果我们执行这次commit，那么可能导致这两个文件丢失。")])]),t._v(" "),a("h2",{attrs:{id:"提交失败解决方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#提交失败解决方法"}},[t._v("#")]),t._v(" 提交失败解决方法")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("git push origin main --force")])])]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),a("p",[t._v("注意，这会导致远程仓库的此分支被覆盖\n"),a("a",{attrs:{href:"https://www.runoob.com/git/git-reset.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("git reset回退版本"),a("OutboundLink")],1),a("br"),t._v("\n使用一次force之后，后面就不用了")])]),t._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[a("code",[t._v("git fetch origin")]),t._v(" 获取初始提交"),a("br"),t._v(" "),a("code",[t._v("git rebase origin/mian")]),a("br"),t._v(" "),a("a",{attrs:{href:"https://www.yiibai.com/git/git_rebase.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("git rebase"),a("OutboundLink")],1)])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Current branch main is up to date.\n")])])]),a("p",[a("code",[t._v("git push example main")])]),t._v(" "),a("ol",{attrs:{start:"3"}},[a("li",[a("code",[t._v("git fetch origin")]),a("br"),t._v(" "),a("code",[t._v("git merge origin/main")])])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Already up to date.\n")])])]),a("p",[a("code",[t._v("git push example main")])]),t._v(" "),a("p",[t._v("🎉🎉🎉")])])}),[],!1,null,null,null);a.default=s.exports}}]);