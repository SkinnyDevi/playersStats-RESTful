//Help found in following links:
//https://github.com/libxmljs/libxmljs/wiki
//https://www.npmjs.com/package/xsd-schema-validator
//https://github.com/remind101/express-xml-bodyparser

var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    xmlparser = require('express-xml-bodyparser');

var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;

var cors = require('cors');
app.use(cors());

// .. other middleware ... 
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(xmlparser());
// ... other middleware ... 

var validator = require('xsd-schema-validator');
var schemaPath = "xsd/playerStats.xsd";

// libxmljs not working anymore
// var libxmljs = require("libxmljs");

//In a more real case this information would be stored in a DB
var players = '<?xml version="1.0" encoding="UTF-8"?><players></players>';

app.get('/players', function(req, res, next) {
    res.set('application/xml').send(players);
});

app.post('/players', function(req, res, next) {
    // req.body contains the parsed xml
    var reqRawBody = req.rawBody;

    validator.validateXML(reqRawBody, schemaPath, function(err, result) {
        if (err) {
            console.log(err);
            //throw err;
            res.set('application/xml').send(`<response>Error</response>`);
            return;
        }
        console.log(result);

        var xmlReqRawBody = new DOMParser().parseFromString(reqRawBody, 'application/xml');
        var xmlPlayers = new DOMParser().parseFromString(players);

        xmlPlayerToAdd = xmlReqRawBody.getElementsByTagName("player")[0];
        xmlPlayers.getElementsByTagName("players")[0].appendChild(xmlPlayerToAdd);

        players = new XMLSerializer().serializeToString(xmlPlayers);

        res.set('application/xml').send(`<response>Added!</response>`);
    });
});

server.listen(1337);