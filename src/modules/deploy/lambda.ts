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

  const apigateway = new AWS.APIGateway()

  const functionResp = await lambda.createFunction(params).promise()

  console.log('function', functionResp)

  const apiParams = {
    name: 'hello-node-1-rest-api',
  }

  const respRestApi = await apigateway.createRestApi(apiParams).promise()

  console.log('rest api', respRestApi)

  const resources = await apigateway.getResources({ restApiId: respRestApi.id! }).promise()

  /*
  apigateway.getRestApis({ }, function(_error, data) {
    console.dir(data, {depth: null})
    console.dir(_error, {depth: null})
  })
  */

  const resourceParams = {
    parentId: resources.items![0].id!,
    pathPart: 'hello',
    restApiId: respRestApi.id!,
  }

  const resourceResp = await apigateway.createResource(resourceParams).promise()

  console.log('resource resp', resourceResp)
}
