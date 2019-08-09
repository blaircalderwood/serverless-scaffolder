const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

it('generates a error file', () => {
  const errorName = 'a-test-error';

  return helpers
    .run(path.join(__dirname, '.'))
    .withArguments([errorName])
    .then(() => {
      assert.file('src/errors/a-test-error.error.js');
    });
});
