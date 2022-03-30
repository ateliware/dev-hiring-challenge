const routes = require("./repository.route");
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

describe("Test routes", function () {
  test("index route works", (done) => {
    request(app)
      .get("/")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200, done);
  });
});
