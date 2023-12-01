const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const webpack = require('webpack');
const path = require('path');


module.exports = {
    mode: 'production', // choose between 'production' or 'development'
    resolve: {
        modules: ['node_modules'],
        extensions: ['.jsx', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        fallback: {
            // TODO check package
            // "https": require.resolve("https-browserify"),
            // "url": require.resolve("url/"),
            // "http": require.resolve("stream-http"),
            // "buffer": require.resolve("buffer/"),
            // "assert": require.resolve("assert/"),
            // "util": require.resolve("util/"),
            // "crypto": require.resolve("crypto-browserify"),
            // "querystring": require.resolve("querystring-es3"),
            // "stream": require.resolve("stream-browserify"),
            // "path": require.resolve("path-browserify"),
            // "zlib": require.resolve("browserify-zlib"),
            // "os": require.resolve("os-browserify/browser"),
            // "fs": false,
        }
    },
    entry: {
        background: path.resolve('src/background/index.js'),
        content: path.resolve('src/content/index.js'),
        popup: path.resolve('src/popup/index.js'),
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx?)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.ts(x)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // instead of style-loader
                    "css-loader"
                ],
                // exclude: /.*?Styles\/\w+\.css$/,
            },
            {
                test: /\.svg$/,
                use: "file-loader",
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),

        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve('public/static'),
                to: path.resolve('build/static')
            }, {
                from: path.resolve('public/manifest.json'),
                to: path.resolve('build')
            }, {
                from: path.resolve('public/css/popup.css'),
                to: path.resolve('build/css')
            }],
        }),

        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: 'public/popup.html',
            chunks: ['popup'],
        }),

        new webpack.ProvidePlugin({
            "React": "react",
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].out.js',
        clean: true, // clean up output folder before build
    },
};
