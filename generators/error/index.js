'use strict';
const Generator = require('yeoman-generator');
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');
const kebabCase = require('lodash/kebabCase');

const PromptGenerator = require('../../prompts/prompts.service');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('errorName', { required: true, type: String });
  }

  prompting() {
    const promptsService = new PromptGenerator();

    const prompts = [promptsService.errorMessage];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const { errorMessage } = this.props;
    const { errorName } = this.options;

    const fileName = kebabCase(errorName);
    const folderName = camelCase(errorName);
    const className = upperFirst(folderName);

    const mappings = {
      className,
      errorMessage,
    };

    this.fs.copyTpl(
      this.templatePath('./error-name.error.js'),
      this.destinationPath(`./src/errors/${fileName}.error.js`),
      mappings
    );
  }
};
