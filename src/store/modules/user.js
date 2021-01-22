import { SET_USER_INFO, REMOVE_USER_INFO } from '../mutation-types'
import baseApi from '@/api/modules/base'

const user = {
    namespaced: true,
    state: {
        userInfo: {}, // 用户信息
        roles: [] // 用户的角色信息，用于路由权限控制
    },
    getters: {
        roles: state => state.roles,
        hasRoles: state => state.roles && state.roles.length > 0
    },
    mutations: {
        [SET_USER_INFO] (state, v) {
            const obj = state
            obj.userInfo = { ...v }
        },
        [REMOVE_USER_INFO] (state) {
            const obj = state
            obj.userInfo = {}
        },
        setRoles: (state, roles) => {
            state.roles = roles
        }
    },
    actions: {
        getUserInfo ({ commit, rootGetters }) {
            const { getToken } = rootGetters
            return new Promise((resolve, reject) => {
                baseApi.getUserInfo({ token: getToken }).then(response => {
                    if (response.code === '000') {
                        const { data } = response
                        commit('SET_USER_INFO', data)
                        commit('setRoles', data.roles)
                        resolve(data)
                    } else {
                        reject(response.message)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}

export default user
