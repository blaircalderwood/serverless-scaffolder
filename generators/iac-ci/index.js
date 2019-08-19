'use strict';
const Generator = require('yeoman-generator');
const kebabCase = require('lodash/kebabCase');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'pipelineName',
        message: 'Pipeline name:',
      },
      {
        type: 'input',
        name: 'awsRegion',
        message: 'AWS Region:',
      },
      {
        type: 'input',
        name: 'awsAccountNumber',
        message: 'AWS Account Number:',
      },
      {
        type: 'input',
        name: 'gitRepo',
        message: 'Git respository for build source (HTTPS):',
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const environments = ['dev', 'test'];

    const mappings = {
      pipelineName: this.props.pipelineName,
      awsRegion: this.props.awsRegion,
      awsAccountNumber: this.props.awsAccountNumber,
      gitRepo: this.props.gitRepo,
    };

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
  }
};
