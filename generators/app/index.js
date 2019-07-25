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
        message: 'Lambda name:',
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Author name:',
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author email:',
      },
      {
        type: 'number',
        name: 'codeCoverage',
        message: 'What is the minimum acceptable % of code coverage in your project?',
        default: '80',
      },
    ];

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
    };

    this.destinationRoot(this.props.projectName);
    this.fs.copyTpl(
      this.templatePath('./**/*'),
      this.destinationPath('./'),
      mappings,
    );

    this.fs.copyTpl(
      this.templatePath('./**/.*'),
      this.destinationPath('./'),
      mappings,
    );
  }

  install() {
    this.npmInstall();
  }
};
