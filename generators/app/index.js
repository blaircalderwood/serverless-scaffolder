'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the best ${chalk.red('generator-serverless-scaffolder')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of the Lambda you wish to create?',
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('./main-generator/**/*'),
      this.destinationRoot(this.props.projectName),
      { projectName: this.props.projectName }
    );
    
    this.fs.copyTpl(
      this.templatePath('./**/.*'),
      this.destinationRoot('./'),
      { yeomanProjectName: this.props.projectName }
    );
  }

  install() {
    this.npmInstall();
  }
};
