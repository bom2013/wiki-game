async function getRandomPage() {
  /**
   * Send the request to get the images
   */
  var res;
  await fetch("https://he.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=1" + "&origin=*")
    .then(function(response) {
      return response.json();
    })
    .then((response) => {
      var pages = response.query.random; // Process the output to get the image names
      res = pages[0].title;
    });
  console.log(res);
  return res;
}

function getPageNameFromWikiLink(wikiLink) {
  return decodeURIComponent(wikiLink).replace("https://he.wikipedia.org/wiki/", "").split("_").join(" ");
}

function getWikiLinkFromPageName(name) {
  return "https://he.wikipedia.org/wiki/" + name.replace(" ", "_");
}

var pageList = [];

chrome.runtime.onConnect.addListener(function(port) {
  // to check the port is the right port
  console.assert(port.name == "background");
  port.onMessage.addListener(function(message) {
    if (message == "START") {
      console.log("Start game - background.js");
      pageList = [];
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
    }
  });
});
