const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  runtimeCompiler: true,
  assetsDir: 'static',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/assets/scss/main.scss";'
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    entry: {
      app: '@/main.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    port: 8080,
    proxy: {
      '/api/': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|ico)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
  }
}
