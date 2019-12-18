process.env.NODE_ENV = "test";
import "mocha";
import { Express } from "express";
import { expect, assert, should, use } from "chai";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import * as chaiEach from "chai-each";
use(chaiHttp);
use(chaiEach);
import testLoader from "./test.loader";
import logger from "../loaders/winston";
import { Connection } from "mongoose";

describe("Connection", function() {
  let appIns: Express;
  let conn: Connection;
  before(done => {
    testLoader()
      .then(async res => {
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
          if (err) done(err);
          expect(res.status).to.be.equal(200);
          expect(res.body).to.have.all.keys(["products", "total"]);
          expect(res.body.products).to.each.have.property("name");
          expect(res.body.products).to.each.have.property("description");
          expect(res.body.products).to.each.have.property("price");
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
            logger.error(err);
            done(err);
          }
          expect(res.status).to.be.equal(201);
          expect(res.body).to.have.all.keys(["product", "message"]);
          expect(res.body.message).to.be.a("string");
          expect(res.body.product).to.be.a("object");
          done();
        });
    });
  });
});
