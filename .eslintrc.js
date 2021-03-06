module.exports = {
  parserOptions: {
    ecmaVersion: 2018
  },
  extends: "airbnb-base",
  env: {
    node: true
  },
  rules: {
    quotes: ["error", "double", { avoidEscape: true }],
    "no-plusplus": 0,
    "no-continue": 0,
    "comma-dangle": 0,
    "no-use-before-define": 0,
    "arrow-parens": 0,
    "prefer-destructuring": 0,
    "no-param-reassign": 0,
    "no-labels": 0,
    "no-restricted-syntax": 0
  }
};
