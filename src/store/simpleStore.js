// 简单的状态管理器
const simpleStore = {
    state: {
        token: '',
        userInfo: {
            name: '',
            sex: 1
        }
    },
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
        this.state.userInfo = { ...obj }
        this.setStateToStorage('userInfo', this.state.userInfo)
    },
    // 获取用户信息
    getUserInfo () {
        return window.sessionStorage.getItem('userInfo')
    },
    // 清除用户信息
    clearUserInfo () {
        this.state.userInfo.userName = ''
        this.state.userInfo.sex = 1
        this.removeLocalStorage('userInfo')
    },
    // 初始化state
    initState (obj) {
        this.state.userInfo = obj
    }
}
// 先取本地缓存
if (window.sessionStorage.getItem('userInfo')) {
    simpleStore.initState(JSON.parse(window.sessionStorage.getItem('userInfo')))
}

export default simpleStore
