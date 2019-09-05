const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('IAC-lambda subgenerator', () => {
  describe('one security group and subnets included in prompts', () => {
    const awsLambdaSg = 'a-test-sg';
    const awsLambdaSubnets = 'a-test-subnet';
    const awsAccountNumber = '00119922';
    const awsRegion = 'eu-west-1';

    beforeAll(() => {
      return helpers.run(path.join(__dirname, '.')).withPrompts({
        awsLambdaSg,
        awsLambdaSubnets,
        awsAccountNumber,
        awsRegion,
      });
    });

    it('generates an IAC folder and Lambda subfolder with both dev and test environments', () => {
      assert.file(['iac/lambda/dev', 'iac/lambda/test']);
    });

    it('generates all required files for both dev and test environments', () => {
      const devEnvPath = 'iac/lambda/dev/';

      assert.file([
        `${devEnvPath}data.aws_ssm_parameter.version.tf`,
        `${devEnvPath}locals.tf`,
        `${devEnvPath}Makefile`,
        `${devEnvPath}module.lambda.tf`,
        `${devEnvPath}outputs.tf`,
        `${devEnvPath}provider.aws.tf`,
        `${devEnvPath}remote_state.tf`,
        `${devEnvPath}terraform.tf`,
        `${devEnvPath}variables.tf`,
      ]);

      const testEnvPath = 'iac/lambda/test/';

      assert.file([
        `${testEnvPath}data.aws_ssm_parameter.version.tf`,
        `${testEnvPath}locals.tf`,
        `${testEnvPath}Makefile`,
        `${testEnvPath}module.lambda.tf`,
        `${testEnvPath}outputs.tf`,
        `${testEnvPath}provider.aws.tf`,
        `${testEnvPath}remote_state.tf`,
        `${testEnvPath}terraform.tf`,
        `${testEnvPath}variables.tf`,
      ]);
    });

    it('includes Terraform for one security group and subnet when given the appropriate prompts', () => {
      assert.fileContent('iac/lambda/dev/terraform.tfvars', awsLambdaSg);
      assert.fileContent('iac/lambda/dev/terraform.tfvars', awsLambdaSubnets);
      assert.fileContent('iac/lambda/test/terraform.tfvars', awsLambdaSg);
      assert.fileContent('iac/lambda/test/terraform.tfvars', awsLambdaSubnets);
    });

    it('uses the AWS account number entered in prompts when no account number found in config', () => {
      assert.fileContent('iac/lambda/dev/terraform.tfvars', awsAccountNumber);
      assert.fileContent('iac/lambda/test/terraform.tfvars', awsAccountNumber);
    });

    it('uses the AWS region entered in prompts when no region found in config', () => {
      assert.fileContent('iac/lambda/dev/remote_state.tf', awsRegion);
      assert.fileContent('iac/lambda/test/remote_state.tf', awsRegion);
    });
  });

  describe('AWS region and account number saved in config', () => {
    const awsLambdaSg = 'a-test-sg';
    const awsLambdaSubnets = 'a-test-subnet';
    const awsAccountNumber = '11886677';
    const awsRegion = 'eu-west-1';

    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '.'))
        .withPrompts({ awsLambdaSg, awsLambdaSubnets })
        .withLocalConfig({ awsAccountNumber, awsRegion });
    });

    it('uses the AWS account number saved in config when included', () => {
      assert.fileContent('iac/lambda/dev/terraform.tfvars', awsAccountNumber);
      assert.fileContent('iac/lambda/test/terraform.tfvars', awsAccountNumber);
    });

    it('uses the AWS region saved in config when included', () => {
      assert.fileContent('iac/lambda/dev/remote_state.tf', awsRegion);
      assert.fileContent('iac/lambda/test/remote_state.tf', awsRegion);
    });
  });

  describe('multiple subnets in prompts', () => {
    const awsLambdaSg = 'a-test-sg';
    const awsLambdaSubnets = 'a-test-subnet, another-test-subnet, a-third-one';
    const awsAccountNumber = '00220033';
    const awsRegion = 'eu-west-1';

    beforeAll(() => {
      return helpers.run(path.join(__dirname, '.')).withPrompts({
        awsLambdaSg,
        awsLambdaSubnets,
        awsAccountNumber,
        awsRegion,
      });
    });

    it('includes Terraform for one security group and multiple subnets when given the appropriate prompts', () => {
      assert.fileContent('iac/lambda/dev/terraform.tfvars', awsLambdaSg);
      assert.fileContent('iac/lambda/dev/terraform.tfvars', awsLambdaSubnets);
      assert.fileContent('iac/lambda/test/terraform.tfvars', awsLambdaSg);
      assert.fileContent('iac/lambda/test/terraform.tfvars', awsLambdaSubnets);
    });
  });

  describe('no security group / subnets in prompts', () => {
    const awsLambdaSg = '';
    const awsLambdaSubnets = '';
    const awsAccountNumber = '00220033';
    const awsRegion = 'eu-west-1';

    beforeAll(() => {
      return helpers.run(path.join(__dirname, '.')).withPrompts({
        awsLambdaSg,
        awsLambdaSubnets,
        awsAccountNumber,
        awsRegion,
      });
    });

    it('includes Terraform for no security groups or subnets when given the appropriate prompts', () => {
      const vpcConfigRegex = 'vpc_config = []';

      assert.fileContent('iac/lambda/dev/terraform.tfvars', vpcConfigRegex);
      assert.fileContent('iac/lambda/test/terraform.tfvars', vpcConfigRegex);
    });
  });
});
