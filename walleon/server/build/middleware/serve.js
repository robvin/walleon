"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serveStatic = exports.serveViews = void 0;

var _koaViews = _interopRequireDefault(require("koa-views"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _path = _interopRequireDefault(require("path"));

const serveViews = () => {
  return (0, _koaViews.default)(_path.default.join(__dirname, "/../public"), {});
};

exports.serveViews = serveViews;

const serveStatic = () => {
  return (0, _koaStatic.default)(_path.default.join(__dirname, "/../public"), {});
};

exports.serveStatic = serveStatic;
//# sourceMappingURL=serve.js.map