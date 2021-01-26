import { Command } from '@oclif/command'
import { CustomCommand } from 'vtex'
import { getSiteRoot } from '../../modules/SiteRoot'
import { proxyServer } from '../../modules/proxyServer'
import { frameworkServer } from '../../modules/frameworkServer'
import { functionsServer } from '../../modules/functionsServer'
import path from 'path'

export default class Functions extends Command {
  static description = 'StoreFramework serverless functions'

  static examples = [`$ vtex-test functions`]

  static flags = {
    ...CustomCommand.globalFlags,
  }
}
