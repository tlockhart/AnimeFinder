

var path = require("path");
//var myPath = path.join(__dirname, "../public/home.html");
//console.log("MYPATH = "+myPath);
var reservations = require("../data/reservations");
var tables = require("../data/tables");
//var waiting = require("../data/trash/waiting");

var apiRoutes = function (app) {
    // Setup Routes to all Reservations: Don't Push Anything HERE
    /********************************************************************/
    //browser: localhost:3000/api/reservations
    app.get("/api/reservations", function (req, res) {
        return res.json(reservations);
    });

    // 11/08 OBSOLETE: CHOOSES WHICH RESERVATION IS RETURNED WHEN A GET REQUEST IS MADE, RETURNS FALSE IF THERE IS NO MATCH
    /***************************************************************************************************************** */
    app.get("/api/reservations/:reservation", function (req, res) {
        var chosen = req.params.reservation;

        console.log(chosen);
        //Loop through the reservations array until a match is found
        /*for (var i = 0; i < reservations.length; i++) {
            if (chosen === reservations[i].routeName) {
                return res.json(reservations[i]);
            }
        }*/

        return res.json(false);
    });//GET
    /***************************************************************************************************************** */

    // 11/08: Create New reservations - takes the new record as a request and will return a response
    /*****************************************************************************/
    app.post("/api/reservations", function (req, res) {

        //1) DON"T Initialize tables for the first time with any information existing in reservations
        /*if(tables.length < 1){
            for (var i = 0; i < reservations.length; i++) {
                if (tables.length <= 5)
                    tables.push(reservations[i]);
                else
                    waiting.push(reservations[i]);
            }
        }*/
        
        
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var newreservation = req.body;

        // Using a RegEx Pattern to remove spaces from newreservation
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();
        //var question1 = newreservation.survey[0];
        //console.log("First Question Entered = "+question1);

        console.log("First Answer = "+newreservation.scores[0]);
        console.log(newreservation);
        console.log(reservations);
        /**************************************************
         * 11/08: DO SOMETHING WITH THE DATA TO COMPARE IT: NOT BY ROUTE NAME BY Q1
         **************************************************/
        
        var diffSumTemp = 100;//Must start greater than question value
        var chosenRecord = 0;
        for (var i = 0; i < reservations.length; i++) {
            var diffSum = 0;
            var diffArr = new Array(newreservation.length);
            for (var j = 0; j < reservations[i].scores.length; j++){
                var questionDif = Math.abs(newreservation.scores[j]-reservations[i].scores[j]);
                diffArr.push(questionDif);
                diffSum = diffSum + questionDif;
                console.log("Reservations Q"+j+" = "+reservations[i].scores[j]);
            }//for
            if (diffSum < diffSumTemp){
                diffSumTemp = diffSum; //Update Temp to current diffSum
                chosenRecord = i;
            }//if
            console.log("Question DIFF = "+diffArr+" DiffSUM = "+diffSum+" ChosenRecord = "+chosenRecord);
            console.log("*********************************************");
        }//for

        /*****************************
         *Populate the PERSONS array
         *****************************/
        tables.push(newreservation);

        /************************************************************************
         * 11/08: SEND THE REPONSE AS THE RESERVATION THAT MATCHES THE CRITERIA
         ************************************************************************/
       // res.json(newreservation);
            return res.json(reservations[chosenRecord]);
        /************************************************************************/

        
        /************************************************************************/

    }); //New Reservations
    /********************************************************************/

    //SET UP ROUTES TO PARTIAL DATASETS
    /*****************************************/
    //browser: localhost:3000/api/tables
    app.get("/api/tables", function (req, res) {
        return res.json(tables);
    });
    //browser: localhost:3000/api/waiting
   /* app.get("/api/waiting", function (req, res) {
        return res.json(waiting);
    })*/
    /*****************************************/  
};//apiRoutes

module.exports = apiRoutes;