// 跨域问题在这配置
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/jingdong',
  transpileDependencies: true,
  lintOnSave: false
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: '', // 目标路径
  //       changeOrigin: true
  //     }
  //   }
  // }
})
// module.exports({
//   transpileDependencies: true,
//   lintOnSave: false,
//   devServer: {
//     proxy: {
//       '/api': {
//         target: '', // 目标路径
//         changeOrigin: true
//       }
//     }
//   }
// })
