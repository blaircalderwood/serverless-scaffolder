'use strict';
const Generator = require('yeoman-generator');
const kebabCase = require('lodash/kebabCase');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('constantsName', { required: true, type: String });
  }

  writing() {
    const { constantsName } = this.options;
    const fileName = kebabCase(constantsName);

    this.fs.copy(
      this.templatePath('./constants-name.js'),
      this.destinationPath(`./src/constants/${fileName}.js`)
    );
  }
};
