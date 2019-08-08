'use strict';
const Generator = require('yeoman-generator');
const camelCase = require('lodash/camelCase');
const kebabCase = require('lodash/kebabCase');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('utilName', { required: true, type: String });
  }

  writing() {
    const { utilName } = this.options;
    const folderName = camelCase(utilName);
    const fileName = kebabCase(utilName);

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
