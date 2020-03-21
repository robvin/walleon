import * as http from "http";
import Koa from "koa";
import Router from "koa-router";

import { serveViews, serveStatic } from "../middleware/serve";

export const createServer = async () => {
  const app = new Koa();
  const router = new Router();

  router.get("/", async ctx => {
    await ctx.render("index");
  });

  // TODO: error-handling, not-found-handler, compress, cors
  app
    .use(serveStatic())
    .use(serveViews())
    .use(router.routes());

  const server = http.createServer(app.callback());

  server.on("close", () => {});

  return server;
};
