process.env.VUE_CLI_BABEL_TARGET_NODE = true;
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;


module.exports = {
  verbose: true,
  moduleDirectories: [
    "node_modules"
  ],
  moduleFileExtensions: [
    "js",
    "vue"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  },
  transform: {
    "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.vue$": "<rootDir>/node_modules/vue-jest"
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/.*"
  ],
  snapshotSerializers: [
    "<rootDir>/node_modules/jest-serializer-vue"
  ]
};