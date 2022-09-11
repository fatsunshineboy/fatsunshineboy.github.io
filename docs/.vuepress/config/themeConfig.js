const nav = require("./navConfig");
const sidebar = require("./sidebar")

module.exports = {
  logo: "/sun.png",
  nav,
  // 禁用导航栏
  // navbar: false,
  // 设置自动生成侧边栏
  sidebar,
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
  editLinkText: "编辑此页"
};
