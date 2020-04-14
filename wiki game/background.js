var pageList = [];

chrome.runtime.onConnect.addListener(function(port)
{
	// to check the port is the right port
	console.assert(port.name == "background");
	port.onMessage.addListener(function (message)
    {
        if (message == "START")
        {
            console.log("Start game - background.js");
			pageList = [];
        }
		else if(message == "WIN")
		{
			console.log("Win game - background.js");
			chrome.storage.local.set({game_on: false});
			chrome.browserAction.setPopup({popup: "popup.html"});
		}
    });
});
