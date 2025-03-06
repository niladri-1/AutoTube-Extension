document.addEventListener("DOMContentLoaded", function () {
	const toggle = document.getElementById("toggle");

	// Load saved setting (defaults to false if not set)
	chrome.storage.sync.get(["enabled"], function (result) {
		toggle.checked = result.enabled || false;
	});

	// Save setting when user toggles the switch
	toggle.addEventListener("change", function () {
		chrome.storage.sync.set({ enabled: toggle.checked });
	});
});
