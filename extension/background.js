function inspect(object) {
  return JSON.stringify(object);
}

var popupHtmlUrl = chrome.extension.getURL("popup.html");

var messageHandler = {
  openPopupWindow: function(request, sendResponse) {
    console.log("openPopupWindow ...");
    var targetTab = request.tab;
    chrome.windows.create({ url: popupHtmlUrl + "?" + targetTab.id, type: "popup", 
                            top: 300, left: 300, width: 500, height: 400 });
    sendResponse({message: "Popup window created"});
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("runtime message " + inspect(request));
  if (sender && sender.tab) {
    console.log(" sender.tab.id = " + sender.tab.id);
  }
  var handler = messageHandler[request.type];
  request.tab = sender.tab;
  if (handler) {
    handler(request, sendResponse);
  }
  return true;
});

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

  chrome.tabs.executeScript({ file: 'jquery-1.10.2.js'}); 
  chrome.tabs.executeScript({ file: 'initialise-target-tab.js'}); 
});
