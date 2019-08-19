module.exports = {
  parserOptions: {
    ecmaVersion: 2019
  },
  env: {
    browser: false,
    node: true,
    jest: true,
    es6: true
  },
  extends: ["prettier"],
  plugins: ["import", "prettier"],
  rules: {
    "newline-after-var": ["error", "always"],
    "import/order": ["error", { "newlines-between": "always" }],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      { blankLine: "always", prev: ["block-like"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"]
      }
    ],
    "newline-per-chained-call": ["error", { ignoreChainWithDepth: 2 }],
    "max-depth": ["error", 4],
    "lines-between-class-members": ["error", "always"],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        singleQuote: true
      }
    ],
    "consistent-return": "off"
  }
};
