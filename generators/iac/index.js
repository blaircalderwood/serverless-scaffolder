'use strict';
const Generator = require('yeoman-generator');

const PromptGenerator = require('../../prompt-generator');

module.exports = class extends Generator {
  prompting() {
    const promptGenerator = new PromptGenerator(this);

    const prompts = [];

    if (!this.config.get('awsAccountNumber')) {
      prompts.push(promptGenerator.awsAccountNumber);
    }

    if (!this.config.get('awsRegion')) {
      prompts.push(promptGenerator.awsRegion);
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
