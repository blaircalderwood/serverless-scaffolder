'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(`Welcome to the ${chalk.red('generator-serverless-scaffolder')}!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Lambda name:',
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Author name:',
        default: this.user.git.name,
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author email:',
        default: this.user.git.email,
      },
      {
        type: 'number',
        name: 'codeCoverage',
        message:
          'What is the minimum acceptable % of code coverage in your project?',
        default: '80',
      },
      {
        type: 'input',
        name: 'awsRegion',
        message: 'AWS Region:',
        validate: this._isValidRegion,
      },
      {
        type: 'input',
        name: 'awsAccountNumber',
        message: 'AWS Account Number:',
        validate: this._isNumber,
      },
    ];

    if (this.option('with-iac')) {
      this.composeWith(require.resolve('../iac'));
    }

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const mappings = {
      projectName: this.props.projectName,
      authorName: this.props.authorName,
      authorEmail: this.props.authorEmail,
      authorUrl: '',
      codeCoverage: this.props.codeCoverage,
      awsRegion: this.props.awsRegion,
      awsAccountNumber: this.props.awsAccountNumber,
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
      awsRegion: this.props.awsRegion,
      awsAccountNumber: this.props.awsAccountNumber,
      projectName: this.props.projectName,
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
