// 侧边栏
module.exports = {
  "/front/": [
    {
      title: "前端学习",
      children: [
        ["./front_learn/Css_learn.md", "CSS学习笔记"],
        ["./front_learn/Less_Learn.md", "Less学习笔记"],
        ["./front_learn/Scss_Learn.md", "Scss学习笔记"],
        ["./front_learn/JavaScript_Learn.md", "JavaScript学习笔记"],
        ["./front_learn/JavScript_Attention.md", "JavaScript注意事项"],
        ["./front_learn/AJAX_Learn.md", "AJAX学习笔记"],
        ["./front_learn/axios.md", "axios学习笔记"],
        ["./front_learn/Gulp_Learn.md", "Gulp学习笔记"],
        ["./front_learn/TypeScript.md", "TypeScript学习经验"],
        ["./front_learn/Vue_Attention.md", "Vue注意事项"],
        ["./front_learn/Vuepress_Learn_exprice.md", "Vuepress学习经验"],
        ["./front_learn/Nuxt.md", "Nuxt学习笔记"],
        ["./front_learn/DingTalk_Learn.md", "钉钉开发学习经验"],
      ],
    },
    {
      title: "前端项目",
      children: [
        ["./front_project/Snake.md", "贪吃蛇"],
        ["./front_project/upLoadImg.md", "图片上传"],
      ],
    },
  ],
  "/back/": [["Java.md", "Java"]],
  "/algorithm/": [["leetcode.md", "力扣"]],
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
};
