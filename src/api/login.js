import request from '@/fetch'

const loginApi = {
    loginPost: data => {
        return request({
            url: '/api/loginPost',
            method: 'post',
            data
        })
    },
    loginGet: params => {
        return request({
            url: '/api/loginGet',
            method: 'get',
            params: params
        })
    },
    loginTest: data => {
        return request({
            url: '/api/loginTest',
            method: 'post',
            data
        })
    },
    listOsTypeCommon: data => {
        return request({
            url: '/web/game/listOsTypeCommon',
            method: 'post',
            data
        })
    },
    getSignTypeAndUrl: data => {
        return request({
            url: '/api/game/getSignTypeAndUrl',
            method: 'post',
            data
        })
    },
    check: data => {
        return request({
            url: '/api/health/check',
            method: 'post',
            data
        })
    }
}

export default loginApi

// export function login (data) {
//     return request({
//         url: '/test',
//         method: 'post',
//         data
//     })
// }

// export function listOsTypeCommon (data) {
//     return request({
//         url: '/web/game/listOsTypeCommon',
//         method: 'post',
//         data
//     })
// }

// export function getSignTypeAndUrl (data) {
//     return request({
//         url: '/api/game/getSignTypeAndUrl',
//         method: 'post',
//         data
//     })
// }

// export function check (data) {
//     return request({
//         url: '/api/health/check',
//         method: 'post',
//         data
//     })
// }
