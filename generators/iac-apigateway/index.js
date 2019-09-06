'use strict';
const Generator = require('yeoman-generator');
const kebabCase = require('lodash/kebabCase');

const PromptGenerator = require('../../prompt-generator');

module.exports = class extends Generator {
  prompting() {
    const promptGenerator = new PromptGenerator(this);

    const prompts = [promptGenerator.pathPart];

    if (!this.config.get('awsAccountNumber')) {
      prompts.push(promptGenerator.awsAccountNumber);
    }

    if (!this.config.get('awsRegion')) {
      prompts.push(promptGenerator.awsRegion);
    }

    if (!this.config.get('awsAccountNumber')) {
      prompts.push({
        type: 'input',
        name: 'awsAccountNumber',
        message: 'AWS Account Number:',
        validate: this._isNumber,
      });
    }

    if (!this.config.get('awsRegion')) {
      prompts.push({
        type: 'input',
        name: 'awsRegion',
        message: 'AWS Region:',
        validate: this._isValidRegion,
      });
    }

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const environments = ['dev', 'test'];

    const pathPart = this.props.pathPart;

    const awsAccountNumber = this.config.get('awsAccountNumber');
    const awsRegion = this.config.get('awsRegion');
    const projectName = this.config.get('projectName');

    const mappings = {
      projectNameKebabCase: kebabCase(projectName),
      projectName,
      awsRegion,
      awsAccountNumber,
      pathPart,
    };

    this.destinationRoot('iac');
    environments.forEach(environment => {
      this.fs.copyTpl(
        this.templatePath('./environment/'),
        this.destinationPath(`./apigateway/${environment}/`),
        { ...mappings, environment }
      );
    });

    this.fs.copyTpl(
      this.templatePath('./terraform-aws-apigateway/'),
      this.destinationPath(`./modules/terraform-aws-apigateway/`),
      mappings
    );
    this.destinationRoot('../');

    this.config.set({ awsAccountNumber, awsRegion });
  }
};
