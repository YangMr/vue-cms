/**
 * @author YangLing
 * @date 2022/7/11 09:29
 */
module.exports = {
  publicPath: './',
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_CROSS_ORIGIN,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/common.scss";'
      }
    }
  }
}
