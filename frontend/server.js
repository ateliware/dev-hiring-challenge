const path = require("path");
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "dist")));
app.set("port", process.env.PORT || 5000);

const server = app.listen(app.get("port"), function () {
  console.log("listening on port ", server.address().port);
});
