let config = require("../config");
let pgp = require("pg-promise")();
let db = pgp(config.getDbConnectionString());

module.exports = (app) => {
    //a. näidata kõiki riike
    app.get("/api/countries",  (req, res) => {
        db.any("SELECT * from country")
            .then(function (data) {
                res.json({
                    status: "success",
                    data: data,
                });
            })
            .catch((err) => {
                res.json({
                    description: "Can’t find any countries",
                    error: err,
                });
            });
    });

    //b. näidata kõiki määratud mandri riike (riigi nimi, pealinn)
    app.get("/api/continent_countries/:continent", function (req, res) {
        db.any("SELECT * from country where continent='" + req.params.continent + "';")
            .then(function (data) {
                res.json({
                    status: "success",
                    data: data,
                });
            })
            .catch((err) => {
                res.json({
                    description: "Can’t find any countries for this continent",
                    error: err,
                });
            });
    });


    //c. näidata täielikku teavet määratud linna kohta (2 GET - päringut: linnakoodi ja nime järgi)
    //linnakoodi ei leidnud, teen riigi koodi järgi
    app.get("/api/cities_by_country_code/:countrycode",  (req, res) => {
        db.any("SELECT * FROM city where countrycode='" + req.params.countrycode + "';")
            .then(function (data) {
                res.json({
                    status: "success",
                    data: data,
                });
            })
            .catch((err) => {
                res.json({
                    description: "Can’t find any city with this country code",
                    error: err,
                });
            });
    });

    app.get("/api/city_by_name/:name",  (req, res) => {
        db.any("SELECT * FROM city where name='" + req.params.name + "';")
            .then(function (data) {
                res.json({
                    status: "success",
                    data: data,
                });
            })
            .catch((err) => {
                res.json({
                    description: "Can’t find any city with this name",
                    error: err,
                });
            });
    });

    //d. näidata täielikku teavet määratud riigi kohta (teave riigi ja linnade kohta). Andmete lugemiseks looge ka 2 päringut: riigi koodi ja nime järgi.
    app.get("/api/country_by_code/:code",  (req, res) => {
        db.any("SELECT * from country where code='" + req.params.code + "';")
            .then(function (data) {
                res.json({
                    status: "success",
                    data: data,
                });
            })
            .catch((err) => {
                res.json({
                    description: "Can’t find any countries with this code",
                    error: err,
                });
            });
    });

    app.get("/api/country_by_name/:name",  (req, res) => {
        db.any("SELECT * from country where name='" + req.params.name + "';")
            .then(function (data) {
                res.json({
                    status: "success",
                    data: data,
                });
            })
            .catch((err) => {
                res.json({
                    description: "Can’t find any countries with this name",
                    error: err,
                });
            });
    });
}