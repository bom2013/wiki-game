/**
 * Get random wiki page
 *
 * @param {function} callback The function callback in the end of the function
 */
function getRandomWikiPage(callback) {
  var pageName;
  fetch("https://he.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=1" + "&origin=*")
    .then(function (response) {
      return response.json();
    })
    .then((response) => {
      var pages = response.query.random; // Process the output to get the image names
      pageName = pages[0].title;
      callback(pageName);
    });
}
/**
 * Get random wiki page Link
 *
 * @param {function} callback The function callback in the end of the function
 */
function getRandomWikiPageLink(callback) {
  getRandomWikiPage(function (pageName) {
    callback(getWikiLinkFromPageName(pageName))
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

/**
 * Get all the categories of wiki page
 * @param {string} pageName The wiki page name
 * @param {function} callback Function that call after finish to get the data
 */
function getAllCategoriesOfWikiPage(pageName, callback) {
  var res;
  fetch("https://he.wikipedia.org/w/api.php?format=json&action=query&prop=categories&titles=" + pageName + "&prop=links&pllimit=max" + "&origin=*")
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
 * Check if wiki page is Orphan page(https://en.wikipedia.org/wiki/Wikipedia:Orphan)
 * @param {string} pageName The wiki page name
 * @param {function} callback Function that call after finish to get the data
 */
function checkIfOrphanWikiPage(pageName, callback) {
  getAllCategoriesOfWikiPage(pageName, function (cat) {
    callback(cat.include("ויקיפדיה:מיזמי ויקיפדיה/ערכים יתומים"));
  });
}

/**
 * Get short description of wiki page
 * 
 * @param {string} pageName The wiki page name
 * @param {function} callback The callback function that call when the function finish to get the description
 */
function getWikiPageDescription(pageName, callback) {
  fetch("https://he.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + pageName + "&origin=*")
    .then(function (response) {
      return response.json();
    })
    .then((response) => {
      var links = response.query.pages;
      var pageId = Object.keys(links)[0];
      description = links[pageId].extract;
      callback(description);
    })
}

/**
 * Check if wiki page is Disambiguation page(https://en.wikipedia.org/wiki/Wikipedia:Disambiguation)
 * @param {string} pageName The wiki page name
 * @param {function} callback Function that call after finish to get the data
 */
function checkIfDisambiguationWikiPage(pageName, callback) {
  getAllCategoriesOfWikiPage(pageName, function (cat) {
    callback(cat.include("ויקיפדיה:פירושונים") || cat.include("תבנית:פירושונים"));
  });
}

/**
 * The function search for specific page in wikipedia and return list of 10 search results
 * @param {string} requestedPageName The page to search in wikipedia
 * @param {function} callback Function that call after finish to get the data
 */
function searchForWikiPage(requestedPageName, callback) {
  fetch("https://he.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + requestedPageName + "&format=json" + "&origin=*")
    .then(function (response) {
      return response.json();
    })
    .then((response) => {

      linksArray = response.query.search;
      tArray = [];
      for (var i in linksArray) { tArray.push(linksArray[i].title); }
      callback(tArray);
    });
}