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
            title: 'Webpack 项目搭建学习',
            template: './src/index.html'
        })
    ]
}