//EXECUTE:localhost:3000/
// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

const animes = require("./app/data/animes");
//var htmlRoutes;

// Sets up the Express App
// =============================================================
var app = express();
//var PORT = 3000;
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*******************************************************************/
//INCLUDE HTML ROUTES TO HTML AND SURVERY:
var htmlRoutes = require('./app/routing/htmlRoutes')(app, animes);
/*****************************************************************/
//API ROUTES TO GET TO THE DATA
/*****************************************************************/
var apiRoutes = require('./app/routing/apiRoutes')(app, animes);
/*****************************************************************/

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
