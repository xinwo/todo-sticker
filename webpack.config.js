var webpack = require('webpack');
// 這邊使用 HtmlWebpackPlugin，將 bundle 好的 <script> 插入到 body。${__dirname} 為 ES6 語法對應到 __dirname  
const HtmlWebpackPlugin = require('html-webpack-plugin');

const AppHTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/src/index.html`,
    filename: __dirname + '/dist/app/index.html',
    inject: 'body',
    chunks: ['app'],
});

const NoteHTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/src/note/index.html`,
    filename: __dirname + '/dist/note/index.html',
    inject: 'body',
    chunks: ['note'],
});

module.exports = {
    mode: 'development',
    target: 'electron-main',
    entry: {
        app: './src/index.js',
        note: './src/note/index.js',
    },
    output: {
        filename: '[name]/bundle.js',
        publicPath: 'http://localhost:3000/static/'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        extensions: ['.js', '.json']
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                enforce: 'pre',
                loader: 'eslint-loader'
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
            // Scss
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            //less
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
    devServer: {
        hot: true,
        port: 3000,
    },
    plugins: [
        AppHTMLWebpackPluginConfig,
        NoteHTMLWebpackPluginConfig,
        new webpack.HotModuleReplacementPlugin()
    ]
};