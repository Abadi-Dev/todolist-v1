const { name } = require("ejs");
const express = require("express");
const app = express();
const date = require(__dirname + "/date.js");
const day = date.getDate();
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/todolistDB");
}

const itemsSchema = mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemsSchema);

defaultItems = [
  { name: "buy groceries" },
  { name: "Cook food" },
  { name: "Clean dishes" },
];

app.post("/delete", function (req, res) {
  Item.deleteOne({ _id: req.body.checkbox }, function (err) {
    if (err) console.log("failed to delete");
    else res.redirect("/");
  });
  console.log(req.body.checkbox);
});

app.get("/", function (req, res) {
  Item.find({}, function (err, results) {
    // if the DB is empty then add some values
    if (results.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) console.log("insertion failed");
      });
    }
    res.render("list", { listTitle: day, newListItem: results });
  });
});

app.post("/", function (req, res) {
  Item.insertMany({ name: req.body.newItem }, function (err) {
    if (err) console.log("insertion failed");
    else res.redirect("/");
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
