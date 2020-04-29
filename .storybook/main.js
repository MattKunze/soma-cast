const path = require("path")

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-knobs/register",
    "@storybook/addon-links",
    {
      name: "@storybook/preset-typescript",
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, "../tsconfig.json"),
        },
        include: [path.resolve(__dirname)],
      },
    },
  ],
  webpackFinal: (config) => {
    // doesn't seem to respect baseUrl from tsconfig
    config.resolve.modules.push(path.resolve(__dirname, "../node_modules"))
    config.resolve.modules.push(path.resolve(__dirname, "../src"))
    return config
  },
}
