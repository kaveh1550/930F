module.exports.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    'axios': '<rootDir>/node_modules/axios',
  },
};
