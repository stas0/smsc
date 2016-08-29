const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    entry: {
        page1: "./home"
    },
    output: {
        filename: "build.js",
        library: 'home'
    },

    //watch: NODE_ENV == 'development',

    devtool: NODE_ENV == 'development' ? 'source-map' : null,

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })
    ]
}
