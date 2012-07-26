var rpnetLinks = [];

function getLinks(info, tab) {
  var selectedText = info.selectionText;
  var linksArr = selectedText.split(" ");
  var links = "";
  var len = linksArr.length
  for (var i = 0; i < len; i++) {
  	var link = linksArr[i];
  	if (isValidLink(link)) {
	  	//generateLinks(link);
      handleGeneratedLink(link);
  	}
  }
}

function isValidLink(link) {
	return link.indexOf("http") != -1;
}

var title = "Download with RPNet";
var id = chrome.contextMenus.create({"title": title, "contexts":["selection"], "onclick": getLinks});

function generateLinks(links) {
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "https://premium.rpnet.biz/client_api.php?action=generate");
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200 || xmlhttp.status == 304) {
          var response = JSON.parse(xmlhttp.responseText);
          if (response.hasOwnProperty('error')) {
            throw Error(response.error);
          } else if (response.links[0].hasOwnProperty('generated')) {
            handleGeneratedLink(response.links[0].generated);            
          } else {
            throw Error(response.links[0].error);
          }
        } else {
          throw Error("rpnet download: xmlhttp failure (Status = "+xmlhttp.status+")");
        }
      }
    }

    var dataString = "username=" + localStorage.getItem("rpnet_username")
					+ "&password=" + localStorage.getItem("rpnet_password")
					+ "&links=" + links;

    xmlhttp.send(dataString);
}

function handleGeneratedLink(link) {
  rpnetLinks.push(link);
  chrome.extension.sendMessage({links: rpnetLinks});
}

function getRPNetLinks() {
  return rpnetLinks;
}