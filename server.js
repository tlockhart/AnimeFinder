//STEPS:
//Require stmts
//Load default data
//create a referend for express app
//create a constant var for PORT
//setup express middleware (use)
//Listen for request on Port
// =============================================================
var express = require("express");
var path = require("path");

//const reservations = require("./app/data/reservations");
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
//var htmlRoutes = require('./app/routing/htmlRoutes')(app, reservations);
var htmlRoutes = require('./app/routing/htmlRoutes')(app);
/*****************************************************************/
//API ROUTES TO GET TO THE DATA
/*****************************************************************/
//var apiRoutes = require('./app/routing/apiRoutes')(app, reservations);
var apiRoutes = require('./app/routing/apiRoutes')(app);
/*****************************************************************/

// Create New Reservations - takes in JSON input
app.post("/api/reservations", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newreservation = req.body;
  
    // Using a RegEx Pattern to remove spaces from newreservation
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newreservation);
  
    reservations.push(newreservation);
  
    res.json(newreservation);
  });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
