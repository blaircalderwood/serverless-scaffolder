const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

it('generates a service file and associated test', () => {
  const serviceName = 'a-test-service';

  return helpers
    .run(path.join(__dirname, '.'))
    .withArguments([serviceName])
    .then(() => {
      assert.fileContent(
        'src/services/aTestService/a-test-service.service.js',
        /ATestService/
      );
      assert.file('src/services/aTestService/a-test-service.spec.js');
    });
});
