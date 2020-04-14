var srcPage;
var desPage;
var moves;

var port = chrome.runtime.connect({name: "background"});

//inject the data table and updating local variables if not done yet (source and destination)
chrome.storage.local.get("game_on", function(g_s) {
    if (g_s.game_on)
	{
        chrome.storage.local.get("des_page", function(d_p) 
		{
			if (d_p.des_page == "")//first run, to get the destination page
			{
				chrome.storage.local.set({des_page: $("#firstHeading").text()});
				window.location.replace("https://he.wikipedia.org/wiki/%D7%9E%D7%99%D7%95%D7%97%D7%93:%D7%90%D7%A7%D7%A8%D7%90%D7%99");//its so smart :) https://www.w3schools.com/howto/howto_js_redirect_webpage.asp, look at the "note" 
			}
			else// second or game run
			{	
				desPage = d_p.des_page;
				chrome.storage.local.get("src_page", function(s_p)
				{
					if (s_p.src_page == "")//second run, this is the source page
					{
						chrome.storage.local.set({src_page: $("#firstHeading").text()});
						srcPage = $("#firstHeading").text();
					}
					else//normal run, src_page and des_page already set
					{
						srcPage = s_p.src_page;
					}
					chrome.storage.local.get("moves", function(m)
					{
						moves = m.moves;
						if($("#firstHeading").text() == desPage)
						{
							$('<div id="content-injected-wiki-game"> <style>#content-injected-wiki-game{direction: rtl; text-align: center; background-color: #00FF00; font-size: 20px;}</style> <h3>כל הכבוד! הגעת ליעד</h3></div>').insertAfter("#firstHeading");
							port.postMessage("WIN");
						}
						chrome.storage.local.set({moves: (parseInt(moves)+1).toString()});
						$('<div id="content-injected-wiki-game"> <style>#content-injected-wiki-game{direction: rtl; text-align: center; background-color: #00FF7F; font-size: 20px;}#content-injected-wiki-game table, #content-injected-wiki-game th, #content-injected-wiki-game td{border: 1px solid black; border-collapse: collapse;}</style> <table style="width:100%"> <tr> <th>דף מקור</th> <th>צעדים</th> <th>דף יעד</th> </tr><tr> <td id="src-data-td"></td><td id="move-data-td"></td><td id="des-data-td"></td></tr></table></div>').insertAfter("#firstHeading");
						$("#src-data-td").append(srcPage);
						$("#move-data-td").append((parseInt(moves)+1).toString());
						$("#des-data-td").append(desPage);
					});
				});
				
			}
		});
	}
 });
