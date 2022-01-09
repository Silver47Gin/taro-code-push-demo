/* eslint-disable import/no-commonjs */
const { stringifyEnv } = require("./utils");

module.exports = {
  env: stringifyEnv({
    NODE_ENV: "development",
  }),
  defineConstants: {},
  mini: {},
  h5: {},
};
