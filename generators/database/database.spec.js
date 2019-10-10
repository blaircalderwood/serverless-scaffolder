const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('Database subgenerator', () => {
  describe('AWS region included in config', () => {
    const awsRegion = 'eu-west-1';

    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '.'))
        .withLocalConfig({ awsRegion });
    });

    it('generates a database service and associated test file in the src/database folder with the AWS region found in config', () => {
      assert.file([
        'src/services/database/database.service.js',
        'src/services/database/database.spec.js',
        'src/errors/database.error.js',
      ]);

      assert.fileContent(
        'src/services/database/database.service.js',
        awsRegion
      );
    });
  });

  describe('AWS region not included in config', () => {
    const awsRegion = 'eu-west-2';

    beforeAll(() => {
      return helpers.run(path.join(__dirname, '.')).withPrompts({ awsRegion });
    });

    it('generates a database service and associated test file in the src/database folder with the AWS region found in prompts', () => {
      assert.file([
        'src/services/database/database.spec.js',
        'src/errors/database.error.js',
      ]);

      assert.fileContent(
        'src/services/database/database.service.js',
        awsRegion
      );
    });
  });
});
