const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

app.get("/", function (req, res) {
  var day = "";
  var today = new Date();
  var currentDay = today.getDay();
  switch (currentDay) {
    case 0:
      day = "it's saturday";
      break;
    case 1:
      day = "it's sunday";
      break;
    case 2:
      day = "it's monday";
      break;
    case 3:
      day = "it's tuesday";
      break;
    case 4:
      day = "it's wendesday";
      break;
    case 5:
      day = "it's thursday";
      break;
    case 6:
      day = "it's firday";
      break;
    default:
      console.log("bruh");
      break;
  }
  res.render("list", { kindOfDay: day });
});
