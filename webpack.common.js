module.exports = {
  entry:'./src/index.js',
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        exclude:/node_modules/,
        use:['babel-loader','eslint-loader']       
      },
      {
        test: /\.css$/, use: ['style-loader','css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve:{
    extensions:['*', '.js', '.jsx', '.css']
  }  
};