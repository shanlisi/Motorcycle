let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve("build"),
        filename: "bundle.js"
    },
    devServer: {
        historyApiFallback:true
    },
    module:{
        rules: [
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.(jpg|png|gif|svg)$/,use:'url-loader'}
        ]
    },
    devtool:"cheap-module-source-map",
    plugins: [
        new htmlWebpackPlugin({
            template:"./index.html",
            favicon:path.resolve('./src/images/favicon.ico')
        })
    ]
};