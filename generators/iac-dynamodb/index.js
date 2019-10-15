'use strict';
const Generator = require('yeoman-generator');

const PromptsService = require('../non-generator-files/prompts/prompts.service');

module.exports = class extends Generator {
  prompting() {
    const promptsService = new PromptsService();

    const prompts = [
      promptsService.dynamoDbTableName,
      promptsService.hashKey,
      promptsService.hashKeyType,
      promptsService.rangeKey,
      promptsService.rangeKeyType,
    ];

    if (!this.config.get('awsRegion')) {
      prompts.push(promptsService.awsRegion);
    }

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const keyTypes = {
      String: 'S',
      Binary: 'B',
      Number: 'N',
    };
    const hashKeyType = keyTypes[this.props.hashKeyType];
    const rangeKeyType = keyTypes[this.props.rangeKeyType];
    const { dynamoDbTableName, hashKey, rangeKey } = this.props;
    const awsRegion = this.props.awsRegion || this.config.get('awsRegion');

    const mappings = {
      dynamoDbTableName,
      hashKey,
      hashKeyType,
      rangeKey,
      rangeKeyType,
      awsRegion,
    };

    this.destinationRoot('iac/dynamodb');
    this.fs.copyTpl(
      this.templatePath('./'),
      this.destinationPath('./'),
      mappings
    );

    this.destinationRoot('../../');
  }
};
