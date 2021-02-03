import webpack from 'webpack'
import { generateConfig } from './webpack.config'
import { getSiteRoot } from '../utils/siteRoot'

export const build = (distDir: string) => {
  const root = getSiteRoot()

  webpack(generateConfig(root, distDir))
}
