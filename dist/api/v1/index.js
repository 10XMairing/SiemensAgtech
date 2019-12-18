"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./user");
function default_1(app) {
    app.use("/api/v1/user", user_1.default);
    app.get("/api/v1", (req, res, next) => {
        return res.status(200).json({
            routes: [
                {
                    path: "/api/v1/user"
                }
            ]
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=index.js.map