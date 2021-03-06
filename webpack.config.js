const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const extractPlugin = new ExtractTextPlugin({
   filename: 'main.css'
});

module.exports = {
    entry: [
        './client/src/index.js',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: [ '.js', '.json' ],
        modules: [ path.resolve(__dirname, 'client'), 'node_modules' ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [ 'env', 'react', 'stage-1' ],
                    plugins: [ 'transform-decorators-legacy', 'transform-object-rest-spread' ]
                }
            },
            {
                test: /\.scss|css$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader', 'resolve-url-loader']
                })
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[text]',
                            outputPath: 'fonts/',
                            publicPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[text]',
                            outputPath: 'img/',
                            publicPath: 'img/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({ // to enable jquery
            $: 'jquery',
            jQuery: 'jquery'
        }),
        extractPlugin, // to extract css into own file
        new HtmlWebpackPlugin({
            hash: true,
            meta: {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
                viewport: 'width=device-width, initial-scale=1',
            },
            title: 'WE MAKE PEACE portal'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
};
