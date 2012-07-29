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
	var currentIndex = chrome.extension.getBackgroundPage().getCurrentIndex();
	var html = constructTabHeaders(len, currentIndex);
	for (var i = 1; i < len + 1; i++) {
		var linkArr = links[i - 1];
		var len_j = linkArr.length;
		if (i == currentIndex) {
			html += "<div class=\"tab-pane active\" id=\"tab" + i + "\">";
		} else {
			html += "<div class=\"tab-pane\" id=\"tab" + i + "\">";
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

function constructTabHeaders(numOfTabs, currentIndex) {
	var html = "<div class=\"tabbable\"><ul class=\"nav nav-tabs\">";
	for (var i = 1; i < numOfTabs + 1; i++) {
		if (i == currentIndex) {
			html += "<li class=\"active\"><a href=\"#tab" + i + "\" data-toggle=\"tab\">Link #" + i + "</a></li>"
		} else {
			html += "<li><a href=\"#tab" + i + "\" data-toggle=\"tab\">Link #" + i + "</a></li>"
		}
	}
	html += "</ul><div class=\"tab-content\">";
	return html;
}