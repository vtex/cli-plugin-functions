const ZipPlugin = require('zip-webpack-plugin')
const path = require('path')
const glob = require('glob')

module.exports.generateConfig = (dirName, distDir, account, Provider) => {
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
  //
  const functions = []

  const collectFunctions = {
    apply: (compiler) => {
      compiler.hooks.assetEmitted.tap('Functions Collector', (filename, info) => {
        functions.push({ filename, content: info.content })
        console.log(functions)
        /*
        const redirects = {}
        compilation.entrypoints.forEach((_, key) => (redirect[filename] = createRedirect(filename)))
        fs.writeFileSync('redirects.json', `${JSON.stringify(redirects)}\n`)
        */
      })
    },
  }

  const afterEmit = {
    apply: (compiler) => {
      compiler.hooks.afterEmit.tap('Functions Deployment', async () => {
        console.log('asdf', functions)
        const provider = new Provider(account)

        for (const item of functions) {
          console.log('asdf', item)
          // eslint-disable-next-line no-await-in-loop
          await provider
            .createOrUpdateFunction(path.parse(item.filename).name, item.content)
            .catch((x) => console.error(x))
        }
      })
    },
  }

  const pluginConfig = {
    plugins: [
      collectFunctions,
      afterEmit,
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
