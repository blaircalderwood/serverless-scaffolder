const toSentenceCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const toKebabCase = (str) => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

module.exports = { toSentenceCase, toKebabCase };