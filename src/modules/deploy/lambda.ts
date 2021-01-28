import fs from 'fs'
import AWS from 'aws-sdk'

AWS.config.update({ region: 'us-east-2' })

export const createFunction = async () => {
  const lambda = new AWS.Lambda()

  const params = {
    Code: {
      ZipFile: fs.readFileSync('./function.zip'),
    },
    Description: 'Test function in nodejs deployed using nodejs',
    FunctionName: 'hello-node-1',
    Handler: 'index.handler',
    Publish: true,
    Role: 'arn:aws:iam::688157472274:role/lambda-ex',
    Runtime: 'nodejs12.x',
    Timeout: 15,
    TracingConfig: {
      Mode: 'Active',
    },
  }

  const apigateway = new AWS.ApiGatewayV2()

  const functionResp = await lambda.createFunction(params).promise()

  console.log('function', functionResp)

  const respApi = await apigateway
    .createApi({
      Name: 'hello-node-1-api-gateway-v2',
      ProtocolType: 'HTTP',
      Target: functionResp.FunctionArn,
    })
    .promise()

  console.log('api', respApi)

  const respPermission = await lambda
    .addPermission({
      FunctionName: functionResp.FunctionName!,
      StatementId: 'random-string',
      Action: 'lambda:InvokeFunction',
      Principal: 'apigateway.amazonaws.com',
      SourceArn: `arn:aws:execute-api:us-east-2:688157472274:${respApi.ApiId}/*/$default`,
    })
    .promise()

  console.log('permission', respPermission)
}
