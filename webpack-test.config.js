'use strict';

var webpackConfig = require('./webpack.config');
Object.assign(webpackConfig, {
    entry: './specs.js',
    devtool: 'cheap-module-inline-source-map'
});

module.exports = webpackConfig;
