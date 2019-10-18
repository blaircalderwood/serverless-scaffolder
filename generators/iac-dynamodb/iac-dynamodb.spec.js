const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('IAC-dynamodb subgenerator', () => {
  describe('account number, aws region and environments included in prompts', () => {
    const awsAccountNumber = '00119922';
    const awsRegion = 'eu-west-1';
    const environments = 'dev, test, pre-prod';

    beforeAll(() => {
      return helpers.run(path.join(__dirname, '.')).withPrompts({
        awsAccountNumber,
        awsRegion,
        environments,
      });
    });

    it('generates an IAC folder and dynamo subfolder with a folder for each given environment', () => {
      assert.file([
        'iac/dynamodb/dev',
        'iac/dynamodb/test',
        'iac/dynamodb/pre-prod',
      ]);
    });

    it('generates all required files for each given environment', () => {
      const devEnvPath = 'iac/dynamodb/dev/';

      assert.file([
        `${devEnvPath}dynamodb_table.tf`,
        `${devEnvPath}provider.aws.tf`,
        `${devEnvPath}terraform.tf`,
        `${devEnvPath}terraform.tfvars`,
        `${devEnvPath}variables.tf`,
      ]);

      const testEnvPath = 'iac/dynamodb/test/';

      assert.file([
        `${testEnvPath}dynamodb_table.tf`,
        `${testEnvPath}provider.aws.tf`,
        `${testEnvPath}terraform.tf`,
        `${testEnvPath}terraform.tfvars`,
        `${testEnvPath}variables.tf`,
      ]);

      const preProdEnvPath = 'iac/dynamodb/pre-prod/';

      assert.file([
        `${preProdEnvPath}dynamodb_table.tf`,
        `${preProdEnvPath}provider.aws.tf`,
        `${preProdEnvPath}terraform.tf`,
        `${preProdEnvPath}terraform.tfvars`,
        `${preProdEnvPath}variables.tf`,
      ]);
    });

    it('uses the AWS region entered in prompts when no region found in config', () => {
      assert.fileContent('iac/dynamodb/dev/provider.aws.tf', awsRegion);
      assert.fileContent('iac/dynamodb/test/provider.aws.tf', awsRegion);
      assert.fileContent('iac/dynamodb/pre-prod/provider.aws.tf', awsRegion);
    });
  });

  describe('AWS region and account number saved in config', () => {
    const awsAccountNumber = '11886677';
    const awsRegion = 'eu-west-2';
    const environments = ['dev', 'test', 'prod'];

    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '.'))
        .withLocalConfig({ awsAccountNumber, awsRegion, environments });
    });

    it('uses the AWS region entered in config when region present in config', () => {
      assert.fileContent('iac/dynamodb/dev/provider.aws.tf', awsRegion);
      assert.fileContent('iac/dynamodb/test/provider.aws.tf', awsRegion);
      assert.fileContent('iac/dynamodb/prod/provider.aws.tf', awsRegion);
    });
  });
});
