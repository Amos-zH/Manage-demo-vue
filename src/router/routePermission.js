import Vue from 'vue'
import router from './index'
import store from '@/store'
import { getToken, removeToken } from '@utils/auth'

const whiteList = ['/login'] // 无需令牌白名单

router.beforeEach(async (to, from, next) => {
    // 当路由切换页面的时候，遍历全局数组，将上一个页面的所有请求cancel掉
    Vue.prototype.__cancels__.forEach((cancel) => {
        cancel && cancel()
    })
    Vue.prototype.__cancels__ = []

    // // 获取令牌判断用户是否登录
    // const hasToken = localStorage.getItem('token')
    // 路由跳转时，判断是否有token，没有就重新登录
    const hasToken = getToken()
    // 已登录
    debugger
    if (hasToken) {
        if (to.path === '/login') {
            // 跳转登录页的话，重定向到首页
            next('/')
        } else {
            // 跳转其他页的话，判断是否有用户信息
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                // 说明用户已获取过角色信息，放行
                next()
            } else {
                try {
                    // 先请求获取用户信息
                    const { roles } = await store.dispatch('user/getUserInfo')
                    // 根据当前用户角色过滤出可访问路由
                    const accessRoutes = await store.dispatch('route/generateRoutes', roles)
                    // 添加至路由器
                    console.log(router)
                    router.addRoutes(accessRoutes)
                    console.log('after：', router)
                    // 继续路由切换，确保addRoutes完成
                    next({ ...to, replace: true })
                } catch (error) {
                    // 出错需重置令牌并重新登录（令牌过期、网络错误等原因）
                    // await store.dispatch('user/resetToken')
                    removeToken()
                    next(`/login?redirect=${to.path}`)
                    alert(error || '未知错误')
                }
            }
        }
    } else {
        // 未登录
        if (whiteList.indexOf(to.path) !== -1) {
            // 白名单中路由放过
            next()
        } else {
            // 重定向至登录页
            next(`/login?redirect=${to.path}`)
        }
    }
})
