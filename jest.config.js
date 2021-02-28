const { resolve } = require("path")

module.exports = {
  rootDir: resolve(__dirname),
  testEnvironment: "node",
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
    __VERSION__: "",
    __DEV__: false,
    __SSR__: false,
  },
  moduleNameMapper: {
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/packages/vuepress-theme-celesta/__tests__/__mocks__/fileMock",

    ".+\\.(css|styl|less|sass|scss)$":
      "<rootDir>/packages/vuepress-theme-celesta/__tests__/__mocks__/styleMock",
  },
  testMatch: ["<rootDir>/packages/**/__tests__/**/*.spec.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/__mocks__/"],
  snapshotSerializers: [require.resolve("jest-serializer-vue")],

  // coverage config
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/packages/**/src/**/*.ts",
    "!**/node_modules/**",
    "!**/*.d.ts",
  ],
  coverageDirectory: "coverage",
}
