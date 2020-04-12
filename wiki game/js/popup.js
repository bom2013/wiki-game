var port = chrome.runtime.connect({
  name: "background"
});
$(document).ready(function() {
  $('#new-game-button').click(function() {
	chrome.tabs.create({ url: "https://he.wikipedia.org/wiki/%D7%9E%D7%99%D7%95%D7%97%D7%93:%D7%90%D7%A7%D7%A8%D7%90%D7%99" });
    console.log("start game");
    port.postMessage("START"); 
  });
});
