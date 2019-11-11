module.exports = app => {
    // 使用Express中间件body-parser来解析请求体
    const bodyParser = require('body-parser')
    // 解析 application/json
    app.use(bodyParser.json())
    // 解析 application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: true
    }))

    const baseMock = require('./base.js')
    const chartMock = require('./chart.js')
    const mocks = [
        ...baseMock,
        ...chartMock
    ]

    for (const mock of mocks) {
        app[mock.type](mock.url, mock.res)
    }
}