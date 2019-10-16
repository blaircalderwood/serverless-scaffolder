'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const PromptsService = require('../non-generator-files/prompts/prompts.service');

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(`Welcome to the ${chalk.red('Serverless Scaffolder')}!`));

    const promptsService = new PromptsService(this);

    const prompts = [
      promptsService.projectName,
      promptsService.authorName,
      promptsService.authorEmail,
      promptsService.codeCoverage,
    ];

    this.option('iac');

    if (this.options.iac) {
      this.composeWith(require.resolve('../iac'));
    }

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const { projectName, authorName, authorEmail, codeCoverage } = this.props;

    const mappings = {
      projectName,
      authorName,
      authorEmail,
      authorUrl: '',
      codeCoverage,
    };

    this.destinationRoot(this.props.projectName);
    this.fs.copyTpl(
      this.templatePath('./**/*'),
      this.destinationPath('./'),
      mappings
    );

    this.fs.copyTpl(
      this.templatePath('./**/.*'),
      this.destinationPath('./'),
      mappings
    );

    this.config.set({
      projectName,
    });
  }

  install() {
    this.npmInstall();
  }
};
