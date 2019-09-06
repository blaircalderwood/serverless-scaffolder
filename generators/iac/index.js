'use strict';
const Generator = require('yeoman-generator');

const PromptsService = require('../../prompts/prompts.service');

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

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const awsAccountNumber =
      this.props.awsAccountNumber || this.config.get('awsAccountNumber');
    const awsRegion = this.props.awsRegion || this.config.get('awsRegion');

    this.config.set({
      awsRegion,
      awsAccountNumber,
    });

    this.composeWith(require.resolve('../iac-ci'));
    this.composeWith(require.resolve('../iac-lambda'));
  }
};
