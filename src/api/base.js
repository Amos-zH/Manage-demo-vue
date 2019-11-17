import request from '@/fetch'

const baseApi = {
    login: data => {
        return request({
            url: '/api/login',
            method: 'post',
            data
        })
    },
    getMenus: params => {
        return request({
            url: '/api/getMenus',
            method: 'get',
            params: params
        })
    },
    getUserInfo: data => {
        return request({
            url: '/api/getUserInfo',
            method: 'post',
            data
        })
    }
}

export default baseApi
