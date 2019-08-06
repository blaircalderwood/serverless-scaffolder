'use strict';
const Generator = require('yeoman-generator');

const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');
const kebabCase = require('lodash/kebabCase');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'serviceName',
        message: 'Service name:',
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const { serviceName } = this.props;
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
