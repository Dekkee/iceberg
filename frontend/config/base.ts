import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as CleanWebpackPlugin from "clean-webpack-plugin";

import * as path from 'path';

export const config: webpack.Configuration = ({
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'awesome-typescript-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader' // compiles Sass to CSS
                ]
            },
            {
                test: /\.jpe?g$|\.gif$|\.svg$|\.woff$|\.woff2$|\.ttf$|\.wav$|\.mp3$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: '/',
    },
    plugins: [
        new CleanWebpackPlugin([ 'dist' ]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            favicon: './src/assets/favicon.ico',
            template: './src/template/index.html',
            title: require('../package').title,
            meta: {
                viewport: 'width=device-width, initial-scale=1',
                author: require('../package').author,
                charset: 'utf-8',
                description: require('../package').description,
            }
        }) ],
    resolve: {
        extensions: [ '.js', '.ts', '.tsx' ]
    },
});
