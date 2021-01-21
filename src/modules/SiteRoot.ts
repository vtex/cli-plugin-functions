import { accessSync } from 'fs'
import path from 'path'

export const CONFIG_FILE_NAME = 'gatsby-config.js'

export const getSiteRoot = () => {
  const cwd = process.cwd()
  const { root: rootDirName } = path.parse(cwd)

  const find = (dir: string): string => {
    try {
      accessSync(path.join(dir, CONFIG_FILE_NAME))

      return dir
    } catch (err) {
      if (dir === rootDirName) {
        console.error(
          "Gatsby site file config doesn't exist or is not readable. " +
            "Please make sure you're in the site's directory or add a " +
            'gatsby-config.js file in the root folder of the site.'
        )
        throw new Error('Root dir not found')
      }

      return find(path.resolve(dir, '..'))
    }
  }

  return find(cwd)
}
