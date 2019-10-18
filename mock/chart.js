const Mock = require('mockjs')

const chartMock = [
    {
        type: "post",
        url: "/web/getPieChart",
        res: function (req, res, next) {
            console.log(req.body)
            res.json({ "data": "111111" })
        }
    },
    {
        type: "post",
        url: "/web/getLineChart",
        res: function (req, res, next) {
            console.log(req.body)
            res.json({ "data": "22222222" })
        }
    }
]

module.exports = chartMock