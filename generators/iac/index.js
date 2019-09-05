'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../iac-ci'));
    this.composeWith(require.resolve('../iac-lambda'));
  }
};
