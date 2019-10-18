'use strict';
const Generator = require('yeoman-generator');

const PromptsService = require('../non-generator-files/prompts/prompts.service');

module.exports = class extends Generator {
  prompting() {
    const promptsService = new PromptsService(this);

    const prompts = [promptsService.pipelineName, promptsService.gitRepo];

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
    const { pipelineName, gitRepo } = this.props;

    const awsAccountNumber =
      this.props.awsAccountNumber || this.config.get('awsAccountNumber');
    const awsRegion = this.props.awsRegion || this.config.get('awsRegion');

    const environments =
      this.config.get('environments') || this.props.environments.split(', ');

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
      environments,
    });
  }
};
