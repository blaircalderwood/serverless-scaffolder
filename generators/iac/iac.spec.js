const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('iac composite generator with API Gateway', () => {
  describe('generates apigateway files, when apigateway flag is passed', () => {
    const projectName = 'blop';
    const pathPart = '/yea/';
    const awsAccountNumber = '00119922';
    const awsRegion = 'eu-west-1';

    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '.'))
        .withArguments(['--apigateway'])
        .withPrompts({
          pathPart,
          awsAccountNumber,
          awsRegion,
          projectName,
        });
    });

    it('generates an IAC folder and terraform-aws-apigateway subfolder', () => {
      assert.file('iac/modules/terraform-aws-apigateway');
    });

    it('generates IAC codebuild and codepipeline folders', () => {
      assert.file(['iac/codebuild', 'iac/codepipeline']);
    });

    it('generates an IAC folder and Lambda subfolder with both dev and test environments', () => {
      assert.file(['iac/lambda/dev', 'iac/lambda/test']);
    });
  });
});

describe('iac composite generator generates ci and lambda without API gateway', () => {
  const projectName = 'blop';
  const pathPart = '/yea/';
  const awsAccountNumber = '00119922';
  const awsRegion = 'eu-west-1';

  beforeAll(() => {
    return helpers.run(path.join(__dirname, '.')).withPrompts({
      pathPart,
      awsAccountNumber,
      awsRegion,
      projectName,
    });
  });

  it('check no apigateway module exists', () => {
    assert.noFile('iac/modules/terraform-aws-apigateway');
  });

  it('generates IAC codebuild and codepipeline folders', () => {
    assert.file(['iac/codebuild', 'iac/codepipeline']);
  });

  it('generates an IAC folder and Lambda subfolder with both dev and test environments', () => {
    assert.file(['iac/lambda/dev', 'iac/lambda/test']);
  });
});
