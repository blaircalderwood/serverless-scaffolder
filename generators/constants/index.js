'use strict';
const Generator = require('yeoman-generator');

const { toKebabCase } = require('./strings.util');

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
    const fileName = toKebabCase(constantsName);

    this.fs.copy(
      this.templatePath('./constants-name.js'),
      this.destinationPath(`./src/constants/${fileName}.js`)
    );
  }
};
