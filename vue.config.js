module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/'
        : '/',
    // 构建文件的目录
    outputDir: 'dist',
    // 生成静态资源的目录
    assetsDir: 'static',
    // 生成的静态资源是否包含hash值
    filenameHashing: true,

    // When building in multi-pages mode, the webpack config will contain different plugins
    // (there will be multiple instances of html-webpack-plugin and preload-webpack-plugin).
    // Make sure to run vue inspect if you are trying to modify the options for those plugins.
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '首页',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        // subpage: ''
    },

    // eslint-loader 是否在保存的时候检查
    lintOnSave: process.env.NODE_ENV !== 'production',

    // 是否使用包含运行时编译器的Vue核心的构建
    runtimeCompiler: false,

    // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
    transpileDependencies: [],

    // 生产环境 sourceMap
    productionSourceMap: false,

    // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
    // corsUseCredentials: false,
    // webpack 配置，键值对象时会合并配置，为方法时会改写配置
    // https://cli.vuejs.org/guide/webpack.html#simple-configuration
    configureWebpack: (config) => {
        // 简单/基础配置，比如引入一个新插件
    },

    // webpack 链接 API，用于生成和修改 webapck 配置
    // https://github.com/mozilla-neutrino/webpack-chain
    chainWebpack: (config) => {
        // 链式配置
        // 因为是多页面，所以取消 chunks，每个页面只对应一个单独的 JS / CSS
        config.optimization
            .splitChunks({
                cacheGroups: {}
            })

        // 'src/assets' 目录下为外部库文件，不参与 eslint 检测
        config.module
            .rule('eslint')
            .exclude
            .add('/Users/mac/zh/workSpace/Manage-demo-vue/src/assets')
            .end()

        config.module
            .rule('images')
            .test(/\.(png|jpe?g|JPG|gif|webp)(\?.*)?$/)
    },

    // 配置高于chainWebpack中关于 css loader 的配置
    css: {
        // 是否开启支持 foo.module.css 样式
        modules: false,

        // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
        extract: true,

        // 是否构建样式地图，false 将提高构建速度
        sourceMap: false,

        // css预设器配置项
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
            },

            postcss: {
                // 这里的选项会传递给 postcss-loader
            }
        }
    },

    // All options for webpack-dev-server are supported
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        // 配置自动启动浏览器
        open: true,
        // 主机名
        host: 'localhost',
        // 端口号
        port: 3000,
        // 支持https，使用自签名证书
        https: false,
        // 模块热替换
        hot: true,
        // 热更新会刷新页面
        hotOnly: false,
        // 当出现编译器错误或警告时，在浏览器中显示
        overlay: {
            warnings: true,
            errors: true
        },
        // 跨域代理
        // proxy: {
            // 只有碰到/api的才会执行代理
            // '/api': {
            //     target: 'http://common.dm.com', // 要访问的跨域的域名
            //     ws: true, // 是否启用websockets
            //     changeOrigin: true // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
            //     // pathRewrite: {
            //     //     '^/api': ''
            //     // }
            // },
            // '/web': {
            //     target: 'http://localhost:3001',
            //     ws: false,
            //     changeOrigin: true
            // }
        // },
        proxy: '',
        // 在服务器内部的所有其他中间件之前执行定制中间件
        before: require('./mock/index.js'),
        // 在服务器内部的所有其他中间件之后执行定制中间件
        // after: app => {}
    },
    // 构建时开启多进程处理 babel 编译
    parallel: require('os').cpus().length > 1,

    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},

    // 第三方插件配置
    pluginOptions: {}
}
