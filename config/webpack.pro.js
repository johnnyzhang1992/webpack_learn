const merge = require('webpack-merge');
const base = require("./webpack.base.js");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require("path");
// add Mainfest
var ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(base ,{
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(['dist'],{
            root: path.resolve(__dirname,'../'),
        }),
        new ManifestPlugin(),
        // Webpack Bundle Analyzer
        new BundleAnalyzerPlugin()
    ],
})