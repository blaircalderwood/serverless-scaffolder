'use strict';
const Generator = require('yeoman-generator');

const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');
const kebabCase = require('lodash/kebabCase');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('serviceName', { required: true, type: String });
  }

  writing() {
    const { serviceName } = this.options;
    const mappings = {
      serviceName,
      className: upperFirst(serviceName),
    };
    const folderName = camelCase(serviceName);
    const fileName = kebabCase(serviceName);

    this.fs.copyTpl(
      this.templatePath('./service-name.service.js'),
      this.destinationPath(
        `./src/services/${folderName}/${fileName}.service.js`
      ),
      mappings
    );

    this.fs.copyTpl(
      this.templatePath('./service-name.spec.js'),
      this.destinationPath(`./src/services/${folderName}/${fileName}.spec.js`),
      mappings
    );
  }
};
