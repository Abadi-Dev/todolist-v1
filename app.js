const express = require("express");
const { redirect } = require("express/lib/response");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static("public"));

let tasks = ["First task"];

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

app.get("/", function (req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  res.sendFile(__dirname);

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { kindOfDay: day, newListItem: tasks });
});

app.post("/", function (req, res) {
  let newTask = req.body.newItem;
  tasks.push(newTask);
  console.log(newTask);
  res.redirect("/");
});
