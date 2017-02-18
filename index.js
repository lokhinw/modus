let express = require("express"),
    request = require("request"),
    accuweather = require("node-accuweather")()("doss23s1LxQl8yiV7YgQu4uK3lU2Ak2v"),
    bodyparser = require("body-parser");

let app = express();

app.post("/weather", function(req, res) {
    accuweather.getCurrentConditions("Toronto", {unit: "Celcius"})
        .then(function(result) {
            console.log(result);
        });
});

app.use(express.static('static'));

app.listen(3000, function(err) {
    console.log("Server running port 3000!");
});
