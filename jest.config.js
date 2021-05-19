const { resolve } = require("path")
const { readdirSync } = require("fs")
const { compilerOptions } = require("./tsconfig.base.json")

const packagesDir = "packages"
const packages = readdirSync(resolve(__dirname, packagesDir), {
  withFileTypes: true,
})
  .filter((item) => item.isDirectory())
  .map(({ name }) => name)

const pluginAndThemePackages = packages.filter(
  (item) => item.startsWith("plugin-") || item.startsWith("theme-")
)

module.exports = {
  rootDir: resolve(__dirname),
  testEnvironment: "node",
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsconfig: {
        ...compilerOptions,
        sourceMap: true,
      },
    },
    __VERSION__: "",
    __DEV__: false,
    __SSR__: false,
  },
  moduleNameMapper: {
    [`^@vuepress/(${pluginAndThemePackages.join(
      "|"
    )})$`]: `<rootDir>/$1/src/node`,

    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/packages/theme-celesta/__tests__/__mocks__/fileMock",

    ".+\\.(css|styl|less|sass|scss)$":
      "<rootDir>/packages/theme-celesta/__tests__/__mocks__/styleMock",

    "^@temp/celesta/(.*)$": `<rootDir>/packages/plugin-celesta/__tests__/__mocks__/$1`,
  },
  testMatch: ["<rootDir>/packages/**/__tests__/**/*.spec.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/__mocks__/"],
  snapshotSerializers: [require.resolve("jest-serializer-vue")],

  // coverage config
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/packages/**/src/**/*.ts",
    "!<rootDir>/packages/*/src/client/**/*",
    "!**/node_modules/**",
    "!**/*.d.ts",
  ],
  coverageDirectory: "coverage",
}
