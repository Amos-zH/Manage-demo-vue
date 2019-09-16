import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './libs/vee-validate' // 引入vee-validate验证
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false // 阻止 vue 在启动时生成生产提示

// 引入element-ui，并全局配置
Vue.use(ElementUI, { size: 'small' })

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
