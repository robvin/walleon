import { createServer } from "../lib/server";

createServer().then(
  app => app.listen(8080, () => {}),
  err => {
    console.log(err);
    process.exit(1);
  }
);
