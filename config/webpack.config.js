const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',

    node: {
        fs: 'empty'
    },

    entry: {
        main: ['@babel/polyfill', './src/index.js']
    },

    devServer: {
        open: true,
        contentBase: path.resolve(__dirname, '../', 'src')
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpeg|jpg|svg|ttf|woof|woof2|wav|mp3)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets'
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),
        new Dotenv(),
    ]
}