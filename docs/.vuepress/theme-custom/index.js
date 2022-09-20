const { path } = require("@vuepress/utils");

module.exports = {
  plugins: [
    [
      "@vuepress/search",
      {
        searchMaxSuggestions: 10,
      },
    ],
    ["@vuepress/last-updated"],
  ]
};
