const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('app generator', () => {
  describe('without IAC flag', () => {
    beforeAll(() => {
      const projectName = 'aTestProject';
      const authorName = 'Johann Bevinder';
      const authorEmail = 'johann.bevinder@johy.com';
      const codeCoverage = 90;

      return helpers
        .run(path.join(__dirname, '.'))
        .withPrompts({ projectName, authorName, authorEmail, codeCoverage });
    });

    it('generates a package.json with the correct project name, author name and email', () => {
      assert.fileContent('package.json', /aTestProject/);
      assert.fileContent('package.json', /Johann Bevinder/);
      assert.fileContent('package.json', /johann.bevinder@johy.com/);
    });

    it('generates a jest config with the correct code coverage settings', () => {
      assert.fileContent('jest.config.js', /90/);
    });

    it('generates a src folder with an index.js file and Lambda handler function', () => {
      assert.fileContent('src/index.js', /module.exports.handler/);
    });

    it('generates other project files', () => {
      assert.file('eventData.json');
      assert.file('README.md');
      assert.file('serverless.yaml');
    });

    it('generates other hidden project files', () => {
      assert.file('.nvmrc');
      assert.file('.yo-rc.json');
      assert.file('.pre-commit-config.yaml');
    });
  });

  describe('with IAC flag', () => {
    const projectName = 'anotherTestProject';
    const authorName = 'Johannus Bevinder';
    const authorEmail = 'johannus.bevinder@johy.com';
    const codeCoverage = 77;
    const pipelineName = 'a-test-pipeline';
    const gitRepo = 'https://example.com';
    const awsAccountNumber = '220099';
    const awsRegion = 'eu-west-4';

    describe('with local config', () => {
      beforeAll(() => {
        return helpers
          .run(path.join(__dirname, '.'))
          .withPrompts({
            projectName,
            authorName,
            authorEmail,
            codeCoverage,
            pipelineName,
            gitRepo,
          })
          .withLocalConfig({ awsAccountNumber, awsRegion })
          .withOptions({ iac: 'iac' });
      });

      it('generates IAC files', () => {
        assert.file(['iac/codebuild', 'iac/codepipeline']);
      });
    });

    describe('without local config', () => {
      beforeAll(() => {
        return helpers
          .run(path.join(__dirname, '.'))
          .withPrompts({
            projectName,
            authorName,
            authorEmail,
            codeCoverage,
            pipelineName,
            gitRepo,
            awsAccountNumber,
            awsRegion,
          })
          .withOptions({ iac: 'iac' });
      });

      it('generates IAC files', () => {
        assert.file(['iac/codebuild', 'iac/codepipeline']);
      });
    });
  });
});
