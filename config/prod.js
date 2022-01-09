/* eslint-disable import/no-commonjs */
const { stringifyEnv } = require("./utils");

module.exports = {
  env: stringifyEnv({
    NODE_ENV: "production",
  }),
  defineConstants: {},
  mini: {},
  h5: {},
};
