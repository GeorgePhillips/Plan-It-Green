(function(){

	"use strict";

	var data = JSON.parse(window.localStorage.getItem("data")),
		questions = window.QUESTIONS;

	var percentages = {
		"waste": 20,
		"energy": 40,
		"operations": 80
	};

	percentages.overall = (percentages.waste + percentages.energy + percentages.operations) / 3;

	function getAnswer (category, index) {
		return 1; // TODO read data and return answer
	}

	function getWeight (category, index) {
		return 1; // TODO read data and return weight
	}

	function buildGraph(className, percentage) {
		console.log("." + className);
		var el = $("." + className).get(0);

		if (el) {
			var ctx = el.getContext("2d");

			var data = [
				{
					value: 100 - percentage,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "Red"
				},
				{
					value: percentage,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Green"
				}
			];

			return new Chart(ctx).Doughnut(data, {responsive : true});
		}
		return null;
	}

	for (var category in percentages) {
		buildGraph(category + "-chart", percentages[category]); // TODO get the actual percentage complete
	}

	console.log(data);
	console.log(questions);
	// TODO iterate over all the categories in question
	// TODO create a table per category with a title
	// TODO create a row per question and use the answer and weight to generate percentage

}).call(this);
