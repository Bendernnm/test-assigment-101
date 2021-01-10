module.exports = {
  roots: ['<rootDir>/tests'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'node',
  verbose: true,
  resetMocks: true,
  coverageThreshold: {
    global: {
      statements: 1,
      branches: 1,
      functions: 1,
      lines: 1,
    },
  },
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/**/index.{js,jsx}'],
  modulePathIgnorePatterns: ['<rootDir>/scripts/', '<rootDir>/node_modules/'],
};
