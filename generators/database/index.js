'use strict';
const Generator = require('yeoman-generator');

const PromptsService = require('../non-generator-files/prompts/prompts.service');

module.exports = class extends Generator {
  prompting() {
    const promptsService = new PromptsService(this);

    const prompts = [];

    if (!this.config.get('awsRegion')) {
      prompts.push(promptsService.awsRegion);
    }

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const awsRegion = this.props.awsRegion || this.config.get('awsRegion');

    const mappings = { awsRegion };

    this.fs.copyTpl(
      this.templatePath('./'),
      this.destinationPath(`./src/services/`),
      mappings
    );

    this.config.set({ awsRegion });
  }
};
