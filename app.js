const express = require("express");
const res = require("express/lib/response");
const { redirect } = require("express/lib/response");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static("public"));

let tasks = ["First task"];
let workTasks = ["Attend work"];

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

// this is general list, access by the / (root) route

app.get("/", function (req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: day, newListItem: tasks });
});

// after entering the task, the new task will be added to the array and then
// the server will redirect and displayb the new list

app.post("/", function (req, res) {
  let newTask = req.body.newItem;
  tasks.push(newTask);
  console.log(newTask);
  res.redirect("/");
});

// this is for the work list, access by the /work route

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work list", newListItem: workTasks });
});

app.post("/work", function (req, res) {
  let newWorkTask = req.body.newItem;
  workTasks.push(newWorkTask);
  res.redirect("/work");
});
