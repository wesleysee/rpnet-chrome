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
	var html = '';
	for (var i = 0; i < len; i++) {
		var link = links[i];
		html += "<a href=\"" + link + "\">" + link + "</a>\n";
	}
	document.write(html);
}