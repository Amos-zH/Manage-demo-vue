import Vue from 'vue'
import Vuex from 'vuex'
import { SET_TOKEN, REMOVE_TOKEN } from './mutation-types'
import { getToken, setToken } from '@/utils/auth'
import baseApi from '@/api/base'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: getToken()
    },
    getters: {
        getToken: state => state.token
    },
    mutations: {
        [SET_TOKEN] (state, v) {
            const obj = state
            obj.token = v
        },
        [REMOVE_TOKEN] (state) {
            const obj = state
            obj.token = ''
        }
    },
    actions: {
        login ({ commit }, params) {
            const { account, pwd } = params
            return new Promise((resolve, reject) => {
                baseApi.login({ account: account, pwd: pwd }).then(response => {
                    if (response.code === '000') {
                        const { data } = response
                        commit('SET_TOKEN', data.token)
                        setToken(data.token)
                        resolve(data.loginStats)
                    } else {
                        reject(response.message)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        }
    },
    modules: {
        user
    }
})

if (module.hot) {
    // 使 action 和 mutation 成为可热重载模块
    module.hot.accept(['./modules/user'], () => {
        // 获取更新后的模块
        // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
        const newModuleA = require('./modules/user').default
        // 加载新模块
        store.hotUpdate({
            modules: {
                a: newModuleA
            }
        })
    })
}

export default store
