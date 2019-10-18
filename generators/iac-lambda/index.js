'use strict';
const Generator = require('yeoman-generator');
const kebabCase = require('lodash/kebabCase');

const PromptsService = require('../non-generator-files/prompts/prompts.service');

module.exports = class extends Generator {
  prompting() {
    const promptsService = new PromptsService(this);

    const prompts = [promptsService.securityGroup, promptsService.subnets];

    if (!this.config.get('awsAccountNumber')) {
      prompts.push(promptsService.awsAccountNumber);
    }

    if (!this.config.get('awsRegion')) {
      prompts.push(promptsService.awsRegion);
    }

    if (!this.config.get('environments')) {
      prompts.push(promptsService.environments);
    }

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const { awsLambdaSg, awsLambdaSubnets } = this.props;
    const environments =
      this.config.get('environments') || this.props.environments.split(', ');

    const awsAccountNumber =
      this.props.awsAccountNumber || this.config.get('awsAccountNumber');

    const awsRegion = this.props.awsRegion || this.config.get('awsRegion');
    const projectName = this.config.get('projectName');

    const mappings = {
      projectNameKebabCase: kebabCase(projectName),
      projectName,
      awsRegion,
      awsAccountNumber,
      awsLambdaSg,
      awsLambdaSubnets,
      environments,
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

    this.config.set({ awsAccountNumber, awsRegion, environments });
  }
};
