(function(){

	"use strict";

	var percentages = {
		"waste": 20,
		"energy": 40,
		"operations": 80
	};

	percentages.overall = (percentages.waste + percentages.energy + percentages.operations) / 3;

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
		buildGraph(category + "-chart", percentages[category]);
	}

}).call(this);
