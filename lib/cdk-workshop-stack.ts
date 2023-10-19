import { Stack, StackProps, App } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class CdkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    // define an AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      // execution environment
      runtime: lambda.Runtime.NODEJS_18_X,
      // code loaded from "lambda" directory
      code: lambda.Code.fromAsset('lambda'),
      // file is "hello", funcion is "handler"
      handler: 'hello.handler'
    })
    
    // define an API Gateway REST API resource backed by our "hello" function.
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: hello
    })

  }
}
