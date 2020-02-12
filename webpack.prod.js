const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode:'production',
  devtool:'source-map',
  output:{
    path: __dirname + '/dist',
    publicPath:'/',
    filename:'[name].[contenthash].js'            
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(), 
    new HtmlWebpackPlugin({      
      template: 'dist/index.html'
    }) 
  ], 
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {            
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];            
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
};