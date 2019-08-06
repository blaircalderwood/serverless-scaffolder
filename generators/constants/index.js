'use strict';
const Generator = require('yeoman-generator');
const kebabCase = require('lodash/kebabCase');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'constantsName',
        message: 'Constants name:',
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const { constantsName } = this.props;
    const fileName = kebabCase(constantsName);

    this.fs.copy(
      this.templatePath('./constants-name.js'),
      this.destinationPath(`./src/constants/${fileName}.js`)
    );
  }
};
