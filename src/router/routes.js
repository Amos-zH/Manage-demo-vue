const routes = [
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
        component: () => import(/* webpackChunkName: "login" */ '@/views/login/index')
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
            path: '/svgIcons',
            name: 'svgIcons',
            component: () => import(/* webpackChunkName: "svgIcons" */ '@/views/svgIcons/index'),
            meta: {
                title: 'svg图标'
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

export default routes
