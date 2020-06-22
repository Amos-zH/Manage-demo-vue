<template>
    <div>
        <el-button type="primary" @click="test">主要按钮</el-button>
    </div>
</template>

<script>
export default {
    name: 'home',
    methods: {
        test () {
            const params = {
                str: '131',
                num: 11,
                sa: []
            }
            this.$apis.getPieChart(params).then((res) => {
                if (res.code === '000') {
                    console.log(res.data)
                }
            }).catch((err) => {
                console.log('err: ', err)
            })
        }
    }
}
</script>
