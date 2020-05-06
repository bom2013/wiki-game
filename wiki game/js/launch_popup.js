
//TODO: change to popup.html in the manifest
//TODO: download jquary ui
//TODO: fix autocompleete
//TODO: upgrade this to jquary

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
});