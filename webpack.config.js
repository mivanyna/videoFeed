const webpack = require('webpack');

module.exports = {
    entry: "./public/app.js",
    output: {
        path: __dirname,
        filename: "./public/dist/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin()   
    ]
};