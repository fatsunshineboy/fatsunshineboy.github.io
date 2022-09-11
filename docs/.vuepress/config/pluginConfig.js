const path = require("path");

module.exports = [
  // 侧边栏
  [require("../plugins/sideAnchor")],
  // 图片缩放
  ["@vuepress/medium-zoom"],
  // 自动注册组件
  // [
  //   "@vuepress/plugin-register-components",
  //   {
  //     componentsDir: path.resolve(__dirname, "../components"),
  //   },
  // ],
  // 代码块复制
  //   [
  //     "vuepress-plugin-code-copy",
  //     {
  //     //   selector: String,
  //       align: "top",
  //       color: "red",
  //       backgroundTransition: true,
  //       backgroundColor: "red",
  //       successText: "复制成功",
  //     },
  //   ],
  // 代码块显示
  // [require("./demoContainer")]
];
