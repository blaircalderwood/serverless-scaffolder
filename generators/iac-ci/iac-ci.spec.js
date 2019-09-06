const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('IAC-lambda subgenerator', () => {
  describe('one security group and subnets included in prompts', () => {
    const pipelineName = 'a-test-pipeline';
    const gitRepo = 'https://example.com';
    const awsAccountNumber = '234254';
    const awsRegion = 'eu-west-1';

    beforeAll(() => {
      return helpers.run(path.join(__dirname, '.')).withPrompts({
        pipelineName,
        gitRepo,
        awsAccountNumber,
        awsRegion,
      });
    });

    it('generates IAC codebuild and codepipeline folders', () => {
      assert.file(['iac/codebuild', 'iac/codepipeline']);
    });

    it('generates IAC codebuild deploy folders for each environment', () => {
      assert.file(['iac/codebuild/deploy-dev', 'iac/codebuild/deploy-test']);
    });

    it('generates all required codebuild build files', () => {
      const basePath = 'iac/codebuild/build/';

      assert.file([
        `${basePath}module.codebuild.tf`,
        `${basePath}remote_state.tf`,
        `${basePath}variables.tf`,
        `${basePath}aws_iam_policy.additionalneeds.tf`,
        `${basePath}buildspec.yml`,
        `${basePath}outputs.tf`,
        `${basePath}terraform.tf`,
        `${basePath}aws_s3_bucket_policy.access-artifact.tf`,
        `${basePath}data.aws_caller_identity.current.tf`,
        `${basePath}provider.aws.tf`,
        `${basePath}terraform.tfvars`,
      ]);
    });

    it('generates all required codebuild deploy files for each environment', () => {
      const baseDevPath = 'iac/codebuild/deploy-dev/';
      const baseTestPath = 'iac/codebuild/deploy-test/';

      assert.file([
        `${baseDevPath}data.aws_caller_identity.tf`,
        `${baseDevPath}outputs.tf`,
        `${baseDevPath}remote_state.tf`,
        `${baseDevPath}variables.tf`,
        `${baseDevPath}buildspec.yml`,
        `${baseDevPath}module.codebuild.tf`,
        `${baseDevPath}provider.aws.tf`,
        `${baseDevPath}terraform.tfvars`,
      ]);

      assert.file([
        `${baseTestPath}data.aws_caller_identity.tf`,
        `${baseTestPath}outputs.tf`,
        `${baseTestPath}remote_state.tf`,
        `${baseTestPath}variables.tf`,
        `${baseTestPath}buildspec.yml`,
        `${baseTestPath}module.codebuild.tf`,
        `${baseTestPath}provider.aws.tf`,
        `${baseTestPath}terraform.tfvars`,
      ]);
    });

    it('generates all required codepipeline files', () => {
      const basePath = 'iac/codepipeline/';

      assert.file([
        `${basePath}module.codepipeline.tf`,
        `${basePath}module.slacknotifier.tf`,
        `${basePath}provider.aws.tf`,
        `${basePath}remote_state.tf`,
        `${basePath}terraform.tfvars`,
        `${basePath}variables.tf`,
      ]);
    });

    it('generates all required script files', () => {
      const basePath = 'scripts/';

      assert.file([
        `${basePath}buildno.sh`,
        `${basePath}provision-infrastructure.sh`,
      ]);
    });

    it('includes the pipelineName entered in prompts in applicable files', () => {
      assert.fileContent('iac/codebuild/build/buildno.sh', pipelineName);
      assert.fileContent('iac/codebuild/build/buildspec.yml', pipelineName);
      assert.fileContent('iac/codebuild/build/remote_state.tf', pipelineName);
      assert.fileContent('iac/codebuild/build/terraform.tfvars', pipelineName);
      assert.fileContent(
        'iac/codebuild/deploy-dev/buildspec.yml',
        pipelineName
      );
      assert.fileContent(
        'iac/codebuild/deploy-test/buildspec.yml',
        pipelineName
      );
      assert.fileContent(
        'iac/codebuild/deploy-dev/remote_state.tf',
        pipelineName
      );
      assert.fileContent(
        'iac/codebuild/deploy-test/remote_state.tf',
        pipelineName
      );
      assert.fileContent(
        'iac/codebuild/deploy-dev/terraform.tfvars',
        pipelineName
      );
      assert.fileContent(
        'iac/codebuild/deploy-test/terraform.tfvars',
        pipelineName
      );
      assert.fileContent('iac/codepipeline/remote_state.tf', pipelineName);
      assert.fileContent('iac/codepipeline/terraform.tfvars', pipelineName);
      assert.fileContent('scripts/buildno.sh', pipelineName);
    });

    it('uses the AWS account number entered in prompts when no account number found in config', () => {
      assert.fileContent('iac/codebuild/build/buildspec.yml', awsAccountNumber);
      assert.fileContent(
        'iac/codebuild/build/remote_state.tf',
        awsAccountNumber
      );
    });
  });

  describe('AWS region and account number saved in config', () => {
    const pipelineName = 'a-test-pipeline';
    const gitRepo = 'https://example.com';
    const awsAccountNumber = '123234';
    const awsRegion = 'eu-west-1';

    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '.'))
        .withPrompts({ pipelineName, gitRepo })
        .withLocalConfig({ awsAccountNumber, awsRegion });
    });

    it('uses the AWS account number saved in config when included', () => {
      assert.fileContent('iac/codebuild/build/buildspec.yml', awsAccountNumber);
      assert.fileContent(
        'iac/codebuild/build/remote_state.tf',
        awsAccountNumber
      );
    });
  });
});
