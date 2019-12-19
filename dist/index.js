"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config");
const winston_1 = require("./loaders/winston");
async function startServer() {
    winston_1.default.info(` 👽  Starting server in ${process.env.NODE_ENV} mode   👽 `);
    const app = await app_1.default();
    app.listen(process.env.PORT, () => {
        winston_1.default.info(` 🔥 Listening on http://localhost:${config_1.default.PORT_HTTP} 🔥`);
    });
}
startServer();
//# sourceMappingURL=index.js.map