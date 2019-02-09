/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
// Require stmts
// =============================================================
const express = require('express');
const path = require('path'); // Part of nodeJS

// Setup the Express App Reference
// =============================================================
const app = express();

// Create a var for PORT
const PORT = process.env.PORT || 3000;

// Setup the Express app middleware to handle data parsing
// Used to process stream data in formatted form (extended true: convert nested and unnested data)
// Must be placed before routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Render all static files (images) in html files in the public folder
// Must be placed before routes
// Option 1: app.use(express.static("./app/public"));

// Option 2: process.cwd//current working directory
// __dirname//dir where your storing script
// Option 3: app.use(express.static(__dirname + "./app/public"));
// NOt dependent on file structure in relative path

// Option 4: Works for any operating systems regardless of slash convention
app.use(express.static(path.join(__dirname, 'app', 'public')));

// SETUP REFERENCES TO DATA ROUTES
// *******************************************************************/
// INCLUDE HTML ROUTES TO HTML AND SURVERY:
const htmlRoutes = require('./app/routing/htmlRoutes')(app);
// *****************************************************************/

// API ROUTES TO GET TO THE DATA
// *****************************************************************
const apiRoutes = require('./app/routing/apiRoutes')(app);
// *****************************************************************

// Start server listening for requests on Port
// =============================================================
app.listen(PORT, () => { console.log(`App listening on PORT http://localhost:${PORT}`); });
