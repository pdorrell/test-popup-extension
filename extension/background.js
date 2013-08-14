function inspect(object) {
  return JSON.stringify(object);
}

function openPopupWindow(popupHtmlUrl) {
  chrome.tabs.createWindow({url: popupHtmlUrl, type: "popup"});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("runtime message " + inspect(request));
  console.log(" sender = " + sender);
  if (request.type == "openPopupWindow") {
    console.log("Creating popup window ...");
    var popupWindow = chrome.windows.create({ url: request.url, type: "popup" });
    console.log("popupWindow = " + popupWindow);
    sendResponse({message: "Popup window created"});
  }
});

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

  // No tabs or host permissions needed!
  console.log('Starting Test Popup');
    
  chrome.tabs.executeScript({ file: 'create-popup.js'}); 
});
