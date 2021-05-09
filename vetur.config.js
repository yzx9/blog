const fs = require("fs")
const path = require("path")

const packages = fs.readdirSync(path.resolve(__dirname, "packages"))

module.exports = {
  settings: {
    "vetur.useWorkspaceDependencies": true,
  },
  projects: ["./blog", ...packages.map((item) => `./packages/${item}`)],
}
