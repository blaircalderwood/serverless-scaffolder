'use strict';
const Generator = require('yeoman-generator');
const kebabCase = require('lodash/kebabCase');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'awsLambdaSg',
        message: 'AWS Lambda Security Group:',
      },
      {
        type: 'input',
        name: 'awsLambdaSubnet1',
        message: 'AWS Lambda Subnet 1:',
      },
      {
        type: 'input',
        name: 'awsLambdaSubnet2',
        message: 'AWS Lambda Subnet 2:',
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const environments = ['dev', 'test'];

    const { awsLambdaSg, awsLambdaSubnet1, awsLambdaSubnet2 } = this.props;

    const awsAccountNumber = this.config.get('awsAccountNumber');
    const awsRegion = this.config.get('awsRegion');
    const projectName = this.config.get('projectName');

    const mappings = {
      projectNameKebabCase: kebabCase(projectName),
      projectName,
      awsRegion,
      awsAccountNumber,
      awsLambdaSg,
      awsLambdaSubnet1,
      awsLambdaSubnet2,
    };

    this.destinationRoot('iac');
    environments.forEach(environment => {
      this.fs.copyTpl(
        this.templatePath('./environment/'),
        this.destinationPath(`./lambda/${environment}/`),
        { ...mappings, environment }
      );
    });

    this.fs.copyTpl(
      this.templatePath('./terraform-aws-lambda/'),
      this.destinationPath(`./modules/terraform-aws-lambda/`),
      mappings
    );
    this.destinationRoot('../');
  }
};
