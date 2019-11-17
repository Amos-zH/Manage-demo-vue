const Mock = require('mockjs')

const baseMock = [
    {
        type: 'post',
        url: '/api/login',
        res: function (req, res, next) {
            // console.log(req.body)
            res.json({
                "code": "000",
                "data": {
                    loginStats: true,
                    token: 'token123'
                },
                "message": "success"
            })
        }
    },
    {
        type: 'get',
        url: '/api/getMenus',
        res: function (req, res, next) {
            // console.log(req.query)
            res.json({
                "code": "000",
                "data": [
                    {
                        menuId: 10,
                        menuName: '悠然见南山',
                        menuPath: 'index',
                        icon: 'el-icon-setting',
                        subMenu: [
                            {
                                menuId: 11,
                                menuName: '主页',
                                menuPath: 'home'
                            }, {
                                menuId: 12,
                                menuName: '图表',
                                menuPath: 'chart'
                            }
                        ]
                    }, {
                        menuId: 20,
                        menuName: '测试',
                        menuPath: 'test',
                        icon: 'el-icon-setting'
                    }
                ],
                "message": "success"
            })
        }
    },
    {
        type: 'post',
        url: '/api/getUserInfo',
        res: function (req, res, next) {
            res.json({
                "code": "000",
                "data": {
                    "name": "斋藤一",
                    "sex": 1,
                    "age": 18
                },
                "message": "suc"
            })
        }
    },
    {
        type: 'post',
        url: '/api/loginTest',
        res: function (req, res, next) {
            // console.log(req.body)
            res.json(Mock.mock({
                'status': 200,
                'data|1-9':[{
                    'key|+1': 1,
                    'mockTitle|1':['肆无忌惮'],
                    'mockContent|1': ['角色精湛主题略荒诞', '理由太短 是让人不安', '疑信参半 却无比期盼', '你的惯犯 圆满', '别让纠缠 显得 孤单'],
                    'mockAction|1': ['下载', '试听', '喜欢']
                }]
            }))
        }
    },
]

module.exports = baseMock
