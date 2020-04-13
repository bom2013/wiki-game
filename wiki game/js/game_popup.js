$(document).ready(function() {
  $('#stop-button').click(function() {
    if (confirm('אתה בטוח שברצונך להפסיק את המשחק בעיצומו?')) {
	chrome.storage.local.set({game_on: false});
	chrome.browserAction.setPopup({popup: "../popup.html"});
    }
  })
})
