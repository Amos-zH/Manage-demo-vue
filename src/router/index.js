import Vue from 'vue'
import Router from 'vue-router'
import defaultRoutes from './defaultRoutes'

Vue.use(Router)
Vue.prototype.__cancels__ = [] // 取消请求数组

// 解决多次点击同一个路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes: defaultRoutes
})

export default router
