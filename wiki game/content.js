var srcPage;
var desPage;
var moves;
//test
var port = chrome.runtime.connect({
  name: "background"
});
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log("Get STOP message - content.js")
    window.location.reload();
  });
//inject the data table and updating local variables if not done yet (source and destination)
chrome.storage.local.get("game_on", function (g_s) {
  if (g_s.game_on) {
    $("#right-navigation").hide();
    $("#left-navigation").hide();
    $("#p-personal").hide();
    $("#mw-head").append('<div id="disabled-message-injected"><style>#disabled-message-injected{text-align: center;}</style> <h3>אזור זה מושבת בעת המשחק ויחזור לאחר מכן</h3></div>');
    $("#mw-panel .portal").hide()
    $("#mw-panel").append("</br><h4>אזור זה מושבת בעת המשחק ויחזור לאחר מכן</h4>")

    var currentPageName = $("#firstHeading").text();
    var desPageName;
    var srcPageName;
    var moves;
    var validPage = true;
    //check that this page is new and not a refresh of the previous page 
    chrome.storage.local.get("page_list", function (p_l) {
      previousPage = p_l.page_list[p_l.page_list.length - 1]

      if (p_l.page_list.length == 0) {
        port.postMessage(currentPageName);
      }
      else if (previousPage != currentPageName) {
        if (document.referrer == "" && p_l.page_list.length != 0) {
          alert("רמאי! אסור לנווט לדפים שלא מתוך קישור בדף")
          window.location.replace(getWikiLinkFromPageName(previousPage));
          validPage = false;
        }
        else {
          port.postMessage(currentPageName);
        }
      }
      if (validPage) {
        chrome.storage.local.get("des_page_name", function (d_p) {
          desPageName = d_p.des_page_name;
          chrome.storage.local.get("src_page_name", function (s_p) {
            srcPageName = s_p.src_page_name;
            chrome.storage.local.get("moves", function (m) {
              moves = m.moves - 1;
              $('<div id="content-injected-wiki-game"> <style>#content-injected-wiki-game{direction: rtl; text-align: center; background-color: #00FF7F; font-size: 20px;}#content-injected-wiki-game table, #content-injected-wiki-game th, #content-injected-wiki-game td{border: 1px solid black; border-collapse: collapse;}</style> <style>.NameHighlights{position: relative;}.NameHighlights div{display: none;}.NameHighlightsHover{position: relative;}.NameHighlightsHover div{display: block; background-color: #DDD; padding: 5px; border-radius: 4px;}</style> <script>window.addEventListener("load", function(){var span=document.querySelectorAll("#des-data-td"); for (var i=span.length; i--;){(function(){var t; span[i].onmouseover=function(){hideAll(); clearTimeout(t); this.className="NameHighlightsHover";}; span[i].onmouseout=function(){var self=this; t=setTimeout(function(){self.className="NameHighlights";}, 300);};})();}function hideAll(){for (var i=span.length; i--;){span[i].className="NameHighlights";}};}); </script> <table style="width:100%"> <tr> <th>דף מקור</th> <th>צעדים</th> <th>דף יעד</th> </tr><tr> <td id="src-data-td"> </td><td id="move-data-td"></td><td id="des-data-td"> <span class="NameHighlights"> <div id=description-popup-des-data> </div></span> </td></tr></table></div>').insertAfter("#firstHeading");
              $("#src-data-td").append(srcPageName);
              $("#move-data-td").append(moves.toString());
              $("#des-data-td").prepend(desPageName);
              getWikiPageDescription(desPageName, function (d) { $("#description-popup-des-data").prepend(d); });
              if (currentPageName == desPageName) {
                $('<div id="content-injected-wiki-game"> <style>#content-injected-wiki-game{direction: rtl; text-align: center; background-color: #00FF00; font-size: 20px;}</style> <h3>כל הכבוד! הגעת ליעד</h3></div>').insertAfter("#firstHeading");
                port.postMessage("WIN");
              }
            });
          });
        });
      }
    });
  }
});
