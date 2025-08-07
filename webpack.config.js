const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (_env, argv) => {
  const prod = argv.mode === 'production';
  console.log(
    `Webpack is running in ${prod ? 'production' : 'development'} mode`
  );
  return {
    entry: './src/index.js',
    // output publishes the bundle to the dist folder. These files are uploaded to the server.  The client must ask for these files with relative paths.  The paths are different in production and development.
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
        template: 'index.html', // your source HTML
        filename: 'index.html', // output
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            to: path.resolve(__dirname, 'dist'),
          },
        ],
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
