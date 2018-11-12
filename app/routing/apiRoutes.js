

var path = require("path");
//var myPath = path.join(__dirname, "../public/home.html");
//console.log("MYPATH = "+myPath);
var animes = require("../data/animes");
var surveys = require("../data/surveys");
//var waiting = require("../data/trash/waiting");

var apiRoutes = function (app) {
    // Setup Routes to all animes: Don't Push Anything HERE
    /********************************************************************/
    //browser: localhost:3000/api/animes
    app.get("/api/animes", function (req, res) {
        return res.json(animes);
    });

    // NOT USED IN THIS PROGRAM BUT CAN BE USED TO RETURN THE MATCHING ANIME INFO IN THE BROWSER
    /******************************************************************************************/
    //browser: http://localhost:3000/api/animes/magithekingdomofmagic
    app.get("/api/animes/:anime", function (req, res) {
        var chosen = req.params.anime;

        //console.log(chosen);
        //Loop through the animes array until a match is found
        for (var i = 0; i < animes.length; i++) {
            if (chosen === animes[i].animeRouteName) {
                return res.json(animes[i]);
            }
        }
        return res.json(false);
    });//GET

    //SET UP ROUTES TO PARTIAL DATASETS
    /*****************************************/
    //browser: localhost:3000/api/surveys
    app.get("/api/surveys", function (req, res) {
        return res.json(surveys);
    });
    
    /*****************************************************************
     * Create a new survey JSON object from form questions and send to 
     * htmlRoutes.js post method to process the request and send the 
     * appropriate Anime as a JSON response.
    *****************************************************************/
    app.post("/api/animes", function (req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var newSurvey = req.body;

        /*****************************************
         * Check request values
         *****************************************/
        /*console.log("First Question Entered = "+question1);
        console.log("First Answer = "+newSurvey.scores[0]);
        console.log(newSurvey);
        console.log(animes);*/
        /**************************************************
         * FIND ANIME MATCH
         **************************************************/

        var diffSumTemp = 1000;//Must start greater than question value
        var chosenRecord = 0;
        for (var i = 0; i < animes.length; i++) {
            var diffSum = 0;
            var diffArr = new Array(newSurvey.length);
            for (var j = 0; j < animes[i].scores.length; j++) {
                var questionDif = Math.abs(newSurvey.scores[j] - animes[i].scores[j]);
                diffArr.push(questionDif);
                diffSum = diffSum + questionDif;
                //console.log("animes record: ("+i+") score: ("+j+") ="+animes[i].scores[j]);
            }//for
            if (diffSum < diffSumTemp) {
                diffSumTemp = diffSum; //Update Temp to current diffSum
                chosenRecord = i;
            }//if
            //console.log("Question DIFF = "+diffArr+" DiffSUM = "+diffSum+" ChosenRecord = "+chosenRecord);
            //console.log("*********************************************");
        }//for

        /**************************************************************************************
         * Create new properties on the newSurvey object, using a RegEx Pattern to remove spaces
         * You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
         * ***********************************************************************************/
        newSurvey.respondentRouteName = newSurvey.name.replace(/[^A-Z0-9]/ig, "").toLowerCase();
        newSurvey.animeRouteName = animes[chosenRecord].name.replace(/[^A-Z0-9]/ig, "").toLowerCase();//remove all special chars
        /*****************************
         *Populate the surveys array
         *****************************/
        surveys.push(newSurvey);

        /************************************************************************
         * 11/08: SEND THE ANIME THAT MATCHES THE SURVEY QUESTIONS AS THE RESPONSE 
         ************************************************************************/
        return res.json(animes[chosenRecord]);

    });
  /********************************************************************/
};//apiRoutes

module.exports = apiRoutes;