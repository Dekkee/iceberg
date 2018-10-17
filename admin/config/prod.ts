import * as webpack from 'webpack';
import * as HtmlWebpackExternalsPlugin from 'html-webpack-externals-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as PreloadWebpackPlugin from 'preload-webpack-plugin';

import { config as baseConfig } from './base';

const externals = [
    {
        module: 'react',
        entry: `https://unpkg.com/react@${require('../package').dependencies.react}/umd/react.production.min.js`,
        global: 'React',
    },
    {
        module: 'react-dom',
        entry: `https://unpkg.com/react-dom@${require('../package').dependencies[ 'react-dom' ]}/umd/react-dom.production.min.js`,
        global: 'ReactDOM',
    },
];

export const config: webpack.Configuration = {
    ...baseConfig,
    mode: 'production',
    plugins: [
        ...baseConfig.plugins,
        new HtmlWebpackExternalsPlugin({ externals }),
        new MiniCssExtractPlugin(),
        new PreloadWebpackPlugin({
            rel: 'preload',
            include: 'allChunks'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ],
    module: {
        rules: [
            ...baseConfig.module.rules.filter(rule => !(rule.test as RegExp).test('some.scss')),
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader' // compiles Sass to CSS
                ]
            }
        ]
    }
};
