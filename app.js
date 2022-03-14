const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

app.get("/", function (req, res) {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", { kindOfDay: day });
});

app.post("/", function (req, res) {
  var task = req.body.newItem;
  console.log(task);
});
