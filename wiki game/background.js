/**
 * Get random wiki page
 *
 * @param {function} callback The function callback in the end of the function
 */
function getRandomWikiPage(callback) {
  var res;
  fetch("https://he.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=1" + "&origin=*")
    .then(function (response) {
      return response.json();
    })
    .then((response) => {
      var pages = response.query.random; // Process the output to get the image names
      res = pages[0].title;
      console.log("Finish to get the data(" + res + "), call the call back function");
      callback(getWikiLinkFromPageName(res));
    });
}

/**
 * Get all internal link from wiki page
 * 
 * @param {string} pageName The wiki page name
 * @param {function} callback The callback function that call when the function finish to get the links
 */
function getAllLinkFromWikiPage(pageName, callback) {
  var res;
  fetch("https://he.wikipedia.org/w/api.php?action=query&format=json&titles=" + pageName + "&prop=links&pllimit=max" + "&origin=*")
    .then(function (response) {
      return response.json();
    })
    .then((response) => {
      var links = response.query.pages;
      var pageId = Object.keys(links)[0];
      linksArray = links[pageId].links;
      tArray = [];
      for (var i in linksArray) { tArray.push(linksArray[i].title); }
      callback(tArray);
    });
}

/**
 * Get the wiki page name from wiki link
 * @param  {String} wikiLink The wiki link of the page
 * @return {String} The wiki page name of wikiLink
 */
function getPageNameFromWikiLink(wikiLink) {
  return decodeURIComponent(wikiLink).replace("https://he.wikipedia.org/wiki/", "").split("_").join(" ");
}

/**
 * Get the wiki link from wiki page name
 * @param  {String} name The wiki page name
 * @return {String}      The wiki link of name
 */
function getWikiLinkFromPageName(name) {
  return "https://he.wikipedia.org/wiki/" + name.split(" ").join("_");
}

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
