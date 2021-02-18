export type Functions = Record<string, { url: string }>

export abstract class BaseProvider {
  public account: string

  constructor(account: string) {
    this.account = account
  }

  public abstract async createOrUpdateFunction(functionName: string, content: Buffer): Promise<void>

  public abstract async createOrUpdateFunctionList(functions: Record<string, Buffer>): Promise<void>

  public abstract async listFunctions(): Promise<Functions>
}
