import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from './utils/auth'

Vue.use(Router)
Vue.prototype.__cancels__ = [] // 取消请求数组

// 解决多次点击同一个路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: 'home'
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
                    title: '首页'
                }
            }, {
                path: '/document',
                name: 'document',
                component: () => import(/* webpackChunkName: "document" */ '@/views/document/index'),
                meta: {
                    title: '文档'
                }
            }, {
                path: '/icon',
                name: 'icon',
                component: () => import(/* webpackChunkName: "icon" */ '@/views/icon/index'),
                meta: {
                    title: '图标'
                }
            }, {
                path: '/richText',
                name: 'richText',
                component: () => import(/* webpackChunkName: "richText" */ '@/views/richText/index'),
                meta: {
                    title: '富文本'
                }
            }, {
                path: '/markdown',
                name: 'markdown',
                component: () => import(/* webpackChunkName: "markdown" */ '@/views/markdown/index'),
                meta: {
                    title: 'Markdown'
                }
            }, {
                path: '/upload',
                name: 'upload',
                component: () => import(/* webpackChunkName: "upload" */ '@/views/upload/index'),
                meta: {
                    title: '上传'
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

router.beforeEach((to, from, next) => {
    // 当路由切换页面的时候，遍历全局数组，将上一个页面的所有请求cancel掉
    Vue.prototype.__cancels__.forEach((cancel) => {
        cancel && cancel()
    })
    Vue.prototype.__cancels__ = []
    // 路由跳转时，判断是否有token，没有就重新登录
    const hasToken = getToken()
    if (hasToken) {
        // 有token，
        if (to.path === '/login') {
            // 跳转登录页的话，重定向到首页
            next({ path: '/' })
        } else {
            // 跳转其他页的话，判断是否有用户信息
            next()
            if (!window.sessionStorage.getItem('userInfo')) {
                console.log('如果没有用户信息，获取用户信息和菜单')
            }
        }
    } else {
        // 没有token，跳转登录页
        if (to.path === '/login') {
            next()
        } else {
            next({ path: '/login' })
        }
    }
})

export default router
