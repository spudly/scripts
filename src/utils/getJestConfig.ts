const getJestConfig = () => ({
  collectCoverageFrom: [
    '**/*.ts',
    '**/*.tsx',
    '**/*.js',
    '**/*.jsx',
    '!**/node_modules/**',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    '[.]config[.]js',
    '/coverage/',
    '[.]stories[.]',
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  testEnvironment: 'node',
  testMatch: ['**/*.test.[jt]s?(x)'],
  testPathIgnorePatterns: ['build', '[.]stories[.]'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  watchPathIgnorePatterns: ['<rootDir>/node_modules/'],
});

export default getJestConfig;
