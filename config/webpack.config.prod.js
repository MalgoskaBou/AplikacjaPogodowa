const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'production',

    node: {
        fs: 'empty'
    },

    entry: {
        main: ['@babel/polyfill', './src/index.js']
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../', 'dist')
    },

    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpeg|jpg|svg|ttf|woof|woof2|wav|mp3)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets',
                }
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({'process.env': {
           'API_KEY': JSON.stringify(process.env.API_KEY)
        }}),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
          }),
        new CopyPlugin([{
            from: 'src/assets',
            to: 'assets'
        }])
    ]
}