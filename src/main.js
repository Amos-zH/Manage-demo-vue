import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './libs/vee-validate' // 引入vee-validate验证
import store from './store' // 引入vuex
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import apis from './api' // 引入接口

Vue.config.productionTip = false // 阻止 vue 在启动时生成生产提示

// 引入element-ui，并全局配置
Vue.use(ElementUI, { size: 'small' })

// vue原型挂载 - 请求接口函数
Vue.prototype.$apis = apis

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
