//pulls in the required path
var path = require('path');

//linking the route to a series of "data" sources
var friends = require("../data/friends");

//ROUTING
module.exports = function(app) {
//API GET requests 
//this handles when users visit the page
    app.get("/api/friends", function(req,res) {
        res.json(friends);
    });

//API POST requests
//this handles adding a new friend
    app.post("/api/friends", function(req,res) {
        //captures the user input
        var userInput = req.body
        
        var userResponses = userInput.scores

        // Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000; // Make the initial value big for comparison

		// Examines all existing friends in the list
		for (var i = 0; i < friends.length; i++) {

			// checks differenes for each question
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			
			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		// Adds new user
		friends.push(userInput);

		// Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
    });

}