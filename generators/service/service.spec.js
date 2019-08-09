const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

beforeAll(() => {
  const serviceName = 'a-test-service';

  return helpers.run(path.join(__dirname, '.')).withArguments([serviceName]);
});

describe('Service subgenerator', () => {
  it('generates an Service class file in the src/services/<className> folder with the correct class name', () => {
    assert.fileContent(
      'src/services/aTestService/a-test-service.service.js',
      /ATestService/
    );
  });

  it('generates a test file in the generated class folder', () => {
    assert.file('src/services/aTestService/a-test-service.spec.js');
  });
});
