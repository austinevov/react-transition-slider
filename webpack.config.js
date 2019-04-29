const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const modeConfig = env => require(`./build-scripts/webpack.${env.mode}`);

module.exports = ({
  mode,
  presets
} = {
  mode: 'production',
  presets: []
}) => {
  return webpackMerge({
      mode: mode,
      entry: ['babel-polyfill', './example/app.jsx'],
      output: {
        path: path.join(__dirname, './example'),
        filename: './app.js',
        publicPath: '/'
      },
      devServer: {
        contentBase: path.join(__dirname, 'example'),
        historyApiFallback: true
      },
      resolve: {
        extensions: ['.js', '.jsx']
      },
      module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          },
          {
            test: /\.(s*)css$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          },
          {
            test: /\.glsl$/,
            use: 'raw-loader'
          },
        ]
      },
      plugins: [
        new webpack.ProgressPlugin()
      ]
    },
    modeConfig({
      mode,
      presets
    })
  );
};