(function () {
	var lastSection = "waste";

	function validSection () {
		var values = serialiseData($("section.active"));

		for (var name in values) {
			if (!values[name]) {
				return false;
			}
		}
		return true;
	}

	function removeActive() {
		$("section.active, nav .active").removeClass("active");
	}

	function switchToSection(key) {
		removeActive();
		$("section." + key + ", nav ." + key).addClass("active");
	}

	function serialiseData(scope) {
		var values = {};
		$(scope).find(".answers").each(function () {
			var name = $(this).data("question"),
				value = $(this).find("input:radio[name='" + name + "']:checked").val();

			values[name] = value ? parseInt(value) : null;
		});
		return values;
	}

	function nextSection(e) {
		var nextKey = $("section.active").next("section").data("category");

		if (validSection()) {
			if (nextKey) {
				switchToSection(nextKey);
			} else {
				console.log(serialiseData(document));
				window.localStorage.setItem("data", JSON.stringify(serialiseData(document)));
				// window.location = "/result/";
				return false;
			}
		}
	}

	switchToSection(lastSection);
	$(".next-step").on("click", nextSection);
	$("form").on("submit", nextSection);
}());
