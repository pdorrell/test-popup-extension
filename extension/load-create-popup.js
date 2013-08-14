function inspect(object) {
  return JSON.stringify(object);
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

  // No tabs or host permissions needed!
  console.log('Starting Test Popup');
    
  chrome.tabs.executeScript({ file: 'create-popup.js'}); 
});
