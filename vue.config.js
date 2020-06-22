const path = require('path')
const resolve = dir => path.join(__dirname, dir)
// webpack 文档：https://webpack.docschina.org/concepts/
// const webpack = require('webpack')
// 将JavaScript或CSS资产添加到生成的HTML中
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
// Gzip压缩
const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
// 可视化打包分析
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 插件打包时间分析
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
// 压缩过程中对碎片化的冗余代码（如 console 语句、注释等）进行自动化删除
// const TerserPlugin = require('terser-webpack-plugin')
// 为模块提供中间缓存
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
// css压缩
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
// 为打包出的js文件提供 内联，preload，prefetch 功能：https://github.com/numical/script-ext-html-webpack-plugin
const ScriptExtWebpackPlugin = require('script-ext-html-webpack-plugin')
// 将css内联：https://github.com/numical/style-ext-html-webpack-plugin
// const StyleExtWebpackPlugin = require("style-ext-html-webpack-plugin")
// 引入打包文件，配置模块等功能
// const HtmlWebpackPlugin = require('html-webpack-plugin')

// 是否为生产环境
const isProduction = ['production', 'prod'].includes(process.env.NODE_ENV)
console.log('isProduction: ', isProduction)
// 本地环境是否需要使用cdn
// const devNeedCdn = false

module.exports = {
    publicPath: isProduction ? '/' : '/',
    // 构建文件的目录
    outputDir: 'dist',
    // 生成静态资源的目录
    assetsDir: 'static',
    // 生成的静态资源是否包含hash值
    filenameHashing: true,
    // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
    // 该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
    // integrity: true,

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
            title: '管理系统'
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        // subpage: ''
    },

    // eslint-loader 是否在保存的时候检查
    lintOnSave: !isProduction,

    // 是否使用包含运行时编译器的Vue核心的构建
    runtimeCompiler: false,

    // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
    transpileDependencies: [],

    // 生产环境 sourceMap，false以加速生产环境构建
    productionSourceMap: !isProduction,

    // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
    // corsUseCredentials: false,
    // webpack 配置，键值对象时会合并配置，为方法时会改写配置
    // https://cli.vuejs.org/guide/webpack.html#simple-configuration
    configureWebpack: smp.wrap({
        // 配置可以通过CMD、AMD、或者window全局方式访问，但不想 webpack 编译打包的一些包
        // externals: (isProduction || devNeedCdn) ? {
        //     vue: 'Vue',
        //     vuex: 'Vuex',
        //     'vue-router': 'VueRouter',
        //     'element-ui': 'ELEMENT',
        //     axios: 'axios'
        // } : {},
        plugins: isProduction ? [
            // 提取公用库
            // new webpack.DllReferencePlugin({
            //     context: process.cwd(),
            //     manifest: require('./config/vendor/vendor-manifest.json')
            // }),
            // // 将 dll 注入到 生成的 html 模板中
            // new AddAssetHtmlPlugin({
            //     // dll文件位置
            //     filepath: path.resolve(__dirname, './config/vendor/*.js'),
            //     // dll 引用路径
            //     publicPath: isProduction ? publicpath + subdirectoryPath + '/vendor' : subdirectoryPath + '/vendor',
            //     // dll最终输出的目录
            //     outputPath: subdirectoryPath + '/vendor'
            // })
            // Gzip压缩
            new CompressionPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: productionGzipExtensions, // 匹配文件
                threshold: 10240, // 对超过10K的数据进行压缩
                minRatio: 0.8, // 压缩比例
                deleteOriginalAssets: false // 是否删除源文件
            })
            // new BundleAnalyzerPlugin()
            // 为模块提供中间缓存，缓存路径是：node_modules/.cache/hard-source
            // new HardSourceWebpackPlugin()
        ] : [
            // 打包分析，要放在所有 plugins 最后
            // new BundleAnalyzerPlugin()
        ]
    }),

    // webpack 链接 API，用于生成和修改 webapck 配置
    // https://github.com/mozilla-neutrino/webpack-chain
    // （中文文档）https://github.com/Yatoo2018/webpack-chain/tree/zh-cmn-Hans
    chainWebpack: (config) => {
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/svgIcons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/svgIcons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
        // 默认情况下，一个 Vue CLI 应用会为所有初始化渲染需要的文件自动生成 preload 提示。
        // 这些提示会被 @vue/preload-webpack-plugin 注入，并且可以通过 chainWebpack 的 config.plugin('preload') 进行修改和删除。
        // config.plugins.delete('preload-index')

        // 默认情况下，一个 Vue CLI 应用会为所有作为 async chunk 生成的 JavaScript 文件 (通过动态 import() 按需 code splitting 的产物) 自动生成 prefetch 提示。
        // 这些提示会被 @vue/preload-webpack-plugin 注入，并且可以通过 chainWebpack 的 config.plugin('prefetch') 进行修改和删除。
        // 当 prefetch 插件被禁用时，你可以通过 webpack 的内联注释手动选定要提前获取的代码区块：import(/* webpackPrefetch: true */ './someAsyncComponent.vue')
        // Prefetch 链接将会消耗带宽，对带宽较敏感的移动端，那么你可能需要关掉 prefetch 链接并手动选择要提前获取的代码区块。
        config.plugins.delete('prefetch-index')
        // const cdn = {
        //     // 访问 https://unpkg.com/browse/element-ui@2.13.0/ 获取最新版本
        //     css: ["https://unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css"],
        //     js: [
        //         "https://unpkg.com/vue@2.6.11/dist/vue.min.js", // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
        //         "https://unpkg.com/vue-router@3.1.6/dist/vue-router.min.js",
        //         "https://unpkg.com/vuex@3.1.3/dist/vuex.min.js",
        //         "https://unpkg.com/axios@0.19.2/dist/axios.min.js",
        //         "https://unpkg.com/element-ui@2.13.0/lib/index.js"
        //     ]
        // }
        // 修复 HMR：https://webpack.docschina.org/configuration/resolve/#resolve-symlinks
        config.resolve.symlinks(true)
        // .end()
        // 添加别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@image', resolve('src/assets/image'))
            .set('@components', resolve('src/components'))
            .set('@utils', resolve('src/utils'))
            .set('@static', resolve('static'))
            .end()
        // config
        //     .when(process.env.NODE_ENV === 'development',
        //         config => config.output.filename('[name].js'),
        //         config => config.output.filename('[name].[chunkhash:8].js')
        //     )
        config
            .plugin('copy')
            .tap(args => {
                args[0][0].from = 'static'
                args[0][0].to = 'static'
                return args
            })
        // 开发环境开启 sourceMap
        config
            // sourceMap的种类：https://www.webpackjs.com/configuration/devtool/
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('cheap-module-eval-source-map')
            )

        // config
            // .plugin('html-index')
            // .tap(args => {
                // html中添加cdn，生产环境或本地需要cdn时，才注入cdn
                // if (isProduction || devNeedCdn) args[0].cdn = cdn
                // return args
            // })
            // .end()

        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .plugin('script-ext')
                        .after('html-index')
                        .use(ScriptExtWebpackPlugin, [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            // inline: /manifest\..*\.js$/,
                            // inline: ['manifest'],
                            preload: ['index', 'chunk-vendors']
                            // prefetch: ['chunk-commons', 'manifest'],
                        }])
                        .end()
                    // config
                    //     .plugin('style-ext')
                    //     .after('html-index')
                    //     .use(StyleExtWebpackPlugin, [{
                    //         filename: 'styles'
                    //     }])
                    //     .end()
                    config
                        .optimization.splitChunks({
                            // chunks: 'async', // 默认，只对异步导入（动态加载import()）的模块处理，入口文件内的异步导入不作处理
                            // chunks: 'all', // 在异步和非异步块之间也可以共享块
                            // chunks: 'initial', // 只对入口引入的模块进行拆分

                            // 新的 chunk 体积在压缩之前是否大于 30kb
                            // minSize: 30000,

                            // 被多少模块共享
                            // minChunks: 1,

                            // 所有异步请求不得超过5个，按需加载 chunk 的并发请求数量小于等于 5 个
                            // maxAsyncRequests: 5,

                            // 页面初始加载时的并发请求数量小于等于 3 个
                            // 只算js文件的请求，css不算在内
                            // 通过runtimeChunk拆分出的runtime不算在内
                            // 如果入口里面有动态加载得模块这个不算在内
                            // maxInitialRequests: 3,

                            // automaticNameDelimiter: '~', // 自动命名连接符

                            // name: true,
                            cacheGroups: { // 决定生成的文件
                                // test, priority, reuseExistingChunk，这三个是只能定义在cacheGroup
                                // 默认开始
                                // vendors: {
                                //     test: /[\\/]node_modules[\\/]/,
                                //     priority: -10
                                // },
                                // default: {
                                //     minChunks: 2,
                                //     priority: -20,
                                //     reuseExistingChunk: true
                                // }
                                // 默认结束
                                // default: false,
                                // 第三方依赖
                                vendors: {
                                    name: 'chunk-vendors', // 生成文件名
                                    test: /[\\/]node_modules[\\/]/, // 限制范围，可以是正则，匹配文件夹或文件
                                    chunks: 'initial',
                                    priority: 10, // 设置优先级，多个分组冲突时决定把代码放在哪块
                                    minSize: 0, // 大小超过0个字节
                                    minChunks: 1 // 最少引入了1次
                                },
                                // 单独将 elementUI 拆包
                                // elementUI: {
                                //     name: 'chunk-elementUI',
                                //     test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
                                //     chunks: 'initial',
                                //     priority: 20 // 权重要大于 vendors 和 app 不然会被打包进 vendors 或者 main
                                // },
                                // 公共模块
                                common: {
                                    name: 'chunk-commons',
                                    test: resolve('src/components'),
                                    chunks: 'all',
                                    minChunks: 2, // 最少引入了2次
                                    priority: 5,
                                    reuseExistingChunk: true // 如果当前块包含已从主捆绑包中拆分出的模块，则将重用该模块，而不是生成新的模块。
                                },
                                // 单独样式文件
                                // styles: {
                                //     name: 'styles',
                                //     test: /\.(le|c)ss$/,
                                //     chunks: 'all',
                                //     priority: 15
                                // },
                                runtimeChunk: {
                                    name: 'manifest'
                                }
                            }
                        })
                    // 将包含chunks映射关系的list单独从 main.js 里提取出来，以便缓存
                    // 值 "single" 会创建一个在所有生成 chunk 之间共享的运行时文件
                    // config.optimization.runtimeChunk('single')
                    // 去除生产环境console
                    // config
                    //     .optimization.minimizer('terser').tap((args) => {
                    //         args[0].terserOptions.compress.drop_console = true
                    //         return args
                    //     })
                    // config
                    //     .optimization.minimizer('css')
                    //     .use(OptimizeCSSAssetsPlugin, [{ cssProcessorOptions: { safe: true } }])
                }
            )
        // 'src/assets' 目录下为外部库文件，不参与 eslint 检测
        // config.module
        //     .rule('eslint')
        //     .exclude
        //     .add('/Users/mac/zh/workSpace/Manage-demo-vue/src/assets')
        //     .end()

        // 压缩图片
        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config.module
                        .rule('images')
                        .test(/\.(png|jpe?g|JPG|gif|webp)(\?.*)?$/)
                        .use('image-webpack-loader')
                        .loader('image-webpack-loader')
                        .options({
                            mozjpeg: { progressive: true, quality: 65 },
                            optipng: { enabled: false },
                            pngquant: { quality: [0.65, 0.9], speed: 4 },
                            gifsicle: { interlaced: false }
                            // webp: { quality: 75 }
                        })
                }
            )
    },

    // 配置高于chainWebpack中关于 css loader 的配置
    css: {
        // 是否开启支持 foo.module.css 样式
        requireModuleExtension: true,

        // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
        // Default: 生产环境下是 true，开发环境下是 false
        // 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容
        extract: isProduction,

        // 是否构建样式地图，false 将提高构建速度
        sourceMap: false,

        // css预设器配置项
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
            },
            less: {
                // less 全局变量
                globalVars: {
                    'color-primary': '#2A6AFF', // 主颜色
                    'assets-url': '~@/assets/image/' // 图片地址
                }
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
