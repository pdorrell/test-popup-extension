function inspect(object) {
  return JSON.stringify(object);
}

function openPopupWindow(popupHtmlUrl) {
  chrome.tabs.createWindow({url: popupHtmlUrl, type: "popup"});
}

var messageHandler = {
  openPopupWindow: function(request) {
    console.log("openPopupWindow ...");
    chrome.windows.create({ url: request.url, type: "popup" });
    return {message: "Popup window created"};
  }    
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("runtime message " + inspect(request));
  console.log(" sender = " + sender);
  var handler = messageHandler[request.type];
  if (handler) {
    sendResponse(handler(request));
  }
});

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

  // No tabs or host permissions needed!
  console.log('Starting Test Popup');
    
  chrome.tabs.executeScript({ file: 'create-popup.js'}); 
});
