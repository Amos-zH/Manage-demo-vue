<template>
    <div class="login">
        <div class="login-box">
            <p class="login-title">系统登录</p>
            <ValidationObserver v-slot="{ errors }">
            <ValidationProvider name="账号" rules="required|noCN" v-slot="{ errors, classes }" tag="div" vid="account">
                <el-input
                    v-model="account"
                    :class="['login-account', classes]"
                    placeholder="账号"
                    size="medium"
                    autofocus
                    clearable
                    prefix-icon="el-icon-user-solid"
                />
                <!-- <pre :class="classes">{{ errors[0] }}</pre> -->
            </ValidationProvider>
            <ValidationProvider name="密码" rules="required|noCN" v-slot="{ errors, classes }" tag="div" vid="pwd">
                <el-input
                    v-model="pwd"
                    class="login-pwd"
                    placeholder="密码"
                    size="medium"
                    type="password"
                    show-password
                    clearable
                    prefix-icon="el-icon-lock"
                />
                <!-- <pre :class="classes">{{ errors[0] }}</pre> -->
            </ValidationProvider>
            <el-button class="login-btn" type="primary" size="medium">登录</el-button>
            <pre v-if="errors.account">{{ errors.account[0] }}</pre>
            <pre v-if="errors.pwd">{{ errors.pwd[0] }}</pre>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
    name: 'welcome',
    components: {
        ValidationProvider,
        ValidationObserver
    },
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
