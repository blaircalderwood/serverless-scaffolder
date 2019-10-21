'use strict';
const Generator = require('yeoman-generator');

const PromptsService = require('../non-generator-files/prompts/prompts.service');

module.exports = class extends Generator {
  prompting() {
    const promptsService = new PromptsService(this);

    const prompts = [];

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
    const awsAccountNumber =
      this.props.awsAccountNumber || this.config.get('awsAccountNumber');
    const awsRegion = this.props.awsRegion || this.config.get('awsRegion');
    const environments =
      this.config.get('environments') || this.props.environments.split(', ');

    this.config.set({
      awsRegion,
      awsAccountNumber,
      environments,
    });

    this.composeWith(require.resolve('../iac-ci'));
    this.composeWith(require.resolve('../iac-lambda'));

    this.option('apigateway');

    if (this.options.apigateway) {
      this.composeWith(require.resolve('../iac-apigateway'));
    }
  }
};
