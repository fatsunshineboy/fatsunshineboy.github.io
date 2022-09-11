// 顶部导航栏
module.exports = [
  // 直接跳转，'/'为不添加路由，跳转至首页，以/结尾的最终对应的都是/index.html,也就是README.md文件编译后的页面
  { text: "博客", link: "/blog/" },
  // 对应blog/fontend/README.md
  //   { text: "blog", link: "/blog/" },
  {
    text: "前端",
    items: [
      {
        text: "笔记",
        link: "/front/front_learn/JavaScript_Learn.md",
      },
      {
        text: "项目",
        link: "/front/front_project/Snake.md",
      },
    ],
  },
  { text: "后端", link: "/back/" },
  { text: "杂记", link: "/record/" },
  // { text: '后端', link: '/blog/backend/' },
  // 对应/guide/guide.md
  // { text: '导航', link: '/guide/guide' },
];
