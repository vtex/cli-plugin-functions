import { Command } from '@oclif/command'
import { CustomCommand } from 'vtex'
import { getSiteRoot } from '../modules/SiteRoot'
import { proxyServer } from '../modules/proxyServer'
import { frameworkServer } from '../modules/frameworkServer'
import { functionsServer } from '../modules/functionsServer'
import path from 'path'

export default class Functions extends Command {
  static description = 'describe the command here'

  static examples = [`$ vtex-test functions`]

  static flags = {
    ...CustomCommand.globalFlags,
  }

  static args = [{ name: 'file' }]

  async run() {
    this.parse(Functions)

    const functionsPort = 3000
    const proxyPort = 8080

    const functionsDir = path.join(getSiteRoot(), 'api')

    functionsServer(functionsDir, functionsPort)

    frameworkServer()

    proxyServer(functionsPort, proxyPort)
  }
}
