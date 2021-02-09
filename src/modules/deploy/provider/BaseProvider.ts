export type Functions = Record<string, { url: string }>

export abstract class BaseProvider {
  public account: string

  constructor(account: string) {
    this.account = account
  }

  abstract async createOrUpdateFunction(functionName: string, content: Buffer): Promise<void>

  abstract async createOrUpdateFunctions(functions: Record<string, Buffer>): Promise<void>

  abstract async listFunctions(): Promise<Functions>
}
