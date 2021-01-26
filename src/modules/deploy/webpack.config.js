const ZipPlugin = require('zip-webpack-plugin')
const path = require('path')
const glob = require('glob')
const fs = require('fs')

const config = {
  entry: {},
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.fx.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, 'dist/'),
    libraryTarget: 'umd',
  },
  target: 'node',
  mode: 'development',
  optimization: {
    usedExports: false,
  },
}

glob.sync('./api/*.[tj]s?(x)').forEach((filename) => (config.entry[path.parse(filename).name] = filename))

const createRedirect = (name) => `http://localhost:3000/${name}`

const redirectsPlugin = {
  apply: (compiler) => {
    compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
      const redirects = {}

      compilation.entrypoints.forEach((_, key) => (redirects[key] = createRedirect(key)))
      fs.writeFileSync('redirects.json', `${JSON.stringify(redirects)}\n`)
    })
  },
}

const pluginConfig = {
  plugins: [
    redirectsPlugin,
    ...Object.keys(config.entry).map((entryName) => {
      return new ZipPlugin({
        path: path.resolve(__dirname, 'dist/'),
        filename: entryName,
        extension: 'zip',
        include: [entryName],
      })
    }),
  ],
}

const webpackConfig = Object.assign(config, pluginConfig)

module.exports = webpackConfig
