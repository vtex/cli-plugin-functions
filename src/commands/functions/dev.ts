import { Command } from '@oclif/command'
import { CustomCommand } from 'vtex'
import { getSiteRoot } from '../modules/utils/siteRoot'
import { proxyServer } from '../modules/proxyServer'
import { frameworkServer } from '../modules/frameworkServer'
import { functionsServer } from '../modules/functionsServer'
import path from 'path'

export default class FunctionsDev extends Command {
  static description = 'run a local server to test serverless functions'

  static examples = [`$ vtex-test functions dev`]

  static flags = {
    ...CustomCommand.globalFlags,
  }

  async run() {
    this.parse(Functions)

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
