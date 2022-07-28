const webpack = require('webpack');
const path = require('path');

module.exports = (_env, { mode }) => ({
  mode,
  entry: {
    main: './src/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          allowTsInNodeModules: true
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devtool: mode === 'production' ? 'source-map' : 'eval-source-map',
  devServer: {
    static: [
      {
        directory: path.join(__dirname, './public'),
      },
    ],
    hot: true,
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
    compress: false,
    proxy: {
      '/api': {
        target: 'https://klage.dev.nav.no',
        secure: false,
        changeOrigin: true,
        withCredentials: true,
      },
      '/person/innloggingsstatus/auth': {
        target: 'https://innloggingsstatus.dev.nav.no',
        secure: false,
        changeOrigin: true,
        withCredentials: true,
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
    new webpack.EnvironmentPlugin({'VERSION': 'dev'}),
  ]
});
