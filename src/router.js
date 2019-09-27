import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 解决多次点击同一个路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: 'welcome'
        }, {
            path: '/welcome',
            name: 'welcome',
            // route level code-splitting
            // this generates a separate chunk (welcome.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "welcome" */ '@/views/welcome/index')
        }, {
            path: '*',
            name: '404',
            component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/index')
        }, {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/views/login/index'], resolve)
        }, {
            path: '/layout',
            name: 'layout',
            component: () => import(/* webpackChunkName: "layout" */ '@/views/layout/index'),
            children: [{
                path: '/home',
                name: 'home',
                component: () => import(/* webpackChunkName: "home" */ '@/views/home/index'),
                meta: {
                    title: '主页'
                }
            }, {
                path: '/chart',
                name: 'chart',
                component: () => import(/* webpackChunkName: "chart" */ '@/views/chart/index'),
                meta: {
                    title: '图表'
                }
            }, {
                path: '/test',
                name: 'test',
                component: () => import(/* webpackChunkName: "test" */ '@/views/test/index'),
                meta: {
                    title: '测试'
                }
            }]
        }
    ]
})
