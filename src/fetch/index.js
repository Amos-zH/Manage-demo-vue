import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import baseurl from './baseurl'

const instance = axios.create({
    // `baseURL` 将自动加在 `url` 前面
    baseURL: baseurl,
    // 设置超时时间 -10秒
    timeout: 10000,
    // 请求头部信息
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return qs.stringify(data)
    }],

    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        return data
    }],

    // `withCredentials` 表示跨域请求时是否需要使用凭证（cookie）
    withCredentials: false, // 默认的

    // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // 默认的

    // `onUploadProgress` 允许为上传处理进度事件
    onUploadProgress: function (progressEvent) {
        // 对原生进度事件的处理
    },

    // `onDownloadProgress` 允许为下载处理进度事件
    onDownloadProgress: function (progressEvent) {
        // 对原生进度事件的处理
    },

    // `maxContentLength` 定义允许的响应内容的最大尺寸
    maxContentLength: 2000
})

const CancelToken = axios.CancelToken
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    // 在请求拦截器中为每一个请求添加cancelToken，并将cancel方法存入全局数组中保存
    config.cancelToken = new CancelToken((c) => {
        Vue.prototype.__cancels__.push(c)
    })

    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data
}, function (error) {
    // 对响应错误做点什么

    if (axios.isCancel(error)) {
        // 为了终结promise链 就是实际请求 不会走到.catch(rej=>{});这样就不会触发错误提示之类了。
        return new Promise(() => {})
    } else {
        return Promise.reject(error)
    }
})

export default instance
