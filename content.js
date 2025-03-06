// Functions to handle video pause and play actions
function pauseVideo() {
	const video = document.querySelector("video");
	if (video) {
		video.pause();
	}
}

function playVideo() {
	const video = document.querySelector("video");
	if (video) {
		video.play().catch(() => {
			// Autoplay might be prevented by the browser
			console.warn("Autoplay prevented");
		});
	}
}

// Helper function to check if the feature is enabled before performing an action
function executeIfEnabled(action) {
	chrome.storage.sync.get("enabled", function (result) {
		if (result.enabled) {
			action();
		}
	});
}

// For tab switching: visibilitychange event is fired when the document becomes hidden or visible
document.addEventListener("visibilitychange", function () {
	if (document.hidden) {
		executeIfEnabled(pauseVideo);
	} else {
		executeIfEnabled(playVideo);
	}
});

// For switching to/from other applications: window blur/focus events
window.addEventListener("blur", function () {
	executeIfEnabled(pauseVideo);
});

window.addEventListener("focus", function () {
	executeIfEnabled(playVideo);
});
