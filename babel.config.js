const alias = require("./aliases.config.js")

module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    env: {
      development: {
        plugins: [
          [
            require.resolve("babel-plugin-module-resolver"),
            {
              alias,
            },
          ],
        ],
      },
      production: {
        plugins: [
          [
            require.resolve("babel-plugin-module-resolver"),
            {
              alias,
            },
          ],
        ],
      },
    },
  }
}
