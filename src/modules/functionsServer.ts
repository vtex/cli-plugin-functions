import { APIGatewayEvent, Context } from 'aws-lambda'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'

import { readdirSync } from 'fs'
import path from 'path'

const PORT = 8080

export const server = async (basePath: string) => {
  const app: Application = express()

  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  const endpoints: { [key: string]: (event: APIGatewayEvent, context: Context) => any } = {}

  console.log('\nFunctions:')

  await Promise.all(
    readdirSync(basePath).map(async (item) => {
      const { handler } = await import(path.join(basePath, item))
      const functionName = path.parse(item).name

      endpoints[functionName] = handler

      console.log(`- ${functionName}`)
    })
  )

  app.all('/*', async (req: Request, res: Response) => {
    const [endpoint] = req.params['0'].split('/')

    const lambdaEvent = {
      body: req.body,
      queryStringParameters: req.query,
      httpMethod: req.method,
      headers: req.headers,
      path: req.path,
      pathParameters: req.params,
    }

    try {
      const { body, statusCode } = await endpoints[endpoint](lambdaEvent as APIGatewayEvent, {} as Context)

      res.status(statusCode).json(body)
    } catch (error) {
      res.status(400).json({ error })
    }
  })

  app.listen(PORT, () => {
    console.log(`\nFunctions server is listening on: http://localhost:${PORT}`)
  })
}
