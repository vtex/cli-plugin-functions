import { Command } from '@oclif/command'
import { CustomCommand } from 'vtex'
import { getSiteRoot } from '../modules/SiteRoot'
import { server } from '../modules/functionsServer'
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

    const functionsDir = path.join(getSiteRoot(), 'api')

    server(functionsDir)
  }
}
