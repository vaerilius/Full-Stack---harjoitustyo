module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true
  },
  globals: {
    process: true,
    BACKEND_URL: 'readonly',
    __dirname: 'readonly'
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  plugins: ['react', 'jest', 'react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    eqeqeq: 'error',
    'react/prop-types': 0
  }
}
