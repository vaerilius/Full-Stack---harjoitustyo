const { defaults } = require('jest-config');
module.exports = {
  transform: {
    '\\.(js|jsx)?$': 'babel-jest',
  },
  bail: 1,
  verbose: true,

  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each'
  ]
}