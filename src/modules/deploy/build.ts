import webpack from 'webpack'
import { generateConfig } from './webpack.config'
import { getSiteRoot } from '../utils/siteRoot'
import { AWSProvider } from './provider/AWSProvider'
import { SessionManager } from 'vtex'

export const build = () => {
  const { account } = SessionManager.getSingleton()

  const root = getSiteRoot()

  const config = generateConfig(root, 'dist', account, AWSProvider)
  const compiler = webpack({ ...config })

  compiler.run((error) => error && console.error('Webpack compilation failed', error))
}
