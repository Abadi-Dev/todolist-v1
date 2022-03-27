const express = require("express");
const app = express();
const date = require(__dirname + "/date.js");
const day = date.getDate();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const tasks = ["First task"];
const workTasks = ["Attend work"];

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

// this is general list, access by the / (root) route

app.get("/", function (req, res) {
  res.render("list", { listTitle: day, newListItem: tasks });
});

// after entering the task, the new task will be added to the array and then
// the server will redirect and displayb the new list

app.post("/", function (req, res) {
  const newTask = req.body.newItem;
  if (req.body.list === "Work List") {
    //if the route is "work" then add the new task and go to the work route again
    workTasks.push(newTask);
    res.redirect("/work");
  } else {
    // else if the route is the home route then add to the list and go to the home route again
    tasks.push(newTask);
    res.redirect("/");
  }
});

// this is for the work list, access by the /work route

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItem: workTasks });
});

app.post("/work", function (req, res) {});
