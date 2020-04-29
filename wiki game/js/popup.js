var port = chrome.runtime.connect({
  name: "background"
});

port.onMessage.addListener(function (message) {
  if (message == "START") {
    console.log("Get START message - popup.js");
    //open new tab
    chrome.storage.local.get("src_page", function (s_p) {
      chrome.tabs.create({
        url: s_p.src_page
      });
    });
  }
});

$(document).ready(function () {
  $('#new-game-button').click(function () {
    $("#new-game-button").prop("disabled", true);
    //set the popup to game_popup.html
    chrome.browserAction.setPopup({
      popup: "src/game_popup.html"
    });
    //message and log
    console.log("Start game");
    port.postMessage("RESTART");
  });
  $('#join-game-button').click(function () {
    var srcPage = prompt("דף מקור", "");
    var desPage = prompt("דף יעד", "");
    //set the popup to game_popup.html
    chrome.browserAction.setPopup({
      popup: "src/game_popup.html"
    });
    //message and log
    console.log("Join game, src=" + srcPage + ", des=" + desPage);
    //Using "|" To separate the arguments because the character "|" cannot be in wiki page name
    port.postMessage("JOIN|" + srcPage + "|" + desPage);
  });
});
