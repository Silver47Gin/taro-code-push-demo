/* eslint-disable import/no-commonjs */
const lodash = require("lodash");
const path = require("path");
const fs = require("fs");

const stringifyEnv = (env) => lodash.mapValues(env, JSON.stringify);

const appRoot = path.join(__dirname, "..");

const packageJson = JSON.parse(
  fs.readFileSync(path.join(appRoot, "package.json"))
);

const getPlugins = () =>
  fs
    .readdirSync(path.join(appRoot, "plugins"))
    .map((pluginFile) => path.join(appRoot, "plugins", pluginFile));

module.exports = {
  stringifyEnv,
  appRoot,
  packageJson,
  getPlugins,
};
