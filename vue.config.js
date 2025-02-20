const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // 生产环境去除所有 console.* 调用
            },
          },
        }),
      ],
    },
  },
};