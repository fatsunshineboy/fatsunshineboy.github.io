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
  plugins: [[require("./plugins/sideAnchor")], ["@vuepress/medium-zoom"]],
  // plugins: [[require("./demoContainer")]],
  themeConfig: {
    logo: "/sun.png",
    nav: [
      // 直接跳转，'/'为不添加路由，跳转至首页，以/结尾的最终对应的都是/index.html,也就是README.md文件编译后的页面
      { text: "Home", link: "/" },
      // 对应blog/fontend/README.md
      //   { text: "blog", link: "/blog/" },
      { text: "前端", link: "/front/front_learn/JavaScript_Learn.md" },
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
      "/front/": [
        {
          title: "前端学习",
          children: [
            ["./front_learn/Css_learn.md", "CSS学习笔记"],
            ["./front_learn/JavaScript_Learn.md", "JavaScript学习笔记"],
            ["./front_learn/JavScript_Attention.md", "JavaScript注意事项"],
            ["./front_learn/TypeScript.md", "TypeScript学习经验"],
            ["./front_learn/Vue_Attention.md", "Vue注意事项"],
            ["./front_learn/Vuepress_Learn_exprice.md", "Vuepress学习经验"],
          ],
        },
        {
          title: "前端项目",
          children: [["./front_project/Snake.md", "贪吃蛇"]],
        },
      ],
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
      ],
    },
    // sidebar: "auto",
    sidebarDepth: 0,
    // search: false, // 设置是否使用导航栏上的搜索框
    // searchMaxSuggestions: 10  // 搜索框显示的搜索结果数量
    lastUpdated: "上次更新", // string | boolean
    // 假定 GitHub。也可以是一个完整的 GitLab 网址
    repo: "fatsunshineboy/fatsunshineboy.github.io",
    // 如果你的文档不在仓库的根部
    docsDir: "docs",
    // 可选，默认为 master
    docsBranch: "main",
    // 默认为 true，设置为 false 来禁用
    editLinks: true,
  },
};
