const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');
const kebabCase = require('lodash/kebabCase');

const toSentenceCase = (str) => {
  return upperFirst(str);
}

const toKebabCase = (str) => {
  return kebabCase(str);
}

const toCamelCase = (str) => {
  return camelCase(str);
}

module.exports = { toSentenceCase, toKebabCase, toCamelCase };