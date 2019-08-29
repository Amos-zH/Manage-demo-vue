import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false // 阻止 vue 在启动时生成生产提示

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
