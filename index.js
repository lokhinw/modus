let express = require("express"),
    request = require("request"),
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
    try {
        let location = req.body.location;
        let location_url = "http://dataservice.accuweather.com/locations/v1/search?apikey=doss23s1LxQl8yiV7YgQu4uK3lU2Ak2v&q=" + location + "&language=en-us&details=false"
        request(location_url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                let location_key = JSON.parse(body)[0].Key;
                let location_name = JSON.parse(body)[0].EnglishName + ", " + JSON.parse(body)[0].Country.EnglishName;
                let weather_url = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + location_key + "?apikey=doss23s1LxQl8yiV7YgQu4uK3lU2Ak2v&language=en-us&details=false&metric=true";
                request(weather_url, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        res.render("result", {
                            result: JSON.parse(body),
                            location_name: location_name
                        });
                    }
                });
            }
        });
    } catch (err) {
        console.log(err);
    }
});

app.listen(3000, function(err) {
    console.log("Server running port 3000!");
});
