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

    if (!this.config.get('awsAccountNumber')) {
      prompts.push(promptsService.awsAccountNumber);
    }

    if (!this.config.get('awsRegion')) {
      prompts.push(promptsService.awsRegion);
    }

    if (!this.config.get('environments')) {
      prompts.push(promptsService.environments);
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

    const awsAccountNumber =
      this.props.awsAccountNumber || this.config.get('awsAccountNumber');
    const awsRegion = this.props.awsRegion || this.config.get('awsRegion');
    const environments =
      this.config.get('environments') || this.props.environments.split(', ');

    const mappings = {
      dynamoDbTableName,
      hashKey,
      hashKeyType,
      rangeKey,
      rangeKeyType,
      awsRegion,
    };

    this.destinationRoot('iac/dynamodb');
    environments.forEach(environment => {
      this.fs.copyTpl(
        this.templatePath('./'),
        this.destinationPath(`./${environment}/`),
        { ...mappings, environment }
      );
    });

    this.destinationRoot('../../');

    this.config.set({
      awsRegion,
      awsAccountNumber,
      environments,
    });
  }
};
