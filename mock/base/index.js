const baseMock = [
  // 登录
  {
    type: 'post',
    url: '/api/login',
    res: function (req, res, next) {
      // console.log(req.body)
      res.json(require('./login.json'))
    }
  },
  // 加载菜单
  {
    type: 'get',
    url: '/api/getMenus',
    res: function (req, res, next) {
      // console.log(req.query)
      res.json(require('./getMenus.json'))
    }
  },
  // 获取用户信息
  {
    type: 'post',
    url: '/api/getUserInfo',
    res: function (req, res, next) {
      res.json(require('./getUserInfo.json'))
    }
  },
  // 修改密码
  {
    type: 'post',
    url: '/api/changePwd',
    res: function (req, res, next) {
      res.json(require('./changePwd.json'))
    }
  },
  // 测试mock数据
  {
    type: 'post',
    url: '/api/mockTest',
    res: function (req, res, next) {
      // console.log(req.body)
      res.json(require('./mockTest'))
    }
  },
]

module.exports = baseMock
