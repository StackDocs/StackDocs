'use strict'
const webpack = require('webpack')
    , babel = require('./babel.config')
    , {isHot, isProd} = require('./env.config')

const config = env => (input, output) => ({
  entry: entries(env, input),
  output,
  devtool: 'source-map',
  resolve: {
    extensions: [ '.jsx', '.js', '.json' ],
    alias: {
      // This lets us use '~' to mean 'the root of the app' in import
      // statements.
      '~': __dirname
    }
  },
  devServer: devServer(env),
  module: {
    rules: [{
      test: /jsx?$/,
      exclude: /node_modules/,
      use: babel(env),
    },
    {
      test: /\.(jpeg|jpg|png|)$/,
      use: 'url-loader',
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(txt|md|markdown)$/,
      use: 'raw-loader',
    }]
  },
  plugins: plugins(env),
})

const entries = (env, entry) =>
  isHot(env)
    ? ['react-hot-loader/patch', entry]
    : entry

const plugins = env => isHot(env) ? [
  new webpack.HotModuleReplacementPlugin,  // Enable HMR globally
  new webpack.NamedModulesPlugin,          // Better module names in the browser
                                           // console on HMR updates
  new webpack.NoEmitOnErrorsPlugin,        // Don't emit on errors.
] : []

function devServer(env) {
  if (isProd(env)) return
  const {FIREBASE_SERVE_URL} = env
  return {
    hot: true,
    proxy: FIREBASE_SERVE_URL && {
      "/": FIREBASE_SERVE_URL
    }
  }
}

const conf = config(process.env)

module.exports = [
  conf('./client/index.js', {
    filename: 'bundle.js',
    path: `${__dirname}/public`,
  }),

  conf('./chrome/src/background.js', {
    filename: 'background.bundle.js',
    path: `${__dirname}/chrome/build`,
  }),

  conf('./chrome/src/contentScript.js', {
    filename: 'contentScript.bundle.js',
    path: `${__dirname}/chrome/build`,
  }),
]
