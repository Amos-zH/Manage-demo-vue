import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { getToken } from '@utils/auth'

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
  routes
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
        // console.log('如果没有用户信息，获取用户信息和菜单')
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
