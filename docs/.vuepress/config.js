const themeConfig = require("./config/themeConfig");
const plugins = require("./config/pluginConfig");

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
  plugins,
  themeConfig,
};
