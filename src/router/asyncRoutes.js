// 权限页面：受保护页面，要求用户登录并拥有访问权限的角色才能访问
const asyncRoutes = [
    {
        path: '/welcome',
        name: 'welcome',
        // route level code-splitting
        // this generates a separate chunk (welcome.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "welcome" */ '@/views/welcome/index'),
        meta: {
            title: '欢迎', // 导航菜单项标题
            icon: 'welcome', // 导航菜单项图标
            roles: ['admin']
        }
    }, {
        path: '/layout',
        name: 'layout',
        component: () => import(/* webpackChunkName: "layout" */ '@/views/layout/index'),
        children: [{
            path: '/document',
            name: 'document',
            component: () => import(/* webpackChunkName: "document" */ '@/views/document/index'),
            meta: {
                title: '文档',
                icon: 'document',
                roles: ['editor']
            }
        }]
    }
]

export default asyncRoutes
