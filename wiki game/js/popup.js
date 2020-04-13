var port = chrome.runtime.connect({
  name: "background"
});
$(document).ready(function() {
  $('#new-game-button').click(function() {
	//init local variable
	chrome.storage.local.set({game_on: true});
    chrome.storage.local.set({des_page: ""});
	chrome.storage.local.set({src_page: ""});
    chrome.storage.local.set({moves: "0"});
	
	//set the popup to game_popup.html
	chrome.browserAction.setPopup({popup: "src/game_popup.html"});
	
	//open new tab
	chrome.tabs.create({ url: "https://he.wikipedia.org/wiki/%D7%9E%D7%99%D7%95%D7%97%D7%93:%D7%90%D7%A7%D7%A8%D7%90%D7%99" });
	
	//message and log
	console.log("start game");
    port.postMessage("START"); 
  });
});
