module.exports = {
  verbose: true,
  unmockedModulePathPatterns: [
    "node_modules/react/",
    "node_modules/enzyme/"
  ],
  // testEnvironment: "enzyme",
  testEnvironmentOptions: {
    "enzymeAdapter": "react16"
  },
  setupFilesAfterEnv: ["<rootDir>enzyme.js"],
  // transformIgnorePatterns: [],
  // transform: ''
}