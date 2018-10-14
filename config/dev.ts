import * as webpack from 'webpack';

import { config as baseConfig } from './base';

export const config = {
    ...baseConfig,
    mode: 'development',
    plugins: [
        ...baseConfig.plugins,
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        compress: true,
        contentBase: './dist',
        hot: true
    },
    devtool: 'cheap-source-map',
};
