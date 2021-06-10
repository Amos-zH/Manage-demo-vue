<template>
  <div>
    <el-button type="primary" @click="test">主要按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    test () {
      const params = {
        str: false,
        num: 0,
        sa: []
      }
      this.$apis.getPieChart(params).then((res) => {
        if (res.code === '000') {
          console.log(res.data)
        }
      })
    }
  }
}
</script>
