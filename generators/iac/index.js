'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../iac-ci'));
    this.composeWith(require.resolve('../iac-lambda'));
  }
};
