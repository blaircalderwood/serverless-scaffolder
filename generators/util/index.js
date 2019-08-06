'use strict';
const Generator = require('yeoman-generator');

const { toKebabCase, toCamelCase } = require('./strings.util.js');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'utilName',
        message: 'Util name:',
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const { utilName } = this.props;
    const folderName = toCamelCase(utilName);
    const fileName = toKebabCase(utilName);

    this.fs.copy(
      this.templatePath('./util-name.util.js'),
      this.destinationPath(`./src/utils/${folderName}/${fileName}.util.js`)
    );

    this.fs.copy(
      this.templatePath('./util-name.spec.js'),
      this.destinationPath(`./src/utils/${folderName}/${fileName}.spec.js`)
    );
  }
};
