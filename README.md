# Serverless Scaffolder

The Serverless Scaffolder is a highly opinionated AWS Lambda generator built using the Yeoman scaffolding tool. This tool is fantastic for spinning up new Lambda projects very quickly and so works well in conjunction with a microservices based architecture.

## Getting Started

Install Yeoman and the scaffolder via npm:

```bash
npm install -g yo
npm install -g generator-serverless-scaffolder
```

Move into the directory you wish to create your app in (e.g. projects/) and run the generator:

```bash
yo serverless-scaffolder
```

If you want to generate the project with full CodeBuild / CodePipeline and Lambda Terraform IAC then run with the `--iac` flag.

```bash
yo serverless-scaffolder --iac
```

Answer the questions when prompted. The app will now be generated with everything you need to start a Lambda based project.

## What is generated?

- src folder with index.js and Lambda entry point function
- Linter with opinionated linting rules
- .gitignore file which includes files you will typically want to keep out of your git repository
- .nvmrc which locks the Lambda to Node version 10.14.1. This can be changed if needed. To use the version included here install nvm and run `nvm use`
- Pre-commit rules which (among other things) ensures AWS keys are not accidentally posted to a git repository (pre-commit will need to be installed for this to work)
- The Jest testing suite to unit test code
- A package.json file with all the necessarry npm installs and commands to get you started developing Lambda functions
- A Readme with all the information you'll need to get started

## Subgenerators

### Service

To generate a new service in the `src/services` folder of your generated project run

```bash
yo serverless-scaffolder:service
```

This will create a new service class and Jest test file to unit test the aforementioned class.

### DynamoDB Database Service

To generate a new DynamoDB database service in the `src/services` folder of your generated project run

```bash
yo serverless-scaffolder:database
```

This will create a new database service class which interacts with any DynamoDB table provided in the parameters. It will also create a Jest test file with a set of unit tests to test the aforementioned class.

This service has the following methods:

#### getItem

Gets an item from a DynamoDB table when given the table name and the keys. The partition key must be included while the sort is optional. These keys should be included in the following format:

```javaScript
{
  nameOfPartitionKey: {S: 'keyValue'},
  nameOfSortKey: {N: 'keyValue'},
}
```

Where `S` and `N` denote strings and numbers respectively. For more information on interactions with DynamoDB getItem visit the [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#getItem-property).

#### putItem

Puts an item into a DynamoDB table when given the table name and the full item including the keys. The item should be included in the following format:

```javaScript
{
  nameOfPartitionKey: {S: 'keyValue'},
  nameOfSortKey: {N: 'keyValue'},
  anExampleField: {S: 'an example value'}
}
```

Where `S` and `N` denote strings and numbers respectively. For more information on interactions with DynamoDB putItem visit the [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property).

### Util

To generate a new set of utils in the `src/utils` folder of your generated project run

```bash
yo serverless-scaffolder:util
```

This will create a new util file and Jest test file to unit test the aforementioned functions.

### Constants

To generate a new constants file in the `src/constants` folder of your generated project run

```bash
yo serverless-scaffolder:constants
```

This will create a new constants file.

### Errors

To generate a new error type file in the `src/errors` folder of your generated project run

```bash
yo serverless-scaffolder:error
```

This will create a new error class which can then be imported and thrown in any project JavaScript file.

### Infrastructure As Code

To generate all Terraform associated with standing up CodeBuild/CodePipeline and Lambda for a dev/test environment the following should be run from the root directory

```bash
yo serverless-scaffolder:iac
```

This will create all of the associated IAC in the `iac/` folder. If only the CI or the Lambda IAC is needed please run one of the subcommands found below.

#### Infrastructure As Code - CI (iac-ci)

To generate all associated Terraform to standup CodeBuild/CodePipeline for a dev/test environment located in `iac/`. This should be run from the root folder of your generated project.

```bash
yo serverless-scaffolder:iac-ci
```

All code will be generated in `iac/`.

#### Infrastructure As Code - Lambda (iac-lambda)

To generate all associated Terraform to standup lambda infrastructure for a dev/test environment. This should be run from the root folder of your generated project.

```bash
yo serverless-scaffolder:iac-lambda
```

All code will be generated in `iac/lambda`

#### Infrastructure As Code - API Gateway (iac-apigateway)

To generate all associated Terraform to standup API Gateway infrastructure for a dev/test environment. This should be run from the root folder of your generated project. The terraform should be ran after the Lambda terraform, as it depends on a lambda function being deployed in the same AWS account.

```bash
yo serverless-scaffolder:iac-apigateway
```

All code will be generated in `iac/apigateway`

## License

Apache-2.0 © [Blair Calderwood](https://github.com/blaircalderwood)

### Contributors

| [![Blair Calderwood][blaircalderwood_avatar]][blaircalderwood_homepage]<br/>[Blair Calderwood][blaircalderwood_homepage] | [![Matt Childs][mattchilds1_avatar]][mattchilds1_homepage]<br/>[Matt Childs][mattchilds1_homepage] | [![James Woolfenden][jameswoolfenden_avatar]][jameswoolfenden_homepage]<br/>[James Woolfenden][jameswoolfenden_homepage] |
| ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |


[blaircalderwood_homepage]: https://github.com/blaircalderwood
[blaircalderwood_avatar]: https://github.com/blaircalderwood.png?size=150
[mattchilds1_homepage]: https://github.com/mattchilds1
[mattchilds1_avatar]: https://github.com/mattchilds1.png?size=150
[jameswoolfenden_homepage]: https://github.com/jameswoolfenden
[jameswoolfenden_avatar]: https://github.com/jameswoolfenden.png?size=150
