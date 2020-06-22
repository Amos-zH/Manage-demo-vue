const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// dll文件存放的目录
const dllPath = 'public/vendor'

module.exports = {
    entry: {
        // 需要提取的库文件
        vendor: ['vue-router', 'vuex', 'axios', 'element-ui', 'mockjs', 'vee-validate']
    },
    output: {
        path: path.join(__dirname, dllPath),
        filename: '[name].dll.js',
        // vendor.dll.js中暴露出的全局变量名
        // 保持与 webpack.DllPlugin 中名称一致
        library: '[name]_[hash]'
    },
    optimization:{
        minimizer:[
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        reduce_vars: true, // 把使用多次的静态值自动定义为变量
                        drop_console: true, // 删除所有的console语句
                        pure_funcs: ["console.log"] //移除consol
                    },
                    output: {
                        // 不保留注释
                        comments: false,
                        // 使输出的代码尽可能紧凑
                        beautify: false
                    }
                },
                sourceMap: false,
                parallel: true, // 允许并发
                cache: true // 开启缓存
            })
        ]
    },
    plugins: [
        // 清除之前的dll文件
        new CleanWebpackPlugin(['*.*'], {
            root: path.join(__dirname, dllPath)
        }),
        // 设置环境变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),
        // manifest.json 描述动态链接库包含了哪些内容
        new webpack.DllPlugin({
            path: path.join(__dirname, dllPath, '[name]-manifest.json'),
            // 保持与 output.library 中名称一致
            name: '[name]_[hash]',
            // context需要和 vue.config.js保持一致
            context: process.cwd()
        })
    ]
}