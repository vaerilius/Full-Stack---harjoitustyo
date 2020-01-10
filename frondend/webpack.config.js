const path = require('path')
const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = (env, argv) => {
  console.log('argv', argv.mode)

  const backend_url = 'http://localhost:3001'


  return {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js',
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      hot: true,
      port: 3000,
      historyApiFallback: true,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        },
        { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] }
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      }),
      new webpack.HotModuleReplacementPlugin()
      // require('babel-plugin-transform-react-constant-elements'),
      // require('babel-plugin-transform-react-inline-elements'),
      // require('babel-plugin-transform-react-remove-prop-types')['default'],
      // require('babel-plugin-transform-react-pure-class-to-function')
      // new webpack.HotModuleReplacementPlugin(),
    ]
  }

}

module.exports = config