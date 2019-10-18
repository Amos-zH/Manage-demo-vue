const Mock = require('mockjs')

const loginMock = [
    {
        type: 'post',
        url: '/api/loginPost',
        res: function (req, res, next) {
            console.log(req.body)
            res.json({ "data": "post" })
        }
    },
    {
        type: 'get',
        url: '/api/loginGet',
        res: function (req, res, next) {
            console.log(req.query)
            res.json({ "data": "get" })
        }
    },
    {
        type: 'post',
        url: '/api/loginTest',
        res: function (req, res, next) {
            console.log(req.body)
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
    }
]

module.exports = loginMock
// const loginPost = {
//     type: 'post',
//     url: '/api/loginPost',
//     res: function (req, res, next) {
//         console.log(req.body)
//         res.json({ "data": "post" })
//     }
// }

// const loginGet = {
//     type: 'get',
//     url: '/api/loginGet',
//     res: function (req, res, next) {
//         console.log(req.query)
//         res.json({ "data": "get" })
//     }
// }

// const loginTest = {
//     type: 'post',
//     url: '/api/loginGet',
//     res: function (req, res, next) {
//         console.log(req.body)
//         res.json(Mock.mock({
//             'status': 200,
//             'data|1-9':[{
//                 'key|+1': 1,
//                 'mockTitle|1':['肆无忌惮'],
//                 'mockContent|1': ['角色精湛主题略荒诞', '理由太短 是让人不安', '疑信参半 却无比期盼', '你的惯犯 圆满', '别让纠缠 显得 孤单'],
//                 'mockAction|1': ['下载', '试听', '喜欢']
//             }]
//         }))
//     }
// }

// const loginMocks = [loginPost, loginGet, loginTest]
// export default loginMocks