var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');

//tells node that we are creating an "express" server
var app = express();

//sets the initial port. 
var PORT = process.env.PORT || 8081;

//sets up the express app to handle the data parsing 
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/css', express.static(path.join(__dirname, "../css")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// //ROUTER
require(path.join(__dirname, "./app/routing/apiRoutes"))(app);
require(path.join(__dirname, "./app/routing/htmlRoutes"))(app);

//LISTENER
//starts the server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});