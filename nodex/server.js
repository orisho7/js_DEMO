const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const Article = require("./models/Article");
mongoose
  .connect(
    "mongodb+srv://abdullrazaqnq13:4KFxUbAE2iThR4aJ@cluster0.3izdpk4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/articals", async (req, res) => {
  const article = await Article.find();

  res.render("../nodex/index.ejs");
});

app.post("/articals", async (req, res) => {
  const newArticle = new Article();
  const titleME = req.body.titleME;
  const bodyME = req.body.bodyME;
  const numberOfLikesME = req.body.likeME;
  newArticle.title = titleME;
  newArticle.body = bodyME;
  newArticle.numberOfLikes = numberOfLikesME;
  await newArticle.save();
  res.render("index.html");
  res.json(newArticle);
  res.send("hello");
});

app.listen(3000);
