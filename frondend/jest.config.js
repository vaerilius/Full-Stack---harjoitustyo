const { defaults } = require('jest-config');
module.exports = {
  verbose: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  transform: {
    "^.+\\.(js|jsx|mjs)$": "<rootDir>/jest-transformer.js"
  },
  moduleNameMapper: {
    "^lodash-es$": "lodash"
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"]

}