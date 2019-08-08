'use strict';
const Generator = require('yeoman-generator');
const upperFirst = require('lodash/upperFirst');
const kebabCase = require('lodash/kebabCase');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('errorName', { required: true, type: String });
  }

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'errorMessage',
        message: 'Default error message:',
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const { errorMessage } = this.props;
    const { errorName } = this.options;

    const fileName = kebabCase(errorName);
    const mappings = {
      className: upperFirst(errorName),
      errorMessage,
    };

    this.fs.copyTpl(
      this.templatePath('./error-name.error.js'),
      this.destinationPath(`./src/errors/${fileName}.error.js`),
      mappings
    );
  }
};
