function inspect(object) {
  return JSON.stringify(object);
}

var targetTab = null;

var messageHandler = {
  openPopupWindow: function(request, sendResponse) {
    console.log("openPopupWindow ...");
    targetTab = request.tab;
    console.log("targetTab.id = " + targetTab.id);
    chrome.windows.create({ url: request.url, type: "popup", 
                            top: 300, left: 300, width: 500, height: 400 });
    sendResponse({message: "Popup window created"});
  }, 
  getTitle: function(request, sendResponse) {
    console.log("getTitle ...");
    chrome.tabs.sendMessage(targetTab.id, {type: "getWindowTitle"}, 
                            function(title) {
                              sendResponse({title: title, targetTabId: targetTab.id});
                            });
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
