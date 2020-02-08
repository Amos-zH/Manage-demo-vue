const chartMock = [
    {
        type: "post",
        url: "/web/getPieChart",
        res: function (req, res, next) {
            console.log(req.body)
            res.json({
                "code": "000",
                "data": "111111",
                "message": "errorsssss"
            })
        }
    },
    {
        type: "post",
        url: "/web/getLineChart",
        res: function (req, res, next) {
            console.log(req.body)
            res.json({
                "code": "000",
                "data": "22222222"
            })
        }
    }
]

module.exports = chartMock