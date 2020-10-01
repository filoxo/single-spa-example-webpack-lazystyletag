const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv) => {
  const config = singleSpaDefaults({
    orgName: "example",
    projectName: "lazy-style",
    webpackConfigEnv,
  });

  // TODO: find a better way to merge these configs
  // webpack-merge used to be an option but its api is now so bad that you have to manually do all this anyway
  // see https://github.com/survivejs/webpack-merge/issues/146#issuecomment-688937285
  // and https://github.com/survivejs/webpack-merge/pull/150
  // so for now these rules will be modified manually
  const cssRule = config.module.rules[2];
  delete cssRule.include;
  cssRule.exclude = /\.lazy\.css$/i;

  // Webpack style-loader lazyStyleTag
  // https://webpack.js.org/loaders/style-loader/#lazystyletag
  config.module.rules.push({
    test: /\.lazy\.css$/i,
    use: [
      { loader: "style-loader", options: { injectType: "lazyStyleTag" } },
      "css-loader",
    ],
  });

  return config;
};
