//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//express app setup
var app = express();
var PORT = 3000;

//express app setup for data parsing handling
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//data array
var tables = [
    {
        name: "Susanna",
        phone: 1112223333,
        email: "sus@gmail.com",
        id: "Eats27"
    },
    {
        name: "Sus",
        phone: 4445556666,
        email: "sus@eats.com",
        id: "Table for 5"
    }
];

var waiting = [];

//routes

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/api/tables", function(req, res) {
    return res.json(tables);
});

app.get("/api/waiting", function(req, res) {
    return res.json(waiting);
});

app.get("/github", function(req, res) {
    res.sendFile("https://github.com/");
});

app.post("/api/clear", function(req, res) {
    tables = [];
    waiting = [];

    return res.json(tables, waiting);
});

app.post("/api/tables", function(req, res) {
    var newtable = req.body;
    console.log("test");
    newtable.routeName = newtable.name.replace(/\s+/g, "").toLowerCase();

    console.log(newtable);
    
    if (tables.length < 5) {
        tables.push(newtable);
        res.json(newtable);
    }
    else {
        wait();
    };
});

function wait() {
    app.post("/api/waiting", function(req, res) {
        var newtable = req.body;
        console.log("test");
        newtable.routeName = newtable.name.replace(/\s+/g, "").toLowerCase();

        console.log(newtable);
        waiting.push(newtable);
        res.json(newtable);
    });
};

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});