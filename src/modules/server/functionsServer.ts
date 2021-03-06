import { APIGatewayProxyEventV2, Context } from 'aws-lambda'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { readdirSync } from 'fs'
import path from 'path'
import { lambdaEvent } from '../utils/lambdaEvent'
import bodyParser from 'body-parser'

function stringifyValues(data: Record<string, any>) {
  const newData: Record<string, string> = {}

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      newData[key] = value.toString()
    }
  })

  return newData
}

async function getFunctions(basePath: string) {
  const endpoints: Record<string, (event: APIGatewayProxyEventV2, context: Context) => any> = {}

  console.log('\nFunctions:')

  await Promise.all(
    readdirSync(basePath).map(async (item) => {
      const { handler } = await import(path.join(basePath, item))
      const functionName = path.parse(item).name

      endpoints[functionName] = handler

      console.log(`- http://localhost:${8080}/functions/${functionName}`)
    })
  )

  return endpoints
}

export const functionsServer = async (basePath: string, port: number) => {
  const endpoints = await getFunctions(basePath)

  const app: Application = express()

  app.use(cors())
  app.use(bodyParser.raw({ type: '*/*' }))

  app.all('/*', async (req: Request, res: Response) => {
    const [endpoint] = req.params['0'].split('/')

    const event = lambdaEvent({
      body: req.body.toString(),
      ip: req.ip,
      method: req.method,
      path: req.path,
      protocol: req.protocol,
      url: req.url,

      headers: stringifyValues(req.headers),
      queryStringParameters: stringifyValues(req.query),
    })

    try {
      const { body, statusCode, headers } = await endpoints[endpoint](event, {} as Context)

      if (headers !== undefined) {
        Object.entries(headers).forEach(([key, value]) => res.set(key, value as string))
      }

      res.status(statusCode).send(body)
    } catch (error) {
      res.status(400).json({ error })
    }
  })

  app.listen(port, () => {
    console.log(`\nServer is listening on: http://localhost:${port}`)
  })
}
