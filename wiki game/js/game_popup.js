var port = chrome.runtime.connect({ name: "background" });

$(document).ready(function () {
	chrome.storage.local.get("des_page_name", function (data) {
		$("#des-p").append(data.des_page_name);
	});
	chrome.storage.local.get("src_page_name", function (data) {
		$("#src-p").append(data.src_page_name);
	});
	chrome.storage.local.get("moves", function (data) {
		$("#move-p").append(data.moves - 1);
	});
	chrome.storage.local.get("start_time", function (data) {
		//calculate the minute from start and round
		var minuteFromStart = (new Date().getTime() - data.start_time) / (1000 * 60);
		minuteFromStart = Math.round((minuteFromStart + Number.EPSILON) * 100) / 100;
		console.log(minuteFromStart);
		$('#time-p').append(minuteFromStart);
	});
	$('#stop-button').click(function () {
		if (confirm('אתה בטוח שברצונך להפסיק את המשחק בעיצומו?')) {
			chrome.storage.local.set({ game_on: false });
			port.postMessage("STOP");
			chrome.browserAction.setPopup({ popup: "../popup.html" });
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, { message: "STOP" }, function (response) {
					window.location.href = "../popup.html";
				});
			});

		}
	});
});
