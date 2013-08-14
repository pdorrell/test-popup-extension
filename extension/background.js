function inspect(object) {
  return JSON.stringify(object);
}

function openPopupWindow(popupHtmlUrl) {
  chrome.tabs.createWindow({url: popupHtmlUrl, type: "popup"});
}

var messageHandler = {
  openPopupWindow: function(request, sendResponse) {
    console.log("openPopupWindow ...");
    chrome.windows.create({ url: request.url, type: "popup" });
    sendResponse({message: "Popup window created"});
  }, 
  getTitle: function(request, sendResponse) {
    console.log("getTitle ...");
    sendResponse("Made up title from background");
  /*  chrome.runtime.sendMessage({type: "getWindowTitle"}, 
                               function(title) {
                                 sendResponse(title);
                               }); */
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("runtime message " + inspect(request));
  console.log(" sender = " + sender);
  var handler = messageHandler[request.type];
  if (handler) {
    handler(request, sendResponse);
  }
});

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

  // No tabs or host permissions needed!
  console.log('Starting Test Popup');
  
  console.log("tab = " + tab);
  console.log("tab.document = " + tab.document);
    
  chrome.tabs.executeScript({ file: 'create-popup.js'}); 
});
