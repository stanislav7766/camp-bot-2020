const path = require('path')
const nodeExternals = require('webpack-node-externals')
// const Dotenv = require('dotenv-webpack')

const PATHS = {
  app: path.join(__dirname, 'src/index.js'),
  build: path.join(__dirname, 'dist'),
}

module.exports = {
  entry: {
    app: PATHS.app,
  },
  output: {
    path: PATHS.build,
    filename: 'index.js',
  },
  externals: [
    nodeExternals({
      allowlist: ['expressjs', 'encoding', 'needle'],
    }),
  ],
  target: 'node',
  // plugins: [
  //   new Dotenv({
  //     path: './.env',
  //     safe: true,
  //   }),
  // ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
}
