//Require stmts
// =============================================================
var express = require("express");
var path = require("path");

// Setup the Express App Reference
// =============================================================
var app = express();

//Create a var for PORT
var PORT = process.env.PORT || 3000;

// Setup the Express app middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//SETUP REFERENCES TO DATA ROUTES
/*******************************************************************/
//INCLUDE HTML ROUTES TO HTML AND SURVERY:
var htmlRoutes = require('./app/routing/htmlRoutes')(app);
/*****************************************************************/

//API ROUTES TO GET TO THE DATA
/*****************************************************************/
var apiRoutes = require('./app/routing/apiRoutes')(app);
/*****************************************************************/

// Start server listening for requests on Port
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
