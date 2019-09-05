'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const PromptGenerator = require('../../prompt-generator');

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(`Welcome to the ${chalk.red('generator-serverless-scaffolder')}!`)
    );

    const promptGenerator = new PromptGenerator(this);

    const prompts = [
      promptGenerator.projectName,
      promptGenerator.authorName,
      promptGenerator.authorEmail,
      promptGenerator.codeCoverage,
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

  _isNumber(str) {
    return isNaN(str) ? 'Not a valid number.' : true;
  }

  _isValidRegion(str) {
    const regionRegex = /^[a-z][a-z]-[a-z]*-[0-9]{1}/;

    return str.match(regionRegex) ? true : 'Not a valid AWS region.';
  }
};
