const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

it('generates a util file and associated test', () => {
  const utilName = 'a-test-util';

  return helpers
    .run(path.join(__dirname, '.'))
    .withArguments([utilName])
    .then(() => {
      assert.file('src/utils/aTestUtil/a-test-util.util.js');
      assert.file('src/utils/aTestUtil/a-test-util.spec.js');
    });
});
