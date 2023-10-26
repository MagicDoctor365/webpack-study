const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',  // by default, could miss
    output: {
        path: resolve(__dirname, 'dist'),  // 1. by default, could miss 2. must be absoloute path
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,  // $ means endswith, i means case-insensitive
                // css-loader integrate css code into js code
                // 1. use style-loader: style-loader extract the css from js and embed in the <style> in the index.html
                // use: ['style-loader', 'css-loader'] // loader will be executed from right to left.
                // 2. use miniCssExtractPlugin: miniCssExtractPlugin could integrate all css fiels into one file: main.css
                // 3. postcss-loader: add browser prefix for css style
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'  // if css use static asset(such as background: url(img)), must indicate the images directory
                        }
                    }, 
                    'css-loader', 
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/i,
                // use: ['style-loader', 'css-loader', 'less-loader'] // less-loader convert .less to .css
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    }, 
                    'css-loader', 
                    'postcss-loader', 
                    'less-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env', 
                                {
                                    useBuiltIns: 'usage', // customize convert new features
                                    corejs: 3,  // corejs version
                                    targets: 'defaults'  // indicate compatibility of browsers' version
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.(png|gif|jpe?g|)$/i,
                use: {
                    // loader: 'file-loader'
                    loader: 'url-loader', // url-loader is advanced version of file-loader. 
                    options: {
                        name: "images/[name].[ext]",
                        limit: 2 * 1024, // converts the small-size images into base64 which could be loaded together with js.
                        esModule: false // url loader use ES Module by default, while html-load use commonjs. Force to make url-loader use commonjs
                    }
                }
            },
            {
                test: /\.(htm|html)$/i,
                use: {
                    loader: 'html-loader',  // html-loader can process asset url issues in HTML
                    options: {
                        esModule: false // must configurate in webpack 5 for html-loader
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'  // used to indicate specific file folders and filename
        }),
        new StylelintPlugin({
            files: ['src/css/*.{css,less,sass,scss}']
        }),
        // HtmlWebpackPlugin could be used multiple times, thus generate multiple html files
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',  // By default, HtmlWebpackPlugin use index.ejs for its template, try to learn something about EJS
            title: 'Webpack Demo',
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        })
        // new ESLintPlugin({
        //     fix: true
        // })
    ]

}