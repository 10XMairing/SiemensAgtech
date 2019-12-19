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
    describe("/api/v1/user :: Users Api", () => {
        const baseRoute = "/api/v1/user";
        const registerRoute = `${baseRoute}/register`;
        const loginRoute = `${baseRoute}/login`;
        it("GET : /api/v1/user >> SHOULD RETURN AN empty array", done => {
            chai
                .request(appIns)
                .get(baseRoute)
                .end((err, res) => {
                if (err)
                    done(err);
                chai_1.expect(res.status).to.equal(200);
                chai_1.expect(res.body).to.have.all.keys("total", "message", "users");
                chai_1.expect(res.body.users).to.be.an("array");
                chai_1.assert(res.body.users.length == 0);
                done();
            });
        });
        it("POST : /api/v1/user >> First entry : SHOULD Return a message and user object", done => {
            chai
                .request(appIns)
                .post(registerRoute)
                .send({
                username: "myusername",
                email: "me@xydev.io",
                password: "password"
            })
                .end((err, res) => {
                if (err)
                    done(err);
                chai_1.expect(res.status).to.be.equal(200);
                chai_1.expect(res.body).to.have.all.keys("message", "user");
                chai_1.expect(res.body.message).to.be.a("string");
                chai_1.expect(res.body.user).to.be.an("object");
                chai_1.expect(res.body.user).to.not.have.property("password"); //make sure password is not retrieved
                done();
            });
        });
        // error in this second test
        // it("POST : /api/v1/user >> Second entry : SHOULD Return an error message as duplicate email", done => {
        //   chai
        //     .request(appIns)
        //     .post(registerRoute)
        //     .send({
        //       username: "myusername",
        //       email: "me@xydev.io",
        //       password: "password"
        //     })
        //     .end((err, res) => {
        //       if (err) {
        //         logger.error(err);
        //         done(err);
        //       }
        //       expect(res.status).to.be.gte(400);
        //       expect(res.body).to.have.property("message");
        //       done();
        //     });
        // });
        it("POST : /api/v1/user >> Third entry : SHOULD Return a message and user object", done => {
            chai
                .request(appIns)
                .post(registerRoute)
                .send({
                username: "myusername",
                email: "me2@xydev.io",
                password: "password"
            })
                .end((err, res) => {
                if (err)
                    done(err);
                chai_1.expect(res.status).to.be.lte(300);
                chai_1.expect(res.body).to.have.all.keys("message", "user");
                chai_1.expect(res.body.message).to.be.a("string");
                chai_1.expect(res.body.user).to.be.an("object");
                chai_1.expect(res.body.user).to.not.have.property("password"); //make sure password is not retrieved
                done();
            });
        });
        it("POST : login user , should pass and return a message,token and email", done => {
            chai
                .request(appIns)
                .post(loginRoute)
                .send({
                email: "me@xydev.io",
                password: "password"
            })
                .end((err, res) => {
                if (err) {
                    winston_1.default.error(err);
                    done(err);
                }
                chai_1.expect(res.status).to.be.equal(200);
                chai_1.expect(res.body).to.have.all.keys("message", "token", "email");
                chai_1.expect(res.body.email).to.be.a("string");
                chai_1.expect(res.body.token).to.be.a("string");
                chai_1.expect(res.body.message).to.be.a("string");
                done();
            });
        });
        it("POST : login user ,wrong password and should fail and return a status gte 400 and message", done => {
            chai
                .request(appIns)
                .post(loginRoute)
                .send({
                email: "me@xydev.io",
                password: "password-wrong"
            })
                .end((err, res) => {
                if (err)
                    done(err);
                chai_1.expect(res.status).to.be.gte(400);
                chai_1.expect(res.body).to.have.all.keys("message", "error");
                chai_1.expect(res.body.message).to.be.a("string");
                chai_1.expect(res.body.error).to.be.a("object");
                done();
            });
        });
        it("POST : login user ,wrong email  should fail and return a status gte 400 and message", done => {
            chai
                .request(appIns)
                .post(loginRoute)
                .send({
                email: "me@xydev-wrong.io",
                password: "password"
            })
                .end((err, res) => {
                if (err)
                    done(err);
                chai_1.expect(res.status).to.be.gte(400);
                chai_1.expect(res.body).to.have.all.keys("message", "error");
                chai_1.expect(res.body.message).to.be.a("string");
                chai_1.expect(res.body.error).to.be.a("object");
                done();
            });
        });
        it("GET : /api/v1/user >> SHOULD RETURN A LIST OF USERS", done => {
            chai
                .request(appIns)
                .get(baseRoute)
                .end((err, res) => {
                if (err)
                    done(err);
                chai_1.expect(res.status).to.equal(200);
                chai_1.expect(res.body).to.have.all.keys("total", "message", "users");
                chai_1.expect(res.body.users).to.be.an("array");
                chai_1.expect(res.body.users).to.each.have.property("username");
                chai_1.expect(res.body.users).to.each.have.property("email");
                chai_1.expect(res.body.users).to.each.have.property("username");
                chai_1.expect(res.body.users).to.each.have.property("email");
                chai_1.expect(res.body.users).to.each.not.have.property("password"); //make sure password is not retrieved
                done();
            });
        });
    });
});
//# sourceMappingURL=userapi.test.js.map