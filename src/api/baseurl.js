// 配置不同的环境访问不同的后端服务
const config = {
  // 通过跨域代理来调用接口
  localhost: {
    baseurl: '/'
  }
  // 调用easy-mock的接口
  // 'localhost': {
  //     baseurl: 'http://192.168.55.49/mock/5d9ef82a28054a086f7ffa2d/manage/'
  // }
}

const hostname = config[window.location.hostname]
let baseUrl = null
if (hostname) {
  baseUrl = hostname.baseurl
}

export default baseUrl
