module.exports = {
  publicPath: "./",
  outputDir: "./build/public/",
  chainWebpack: config => {
    config.devServer.port(8081);
    config.module
      .rule("vue")
      .use("vue-svg-inline-loader")
      .loader("vue-svg-inline-loader")
      .options({
        /* ... */
      });
  }
};
