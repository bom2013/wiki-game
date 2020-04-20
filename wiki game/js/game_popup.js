var port = chrome.runtime.connect({name: "background"});

$(document).ready(function()
 {
	chrome.storage.local.get("des_page_name", function(data)
	{
		$("#des-p").append(data.des_page_name);
	});
	chrome.storage.local.get("src_page_name", function(data)
	{
		$("#src-p").append(data.src_page_name);
	});
	chrome.storage.local.get("moves", function(data)
	{
		$("#move-p").append(data.moves);
	});
	$('#stop-button').click(function()
	{
		if (confirm('אתה בטוח שברצונך להפסיק את המשחק בעיצומו?'))
		{
			chrome.storage.local.set({game_on: false});
			port.postMessage("STOP");
			chrome.browserAction.setPopup({popup: "../popup.html"});
		}
	});
});
