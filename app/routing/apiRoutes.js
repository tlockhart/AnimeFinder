

var path = require("path");

var apiRoutes = function (app, animes) {
    // Displays all animes
    //browser: localhost:3000/api/animes
    app.get("/api/animes", function (req, res) {
        return res.json(animes);
    });
    // Displays a single anime, when the search button is clicked, or returns false
    app.get("/api/animes/:anime", function (req, res) {
        var chosen = req.params.anime;

        console.log(chosen);
        //Loop through the animes array until a match is found
        for (var i = 0; i < animes.length; i++) {
            if (chosen === animes[i].routeName) {
                return res.json(animes[i]);
            }
        }

        return res.json(false);
    });//GET

    // Create New animes - takes in JSON input
    app.post("/api/animes", function (req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var newanime = req.body;

        // Using a RegEx Pattern to remove spaces from newanime
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newanime.routeName = newanime.name.replace(/\s+/g, "").toLowerCase();

        console.log(newanime);

        animes.push(newanime);

        res.json(newanime);
    });
};

module.exports = apiRoutes;