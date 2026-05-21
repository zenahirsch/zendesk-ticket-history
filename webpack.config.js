/* eslint-env node */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const externalAssets = {
  css: [],
  js: [
    'https://assets.zendesk.com/apps/sdk/2.0/zaf_sdk.js',
  ]
};

module.exports = {
  mode: 'production',
  entry: {
    app: ['./src/javascripts/index.js', './dist/tmp/app.css']
  },
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /src\/translations\/.*\.json/,
        type: 'javascript/auto',
        loader: 'translations-loader',
        options: {
          runtime: 'handlebars'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.(handlebars|hd?bs)$/,
        loader: 'handlebars-loader',
        options: {
          extensions: ['handlebars', 'hdbs', 'hbs'],
          runtime: 'handlebars'
        }
      }
    ]
  },
  resolveLoader: {
    modules: ['./lib/loaders', 'node_modules']
  },
  resolve: {
    modules: ['node_modules', './lib/javascripts'],
    alias: {
      'handlebars$': require.resolve('handlebars/dist/handlebars'),
      'app_manifest': path.join(__dirname, './dist/manifest.json')
    },
    extensions: ['.js']
  },
  externals: {
    zendesk_app_framework_sdk: 'ZAFClient'
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'main.css' }),
    new HtmlWebpackPlugin({
      warning: 'AUTOMATICALLY GENERATED FROM ./lib/templates/layout.hdbs - DO NOT MODIFY THIS FILE DIRECTLY',
      vendorCss: externalAssets.css,
      vendorJs: externalAssets.js,
      template: '!!handlebars-loader!./lib/templates/layout.hdbs'
    }),
  ]
};
