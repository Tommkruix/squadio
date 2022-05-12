const webpack = require( 'webpack' );
const { merge } = require( 'webpack-merge' );
const { resolve } = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const commonConfig = require( './common' );

const { customPaths } = require( './constants' );

const devConfig = merge( commonConfig, {
  entry: [
    // activate HMR for React
    'react-hot-loader',
    // bundle the client for webpack-dev-server and connect to the provided endpoint
    'webpack-dev-server/client',
    // bundle the client for hot reloading, only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',
    resolve( __dirname, `${customPaths.src}/index.tsx` ),
  ],
  mode:    'development',
  devtool: 'eval-source-map',
  output:  {
    path:          resolve( __dirname, customPaths.public ),
    filename:      '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath:    '/',
  },
  devServer: {
    hot:                true,
    historyApiFallback: true,
    host:               '127.0.0.1',
    port:               8080,
  },
  plugins: [
    new HtmlWebpackPlugin( {
      template: resolve( __dirname, `${customPaths.public}/index.html` ),
    } ),
    new webpack.HotModuleReplacementPlugin(),
  ],
} );

module.exports = devConfig;
