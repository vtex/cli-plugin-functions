import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { parse as urlParse } from 'url'
import { format } from 'date-fns'

export interface EventPayload {
  url: string
  method: string
  path: string
  protocol: string
  ip: string
  headers: Record<string, string>
  body: string
  queryStringParameters: Record<string, string>
}

export const lambdaEvent = (payload: EventPayload): APIGatewayProxyEventV2 => {
  const now = new Date()

  return {
    version: '2.0',
    routeKey: '$default',
    rawPath: '/',
    isBase64Encoded: false,

    headers: payload.headers,
    queryStringParameters: payload.queryStringParameters,
    rawQueryString: urlParse(payload.url).query || '',
    body: payload.body,

    requestContext: {
      accountId: 'accountid',
      apiId: 'apiid',
      domainName: 'apiid.execute-api.us-east-2.amazonaws.com',
      domainPrefix: 'domainprefix',
      http: {
        method: payload.method,
        path: payload.path,
        protocol: payload.protocol,
        sourceIp: payload.ip,
        userAgent: payload.headers['user-agent'],
      },
      requestId: 'request-id',
      routeKey: '$default',
      stage: '$default',
      time: format(now, 'dd/MMM/u:HH:mm:ss xx'),
      timeEpoch: +now,
    },
  }
}
