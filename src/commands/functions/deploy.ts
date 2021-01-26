import { Command } from '@oclif/command'

export default class FunctionsDeploy extends Command {
  static description = 'upload serverless functions to the cloud'

  static examples = [`$ vtex-test functions deploy`]

  async run() {
    console.log('TODO')
  }
}
