const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode: 'development', // choose between 'production' or 'development'
    resolve: {
        fallback: {
            // TODO check package
            // fix for webpack < 5 polyfill.
            // npm install https https-browserify url stream-http buffer
            "https": require.resolve("https-browserify"),
            "url": require.resolve("url/"),
            "http": require.resolve("stream-http"),
            "buffer": require.resolve("buffer/"),
        }
    },
    entry: { // The point or points where to start the application bundling process
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

        // Copies individual files or entire directories, which already exist, to the build directory.
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

        // All webpack entry points will be included with <script> tags in the generated HTML.
        // https://github.com/jantimon/html-webpack-plugin#options
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: 'public/popup.html',
            chunks: ['popup'],
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
