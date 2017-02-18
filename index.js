let express = require("express"),
    request = require("request"),
    myIP = require('my-ip');
bodyparser = require("body-parser");

let app = express();

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    try {
        let location = '138.51.147.31';
        console.log(location);
        let location_url = "http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=doss23s1LxQl8yiV7YgQu4uK3lU2Ak2v&q=" + location + "&language=en-us&details=false"
        request(location_url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                let random_playlist = Math.floor(Math.random() * 4 + 1);
                let location_key = JSON.parse(body).Key;
                let location_name = JSON.parse(body).EnglishName + ", " + JSON.parse(body).Country.EnglishName;
                let weather_url = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + location_key + "?apikey=doss23s1LxQl8yiV7YgQu4uK3lU2Ak2v&language=en-us&details=false&metric=true";
                request(weather_url, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        res.render("result", {
                            result: JSON.parse(body),
                            location_name: location_name,
                            random_playlist: random_playlist
                        });
                    }
                });
            }
        });
    } catch (err) {
        console.log(err);
    }
});

app.use(bodyparser.urlencoded({
    extended: true
}));

app.post("/result", function(req, res) {

});

app.listen(3000, function(err) {
    console.log("Server running port 3000!");
});
