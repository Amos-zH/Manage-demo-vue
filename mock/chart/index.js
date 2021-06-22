const chartMock = [
  {
    type: "post",
    url: "/web/getPieChart",
    res: function (req, res, next) {
      console.log(req.body)
      res.json(require('./getPieChart.json'))
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
