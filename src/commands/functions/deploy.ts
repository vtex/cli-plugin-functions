import { Command } from '@oclif/command'
// import { createFunction } from '../../modules/deploy/lambda'
import { build } from '../../modules/deploy/build'

export default class FunctionsDeploy extends Command {
  static description = 'upload serverless functions to the cloud'

  static examples = [`$ vtex-test functions deploy`]

  async run() {
    build('dist')
    // await createFunction()
  }
}
