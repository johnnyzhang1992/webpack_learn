const path = require("path");
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
        // The title to use for the generated HTML document. 
        // 用于自动生成的默认 html,对指定 template 的无效果
        // new HtmlWebpackPlugin({title: 'Webpack 项目搭建学习'})
    ]
}