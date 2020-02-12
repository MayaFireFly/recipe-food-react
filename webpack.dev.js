const webpack = require('webpack');

module.exports = {
  mode:'development',
  devtool:'eval-source-map',
  devServer:{
    host: '192.168.1.5',
    contentBase:__dirname + '/dist',
    port: 3000,
    publicPath: '/',
    historyApiFallback: true,
    hot:true    
  },
  output:{
    path:__dirname + '/dist',
    publicPath:'/',
    filename:'main.js'           
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),    
  ]
};