<template>
    <div class="login">
        <div class="login-box">
            <p class="login-title">系统登录</p>
            <el-input
                v-model="account"
                class="login-account"
                placeholder="账号"
                size="medium"
                prefix-icon="el-icon-user-solid"
                autofocus
            />
            <el-input
                v-model="pwd"
                class="login-pwd"
                placeholder="密码"
                size="medium"
                type="password"
                show-password
                prefix-icon="el-icon-lock"
            />
            <el-button class="login-btn" type="primary">登录</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'welcome',
    data () {
        return {
            account: '',
            pwd: ''
        }
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
@import './login.less';
</style>
