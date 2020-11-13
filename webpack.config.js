const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// css样式从js中分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// bundle分析
const Visualizer = require('webpack-visualizer-plugin');
// gzip压缩插件
const CompressionPlugin = require("compression-webpack-plugin");

let plugins = [
    // 生成html
    new HtmlWebpackPlugin({
        template: './public/index.html', // 指定生成html的模板文件
        favicon: './public/favicon.ico',
    }),
    // vue-style-loader 和 vue-loader 的依赖
    new VueLoaderPlugin({

    }),
    // 将 css 提取到文件中
    new MiniCssExtractPlugin({
        filename: 'css/[name].[chunkhash].css'
    }),
    // bundle分析
    new Visualizer({
        filename: './statistics.html'
    }),
    // gzip压缩
    new CompressionPlugin({
        algorithm: 'gzip'
    }),
];

// 开发环境
if( process.env.NODE_ENV === 'development' ){
    plugins = plugins.concat(
        // source map
        new webpack.SourceMapDevToolPlugin({
            test: /\.(js|css|vue|scss)$/i,
        }),
    );
}

module.exports = {
    entry: {
        main: './src/main.js',
        vendor: [
            'regenerator-runtime/runtime', 'core-js/stable'
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].bundle.js',
        publicPath: '/'
    },
    // 排除依赖，用于cdn加速
    externals:{
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'axios': 'axios',
    },
    // 设置文件路径别名
    resolve:{
        alias: {
            pages       : path.resolve(__dirname, 'src/pages'),
            util        : path.resolve(__dirname, 'src/util')   ,
            service     : path.resolve(__dirname, 'src/service' ),
            components  : path.resolve(__dirname, 'src/components'),
            router      : path.resolve(__dirname, 'src/router'),
        }
    },
    module:{
        rules:[
            // .vue文件
            {
                test: /\.vue$/i,
                loader: 'vue-loader'
            },
            // .js文件
            {
                test: /\.js$/i,
                loader: 'babel-loader'
            },
            // 样式文件加载
            {
                test: /\.s?css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,// 默认为true，4.x版本的css-loader默认使用了es模块化规范，vue-style-loader不支持
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            // 图片加载，url-loader依赖于file-loader并会在运行时调用file-loader
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            esModule: false, // 默认为true，新版url-loader默认使用了es模块化规范
                            outputPath: 'images/'
                        },
                    },
                ],
            },
            // svg
            {
                test: /\.svg$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            encoding: false,
                            outputPath: 'images/'
                        },
                    },
                ],
            },
            // 字体加载
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
        ],
    },
    plugins,
    // 提取公用模块
    optimization:{
        minimize: true,
        splitChunks: {
            chunks: 'async',
            // 最小块体积(单位：Byte)：约20KB
            minSize: 30000,
            // 最大块体积(单位：Byte)：约200KB，超过将尝试拆分
            maxSize: 200000,
            minChunks: 2,
            name: 'common'
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    devServer: {
        host                : '0.0.0.0',
        port                : '8088',
        useLocalIp          : true,
        open                : true,
        openPage            : '',
        historyApiFallback  : true,
    },
}