const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//  __webpack_public_path__ = 'myRuntimePublicPath
module.exports = {
    // 入口
    entry: {
        app: path.resolve(__dirname, '../src/index.js'),
        test: path.resolve(__dirname, '../src/test.js')
    },
    // 出口
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname,'../dist'),
        // publicPath: "http://cdn.example.com/assets/[hash]/"
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            // 公共模块被打包进了commons
            cacheGroups: {
                // 禁用 default 缓存组
                //default: false
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2
                }
            }
        }     
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            },{
                test: /\.(png|svg|jpg|gif)$/,
                use:{
                    loader:'url-loader',
                    options: {
                        limit: 8192,
                        name: 'images/[name].[ext]?[hash]'
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            //  在 html 页面配合使用 <%= htmlWebpackPlugin.options.title %>
            title: 'Base Mode',
            template: './src/index.html',
            // file name
            //filename: 'index.[contenthash].html',
            // add meta
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                keywords: 'webpack, Javascript',
                description: 'webpack learn, 学习 webpack 的配置'
            },
            chunksSortMode: 'auto',
            // favicon: ''
        })
    ]
}