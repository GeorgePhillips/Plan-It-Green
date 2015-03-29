(function(){

	"use strict";

	var data = JSON.parse(window.localStorage.getItem("data")),
		questions = window.QUESTIONS;

	function getAnswer (category, index, weight) {
        //console.log(data);
        var key = category + "--" + index;
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
					value: percentage,
					color: "#38B449",
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


	console.log(data);
	console.log(questions);
    
    var output = "", total = 0;
    for (var category in questions) { 
        var percentage = 0;
        output += "<h3>" + category + "</h3><table>";
        for (var i = 0; i < questions[category].length; i++) {
            var answer = getAnswer(category, i + 1, questions[category][i].weight);
            output += "<tr><td>" + questions[category][i].name + "</td><td>" + answer + "%</td></tr>";
            percentage += answer;
        }
        buildGraph(category.toLowerCase() + "-chart", percentage / questions[category].length); // TODO get the actual percentage complete
        total += percentage / questions[category].length;
        output += "</table>";
    }
    console.log(total);
    buildGraph("overall-chart", total / 3); // TODO get the actual percentage complete
        
    $("#table-section").html(output);

}).call(this);
