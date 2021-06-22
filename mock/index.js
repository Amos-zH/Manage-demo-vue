const express = require('express') // 使用Express中间件body-parser来解析请求体（body-parser已被弃用，直接用express解析即可）
const chokidar = require('chokidar') // 文件夹监控
const path = require('path')

const mockDir = path.join(process.cwd(), 'mock') // 获取文件夹路劲

function registerRoutes (app) {
  let mockLastIndex

  const baseMock = require('./base')
  const chartMock = require('./chart')
  const mocks = [
    ...baseMock,
    ...chartMock
  ]
  for (const mock of mocks) {
    app[mock.type](mock.url, mock.res) // 在express中注册路由
    mockLastIndex = app._router.stack.length // 获取所有已注册路由的长度
  }

  const mockRoutesLength = Object.keys(mocks).length // 获取所有mock数据的长度
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}
// nodejs清除require缓存 参考：https://blog.hellozwh.com/?post=433
function unregisterRoutes () {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)] // require.resolve 相当于把相对路径转化成绝对路径，避免了自己手写的绝对路径跟cache里的key不一致的问题
    }
  })
}

module.exports = app => {
  // 解析 application/json
  app.use(express.json())
  // 解析 application/x-www-form-urlencoded
  app.use(express.urlencoded({
    extended: true
  }))

  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex

  chokidar.watch(mockDir, { // 监控当前目录
    ignored: /index/, // 忽略index.js文件的变更
    ignoreInitial: true // 忽略对增加文件或者增加文件夹而触发事件
  }).on('all', (event, path) => { // 监听除了ready, raw, and error之外所有的事件类型
    if (event === 'change' || event === 'add') { // 文件内容改变或新增文件时触发
      try {
        // 删除已经挂载到express的路由
        app._router.stack.splice(mockStartIndex, mockRoutesLength)

        // clear routes cache
        unregisterRoutes()

        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log('请求更新！')
      } catch (error) {
        console.log('请求更新出错：', error)
      }
    }
  })
}
