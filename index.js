const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const Design = require("./models/DesignItem");
const app = express();
const PORT =process.env.PORT || 3022;

app.set("view engine", "ejs");
app.use(express.static("public"));
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.DesignUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected data");
    app.listen(PORT, () => {
      console.log("server at http://localhost:3022");
    });
  })
  .catch((err) => console.log(err));



app.get("/", (req, res) => {
  Design.find()
    .then((result) => {
      res.render("index", { Designs: result });
      console.log(result);
    })
    .catch((err) => console.log(err));
});

app.get("/add", (req, res) => {
  Design.aggregate([{ $sample: { size: 6 } }])
    .limit(6)
    .then((result) => {
      res.render("add", { Designs: result });
      console.log(result);
    });
});
app.post("/add", (req, res) => {
  const newDesign = new Design({
    product_name: req.body.product_name,
    company: req.body.company,
    price: req.body.price,
    picture_Link: req.body.picture_Link,
    description: req.body.description,
  });
  newDesign
    .save()
    .then((result) => {
      console.log("new Design saved");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

app.get("/details/:id", (req, res) => {
  console.log(req.params.id);

  Design.findById(req.params.id)
    .then((result) => {
      res.render("details", { design: result });
    })
    .catch((err) => console.log(err));
});

app.get("/delete/:id", (req, res) => {
  Design.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

app.post("/edit/:id", (req, res) => {
  const updatedArticle = {
    product_name: req.body.product_name,
    company: req.body.company,
    price: req.body.price,
    picture_Link: req.body.picture_Link,
    description: req.body.description,
  };
  Design.findByIdAndUpdate(req.params.id, updatedArticle)
    .then((result) => {
      res.redirect(`/details/${req.params.id}`);
    })
    .catch((err) => console.log(err));
});
app.get("/weekly", (req, res) => {
  res.render("weekly");
});

app.get("/lessthan", (req, res) => {
  Design.find({ price: { $lte: 30 } })
    .then((result) => {
      res.render("index", { Designs: result });
      //   console.log(result);
    })
    .catch((err) => console.log(err));
});
// { price: { $gte: 501, $lte: 1000 } }
// { $expr: { $lt: [{ $toDouble: "$price" }, 30] } }
