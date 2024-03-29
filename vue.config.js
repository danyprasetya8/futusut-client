const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const mock = process.env.NODE_ENV !== 'production' && process.env.MOCK === 'true'

module.exports = {
  runtimeCompiler: true,
  assetsDir: 'static',
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@api-mock': mock ? resolve('src/api-mock') : resolve('src/empty'),
        'axios-mock-adapter': mock ? 'axios-mock-adapter/dist/axios-mock-adapter.min.js' : resolve('src/empty')
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
      '/.netlify/': {
        target: 'https://futusut-staging.netlify.app',
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
