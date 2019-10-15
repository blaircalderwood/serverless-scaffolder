'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-serverless-scaffolder:iac-dynamodb', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/iac-dynamodb'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
