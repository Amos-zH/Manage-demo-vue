import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

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
            component: () => import(/* webpackChunkName: "welcome" */ '@/views/welcome')
        }, {
            path: '*',
            name: '404',
            component: () => import(/* webpackChunkName: "404" */ '@/views/404')
        }, {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/views/login'], resolve)
        }
    ]
})
