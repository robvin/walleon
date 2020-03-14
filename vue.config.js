module.exports = {
  publicPath: process.env.VUE_PUBLIC_PATH ? process.env.VUE_PUBLIC_PATH : '',
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-svg-inline-loader')
      .loader('vue-svg-inline-loader')
      .options({
        /* ... */
      });
  },
};
