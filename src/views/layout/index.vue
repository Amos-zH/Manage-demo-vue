<template>
    <el-container class="layout">
        <!-- 头部内容 -->
        <el-header class="header">
            <span class="header-title">管理系统</span>
            <el-dropdown class="header-info" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img src="" alt="">
                    <span class="header-username">{{ userInfo.name }}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-plus" command="a">修改密码</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-circle-plus" command="b">登出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-container>
            <!-- 侧边菜单 -->
            <el-aside width="200px" class="aside">
                <el-menu
                    :unique-opened="true"
                    :router="true"
                    :default-active="activeMenu"
                    text-color="#fff"
                    active-text-color="#ff9234"
                    background-color="#304156"
                    @select="changeMenu"
                    >
                    <template v-for="item in menus">
                        <el-submenu v-if="item.subMenu && item.subMenu.length > 0" :key="item.menuId" :index="item.menuPath">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span slot="title">{{ item.menuName }}</span>
                            </template>
                            <el-menu-item v-for="childItem in item.subMenu" :key="childItem.menuId" :index="childItem.menuPath">
                                {{ childItem.menuName }}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :key="item.menuId" :index="item.menuPath">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.menuName }}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
            </el-aside>
            <!-- 主体内容 -->
            <el-main class="main">
                <el-tabs
                    v-model="activeTab"
                    type="card"
                    @tab-click="tabClick"
                    @tab-remove="removeTab"
                    >
                    <el-tab-pane
                        v-for="(item) in tabList"
                        :key="item.name"
                        :label="item.title"
                        :name="item.name"
                        :closable="item.closable"
                        >
                        <keep-alive>
                            <router-view :key="key" />
                        </keep-alive>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    name: 'layout',
    created () {
        this.initMenu()
        this.getUserInfo()
    },
    data () {
        return {
            userInfo: {
                name: 'admin',
                sex: 1
            },
            // menus
            menus: [],
            activeMenu: this.$route.name,
            // tabs
            activeTab: 'home',
            tabList: [{
                title: '主页',
                name: 'home',
                closable: false
            }]
        }
    },
    computed: {
        key () {
            return this.$route.path
        }
    },
    // 刷新页面后能保持当前标签页的状态
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // 通过 `vm` 访问组件实例, 不能使用this
            let obj = vm.tabList.find((item) => {
                return item.name === to.name
            })
            if (!obj) {
                vm.tabList.push({
                    title: to.meta.title,
                    name: to.name,
                    closable: true
                })
                vm.activeTab = to.name
            } else {
                vm.activeTab = obj.name
            }
        })
    },
    methods: {
        // 个人信息下拉按钮
        handleCommand (command) {
            this.$message('click on item ' + command)
        },
        // 获取菜单
        initMenu () {
            this.$apis.getMenus().then(res => {
                if (res.code === '000') {
                    this.menus = res.data
                } else {
                    this.$message.error(res.message)
                }
            }).catch(error => {
                this.$message.error(error.message)
            })
        },
        // 获取用户信息
        getUserInfo () {
            this.$store.dispatch('user/getUserInfo').then(res => {
                this.userInfo = res
            }).catch(error => {
                console.log('获取用户信息出错: ', error)
            })
        },
        // 菜单切换
        changeMenu (menu, a, b) {
            this.activeMenu = menu
            let obj = this.tabList.find((item) => {
                return item.name === menu
            })
            if (!obj) {
                this.tabList.push({
                    title: b.$el.innerText,
                    name: menu,
                    closable: true
                })
                this.activeTab = menu
            } else {
                this.activeTab = obj.name
            }
        },
        // tab栏切换
        tabClick (tabObj) {
            this.activeMenu = tabObj.name
            this.$router.push(tabObj.name)
        },
        // tab栏移除
        removeTab (tabName) {
            let tabs = this.tabList
            let activeName = this.activeTab
            // 获取删除后接下来要跳转的tab
            if (activeName === tabName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === tabName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1]
                        if (nextTab) {
                            activeName = nextTab.name
                        }
                    }
                })
            }
            this.activeMenu = activeName // 菜单切换
            this.$router.push(activeName) // 路由跳转
            this.activeTab = activeName // tab切换
            this.tabList = tabs.filter(tab => tab.name !== tabName) // 重置tab栏
        }
    }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
