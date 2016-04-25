var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var searchDir = ['./src'];
var entry = {}

searchDir.forEach(function(dir){
    var srcBasePath = path.join(__dirname, './', dir);
    var files = fs.readdirSync(srcBasePath);
    var ignore = ['.DS_Store'];
    files.map(function (file) {

        if (ignore.indexOf(file) < 0) {
            entry[dir+'/'+file] = path.join(srcBasePath, file, 'index.js');

            var demofile = path.join(srcBasePath, file, 'demo.js');
            if(fs.existsSync(demofile)){
                entry[dir+'/'+file + '/demo'] = demofile;
            }

            var reduxfile = path.join(srcBasePath, file, 'redux.js');
            if(fs.existsSync(reduxfile)){
                entry[dir+'/'+file + '/redux'] = reduxfile;
            }
        }
    });
});

Object.keys(entry).forEach(function (key) {
    entry[key] = [entry[key], 'webpack-hot-middleware/client'];
});

module.exports = {
    devtool:'cheap-module-eval-source-map',
    entry :['./src/index'],
    output:{
        path:path.join(__dirname,'dist'),
        filename:'[name].js',
        publicPath:'/dist/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders:[
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.css$/, loader: 'style-loader!css-loader'},
            { test: /\.(jpg|png)$/, loader: 'url-loader?limit=8192'},
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader','css-loader!less-loader'),
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name]/index.css"),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
