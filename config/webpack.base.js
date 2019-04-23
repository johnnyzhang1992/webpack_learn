const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname,'../src/index.js'),
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname,'../dist'),
        // publicPath: "http://cdn.example.com/assets/[hash]/"
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
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
            title:'WebpackTest First Page'
        })
    ]
}