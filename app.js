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

const Items = mongoose.model("Item", itemsSchema);

const itemsArray = ["buy groceries", "Cook food", "clean dishes"];

app.get("/", function (req, res) {
  res.render("list", { listTitle: day, newListItem: itemsArray });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
