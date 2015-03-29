(function(){

	"use strict";

	var data = JSON.parse(window.localStorage.getItem("data")),
		questions = window.QUESTIONS;

	function getPercentage (category, index, weight) {
        //console.log(data);
        var key = category + "--" + (index + 1);
        var answer = data[key];
        var weightedAnswer = (answer - 1)/4 * weight;
        console.log("Percentage " + category + " " + index + " " + " " + weight + " " + answer + " " + weightedAnswer);
        return weightedAnswer;
	}

	function buildGraph(className, percentage) {
		console.log("." + className);
		var el = $("." + className).get(0);

		if (el) {
			var ctx = el.getContext("2d");

			var data = [
				{
					value: Math.round(percentage),
					color: "#38B449",
					highlight: "#5AD3D1",
					label: "Green"
				},
				{
					value: Math.round(100 - percentage),
					color:"#F7464A",
					highlight: "#FF5A5E",
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

    buildGraph("overall-chart", Math.round(total / 3));
    $(".overall-percent").text(Math.round(total / 3) + "%");

    $("#table-section").html(output);

}).call(this);
