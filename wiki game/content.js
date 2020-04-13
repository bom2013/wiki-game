/*var clicks = 0;
$('#mw-head').append("<div style='background-color: #3fb543;'><h1 style='padding: 10px; padding-left:15px; color:white; margin-left:15px; font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif; color:#fec503; font-size: 20px;'>JA! YOU WIN!<button style='margin-left:20px; color:black; font-size:15px;'><a id='playagain' href='https://en.wikipedia.org/wiki/Special:Random'>Play again?</a></button></h1></div>");
*/
/* var gameState = false
var port = chrome.runtime.connect({name: "background"});

if(gameState)
{
	$('#mw-head').append("<div style='background-color: #3fb543;'><h1 style='padding: 10px; padding-left:15px; color:white; margin-left:15px; font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif; color:#fec503; font-size: 20px;'>JA! YOU WIN!<button style='margin-left:20px; color:black; font-size:15px;'><a id='playagain' href='https://en.wikipedia.org/wiki/Special:Random'>Play again?</a></button></h1></div>");
}

port.onMessage.addListener(function(state)
{
	if(state == "START")
	{
		console.log("Reset content to start game");
		gameState = true
	}
});
 */
 chrome.storage.local.get("game_on", function(data) {
  if(data.game_on)
	$('<div id="content-injected-wiki-game"> <style>#content-injected-wiki-game{direction: rtl; text-align: center;}#content-injected-wiki-game table, #content-injected-wiki-game th, #content-injected-wiki-game td{border: 1px solid black; border-collapse: collapse;}</style> <table style="width:100%"> <tr> <th>דף מקור</th> <th>צעדים</th> <th>דף יעד</th> </tr><tr> <td id="src-data-td"></td><td id="move-data-td"></td><td id="des-data-td"></td></tr></table></div>').insertAfter("#firstHeading");
});
