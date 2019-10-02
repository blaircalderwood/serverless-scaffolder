const assert = require('yeoman-assert');

const PromptsService = require('./prompts.service');

describe('Prompts Service', () => {
  const promptsService = new PromptsService();

  describe('check length', () => {
    it('passes validation when given string is under 50 characters', () => {
      assert.equal(
        promptsService._checkLength(
          '123456789123456789123456789123456789123456789'
        ),
        true
      );
    });

    it('fails validation when given string is over 50 characters', () => {
      assert.equal(
        promptsService._checkLength(
          '123456789123456789123456789123456789123456789123456789'
        ),
        'Length limit of 50 characters exceeded. Please choose a shorter name.'
      );
    });

    it('fails validation when given string is exactly 50 characters', () => {
      assert.equal(
        promptsService._checkLength(
          '12345678912345678912345678912345678912345678912345'
        ),
        'Length limit of 50 characters exceeded. Please choose a shorter name.'
      );
    });
  });

  describe('is valid URL', () => {
    it('passes validation when given string is a valid HTTPS URL', () => {
      assert.equal(promptsService._isValidUrl('https://example.com'), true);
    });

    it('fails validation when given string is a HTTP URL', () => {
      assert.equal(
        promptsService._isValidUrl('http://example.com'),
        'Not a valid HTTPS URL.'
      );
    });

    it('fails validation when given string is not a URL', () => {
      assert.equal(
        promptsService._isValidUrl('hussa73476sah'),
        'Not a valid HTTPS URL.'
      );
    });
  });

  describe('is number', () => {
    it('passes validation when given string is a valid number', () => {
      assert.equal(promptsService._isNumber('555666'), true);
    });

    it('fails validation when given string is not a valid number', () => {
      assert.equal(
        promptsService._isNumber('7gs6548sj'),
        'Not a valid number.'
      );
    });
  });

  describe('is valid region', () => {
    it('passes validation when given string is a valid AWS region', () => {
      assert.equal(promptsService._isValidRegion('us-east-1'), true);
      assert.equal(promptsService._isValidRegion('us-east-2'), true);
      assert.equal(promptsService._isValidRegion('us-east-3'), true);
      assert.equal(promptsService._isValidRegion('us-west-1'), true);
      assert.equal(promptsService._isValidRegion('us-west-2'), true);
      assert.equal(promptsService._isValidRegion('eu-west-1'), true);
      assert.equal(promptsService._isValidRegion('eu-west-2'), true);
    });

    it('fails validation when given string is not a valid AWS region', () => {
      assert.equal(
        promptsService._isValidRegion('hh-33-22'),
        'Not a valid AWS region.'
      );
      assert.equal(
        promptsService._isValidRegion('hhgg'),
        'Not a valid AWS region.'
      );
      assert.equal(
        promptsService._isValidRegion('777777'),
        'Not a valid AWS region.'
      );
    });
  });
});
