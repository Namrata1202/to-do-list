// const express = require("express");

// const app = express();

// app.get("/", function(request, response){
// 	response.send("<h1>hello namrata you can do anything</h1>");
// });

// app.get("/contact", function(req,res){
// 	res.send("namrata");
// });

// app.get("/about",  function(req,res){
// 	res.send("my name is namrata singh");
// });

// app.listen(3000, function(){
// 	console.log("server startes on port 3000");

// });

// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();
//

// app.get("/", function(req,res){
// 	res.sendFile(__dirname +"/new.html");
// });

// app.post("/", function(req,res){

// 	var nam1 = Number(req.body.n1);

// 	var nam2 = Number(req.body.n2);

// 	var result = nam1 + nam2;

// 	res.send("the result of the calculator is" + result);
// });

// app.listen(3000, function(){
// 	console.log("server start");
// });

const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(express.static("public"));


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extened: true }));

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://akanksha:akku2@cluster0.pgz0dsv.mongodb.net/toDoListDB");
}

const itemSchema = {
  name: String,
};

const Item = new mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "welcome to todo list",
});

const item2 = new Item({
  name: "you can hit  + to add item",
});

const item3 = new Item({
  name: "you can delete item",
});

const defaultItems = [item1, item2, item3];

app.get("/", function (req, res) {
  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = today.toLocaleDateString("en-us", options);

  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("inserted");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { kind: day, newitem: foundItems });
    }
  });
});

app.post("/", function (req, res) {
  var itemName = req.body.n3;
  const item = new Item({
    name: itemName,
  });

  item.save();

  res.redirect("/");
});

app.post("/delete", function (req, res) {
  const checkbox = req.body.checkbox;
  Item.findByIdAndRemove(checkbox, function (err) {
    if (!err) {
      console.log("removed");
      res.redirect("/");
    }
  });
});

app.listen(3000, function () {
  console.log("server is running");
});
