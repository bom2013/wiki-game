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
              $('<div id="content-injected-wiki-game"> <style>#content-injected-wiki-game{direction: rtl; text-align: center; background-color: #00FF7F; font-size: 20px;}#content-injected-wiki-game table, #content-injected-wiki-game th, #content-injected-wiki-game td{border: 1px solid black; border-collapse: collapse;}</style> <table style="width:100%"> <tr> <th>דף מקור</th> <th>צעדים</th> <th>דף יעד</th> </tr><tr> <td id="src-data-td"></td><td id="move-data-td"></td><td id="des-data-td"></td></tr></table></div>').insertAfter("#firstHeading");
              $("#src-data-td").append(srcPageName);
              $("#move-data-td").append(moves.toString());
              $("#des-data-td").append(desPageName);
              if (currentPageName == desPageName) {
                $('<div id="content-injected-wiki-game"> <style>#content-injected-wiki-game{direction: rtl; text-align: center; background-color: #00FF00; font-size: 20px;}</style> <h3>כל הכבוד! הגעת ליעד</h3></div>').insertAfter("#firstHeading");
                port.postMessage("WIN");
              }
            });
          });
        });
      }
    });


    /*
        chrome.storage.local.get("des_page", function(d_p) {
          if (d_p.des_page == "") //first run, to get the destination page
          {
            chrome.storage.local.set({
              des_page: $("#firstHeading").text()
            });
            window.location.replace("https://he.wikipedia.org/wiki/%D7%9E%D7%99%D7%95%D7%97%D7%93:%D7%90%D7%A7%D7%A8%D7%90%D7%99"); //its so smart :) https://www.w3schools.com/howto/howto_js_redirect_webpage.asp, look at the "note"
          } else // second or game run
          {
            desPage = d_p.des_page;
            chrome.storage.local.get("src_page", function(s_p) {
              var CurrentPageName = $("#firstHeading").text();
              if (s_p.src_page == "") {
                chrome.storage.local.set({
                  src_page: CurrentPageName
                });
                srcPage = CurrentPageName;
                //second run, this is the source page
              } else {
                //normal run, src_page and des_page already set
                srcPage = s_p.src_page;
              }

              //to check if need to increament the moves variable(If done navigating to another page)
              var samePageAsBefore = false;
              chrome.storage.local.get("page_list", function(p_l) {
                //inject the html to the page
                chrome.storage.local.get("moves", function(m) {
                  if (p_l.page_list.length == 0) //second run - start of the game, the list is empty
                  {
                    port.postMessage(CurrentPageName);
                  } else {
                    //Checking it is really a new page and not the same page (refresh)
                    var PreviousPage = p_l.page_list[p_l.page_list.length - 1];
                    if (CurrentPageName != PreviousPage) {
                      port.postMessage(CurrentPageName);
                    } else {
                      samePageAsBefore = true; //needed for increament of the move variable
                    }
                  }

                  moves = m.moves;
                  if (p_l.page_list.length != m.moves && !samePageAsBefore) //If done navigating to another page *and* not the same page(refresh)
                  {
                    moves++;
                    chrome.storage.local.set({
                      moves: moves.toString()
                    });
                  }

                  //Check if win
                  if (CurrentPageName == desPage) {
                    $('<div id="content-injected-wiki-game"> <style>#content-injected-wiki-game{direction: rtl; text-align: center; background-color: #00FF00; font-size: 20px;}</style> <h3>כל הכבוד! הגעת ליעד</h3></div>').insertAfter("#firstHeading");
                    port.postMessage("WIN");
                  }

                  //inject table
                  $('<div id="content-injected-wiki-game"> <style>#content-injected-wiki-game{direction: rtl; text-align: center; background-color: #00FF7F; font-size: 20px;}#content-injected-wiki-game table, #content-injected-wiki-game th, #content-injected-wiki-game td{border: 1px solid black; border-collapse: collapse;}</style> <table style="width:100%"> <tr> <th>דף מקור</th> <th>צעדים</th> <th>דף יעד</th> </tr><tr> <td id="src-data-td"></td><td id="move-data-td"></td><td id="des-data-td"></td></tr></table></div>').insertAfter("#firstHeading");
                  $("#src-data-td").append(srcPage);
                  $("#move-data-td").append(moves.toString());
                  $("#des-data-td").append(desPage);
                });
              });
            });

          }
        });
        */
  }
});
