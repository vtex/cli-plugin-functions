const ZipPlugin = require('zip-webpack-plugin')
const path = require('path')
const glob = require('glob')
const lambda = require('./lambda')

module.exports.generateConfig = (dirName, distDir) => {
  const config = {
    entry: {},
    context: dirName,
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
      path: path.resolve(dirName, distDir),
      libraryTarget: 'umd',
    },
    target: 'node',
    mode: 'development',
    optimization: {
      usedExports: false,
    },
  }

  glob.sync('./api/*.[tj]s?(x)').forEach((filename) => (config.entry[path.parse(filename).name] = filename))

  // const createRedirect = (name) => `http://localhost:3000/${name}`

  const redirectsPlugin = {
    apply: (compiler) => {
      compiler.hooks.assetEmitted.tap('Functions Deployment', (filename, info) => {
        lambda.createFunction(filename, info.content).catch((x) => console.log(x))

        // const redirects = {}

        /*
        compilation.entrypoints.forEach((_, key) => (redirect[filename] = createRedirect(filename)))
        fs.writeFileSync('redirects.json', `${JSON.stringify(redirects)}\n`)
        */
      })
    },
  }

  const pluginConfig = {
    plugins: [
      redirectsPlugin,
      ...Object.keys(config.entry).map((entryName) => {
        return new ZipPlugin({
          path: path.resolve(dirName, distDir),
          filename: entryName,
          extension: 'zip',
          include: [entryName],
        })
      }),
    ],
  }

  return Object.assign(config, pluginConfig)
}
