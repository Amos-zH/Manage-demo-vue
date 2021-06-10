const express = require('express') // 引入express
const Mock = require('mockjs') // 引入mock

const app = express() // 实例化express
const os = require('os')
// 动态获取 host || 也可在package.json中配置 HOST （--host 0.0.0.0)
const arr = []
for (const key in os.networkInterfaces()) {
  os.networkInterfaces()[key].forEach((item) => {
    if (item.family === 'IPv4' && item.address.indexOf('192.168.') !== -1) {
      arr.push(item.address)
    }
  })
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use('/api/loginPost', function (req, res) {
  res.json(Mock.mock({
    status: 200,
    'data|1-9': [{
      'key|+1': 1,
      'mockTitle|1': ['肆无忌惮'],
      'mockContent|1': ['角色精湛主题略荒诞', '理由太短 是让人不安', '疑信参半 却无比期盼', '你的惯犯 圆满', '别让纠缠 显得 孤单'],
      'mockAction|1': ['下载', '试听', '喜欢']
    }]
  }))
})

const loginMock = require('./mock/login.js')
const chartMock = require('./mock/chart.js')
const mocks = [
  ...loginMock,
  ...chartMock
]

for (const mock of mocks) {
  app[mock.type](mock.url, mock.res)
}

app.listen('3001', () => {
  console.log('监听端口 3001')
})
