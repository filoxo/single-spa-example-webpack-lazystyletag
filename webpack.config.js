const singleSpaDefaults = require("webpack-config-single-spa-react");
const { mergeWithRules } = require("webpack-merge");

const mergeRulesByTestMatch = mergeWithRules({
  module: {
    rules: {
      test: "match",
      include: "replace",
      exclude: "replace",
      use: {
        loader: "match",
        options: "replace",
      },
    },
  },
});

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "example",
    projectName: "lazy-style",
    webpackConfigEnv,
  });

  const config = mergeRulesByTestMatch(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    module: {
      rules: [
        {
          test: /\.css$/i,
          include: undefined,
          exclude: /\.lazy\.css$/i,
        },
        {
          test: /\.lazy\.css$/i,
          use: [
            { loader: "style-loader", options: { injectType: "lazyStyleTag" } },
            "css-loader",
          ],
        },
      ],
    },
  });

  return config;
};
