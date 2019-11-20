// 简单的状态管理器
const simpleStore = {
    // 设置数据到本地sessionStorage
    setStateToStorage (str, obj) {
        window.sessionStorage.setItem(str, JSON.stringify(obj))
    },
    // 清除sessionStorage
    removeLocalStorage (str) {
        window.sessionStorage.removeItem(str)
    },
    // 设置用户信息
    setUserInfo (obj) {
        this.setStateToStorage('userInfo', this.state.userInfo)
    },
    // 获取用户信息
    getUserInfo () {
        return window.sessionStorage.getItem('userInfo')
    },
    // 清除用户信息
    clearUserInfo () {
        this.removeLocalStorage('userInfo')
    }
}

export default simpleStore
