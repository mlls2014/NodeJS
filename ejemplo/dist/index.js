"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)(); // Add the apiRoutes stack to the server

app.use('/api', ApiRoutes);
app.listen(8080, err => {
  if (err) {
    console.log(_chalk.default.red('Cannot run!'));
  } else {
    console.log(_chalk.default.green.bold(`
       Yep this is working 🍺
       App listen on port: 8080 🍕
       Env: ${process.env.NODE_ENV} 🦄
     `));
  }
});
var _default = app;
exports.default = _default;