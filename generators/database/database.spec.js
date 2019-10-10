const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

beforeAll(() => {
  const awsRegion = 'eu-west-1';

  return helpers.run(path.join(__dirname, '.')).withPrompts(awsRegion);
});

describe('Database subgenerator', () => {
  it('generates a database service and associated test file in the src/database folder', () => {
    assert.file('src/services/database/database.service.js');
    assert.file('src/services/database/database.spec.js');
  });
});
