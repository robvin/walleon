"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createServer = void 0;

var http = _interopRequireWildcard(require("http"));

var _koa = _interopRequireDefault(require("koa"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _serve = require("../middleware/serve");

const createServer = async () => {
  const app = new _koa.default();
  const router = new _koaRouter.default();
  router.get("/", async ctx => {
    await ctx.render("index");
  }); // TODO: error-handling, not-found-handler, compress, cors

  app.use((0, _serve.serveStatic)()).use((0, _serve.serveViews)()).use(router.routes());
  const server = http.createServer(app.callback());
  server.on("close", () => {});
  return server;
};

exports.createServer = createServer;
//# sourceMappingURL=server.js.map