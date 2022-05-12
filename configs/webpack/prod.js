const merge = require( 'webpack-merge' );
const { resolve } = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );

const { customPaths } = require( './customPaths' );
const commonConfig = require( './common' );

const prodConfig = merge( commonConfig, {
  entry:  resolve( __dirname, `${customPaths.src}/index.js` ),
  mode:   'production',
  module: {
    rules: [
      {
        test:    /\.(js|jsx)$/,
        use:     [ 'babel-loader' ],
        exclude: resolve( __dirname, `${customPaths.src}/node_modules/` ),
        include: resolve( __dirname, customPaths.src ),
      },
      {
        test:    /\.(gif|png|jpe?g|svg)$/i,
        loader:  'image-webpack-loader',
        options: {
          plugins: [
            {
              removeTitle: true,
            },
            {
              convertColors: {
                shorthex: false,
              },
            },
            {
              convertPathData: false,
            },
          ],
        },
      },
    ],
  },
  output: {
    crossOriginLoading: 'anonymous',
    filename:           'js/bundle.[hash].min.js',
    path:               resolve( __dirname, customPaths.dist ),
    publicPath:         '/',
  },
  plugins: [
    new HtmlWebpackPlugin( {
      template: resolve( __dirname, `${customPaths.public}/index.html` ),
    } ),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin( {
        uglifyOptions: {
          mangle:   true,
          compress: true,
          minimize: true,
          output:   { comments: false },
        },
        test:    /\.js(\?.*)?$/i,
        include: resolve( __dirname, `${customPaths.dist}/js` ),
        exclude: /node_modules/,
      } ),
    ],
  },
} );

module.exports = prodConfig;
