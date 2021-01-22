import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' // 引入vuex
import './assets/less/theme/index.css' // 主题配色
import ElementUI from 'element-ui'
import './assets/less/index.less'
import '@/assets/svgIcons' // svg icon文件
import './plugins/veeValidate' // 引入vee-validate验证
// import 'element-ui/lib/theme-chalk/index.css'
import api from './api' // 引入接口
import './router/routePermission'

Vue.config.productionTip = false // 阻止 vue 在启动时生成生产提示

// 引入element-ui，并全局配置
Vue.use(ElementUI, { size: 'small' })

// vue原型挂载 - 请求接口函数
Vue.prototype.$apis = api

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
