module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/*.test.js', '**/*.spec.js'],
  roots: ['<rootDir>/src', '<rootDir>'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/index.{js,jsx,ts,tsx}',
    '!src/reportWebVitals.{js,ts}',
    '!src/**/*.d.ts',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      { presets: ['@babel/preset-env', '@babel/preset-react'] },
    ],
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(your-es6-module|another-es6-module)/)',
  ],
};
