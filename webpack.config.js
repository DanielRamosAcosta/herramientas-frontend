const webpack = require('webpack')

module.exports = {
  cache: true,
  output: {
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {warnings: false}
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: [
            ['transform-runtime', {
              polyfill: false,
              regenerator: true
            }]
          ]
        }
      }
    ]
  }
}
