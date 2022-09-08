module.exports = {
  // 网站的一些基本配置
  // base:配置部署站点的基础路径
  //   base: "./",
  title: "sunBlog", // 网站的标题
  description: "fatsunshineboy的个人博客", // 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中。
  head: [
    ["link", { rel: "icon", href: "/sun.png" }], // 需要被注入到当前页面的 HTML <head> 中的标签
  ],
  // host port在本地运行就不配置了
  // permalink: "/:year/:month/:day/:slug", //永久链接
  // markdown: {
  //   lineNumbers: true//代码块的行号
  // },
  // plugins: ['@vuepress/back-to-top','@vuepress/nprogress'],
  // plugins: [[require("./demoContainer")]],
  themeConfig: {
    logo: "/sun.png",
    nav: [
      // 直接跳转，'/'为不添加路由，跳转至首页，以/结尾的最终对应的都是/index.html,也就是README.md文件编译后的页面
      { text: "Home", link: "/" },
      // 对应blog/fontend/README.md
      //   { text: "blog", link: "/blog/" },
      { text: "前端", link: "/front/" },
      { text: "后端", link: "/back/" },
      { text: "Blog", link: "/blog/" },
      { text: "杂记", link: "/record/" },
      // { text: '后端', link: '/blog/backend/' },
      // 对应/guide/guide.md
      // { text: '导航', link: '/guide/guide' },
      // 不指定深度，默认深度1-提取h2 最大深度-2，同一标题下最多提取到h3，想要改变深度可以指定sidebarDepth
    ],
    // 禁用导航栏
    // navbar: false,
    // 设置自动生成侧边栏
    sidebar: {
      "/record/": [
        "",
        {
          title: "git",
          // collapsable: true,
          children: [
            ["Git_Learn_Experience.md", "git学习经验"],
            ["Git_Difficult.md", "git疑难杂点"],
            ["Git_Problem.md", "git错误问题"],
          ],
        },
        ["Linux_Learn.md", "Linux命令学习"],
        ["Vuepress_Learn.md.md", "vuepress学习"],
      ],
    },
    // sidebar: "auto",
    //   sidebar: {
    //     //对象的默认路径
    //     '/blog/fontend/': [
    //       '', //侧边栏第一个页面是：/blog/fontend/README.md,、链接文字自动获取(页面的第一个header)，即h1(前端技术)
    //       'myhtml',  //侧边栏第二个页面是：/blog/fontend/myhtml.md,链接文字自动获取(页面的第一个header)，即h2(html 二级标题)
    //       ['myJavascript', 'js自定义的标题'] //侧边栏第三个页面是：/blog/fontend/myJavascript.md ,指定链接的文字，使用一个格式为 [link, text] 的数组。
    //     ]
    //   },
    // sidebar: [
    //   {
    //     title: "前端",
    //     collapsable: false,
    //     children: [
    //       "/front/myhtml",
    //       ["/blog/fontend/myJavascript", "js自定义的标题"],
    //     ],
    //   },
    //   {
    //     title: "后端",
    //     collapsable: true,
    //     children: ["/back/README.md"],
    //   },
    //   {
    //     title: "杂记",
    //     collapsable: true,
    //     children: ["/blog/record/README.md","/blog/record/git提交问题.md"],
    //   },
    // ],
    //   sidebarDepth: 2,
    // search: false, // 设置是否使用导航栏上的搜索框
    // searchMaxSuggestions: 10  // 搜索框显示的搜索结果数量
    lastUpdated: "上次更新", // string | boolean
  },
};
