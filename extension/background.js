function inspect(object) {
  return JSON.stringify(object);
}

function openPopupWindow(popupHtmlUrl) {
  chrome.tabs.createWindow({url: popupHtmlUrl, type: "popup"});
}

var targetTab = null;

var messageHandler = {
  openPopupWindow: function(request, sendResponse) {
    console.log("openPopupWindow ...");
    targetTab = request.tab;
    console.log("targetTab.id = " + targetTab.id);
    chrome.windows.create({ url: request.url, type: "popup" });
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
  console.log(" sender = " + sender);
  console.log(" sender.tab = " + sender.tab);
  console.log(" sender.tab.id = " + sender.tab.id);
  var handler = messageHandler[request.type];
  request.tab = sender.tab;
  if (handler) {
    handler(request, sendResponse);
  }
  return true;
});

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

  // No tabs or host permissions needed!
  console.log('Starting Test Popup');
  
  console.log("tab = " + tab);
  console.log("tab.document = " + tab.document);
    
  chrome.tabs.executeScript({ file: 'jquery-1.10.2.js'}); 
  chrome.tabs.executeScript({ file: 'create-popup.js'}); 
});
