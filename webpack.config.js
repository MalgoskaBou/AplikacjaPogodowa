const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/js/main.js",
    mode: "none",
    output: {
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    }, 
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },
    plugins: [

        new MiniCssExtractPlugin({
          filename: "bundle.css"
        })
      
    ]
}