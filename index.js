let express = require("express"),
    request = require("request"),
    accuweather = require("node-accuweather")()("doss23s1LxQl8yiV7YgQu4uK3lU2Ak2v"),
    bodyparser = require("body-parser");

let app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.render("index");
});

app.use(bodyparser.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");

app.post("/result", function(req, res) {
    accuweather.getCurrentConditions(req.body.location, {
            unit: "Celcius"
        })
        .then(function(result) {
            res.render("result", {
                result: result
            });
        });
});

app.listen(3000, function(err) {
    console.log("Server running port 3000!");
});
