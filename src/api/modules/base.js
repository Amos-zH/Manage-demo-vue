import request from '../fetch'

const baseApi = {
    // 登录
    login: data => {
        return request({
            url: '/api/login',
            method: 'post',
            data
        })
    },
    // 获取菜单
    getMenus: params => {
        return request({
            url: '/api/getMenus',
            method: 'get',
            params: params
        })
    },
    // 获取用户信息
    getUserInfo: data => {
        return request({
            url: '/api/getUserInfo',
            method: 'post',
            data
        })
    },
    // 修改密码
    changePwd: data => {
        return request({
            url: '/api/changePwd',
            method: 'post',
            data
        })
    }
}

export default baseApi
