const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {_getEdgeById} = require("./src/api/_get_edge_by_id");
const webpack = require("webpack");

module.exports = {
    mode: 'production', // choose between 'production' or 'development'
    resolve: {
        fallback: {
            // TODO check package
            "https": require.resolve("https-browserify"),
            "url": require.resolve("url/"),
            "http": require.resolve("stream-http"),
            "buffer": require.resolve("buffer/"),
            "assert": require.resolve("assert/"),
            "util": require.resolve("util/"),
            "crypto": require.resolve("crypto-browserify"),
            "querystring": require.resolve("querystring-es3"),
            "stream": require.resolve("stream-browserify"),
            "path": require.resolve("path-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            "os": require.resolve("os-browserify/browser"),
            "fs": false,
        }
    },
    entry: {
        background: path.resolve('src/background/index.js'),
        content: path.resolve('src/content/index.js'),
        popup: path.resolve('src/popup/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].out.js',
        clean: true, // clean up output folder before build
    },
    plugins: [
        new CleanWebpackPlugin(),

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

        // FIXME resolve error of 'fs' and 'buffer'
        new webpack.DefinePlugin({
            'process': {},
            'process.env' : {
                NODE_ENV: process.env.NODE_ENV
            }
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // the order must not be changed
            },
        ],
    },
    optimization: {
        minimize: false
    },
}
