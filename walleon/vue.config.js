module.exports = {
  publicPath: "./",
  outputDir: "./build/public/",
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-svg-inline-loader")
      .loader("vue-svg-inline-loader")
      .options({
        /* ... */
      });
  },
  pwa: {
    name: "Walleon",
    themeColor: "#000000",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent"
  }
};
