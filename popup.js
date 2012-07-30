chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    populate(request.links);
  });

document.addEventListener('DOMContentLoaded', function () {
  populate(chrome.extension.getBackgroundPage().getRPNetLinks());
});

function populate(links) {
	var len = links.length;
	if (len == 0) {
		document.body.innerHTML = "<div class=\"container-fluid\">No links yet</div>";
		return;
	}
	var len = links.length;
	var currentIndex = chrome.extension.getBackgroundPage().getCurrentIndex();
	var html = constructTabHeaders(links, len);
	var lastTab = 0;
	for (var i = 1; i < len + 1; i++) {
		var linkArr = links[i - 1];
		if (linkArr == null) {
			continue;
		}
		lastTab = i;
		var len_j = linkArr.length;
		html += "<div class=\"tab-pane\" id=\"tab-" + i + "\">";
		if (len_j == 0) {
			html += "No Links generated";
		} else {
			for (var j = 0; j < len_j; j++) {
				var link = linkArr[j];
				html += "<a href=\"" + link + "\">" + link + "</a>\n";			
			}
		}
		html += "<br/><div class=\"row-fluid btn-toolbar\" style=\"text-align: right;\">";
	    html += "<button class=\"btn\" id=\"clipboardBtn-" + i + "\">Copy to Clipboard</button>"
		html += "<button class=\"btn\" style=\"margin-left: 10px; margin-right: 20px;\" id=\"closeBtn-" + i + "\">Close</button></div>";
	    html += "<div class=\"row-fluid\">Show original links</div>";
		html += "</div>";
	}
	if (lastTab == 0) {
		document.body.innerHTML = "<div class=\"container-fluid\">No links yet</div>";
	} else {
		html += "</div>";
		document.body.innerHTML = html;
		selectActiveTab(lastTab);
		addJs(len);
	}
}

function constructTabHeaders(links, numOfTabs) {
	var html = "<div class=\"tabbable\"><ul class=\"nav nav-tabs\">";
	for (var i = 1; i < numOfTabs + 1; i++) {
		if (links[i - 1] == null) {
			continue;
		}
		html += "<li id=\"list-" + i + "\"><a href=\"#tab-" + i + "\" data-toggle=\"tab\">Link #" + i + "</a></li>"		 
	}
	html += "</ul><div class=\"tab-content\" style=\"margin: 5px\">";
	return html;
}

function selectActiveTab(tabNum) {
	$("#tab-" + tabNum).addClass("active");
	$("#list-" + tabNum).addClass("active");
}

function addJs(numOfTabs) {
	addClipboardBtnJs(numOfTabs);
	addCloseBtnJs(numOfTabs);
}

function addClipboardBtnJs(numOfTabs) {
	for (var i = 1; i < numOfTabs + 1; i++) {
		var btn = document.querySelector('#clipboardBtn-' + i);
		if (btn != null) {
			btn.addEventListener('click', function(){copyToClipboard(this)});
		}
	}
}

function copyToClipboard(btn) {
	var index = btn.id.split('-')[1] - 1;
	var links = chrome.extension.getBackgroundPage().getRPNetLinks()[index];
	var len = links.length;
	var txt = '';
	for (var i = 0; i < len; i++) {
		txt += links[i];
		if (i != len - 1) {
			txt += "\n";
		}
	}
	copyTextToClipboard(txt);
}

function copyTextToClipboard(text) {
    var copyFrom = $('<textarea/>');
    copyFrom.text(text);
    $('body').append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
}

function addCloseBtnJs(numOfTabs) {
	for (var i = 1; i < numOfTabs + 1; i++) {
		var btn = document.querySelector('#closeBtn-' + i);
		if (btn != null) {
			btn.addEventListener('click', function(){deleteTab(this)});
		}
	}
}

function deleteTab(btn) {
	var index = btn.id.split('-')[1];
	chrome.extension.getBackgroundPage().deleteIndex(index - 1);
	populate(chrome.extension.getBackgroundPage().getRPNetLinks());
}