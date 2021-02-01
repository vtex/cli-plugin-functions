import { APIGatewayProxyEventV2, Context } from 'aws-lambda'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { readdirSync } from 'fs'
import path from 'path'
import { parse as urlParse } from 'url'
import { format } from 'date-fns'

export const functionsServer = async (basePath: string, port: number) => {
  const app: Application = express()

  app.use(cors())
  const endpoints: { [key: string]: (event: APIGatewayProxyEventV2, context: Context) => any } = {}

  console.log('\nFunctions:')

  await Promise.all(
    readdirSync(basePath).map(async (item) => {
      const { handler } = await import(path.join(basePath, item))
      const functionName = path.parse(item).name

      endpoints[functionName] = handler

      console.log(`- http://localhost:${8080}/functions/${functionName}`)
    })
  )

  app.all('/*', async (req: Request, res: Response) => {
    const [endpoint] = req.params['0'].split('/')

    const queryStringParameters: { [key: string]: string } = {}

    Object.entries(req.query).forEach(([key, value]) => {
      if (value !== undefined) {
        queryStringParameters[key] = value.toString()
      }
    })

    const headers: { [key: string]: string } = {}

    Object.entries(req.headers).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          headers[key] = value[value.length - 1]
        } else {
          headers[key] = value
        }
      }
    })

    const now = new Date()
    const lambdaEvent: APIGatewayProxyEventV2 = {
      version: '2.0',
      routeKey: '$default',
      rawPath: '/',
      isBase64Encoded: false,

      headers,
      queryStringParameters,
      rawQueryString: urlParse(req.url).query || '',
      body: req.body,

      requestContext: {
        accountId: 'accountid',
        apiId: 'apiid',
        domainName: 'apiid.execute-api.us-east-2.amazonaws.com',
        domainPrefix: 'domainprefix',
        http: {
          method: req.method,
          path: req.path,
          protocol: req.protocol,
          sourceIp: req.ip,
          userAgent: req.headers['user-agent']!,
        },
        requestId: 'request-id',
        routeKey: '$default',
        stage: '$default',
        time: format(now, 'dd/MMM/u:HH:mm:ss xx'),
        timeEpoch: +now,
      },
    }

    try {
      const { body, statusCode } = await endpoints[endpoint](lambdaEvent, {} as Context)

      res.status(statusCode).json(body)
    } catch (error) {
      res.status(400).json({ error })
    }
  })

  app.listen(port, () => {
    console.log(`\nServer is listening on: http://localhost:${port}`)
  })
}
