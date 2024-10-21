const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        test: /\.ejs$/,
        loader: 'ejs-loader',
        options: {
          variable: 'data',
        },
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
      template: './src/templates/index.ejs',
      // chunks: ['host'],
      title: 'Faxball',
      // script: 'host.bundle.js'
    }),
    new HtmlWebpackPlugin({
      filename: 'host/index.html',
      template: './src/templates/host.ejs',
      chunks: ['host'],
      templateParameters: {
        title: 'Host - Faxball',
        script: 'host.bundle.js'
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'client/index.html',
      template: './src/templates/client.ejs',
      chunks: ['client'],
      templateParameters: {
        title: 'Client - Faxball',
        script: 'client.bundle.js'
      },
    }),
  ],
  devServer: {
    static: './',
    port: 8080,
  },
};
