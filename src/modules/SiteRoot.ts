import { accessSync } from 'fs'
import path from 'path'

export const CONFIG_FILE_NAME = 'gatsby-config.js'

export const getSiteRoot = () => {
  const cwd = process.cwd()
  const fsRoot = path.parse(cwd).root

  let foundProjectRoot = false
  let dir = cwd

  while (!foundProjectRoot) {
    try {
      accessSync(path.join(dir, CONFIG_FILE_NAME))

      foundProjectRoot = true
    } catch (err) {
      if (dir === fsRoot) {
        console.error(
          "Gatsby site file config doesn't exist or is not readable. " +
            "Please make sure you're in the site's directory or add a " +
            'gatsby-config.js file in the root folder of the site.'
        )
        throw new Error('Root dir not found')
      }

      dir = path.resolve(dir, '..')
    }
  }

  return dir
}
