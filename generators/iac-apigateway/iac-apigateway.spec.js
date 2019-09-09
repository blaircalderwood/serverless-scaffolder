const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('IAC-apigateway subgenerator', () => {
  describe('pathpart, account number and aws region included in prompts', () => {
    const pathPart = '/chatbot';
    const awsAccountNumber = '00119922';
    const awsRegion = 'eu-west-1';
    const projectName = 'test-project';

    beforeAll(() => {
      return helpers.run(path.join(__dirname, '.')).withPrompts({
        pathPart,
        awsAccountNumber,
        awsRegion,
        projectName,
      });
    });

    it('generates an IAC folder and apigateway subfolder with both dev and test environments', () => {
      assert.file(['iac/apigateway/dev', 'iac/apigateway/test']);
    });

    it('generates an IAC folder and terraform-aws-apigateway subfolder', () => {
      assert.file('iac/modules/terraform-aws-apigateway');
    });

    it('generates all required files for both dev and test environments', () => {
      const devEnvPath = 'iac/apigateway/dev/';

      assert.file([
        `${devEnvPath}module.apigateway.tf`,
        `${devEnvPath}provider.aws.tf`,
        `${devEnvPath}remote_state.tf`,
        `${devEnvPath}terraform.tf`,
        `${devEnvPath}variables.tf`,
      ]);

      const testEnvPath = 'iac/apigateway/test/';

      assert.file([
        `${devEnvPath}module.apigateway.tf`,
        `${devEnvPath}provider.aws.tf`,
        `${devEnvPath}remote_state.tf`,
        `${devEnvPath}terraform.tf`,
        `${devEnvPath}variables.tf`,
      ]);
    });

    it('includes Terraform for pathPart when given the appropriate prompts', () => {
      assert.fileContent('iac/apigateway/dev/terraform.tfvars', pathPart);
      assert.fileContent('iac/apigateway/test/terraform.tfvars', pathPart);
    });

    it('uses the AWS account number entered in prompts when no account number found in config', () => {
      assert.fileContent(
        'iac/apigateway/dev/terraform.tfvars',
        awsAccountNumber
      );
      assert.fileContent(
        'iac/apigateway/test/terraform.tfvars',
        awsAccountNumber
      );
    });

    it('uses the AWS region entered in prompts when no region found in config', () => {
      assert.fileContent('iac/apigateway/dev/remote_state.tf', awsRegion);
      assert.fileContent('iac/apigateway/test/remote_state.tf', awsRegion);
    });
  });

  describe('AWS region and account number saved in config', () => {
    const pathPart = '/api';
    const awsAccountNumber = '11886677';
    const awsRegion = 'eu-west-1';
    const projectName = 'configProjectName';

    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '.'))
        .withPrompts({ pathPart })
        .withLocalConfig({ awsAccountNumber, awsRegion, projectName });
    });

    it('uses pathPart from prompt when other params are driven by config', () => {
      assert.fileContent('iac/apigateway/dev/terraform.tfvars', pathPart);
      assert.fileContent('iac/apigateway/test/terraform.tfvars', pathPart);
    });

    it('uses the AWS account number saved in config when included', () => {
      assert.fileContent(
        'iac/apigateway/dev/terraform.tfvars',
        awsAccountNumber
      );
      assert.fileContent(
        'iac/apigateway/test/terraform.tfvars',
        awsAccountNumber
      );
    });

    it('uses the AWS region saved in config when included', () => {
      assert.fileContent('iac/apigateway/dev/remote_state.tf', awsRegion);
      assert.fileContent('iac/apigateway/test/remote_state.tf', awsRegion);
    });
  });
});
