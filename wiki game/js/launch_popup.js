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

$(function () {
  $('#src-page-inp').on('input', function (e) {
    if ($('#src-page-inp').val()) {
      searchForWikiPage($('#src-page-inp').val(), function (d) {
        $("#src-page-inp").autocomplete({
          source: d
        });
      });
    }
  });
  $('#des-page-inp').on('input', function (e) {
    if ($('#des-page-inp').val()) {
      searchForWikiPage($('#des-page-inp').val(), function (d) {
        $("#des-page-inp").autocomplete({
          source: d
        });
      });
    }
  });
  $('#start-button').click(function () {
    var srcPage = $("#src-page-inp").val();
    var desPage = $("#des-page-inp").val();
    if (srcPage == desPage)
      alert("דף התחלה ודף סיום אינם יכולים להיות זהים");
    else if (srcPage.length == 0 || desPage.length == 0)
      alert('הכנס דף מקור+יעד, במידה ואין לך רעיון תוכל להשתמש בלחצן "הגרל"');
    else {
      chrome.browserAction.setPopup({
        popup: "src/game_popup.html"
      });
      //Using "|" To separate the arguments because the character "|" cannot be in wiki page name
      port.postMessage("JOIN|" + srcPage + "|" + desPage);
    }
  });
});