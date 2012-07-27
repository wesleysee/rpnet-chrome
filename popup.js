chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    populate(request.links);
  });

populate(chrome.extension.getBackgroundPage().getRPNetLinks());

function populate(links) {
	var len = links.length;
	if (len == 0) {
		document.write("no links yet");
		return;
	}
	var len = links.length;
	var html = "<div class=\"tabbable\"><ul class=\"nav nav-tabs\"><li class=\"active\"><a href=\"#tab1\" data-toggle=\"tab\">Section 1</a></li>"
  html += "<li><a href=\"#tab2\" data-toggle=\"tab\">Section 2</a></li></ul><div class=\"tab-content\">";
	var currentIndex = chrome.extension.getBackgroundPage().getCurrentIndex();
	for (var i = 0; i < len; i++) {
		var linkArr = links[i];
		var len_j = linkArr.length;
		if (i == currentIndex - 1) {
			html += "<div class=\"tab-pane active\" id=\"tab" + (i + 1) + "\">";
		} else {
			html += "<div class=\"tab-pane\" id=\"tab" + (i + 1) + "\">";
		}
		for (var j = 0; j < len_j; j++) {
			var link = linkArr[j];
			html += "<a href=\"" + link + "\">" + link + "</a>\n";			
		}
		html += "</div>";
	}
	html += "</div>";
	document.write(html);
}