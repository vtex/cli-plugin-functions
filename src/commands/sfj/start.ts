import { Command } from '@oclif/command'
import { CustomCommand } from 'vtex'
import { getSiteRoot } from '../../modules/utils/siteRoot'
import { proxyServer } from '../../modules/server/proxyServer'
import { frameworkServer } from '../../modules/server/frameworkServer'
import { functionsServer } from '../../modules/server/functionsServer'
import path from 'path'

export default class SFJ extends Command {
  static description = 'run a local server to develop with serverless functions'

  static examples = [`$ vtex functions`]

  static flags = {
    ...CustomCommand.globalFlags,
  }

  async run() {
    this.parse(SFJ)

    const functionsPort = 3000
    const proxyPort = 8080

    console.log(`
   ╭──────────────────────────────────────────────╮
   │                                              │
   │   Starting server at http://localhost:8080   │
   │                                              │
   ╰──────────────────────────────────────────────╯
`)

    const functionsDir = path.join(getSiteRoot(), 'api')

    await functionsServer(functionsDir, functionsPort)

    frameworkServer()

    proxyServer(functionsPort, proxyPort)
  }
}
