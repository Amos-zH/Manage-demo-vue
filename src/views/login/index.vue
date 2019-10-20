<template>
    <div class="login">
        <div class="login-box">
            <p class="login-title">系统登录</p>
            <ValidationObserver v-slot="{ passes }" tag="form">
                <ValidationProvider name="账号" rules="required|alpha_num" v-slot="{ errors, classes }" tag="div" class="form-item">
                    <el-input
                        v-model="account"
                        placeholder="账号"
                        :class="classes"
                        size="medium"
                        autofocus
                        clearable
                        prefix-icon="el-icon-user-solid"
                    />
                    <pre :class="classes">{{ errors[0] }}</pre>
                </ValidationProvider>
                <ValidationProvider name="密码" rules="required|alpha_num|min:6|max:6" v-slot="{ errors, classes }" tag="div" class="form-item">
                    <el-input
                        v-model="pwd"
                        placeholder="6位密码"
                        :class="classes"
                        size="medium"
                        type="password"
                        show-password
                        clearable
                        prefix-icon="el-icon-lock"
                    />
                    <pre :class="classes">{{ errors[0] }}</pre>
                </ValidationProvider>
                <el-button
                    class="login-btn"
                    type="primary"
                    size="medium"
                    @click="passes(login)"
                    >
                    登录
                </el-button>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
    name: 'login',
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
        login () {
            let params = {
                gameId: 1502071341417559,
                channelId: 11
            }
            this.$apis.loginPost(params).then(res => {
                console.log('response: ', res.data)
                // this.$router.push('home')
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import './login.less';
</style>
