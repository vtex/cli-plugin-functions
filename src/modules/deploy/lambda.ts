import fs from 'fs'
import AWS from 'aws-sdk'

AWS.config.update({ region: 'us-east-2' })

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

lambda.createFunction(params, function handler(err, data) {
  if (err) console.log(err, err.stack)
  // an error occurred
  else console.log(data) // successful response
})
