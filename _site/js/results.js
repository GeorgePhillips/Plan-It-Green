(function(){

	"use strict";

	var data = JSON.parse(window.localStorage.getItem("data")),
		questions = window.QUESTIONS;

	function getPercentage (category, index, weight) {
        //console.log(data);
        var key = category + "--" + (index + 1);
        var answer = data[key];
        var weightedAnswer = (answer - 1)/4 * weight; 
        return weightedAnswer;
	}

	function buildGraph(className, percentage) {
		console.log("." + className);
		var el = $("." + className).get(0);

		if (el) {
			var ctx = el.getContext("2d");

			var data = [
				{
<<<<<<< HEAD
					value: percentage,
					color: "#38B449",
=======
					value: Math.round(100 - percentage),
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "Red"
				},
				{
					value: Math.round(percentage),
					color: "#46BFBD",
>>>>>>> 2b590ca9fdb74130294c5f4370c7c68e9b718cd8
					highlight: "#5AD3D1",
					label: "Green"
				},
              {
					value: 100 - percentage,
					color:"#BBBDC0",
					highlight: "#A7A9AB",
					label: "Room to improve"
				}
			];

			return new Chart(ctx).Doughnut(data, {responsive : true});
		}
		return null;
	}

    
    var output = "", total = 0;
    for (var category in questions) { 
        var percentage = 0;
        output += "<h3>" + category + "</h3><table>";
        for (var i = 0; i < questions[category].length; i++) {
            var answer = getPercentage(category, i, questions[category][i].weight);
            output += "<tr><td>" + questions[category][i].name + "</td><td>" + answer + "%</td></tr>";
            percentage += answer;
        }
        buildGraph(category.toLowerCase() + "-chart", percentage); 
        $("." + category.toLowerCase() + "-percent").text(Math.round(percentage) + "%"); 
        total += percentage;
        output += "</table>";
    }
    console.log(total);
    buildGraph("overall-chart", total / 3); 
    $(".overall-percent").text(Math.round(total / 3) + "%"); 
        
    $("#table-section").html(output);

}).call(this);
