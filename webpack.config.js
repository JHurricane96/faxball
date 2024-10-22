const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { htmlWebpackPluginTemplateCustomizer } = require('template-ejs-loader')

module.exports = {
  entry: {
    host: './src/host.ts',
    client: './src/client.ts'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Enables importing CSS in TypeScript
      },
      {
        test: /\.ejs$/i,
        use: ['html-loader', {
          loader: 'template-ejs-loader',
        }],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Clean the output directory before emit
    publicPath: process.env.NODE_ENV === 'production' ? '/faxball/' : '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: htmlWebpackPluginTemplateCustomizer({
        templatePath: './src/templates/index.ejs',
        templateEjsLoaderOption: {
          data: {
            title: 'Faxball',
          }
        }
      }),
      chunks: [],
      title: 'Faxball',
    }),
    new HtmlWebpackPlugin({
      filename: 'host/index.html',
      chunks: ['host'],
      template: htmlWebpackPluginTemplateCustomizer({
        templatePath: './src/templates/host.ejs',
        templateEjsLoaderOption: {
          data: {
            title: 'Host - Faxball',
          }
        }
      }),
    }),
    new HtmlWebpackPlugin({
      filename: 'client/index.html',
      chunks: ['client'],
      template: htmlWebpackPluginTemplateCustomizer({
        templatePath: './src/templates/client.ejs',
        templateEjsLoaderOption: {
          data: {
            title: 'Client - Faxball',
          }
        }
      }),
    }),
  ],
  devServer: {
    static: './',
    port: 8080,
  },
};
