"use strict";

var _server = require("../lib/server");

(0, _server.createServer)().then(app => app.listen(8080, () => {}), err => {
  console.log(err);
  process.exit(1);
});
//# sourceMappingURL=www.js.map