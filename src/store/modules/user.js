import { SET_USER_INFO } from '../mutation-types'
import baseApi from '@/api/base'

const user = {
    namespaced: true,
    state: {
        userInfo: {}
    },
    getters: {},
    mutations: {
        [SET_USER_INFO] (state, v) {
            const obj = state
            obj.userInfo = { ...v }
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
