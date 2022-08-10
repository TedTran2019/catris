const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  // entry: {
  //   main: path.resolve(__dirname, './src/index.js')
  // },
  // output: {
  //   path: path.resolve(__dirname, './dist/'),
  //   filename: 'main.js'
  // },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Catris',
      metaDesc: 'Tetris with cats!',
      template: path.resolve(__dirname, "./src/index.html"),
      filename: 'index.html',
      inject: 'body'
    })
  ],
  mode: 'development',
  output: {
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|m4a)$/i,
        type: 'asset/resource',
      },
    ]
  }
};

// npm install webpack webpack-cli --save-dev
// npm install html-webpack-plugin --save-dev
// npm install --save-dev style-loader css-loader
