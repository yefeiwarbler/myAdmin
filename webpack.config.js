const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/app.js',
        publicPath: '/'
    },
    resolve:{
        alias: {
            pages : path.resolve(__dirname, 'src/pages')
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
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                esModule: false,// 默认为true，4.x版本的css-loader默认使用了es模块化规范，vue-style-loader不支持
                            }
                        },
                        'sass-loader'
                    ]
                }),
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
    plugins: [
        // 生成html
        new HtmlWebpackPlugin({
            template: './public/index.html', // 指定生成html的模板文件
            favicon: './public/favicon.ico'
        }),
        // vue-style-loader 和 vue-loader 的依赖
        new VueLoaderPlugin(),
        // 将 css 提取到文件中
        new ExtractTextPlugin({
            filename: 'css/index.css'
        }),
        // source map
        new webpack.SourceMapDevToolPlugin({
            test: /\.(js|css|vue|scss)$/i,
        }),
    ],
    // 提取公用模块
    optimization:{
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            maxSize: 0,
            minChunks: 1,
            name: 'js/base.js'
        }
    },
    devServer: {
        host: '0.0.0.0',
        port: '8088',
        // publicPath: '/',
        useLocalIp: true,
        open: true,
        openPage: '',
        historyApiFallback: true,
    },
}