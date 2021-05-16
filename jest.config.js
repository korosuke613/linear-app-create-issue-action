module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
    "!**/node_modules/**",
    "!src/__tests__/**",
  ],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        suiteName: "jest tests",
        outputDirectory: "reports",
        outputName: "jest.xml",
        classNameTemplate: "{classname}-{title}",
        titleTemplate: "{classname}-{title}",
        ancestorSeparator: " › ",
      },
    ],
  ],
}
