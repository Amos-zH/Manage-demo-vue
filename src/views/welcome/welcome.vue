<template>
    <div class="welcome">
        <el-button type="primary" @click.once="enter('hello', $event)">主要按钮</el-button>
        <div>
            <router-link to="/login">Go to Login</router-link>
        </div>
        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script>
export default {
    name: 'welcome',
    data () {
        return {
            fileList: []
        }
    },
    methods: {
        enter (msg, event) {
            console.log('msg: ', msg)
            console.log('event: ', event)
        },
        handleRemove (file, fileList) {
            console.log(file, fileList)
        },
        handleSuccess (file, fileList) {
            console.log(file, fileList)
        },
        handlePreview (file) {
            console.log(file)
        },
        handleExceed (files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了${files.length} 个文件，共选择了${files.length + fileList.length} 个文件`)
        },
        beforeRemove (file, fileList) {
            return this.$confirm(`确定移除${file.name}？`)
        },
        beforeUpload (file) {
            const AppInfoParser = require('app-info-parser')
            const parser = new AppInfoParser(file)
            parser.parse().then(result => {
                console.log('app info ----> ', result)
                console.log('icon base64 ----> ', result.icon)
            }).catch(err => {
                console.log('err ----> ', err)
            })
            return false
        }
    }
}
</script>
