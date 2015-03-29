(function () {
	var lastSection = "waste";

	function validate (values) {
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

		var data = serialiseData($("section.active")),
			globalData = serialiseData(document);

		if (validate(data)) {
			if (nextKey) {
				switchToSection(nextKey);
			} else {
				window.localStorage.setItem("data", JSON.stringify(globalData));
			}
		}

		if (!validate(globalData)) {
			return false;
		}
	}

	switchToSection(lastSection);
	$(".next-step").on("click", nextSection);
	$("form").on("submit", nextSection);
}());
