const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (_env, argv) => {
  const prod = argv.mode === 'production';
  console.log(
    `Webpack is running in ${prod ? 'production' : 'development'} mode`
  );
  return {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, './dist'),
      publicPath: prod ? './' : '/',
      filename: prod ? 'bundle.[contenthash].js' : 'bundle.js',
    },
    devServer: {
      port: 3000,
      open: true,
      // historyApiFallback: true, //for use in browser routing, to fallback to root url (no pathname... this is where index.html is found and where the script tag where react router is loaded is found), when pathname on server doesn't exist.  Otherwise we are returning a 404.html from the server. The bane of Single Page Application existence.
    },
    devtool: 'inline-source-map',
    plugins: [
      prod ? new CleanWebpackPlugin() : null,
      new HtmlWebpackPlugin({
        template: './public/index.html', // your source HTML
        filename: 'index.html', // output
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        },
      ],
    },
  };
};
