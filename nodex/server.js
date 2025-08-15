const express = require("express");
const app = express();
app.get("/", (req, res) => {
  console.log("here");
  res.download("server.js");
  res.send("Hi");
});
app.listen(3000);
