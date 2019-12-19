"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = "test";
require("mocha");
const chai_1 = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiEach = require("chai-each");
chai_1.use(chaiHttp);
chai_1.use(chaiEach);
const test_loader_1 = require("./test.loader");
const winston_1 = require("../loaders/winston");
describe("Connection", function () {
    let appIns;
    let conn;
    before(done => {
        test_loader_1.default()
            .then(async (res) => {
            appIns = res.app;
            conn = res.dbConn;
            await conn.db.dropDatabase();
            done();
        })
            .catch(err => {
            done(err);
        });
    });
    after(done => {
        conn
            .close()
            .then(() => {
            done();
        })
            .catch(err => {
            done(err);
        });
    });
    describe("Products api /api/v1/product", () => {
        const base = "/api/v1/product";
        it("GET  /api/v1/product should return a list of products", done => {
            chai
                .request(appIns)
                .get(base)
                .end((err, res) => {
                if (err)
                    done(err);
                chai_1.expect(res.status).to.be.equal(200);
                chai_1.expect(res.body).to.have.all.keys(["products", "total"]);
                chai_1.expect(res.body.products).to.each.have.property("name");
                chai_1.expect(res.body.products).to.each.have.property("description");
                chai_1.expect(res.body.products).to.each.have.property("price");
                done();
            });
        });
        it("POST  /api/v1/product add new product : inputs-> name , description, price", done => {
            chai
                .request(appIns)
                .post(base)
                .send({
                name: "test",
                price: "10 rs",
                description: "Lovely"
            })
                .end((err, res) => {
                if (err) {
                    winston_1.default.error(err);
                    done(err);
                }
                chai_1.expect(res.status).to.be.equal(201);
                chai_1.expect(res.body).to.have.all.keys(["product", "message"]);
                chai_1.expect(res.body.message).to.be.a("string");
                chai_1.expect(res.body.product).to.be.a("object");
                done();
            });
        });
    });
});
//# sourceMappingURL=productapi.test.js.map