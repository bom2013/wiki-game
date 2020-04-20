
var pageList = [];
chrome.runtime.onConnect.addListener(function (port) {
  // to check the port is the right port
  console.assert(port.name == "background");
  port.onMessage.addListener(function (message) {
    if (message == "RESTART") {
      console.log("Start game - background.js");
      pageList = [];
      //init local variable
      chrome.storage.local.set({
        game_on: true
      });
      chrome.storage.local.set({
        moves: "0"
      });
      chrome.storage.local.set({
        page_list: []
      });
      getRandomWikiPage(function (desPage) {
        chrome.storage.local.set({
          des_page: desPage
        });
        chrome.storage.local.set({
          des_page_name: getPageNameFromWikiLink(desPage)
        });
        console.log("Set des page - background.js");
        getRandomWikiPage(function (srcPage) {
          chrome.storage.local.set({
            src_page: srcPage
          });
          chrome.storage.local.set({
            src_page_name: getPageNameFromWikiLink(srcPage)
          }
          );
          console.log("Set src page - background.js");
          port.postMessage("START");
        })
      })
    } else if (message == "WIN") {
      console.log("Win game - background.js");
      chrome.storage.local.set({
        game_on: false
      });
      chrome.browserAction.setPopup({
        popup: "popup.html"
      });
    } else {
      console.log("Push page name(" + message + ") to list - background.js");
      pageList.push(message);
      chrome.storage.local.set({
        page_list: pageList
      });
      chrome.storage.local.set({
        moves: pageList.length
      });
    }
  });
});
