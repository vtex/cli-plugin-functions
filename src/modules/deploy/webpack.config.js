const ZipPlugin = require('zip-webpack-plugin')
const path = require('path')
const glob = require('glob')

module.exports.generateConfig = (dirName, distDir, provider) => {
  const functions = []
  const config = mainConfig(dirName, distDir)

  return {
    ...config,
    plugins: [
      collectFunctions(functions),
      afterEmit(functions, provider),
      ...Object.keys(config.entry).map((entryName) => {
        const zipConfig = {
          path: path.resolve(dirName, distDir, entryName),
          filename: entryName,
          extension: 'zip',
          include: [`${entryName}/index.js`],
          pathMapper(assetPath) {
            return path.basename(assetPath)
          },
        }

        return new ZipPlugin(zipConfig)
      }),
    ],
  }
}

function collectFunctions(functions) {
  return {
    apply: (compiler) => {
      compiler.hooks.assetEmitted.tap('Functions Collector', (filename, info) => {
        functions.push({ filename, content: info.content })
        /*
        const redirects = {}
        compilation.entrypoints.forEach((_, key) => (redirect[filename] = createRedirect(filename)))
        fs.writeFileSync('redirects.json', `${JSON.stringify(redirects)}\n`)
        */
      })
    },
  }
}

function afterEmit(functions, provider) {
  return {
    apply: (compiler) => {
      compiler.hooks.afterEmit.tap('Functions Deployment', async () => {
        Promise.all(
          functions.map((item) =>
            provider.createOrUpdateFunction(path.parse(item.filename).name, item.content).catch((x) => console.error(x))
          )
        )
      })
    },
  }
}

function mainConfig(dirName, distDir) {
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
                configFile: path.join(__dirname, 'tsconfig.json'),
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

  return config
}
