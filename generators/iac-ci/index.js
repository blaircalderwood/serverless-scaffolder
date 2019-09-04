'use strict';
const Generator = require('yeoman-generator');

const PromptGenerator = require('../../prompt-generator');

module.exports = class extends Generator {
  prompting() {
    const promptGenerator = new PromptGenerator(this);

    const prompts = [promptGenerator.pipelineName, promptGenerator.gitRepo];

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
};
