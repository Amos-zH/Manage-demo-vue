<template>
    <div class="welcome">
        <el-button type="primary" @click.once="enter('hello', $event)">主要按钮</el-button>
        <div>
            <router-link to="/login">Go to Login</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'welcome',
    data () {
        return {
        }
    },
    methods: {
        enter (msg, event) {
            console.log('msg: ', msg)
            console.log('event: ', event)
        }
    }
}
</script>
