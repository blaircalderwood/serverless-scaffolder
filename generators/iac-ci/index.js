'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'pipelineName',
        message: 'Pipeline name:',
        validate: this._checkLength,
      },
      {
        type: 'input',
        name: 'gitRepo',
        message: 'Git repository for build source (HTTPS):',
        validate: this._isValidUrl,
      },
    ];

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

    const { pipelineName, gitRepo } = this.props;

    const awsAccountNumber =
      this.props.awsAccountNumber || this.config.get('awsAccountNumber');
    const awsRegion = this.props.awsRegion || this.config.get('awsRegion');
    const mappings = { pipelineName, awsRegion, awsAccountNumber, gitRepo };

    this.destinationRoot('iac');
    environments.forEach(environment => {
      this.fs.copyTpl(
        this.templatePath('./environment/'),
        this.destinationPath(`./codebuild/deploy-${environment}/`),
        { ...mappings, environment }
      );
    });

    this.fs.copyTpl(
      this.templatePath('./terraform-aws-deploy/'),
      this.destinationPath(`./modules/terraform-aws-deploy/`),
      mappings
    );

    this.fs.copyTpl(
      this.templatePath('./build/'),
      this.destinationPath(`./codebuild/build/`),
      mappings
    );

    this.fs.copyTpl(
      this.templatePath('./codepipeline/'),
      this.destinationPath(`./codepipeline/`),
      mappings
    );
    this.fs.copyTpl(
      this.templatePath('./scripts/'),
      this.destinationPath(`../scripts/`),
      mappings
    );

    this.fs.copyTpl(
      this.templatePath('./Makefile'),
      this.destinationPath(`./Makefile`),
      mappings
    );

    this.fs.copyTpl(
      this.templatePath('./README.md'),
      this.destinationPath(`./README.md`),
      mappings
    );
    this.destinationRoot('../');

    this.config.set({
      awsRegion,
      awsAccountNumber,
    });
  }

  _checkLength(str) {
    return str.length < 50
      ? true
      : 'Length limit of 50 characters exceeded. Please choose a shorter name.';
  }

  _isNumber(str) {
    return isNaN(str) ? 'Not a valid number.' : true;
  }

  _isValidRegion(str) {
    const regionRegex = /^[a-z][a-z]-[a-z]*-[0-9]{1}/;

    return str.match(regionRegex) ? true : 'Not a valid AWS region.';
  }

  _isValidUrl(str) {
    const regionRegex = /https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    return str.match(regionRegex) ? true : 'Not a valid HTTPS URL.';
  }
};
