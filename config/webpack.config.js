const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: {
        main: ['@babel/polyfill', './src/index.js']
    },

    devServer: {
        open: true,
        contentBase: path.resolve(__dirname, '../', 'src')
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../', 'build')
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
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),
        new CopyPlugin([{
            from: 'src/assets',
            to: 'assets'
        }])

    ]
}