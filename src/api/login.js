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
    getGameInfo: data => {
        return request({
            url: '/web/game/getGameInfo',
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
            url: '/mock/health/check',
            method: 'post',
            data
        })
    }
}

export default loginApi
