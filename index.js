let express = require("express"),
    request = require("request"),
    externalip = require("externalip"),
    bodyparser = require("body-parser");

let app = express();
let api_key = "fY8ASBhh2A5Ycio8dBbi2XOMao4Ep211";

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({
    extended: true
}));

app.get("/", function(req, res) {
    externalip(function(err, ip) {
        try {
            let location = ip;
            console.log(location);
            let location_url = "http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=" + api_key + "&q=" + location + "&language=en-us&details=false"
            request(location_url, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    let random_playlist = Math.floor(Math.random() * 4) + 1;
                    let location_key = JSON.parse(body).Key;
                    let location_name = JSON.parse(body).EnglishName + ", " + JSON.parse(body).Country.EnglishName;
                    let weather_url = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + location_key + "?apikey=" + api_key + "&language=en-us&details=false&metric=true";
                    request(weather_url, function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            res.render("dashboard", {
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
});

app.get("/weather", function(req, res) {
    externalip(function(err, ip) {
        try {
            let location = ip;
            console.log(location);
            let location_url = "http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=" + api_key + "&q=" + location + "&language=en-us&details=false"
            request(location_url, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    let random_playlist = Math.floor(Math.random() * 4) + 1;
                    let location_key = JSON.parse(body).Key;
                    let location_name = JSON.parse(body).EnglishName + ", " + JSON.parse(body).Country.EnglishName;
                    let weather_url = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + location_key + "?apikey=" + api_key + "&language=en-us&details=false&metric=true";
                    request(weather_url, function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            res.render("weather", {
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
});

app.get("/music", function(req, res) {
    externalip(function(err, ip) {
        try {
            let location = ip;
            console.log(location);
            let location_url = "http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=" + api_key + "&q=" + location + "&language=en-us&details=false"
            request(location_url, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    let random_playlist = Math.floor(Math.random() * 4) + 1;
                    let location_key = JSON.parse(body).Key;
                    let location_name = JSON.parse(body).EnglishName + ", " + JSON.parse(body).Country.EnglishName;
                    let weather_url = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + location_key + "?apikey=" + api_key + "&language=en-us&details=false&metric=true";
                    request(weather_url, function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            res.render("music", {
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
});

app.listen(3000, function(err) {
    console.log("Server running port 3000!");
});
