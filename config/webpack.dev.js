const merge = require("webpack-merge");
const base = require("./webpack.base");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = merge(base, {
    // 模式
    mode: 'development',
    target: 'web',
    devtool: 'inline-source-map',
    // @ts-ignore
    devServer:{
        compress: true, //启用压缩
        port: 1207,     //端口
        open: true,    //自动打开浏览器
        hot: true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        // Webpack Bundle Analyzer
        new BundleAnalyzerPlugin()
    ]
})